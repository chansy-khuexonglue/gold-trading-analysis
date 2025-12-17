<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-trending-up" class="w-5 h-5 text-yellow-500" />
          <span class="font-semibold">Live Gold Price</span>
          <UBadge
            :color="isLive ? 'success' : 'neutral'"
            variant="subtle"
            class="ml-2"
          >
            {{ isLive ? "LIVE" : "PAUSED" }}
          </UBadge>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Source: {{ currentSource }}
          </div>
          <UButton
            :icon="isLive ? 'i-lucide-pause' : 'i-lucide-play'"
            :color="isLive ? 'error' : 'success'"
            variant="soft"
            size="sm"
            @click="toggleLive"
          >
            {{ isLive ? "Pause" : "Start" }}
          </UButton>
        </div>
      </div>
    </template>

    <!-- Current Price Display -->
    <div
      class="mb-6 p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-lg border border-yellow-500/20"
    >
      <div class="flex items-center justify-between">
        <div>
          <div
            class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
          >
            Current Gold Price
          </div>
          <div class="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
            ${{ currentPrice.toFixed(2) }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            per troy ounce (USD)
          </div>
        </div>
        <div class="text-right">
          <div
            class="text-2xl font-bold flex items-center gap-2"
            :class="priceChange >= 0 ? 'text-green-500' : 'text-red-500'"
          >
            <UIcon
              :name="
                priceChange >= 0 ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'
              "
              class="w-6 h-6"
            />
            {{ priceChange >= 0 ? "+" : "" }}{{ priceChange.toFixed(2) }}
          </div>
          <div
            class="text-sm font-medium mt-1"
            :class="priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'"
          >
            ({{ priceChangePercent >= 0 ? "+" : ""
            }}{{ priceChangePercent.toFixed(2) }}%)
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Last 24h
          </div>
        </div>
      </div>
    </div>

    <!-- Price Chart -->
    <ClientOnly>
      <v-chart
        v-if="priceData.length > 0"
        :option="chartOption"
        :style="{ height: '500px' }"
        autoresize
      />
      <div
        v-else
        class="flex items-center justify-center h-[500px] text-gray-500"
      >
        <div class="text-center">
          <UIcon
            name="i-lucide-loader-2"
            class="w-12 h-12 mx-auto mb-2 animate-spin"
          />
          <p>Loading price data...</p>
        </div>
      </div>
    </ClientOnly>

    <!-- Stats Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
          High (24h)
        </div>
        <div class="text-lg font-bold text-green-600 dark:text-green-400">
          ${{ stats.high.toFixed(2) }}
        </div>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
          Low (24h)
        </div>
        <div class="text-lg font-bold text-red-600 dark:text-red-400">
          ${{ stats.low.toFixed(2) }}
        </div>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Average</div>
        <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
          ${{ stats.average.toFixed(2) }}
        </div>
      </div>
      <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Updates</div>
        <div class="text-lg font-bold text-purple-600 dark:text-purple-400">
          {{ priceData.length }}
        </div>
      </div>
    </div>

    <!-- Last Update Time -->
    <div class="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
      Last updated: {{ lastUpdateTime }}
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface PriceDataPoint {
  timestamp: number;
  price: number;
  source: string;
}

// Composables
const { fetchCurrentGoldPrice } = useGoldPriceAPI();

// State
const isLive = ref(false);
const priceData = ref<PriceDataPoint[]>([]);
const currentPrice = ref(2650);
const currentSource = ref("Loading...");
const lastUpdateTime = ref("");
let updateInterval: ReturnType<typeof setInterval> | null = null;

// Computed
const priceChange = computed(() => {
  if (priceData.value.length < 2) return 0;
  const firstPrice = priceData.value[0]?.price ?? 0;
  return currentPrice.value - firstPrice;
});

const priceChangePercent = computed(() => {
  if (priceData.value.length < 2) return 0;
  const firstPrice = priceData.value[0]?.price ?? 1;
  return ((currentPrice.value - firstPrice) / firstPrice) * 100;
});

const stats = computed(() => {
  if (priceData.value.length === 0) {
    return { high: 0, low: 0, average: 0 };
  }

  const prices = priceData.value.map((d) => d.price);
  return {
    high: Math.max(...prices),
    low: Math.min(...prices),
    average: prices.reduce((a, b) => a + b, 0) / prices.length,
  };
});

const chartOption = computed(() => {
  const timestamps = priceData.value.map((d) =>
    new Date(d.timestamp).toLocaleTimeString()
  );
  const prices = priceData.value.map((d) => d.price);

  // Calculate moving average (20 periods)
  const ma20 = prices.map((_, i) => {
    if (i < 19) return null;
    const slice = prices.slice(i - 19, i + 1);
    return slice.reduce((a, b) => a + b, 0) / 20;
  });

  return {
    backgroundColor: "transparent",
    grid: {
      left: "3%",
      right: "4%",
      top: "15%",
      bottom: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: timestamps,
      boundaryGap: false,
      axisLine: {
        lineStyle: { color: "#6B7280" },
      },
      axisLabel: {
        color: "#9CA3AF",
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      axisLine: {
        lineStyle: { color: "#6B7280" },
      },
      splitLine: {
        lineStyle: { color: "#374151" },
      },
      axisLabel: {
        color: "#9CA3AF",
        formatter: (val: number) => `$${val.toFixed(0)}`,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6B7280",
        },
      },
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      borderColor: "#374151",
      textStyle: { color: "#F3F4F6" },
      formatter: (params: any) => {
        const priceParam = params[0];
        const maParam = params[1];
        let html = `<div style="padding: 8px;">
          <div style="font-weight: bold; margin-bottom: 4px;">${
            priceParam.axisValueLabel
          }</div>
          <div style="color: #F59E0B;">Price: <strong>$${priceParam.value.toFixed(
            2
          )}</strong></div>`;

        if (maParam?.value != null) {
          html += `<div style="color: #3B82F6;">MA20: <strong>$${maParam.value.toFixed(
            2
          )}</strong></div>`;
        }

        html += "</div>";
        return html;
      },
    },
    legend: {
      data: ["Gold Price", "MA20"],
      textStyle: { color: "#9CA3AF" },
      top: 0,
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        show: true,
        type: "slider",
        top: "90%",
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "Gold Price",
        type: "line",
        data: prices,
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: "#F59E0B",
          width: 3,
        },
        itemStyle: {
          color: "#F59E0B",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(245, 158, 11, 0.4)" },
              { offset: 1, color: "rgba(245, 158, 11, 0.05)" },
            ],
          },
        },
        markPoint: {
          data: [
            { type: "max", name: "Max", itemStyle: { color: "#10B981" } },
            { type: "min", name: "Min", itemStyle: { color: "#EF4444" } },
          ],
        },
      },
      {
        name: "MA20",
        type: "line",
        data: ma20,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#3B82F6",
          width: 2,
          type: "dashed",
        },
      },
    ],
  };
});

// Methods
const fetchPrice = async () => {
  try {
    const result = await fetchCurrentGoldPrice();
    if (result) {
      currentPrice.value = result.price;
      currentSource.value = result.source;
      lastUpdateTime.value = new Date(result.timestamp).toLocaleString();

      // Add to price data array
      priceData.value.push({
        timestamp: result.timestamp,
        price: result.price,
        source: result.source,
      });

      // Keep only last 100 data points
      if (priceData.value.length > 100) {
        priceData.value.shift();
      }
    }
  } catch (error) {
    console.error("Failed to fetch gold price:", error);
  }
};

const toggleLive = () => {
  if (isLive.value) {
    stopUpdates();
  } else {
    startUpdates();
  }
};

const startUpdates = () => {
  isLive.value = true;
  fetchPrice(); // Fetch immediately

  // Update every 5 seconds
  updateInterval = setInterval(() => {
    fetchPrice();
  }, 5000);
};

const stopUpdates = () => {
  isLive.value = false;
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
};

// Lifecycle
onMounted(() => {
  // Fetch initial price
  fetchPrice();
});

onUnmounted(() => {
  stopUpdates();
});
</script>
