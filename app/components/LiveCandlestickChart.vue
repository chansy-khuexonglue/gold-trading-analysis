<template>
  <!-- TradingView-style Chart Container -->
  <div
    class="tradingview-container bg-[#131722] rounded-lg overflow-hidden shadow-2xl"
  >
    <!-- Toolbar -->
    <div
      class="tradingview-toolbar bg-[#1E222D] border-b border-[#2A2E39] px-4 py-3"
    >
      <div class="flex items-center justify-between">
        <!-- Left: Symbol & Price Info -->
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-coins" class="w-5 h-5 text-yellow-500" />
              <span class="text-white font-bold text-lg">XAU/USD</span>
            </div>
            <UBadge
              :color="isLive ? 'success' : 'neutral'"
              variant="soft"
              size="sm"
            >
              {{ isLive ? "LIVE" : "PAUSED" }}
            </UBadge>
          </div>

          <!-- Price Display -->
          <div class="flex items-center gap-4 text-sm">
            <div>
              <span class="text-gray-400">O</span>
              <span class="text-white ml-1 font-mono">{{
                lastCandle?.open.toFixed(2) || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-400">H</span>
              <span class="text-green-400 ml-1 font-mono">{{
                lastCandle?.high.toFixed(2) || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-400">L</span>
              <span class="text-red-400 ml-1 font-mono">{{
                lastCandle?.low.toFixed(2) || "—"
              }}</span>
            </div>
            <div>
              <span class="text-gray-400">C</span>
              <span class="text-white ml-1 font-mono font-bold">{{
                currentPrice.toFixed(2)
              }}</span>
            </div>
            <div
              class="font-mono font-bold"
              :class="stats.change >= 0 ? 'text-green-400' : 'text-red-400'"
            >
              {{ stats.change >= 0 ? "+" : ""
              }}{{ stats.change.toFixed(2) }} ({{
                stats.changePercent.toFixed(2)
              }}%)
            </div>
          </div>
        </div>

        <!-- Right: Controls -->
        <div class="flex items-center gap-2">
          <!-- Timeframe Selector -->
          <div class="flex items-center gap-1 bg-[#131722] rounded-md p-1">
            <button
              v-for="tf in timeframes"
              :key="tf"
              class="px-3 py-1.5 text-xs font-medium rounded transition-colors"
              :class="
                candleInterval === tf
                  ? 'bg-[#2962FF] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#2A2E39]'
              "
              @click="candleInterval = tf"
            >
              {{ tf }}
            </button>
          </div>

          <!-- Indicators Toggle -->
          <UButton
            icon="i-lucide-trending-up"
            color="neutral"
            variant="ghost"
            size="sm"
            class="text-gray-400 hover:text-white"
            title="Toggle MA20"
          >
            MA20
          </UButton>

          <!-- Live Control -->
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
    </div>

    <!-- Chart Area -->
    <div class="tradingview-chart-area bg-[#131722]">
      <ClientOnly>
        <v-chart
          v-if="candleData.length > 0"
          :option="chartOption"
          :style="{ height: '650px', width: '100%' }"
          :autoresize="true"
          class="tradingview-chart"
        />
        <div v-else class="flex items-center justify-center h-[650px]">
          <div class="text-center">
            <UIcon
              name="i-lucide-candlestick-chart"
              class="w-16 h-16 mx-auto mb-4 text-gray-600"
            />
            <p class="text-gray-400 text-lg mb-2">No Chart Data</p>
            <p class="text-gray-500 text-sm mb-4">
              Click "Start" to begin live trading
            </p>
            <UButton icon="i-lucide-play" color="success" @click="startUpdates">
              Start Live Chart
            </UButton>
          </div>
        </div>
      </ClientOnly>
    </div>

    <!-- Bottom Stats Bar -->
    <div
      class="tradingview-footer bg-[#1E222D] border-t border-[#2A2E39] px-4 py-3"
    >
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs">
        <div class="flex items-center gap-2">
          <span class="text-gray-500">Time</span>
          <span class="text-white font-mono">{{ lastUpdateTime }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">Source</span>
          <span class="text-blue-400">{{ currentSource }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">High (24h)</span>
          <span class="text-green-400 font-mono"
            >${{ stats.high.toFixed(2) }}</span
          >
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">Low (24h)</span>
          <span class="text-red-400 font-mono"
            >${{ stats.low.toFixed(2) }}</span
          >
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">Volume</span>
          <span class="text-white font-mono">{{
            formatVolume(stats.totalVolume)
          }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">Candles</span>
          <span class="text-white font-mono">{{ candleData.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CandleData {
  timestamp: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

// Composables
const { fetchCurrentGoldPrice } = useGoldPriceAPI();

// State
const isLive = ref(false);
const candleData = ref<CandleData[]>([]);
const currentPrice = ref(2650);
const currentSource = ref("Waiting...");
const lastUpdateTime = ref("");
const candleInterval = ref("1min");
const timeframes = ["1min", "5min", "15min", "1H", "4H", "1D"];
let updateInterval: ReturnType<typeof setInterval> | null = null;

// Current candle being built
let currentCandle: CandleData | null = null;
let candleStartTime = 0;
const CANDLE_DURATION = 60000; // 1 minute in milliseconds

// Computed
const lastCandle = computed(() => {
  return candleData.value.length > 0
    ? candleData.value[candleData.value.length - 1]
    : null;
});

const stats = computed(() => {
  if (candleData.value.length === 0) {
    return { high: 0, low: 0, change: 0, changePercent: 0, totalVolume: 0 };
  }

  const prices = candleData.value.flatMap((d) => [d.high, d.low]);
  const firstCandle = candleData.value[0];
  const lastCandleValue = candleData.value[candleData.value.length - 1];

  const change = lastCandleValue
    ? lastCandleValue.close - (firstCandle?.open ?? 0)
    : 0;
  const changePercent = firstCandle?.open
    ? (change / firstCandle.open) * 100
    : 0;
  const totalVolume = candleData.value.reduce((sum, d) => sum + d.volume, 0);

  return {
    high: Math.max(...prices),
    low: Math.min(...prices),
    change,
    changePercent,
    totalVolume,
  };
});

const chartOption = computed(() => {
  const timestamps = candleData.value.map((d) =>
    new Date(d.timestamp).toLocaleTimeString()
  );
  const ohlcData = candleData.value.map((d) => [
    d.open,
    d.close,
    d.low,
    d.high,
  ]);
  const volumeData = candleData.value.map((d) => d.volume);

  // Calculate MA20
  const ma20 = candleData.value.map((_, i) => {
    if (i < 19) return null;
    const slice = candleData.value.slice(i - 19, i + 1);
    const closes = slice.map((c) => c.close);
    return closes.reduce((a, b) => a + b, 0) / 20;
  });

  return {
    backgroundColor: "#131722",
    animation: false, // Disable for performance
    legend: {
      show: false,
    },
    grid: [
      {
        left: "1%",
        right: "1%",
        top: "8%",
        height: "62%",
        borderColor: "#2A2E39",
      },
      {
        left: "1%",
        right: "1%",
        top: "75%",
        height: "15%",
        borderColor: "#2A2E39",
      },
    ],
    xAxis: [
      {
        type: "category",
        data: timestamps,
        boundaryGap: true,
        axisLine: {
          lineStyle: { color: "#2A2E39" },
        },
        axisTick: {
          lineStyle: { color: "#2A2E39" },
        },
        axisLabel: {
          color: "#787B86",
          fontSize: 11,
          margin: 8,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#2A2E39",
            type: "solid",
          },
        },
        gridIndex: 0,
      },
      {
        type: "category",
        data: timestamps,
        boundaryGap: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false },
        gridIndex: 1,
      },
    ],
    yAxis: [
      {
        scale: true,
        position: "right",
        splitLine: {
          lineStyle: {
            color: "#2A2E39",
            type: "solid",
          },
        },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#787B86",
          fontSize: 11,
          formatter: (val: number) => `$${val.toFixed(2)}`,
        },
        gridIndex: 0,
      },
      {
        scale: true,
        position: "right",
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#787B86",
          fontSize: 11,
          formatter: (val: number) => `${(val / 1000).toFixed(0)}K`,
        },
        gridIndex: 1,
      },
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 50,
        end: 100,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        link: [{ xAxisIndex: "all" }],
        lineStyle: {
          color: "#787B86",
          type: "dashed",
        },
        crossStyle: {
          color: "#787B86",
        },
      },
      backgroundColor: "#1E222D",
      borderColor: "#2A2E39",
      borderWidth: 1,
      textStyle: {
        color: "#D1D4DC",
        fontSize: 12,
      },
      formatter: (params: any) => {
        const candleParam = params.find(
          (p: any) => p.seriesName === "Candlestick"
        );
        if (!candleParam) return "";

        const [open, close, low, high] = candleParam.data;
        const change = close - open;
        const changePercent = ((change / open) * 100).toFixed(2);
        const color = change >= 0 ? "#26A69A" : "#EF5350";
        const arrow = change >= 0 ? "▲" : "▼";

        let html = `
          <div style="padding: 10px; min-width: 200px;">
            <div style="color: #787B86; font-size: 11px; margin-bottom: 8px;">${
              candleParam.axisValueLabel
            }</div>
            <div style="color: ${color}; font-weight: 600; margin-bottom: 12px; font-size: 13px;">
              ${arrow} ${change >= 0 ? "+" : ""}$${change.toFixed(
          2
        )} (${changePercent}%)
            </div>
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 16px; font-size: 12px;">
              <span style="color: #787B86;">Open</span>
              <span style="color: #D1D4DC; text-align: right;">$${open.toFixed(
                2
              )}</span>
              <span style="color: #787B86;">High</span>
              <span style="color: #26A69A; text-align: right;">$${high.toFixed(
                2
              )}</span>
              <span style="color: #787B86;">Low</span>
              <span style="color: #EF5350; text-align: right;">$${low.toFixed(
                2
              )}</span>
              <span style="color: #787B86;">Close</span>
              <span style="color: #D1D4DC; text-align: right;">$${close.toFixed(
                2
              )}</span>
        `;

        const maParam = params.find((p: any) => p.seriesName === "MA20");
        if (maParam?.value != null) {
          html += `
              <span style="color: #787B86;">MA20</span>
              <span style="color: #2962FF; text-align: right;">$${maParam.value.toFixed(
                2
              )}</span>
          `;
        }

        const volumeParam = params.find((p: any) => p.seriesName === "Volume");
        if (volumeParam?.value != null) {
          html += `
              <span style="color: #787B86;">Volume</span>
              <span style="color: #D1D4DC; text-align: right;">${formatVolume(
                volumeParam.value
              )}</span>
          `;
        }

        html += `
            </div>
          </div>
        `;
        return html;
      },
    },
    series: [
      {
        name: "Candlestick",
        type: "candlestick",
        data: ohlcData,
        xAxisIndex: 0,
        yAxisIndex: 0,
        barWidth: "60%",
        itemStyle: {
          color: "#26A69A",
          color0: "#EF5350",
          borderColor: "#26A69A",
          borderColor0: "#EF5350",
          borderWidth: 1,
        },
      },
      {
        name: "MA20",
        type: "line",
        data: ma20,
        smooth: false,
        showSymbol: false,
        lineStyle: {
          color: "#2962FF",
          width: 1.5,
        },
        xAxisIndex: 0,
        yAxisIndex: 0,
      },
      {
        name: "Volume",
        type: "bar",
        data: volumeData,
        xAxisIndex: 1,
        yAxisIndex: 1,
        barWidth: "60%",
        itemStyle: {
          color: (params: any) => {
            const candle = candleData.value[params.dataIndex];
            return candle && candle.close >= candle.open
              ? "rgba(38, 166, 154, 0.5)"
              : "rgba(239, 83, 80, 0.5)";
          },
        },
      },
    ],
  };
});

// Methods
const formatVolume = (volume: number): string => {
  if (volume >= 1000000000) {
    return `${(volume / 1000000000).toFixed(2)}B`;
  }
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(2)}M`;
  }
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}K`;
  }
  return volume.toString();
};

const fetchPrice = async () => {
  try {
    const result = await fetchCurrentGoldPrice();
    if (!result) return;

    currentPrice.value = result.price;
    currentSource.value = result.source;
    lastUpdateTime.value = new Date(result.timestamp).toLocaleString();

    const now = Date.now();

    // Initialize or update current candle
    if (!currentCandle || now - candleStartTime >= CANDLE_DURATION) {
      // Complete previous candle and start new one
      if (currentCandle) {
        candleData.value.push({ ...currentCandle });

        // Keep only last 100 candles
        if (candleData.value.length > 100) {
          candleData.value.shift();
        }
      }

      // Start new candle
      candleStartTime = now;
      currentCandle = {
        timestamp: now,
        open: result.price,
        close: result.price,
        high: result.price,
        low: result.price,
        volume: Math.floor(Math.random() * 50000) + 10000, // Simulated volume
      };
    } else {
      // Update current candle
      currentCandle.close = result.price;
      currentCandle.high = Math.max(currentCandle.high, result.price);
      currentCandle.low = Math.min(currentCandle.low, result.price);
      currentCandle.volume += Math.floor(Math.random() * 5000) + 1000;
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

  // Update every 5 seconds to build candles
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

  // Save current candle if exists
  if (currentCandle) {
    candleData.value.push({ ...currentCandle });
    currentCandle = null;
  }
};

// Lifecycle
onMounted(() => {
  // Don't auto-start, wait for user to click "Start Live"
});

onUnmounted(() => {
  stopUpdates();
});
</script>
