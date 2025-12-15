<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
  >
    <!-- Header -->
    <GoldAnalysisHeader
      :is-running="isRunning"
      @donate="showDonateModal = true"
      @settings="showSettings = true"
      @start="startSimulation"
      @stop="stopSimulation"
    />

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Current Price Card -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <UCard class="bg-gradient-to-br from-yellow-500 to-yellow-600">
          <div class="text-center">
            <UIcon
              name="streamline:gold-solid"
              class="w-12 h-12 mb-2 text-white"
            />
            <div class="text-sm font-medium white mb-1">Current Price</div>
            <div class="text-3xl font-bold text-white mb-1">
              ${{ currentPrice.toFixed(2) }}
            </div>
            <div
              class="text-sm font-medium flex items-center justify-center gap-1"
              :class="
                priceChange.amount >= 0 ? 'text-green-300' : 'text-red-300'
              "
            >
              <UIcon
                :name="
                  priceChange.amount >= 0
                    ? 'i-lucide-trending-up'
                    : 'i-lucide-trending-down'
                "
                class="inline-block w-4 h-4"
              />
              {{ priceChange.amount >= 0 ? "+" : ""
              }}{{ priceChange.amount.toFixed(2) }} ({{
                priceChange.percentage.toFixed(2)
              }}%)
            </div>
          </div>
        </UCard>

        <!-- Signal Card -->
        <UCard
          class="md:col-span-3"
          :class="{
            'bg-gradient-to-br from-green-600 to-green-700':
              currentSignal?.type === 'BUY',
            'bg-gradient-to-br from-red-600 to-red-700':
              currentSignal?.type === 'SELL',
            'bg-gradient-to-br from-blue-600 to-blue-700':
              currentSignal?.type === 'HOLD',
          }"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-gray-400 mb-1">
                Trading Signal
              </div>
              <div
                class="text-2xl font-bold mb-2"
                :class="{
                  'text-green-400': currentSignal?.type === 'BUY',
                  'text-red-400': currentSignal?.type === 'SELL',
                  'text-blue-400': currentSignal?.type === 'HOLD',
                  'text-gray-500': !currentSignal?.type,
                }"
              >
                {{ currentSignal?.type || "WAITING" }}
                <span class="text-base ml-2 text-gray-400">
                  (Strength: {{ currentSignal?.strength || 0 }}%)
                </span>
              </div>
              <div class="space-y-1">
                <div
                  v-for="(reason, idx) in currentSignal?.reason || []"
                  :key="idx"
                  class="text-sm text-gray-300 flex items-center gap-2"
                >
                  <UIcon
                    name="i-lucide-check-circle"
                    class="w-4 h-4"
                    :class="{
                      'text-green-400': currentSignal?.type === 'BUY',
                      'text-red-400': currentSignal?.type === 'SELL',
                      'text-blue-400': currentSignal?.type === 'HOLD',
                    }"
                  />
                  {{ reason }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <StrengthMeter :strength="currentSignal?.strength || 0" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Technical Indicators -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-activity" class="w-5 h-5 text-blue-500" />
              <span class="font-semibold">Moving Averages</span>
            </div>
          </template>
          <div class="space-y-3">
            <IndicatorRow
              :label="`SMA ${tradingSettings.smaShort}`"
              :value="indicators?.smaShort"
            />
            <IndicatorRow
              :label="`SMA ${tradingSettings.smaLong}`"
              :value="indicators?.smaLong"
            />
            <IndicatorRow
              :label="`EMA ${tradingSettings.emaFast}`"
              :value="indicators?.emaFast"
            />
            <IndicatorRow
              :label="`EMA ${tradingSettings.emaSlow}`"
              :value="indicators?.emaSlow"
            />
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-gauge" class="w-5 h-5 text-purple-500" />
              <span class="font-semibold">Momentum Indicators</span>
            </div>
          </template>
          <div class="space-y-3">
            <IndicatorRow
              label="RSI (14)"
              :value="indicators?.rsi"
              :isRSI="true"
            />
            <IndicatorRow label="MACD" :value="indicators?.macd" />
            <IndicatorRow label="MACD Signal" :value="indicators?.macdSignal" />
            <IndicatorRow
              label="MACD Histogram"
              :value="indicators?.macdHistogram"
            />
          </div>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-git-branch"
                class="w-5 h-5 text-green-500"
              />
              <span class="font-semibold">Bollinger Bands</span>
            </div>
          </template>
          <div class="space-y-3">
            <IndicatorRow
              label="Upper Band"
              :value="indicators?.bollingerUpper"
            />
            <IndicatorRow
              label="Middle Band"
              :value="indicators?.bollingerMiddle"
            />
            <IndicatorRow
              label="Lower Band"
              :value="indicators?.bollingerLower"
            />
            <div class="pt-2">
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Current: ${{ currentPrice.toFixed(2) }}
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Candlestick Chart -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-candlestick-chart"
                class="w-5 h-5 text-yellow-500"
              />
              <span class="font-semibold"
                >Candlestick Chart with Moving Averages</span
              >
            </div>
          </template>
          <ClientOnly>
            <v-chart
              v-if="priceHistory.length > 0"
              :option="candlestickOption"
              :style="{ height: '400px' }"
              autoresize
            />
            <div
              v-else
              class="flex items-center justify-center h-[400px] text-gray-500"
            >
              <div class="text-center">
                <UIcon
                  name="i-lucide-bar-chart"
                  class="w-12 h-12 mx-auto mb-2 opacity-50"
                />
                <p>Click "Start Analysis" to view chart</p>
              </div>
            </div>
          </ClientOnly>
        </UCard>

        <!-- RSI Chart -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-bar-chart-3"
                class="w-5 h-5 text-purple-500"
              />
              <span class="font-semibold">RSI Indicator</span>
            </div>
          </template>
          <ClientOnly>
            <v-chart
              v-if="priceHistory.length > 0"
              :option="rsiOption"
              :style="{ height: '400px' }"
              autoresize
            />
            <div
              v-else
              class="flex items-center justify-center h-[400px] text-gray-500"
            >
              <div class="text-center">
                <UIcon
                  name="i-lucide-activity"
                  class="w-12 h-12 mx-auto mb-2 opacity-50"
                />
                <p>Click "Start Analysis" to view chart</p>
              </div>
            </div>
          </ClientOnly>
        </UCard>

        <!-- MACD Chart -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-trending-up"
                class="w-5 h-5 text-blue-500"
              />
              <span class="font-semibold">MACD</span>
            </div>
          </template>
          <ClientOnly>
            <v-chart
              v-if="priceHistory.length > 0"
              :option="macdOption"
              :style="{ height: '400px' }"
              autoresize
            />
            <div
              v-else
              class="flex items-center justify-center h-[400px] text-gray-500"
            >
              <div class="text-center">
                <UIcon
                  name="i-lucide-trending-up"
                  class="w-12 h-12 mx-auto mb-2 opacity-50"
                />
                <p>Click "Start Analysis" to view chart</p>
              </div>
            </div>
          </ClientOnly>
        </UCard>

        <!-- Volume Chart -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-bar-chart-2"
                class="w-5 h-5 text-green-500"
              />
              <span class="font-semibold">Trading Volume</span>
            </div>
          </template>
          <ClientOnly>
            <v-chart
              v-if="priceHistory.length > 0"
              :option="volumeOption"
              :style="{ height: '400px' }"
              autoresize
            />
            <div
              v-else
              class="flex items-center justify-center h-[400px] text-gray-500"
            >
              <div class="text-center">
                <UIcon
                  name="i-lucide-bar-chart-2"
                  class="w-12 h-12 mx-auto mb-2 opacity-50"
                />
                <p>Click "Start Analysis" to view chart</p>
              </div>
            </div>
          </ClientOnly>
        </UCard>
      </div>

      <!-- Quick Reference Guide -->
      <div class="mt-6">
        <QuickReferenceGuide />
      </div>

      <!-- Strategy Explanation -->
      <UCard class="mt-6">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-book-open" class="w-5 h-5 text-indigo-500" />
            <span class="font-semibold">Trading Strategy Explanation</span>
          </div>
        </template>
        <div class="prose dark:prose-invert max-w-none">
          <h3>Multi-Indicator Trading Strategy</h3>
          <p>
            This analysis uses a combination of technical indicators to generate
            trading signals:
          </p>
          <ul>
            <li>
              <strong>RSI (Relative Strength Index):</strong> Identifies
              overbought (&gt;70) and oversold (&lt;30) conditions. Strong buy
              signals when RSI &lt; 30, sell signals when RSI &gt; 70.
            </li>
            <li>
              <strong>Moving Average Crossovers:</strong> Golden cross (SMA20
              &gt; SMA50) suggests bullish trend, death cross (SMA20 &lt; SMA50)
              suggests bearish trend.
            </li>
            <li>
              <strong>MACD:</strong> Bullish when MACD line crosses above signal
              line, bearish when it crosses below.
            </li>
            <li>
              <strong>Bollinger Bands:</strong> Price touching lower band
              suggests oversold conditions (potential buy), upper band suggests
              overbought (potential sell).
            </li>
            <li>
              <strong>EMA Trend:</strong> Short-term trend confirmation using 12
              and 26-period exponential moving averages.
            </li>
          </ul>
          <h4>Signal Strength Calculation</h4>
          <p>
            Signals are weighted based on multiple indicators agreeing. A
            strength above 70 indicates high confidence, while 50-70 suggests
            moderate confidence. Below 50 means mixed signals.
          </p>
        </div>
      </UCard>
    </div>

    <!-- Footer -->
    <GoldAnalysisFooter @donate="showDonateModal = true" />

    <!-- Trading Settings Modal -->
    <TradingSettings
      v-model="showSettings"
      :settings="tradingSettings"
      @update:settings="tradingSettings = $event"
    />

    <!-- Donate Modal -->
    <DonateModal v-model="showDonateModal" />
  </div>
</template>

<script setup lang="ts">
// Default settings
const tradingSettings = ref<AnalysisSettings>({
  updateInterval: 3000,
  candlePeriod: "5m",
  smaShort: 20,
  smaLong: 50,
  emaFast: 12,
  emaSlow: 26,
  rsiPeriod: 14,
  rsiOverbought: 70,
  rsiOversold: 30,
  macdFast: 12,
  macdSlow: 26,
  macdSignal: 9,
  bollingerPeriod: 20,
  bollingerStdDev: 2,
  basePrice: 2050,
  volatility: 0.5,
});

// Settings modal state
const showSettings = ref(false);
const showDonateModal = ref(false);

// Use the composable with settings
const {
  priceHistory,
  currentPrice,
  isRunning,
  indicators,
  currentSignal,
  priceChange,
  startSimulation,
  stopSimulation,
} = useGoldAnalysis(tradingSettings);

// Helper function to calculate RSI for chart
const calculateRSIData = () => {
  return priceHistory.value.map((d, i) => {
    const slice = priceHistory.value.slice(0, i + 1);
    const closes = slice.map((p) => p.close);

    if (closes.length < 15) return null;

    const changes = [];
    for (let j = 1; j < closes.length; j++) {
      const prev = closes[j - 1];
      const curr = closes[j];
      if (prev !== undefined && curr !== undefined) {
        changes.push(curr - prev);
      }
    }

    const gains = changes.slice(-14).map((c) => (c > 0 ? c : 0));
    const losses = changes.slice(-14).map((c) => (c < 0 ? -c : 0));

    const avgGain = gains.reduce((a, b) => a + b, 0) / 14;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / 14;

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
  });
};

// Candlestick Chart Option
const candlestickOption = computed(() => {
  const timestamps = priceHistory.value.map((d) =>
    new Date(d.timestamp).toLocaleTimeString()
  );
  const candleData = priceHistory.value.map((d) => [
    d.open,
    d.close,
    d.low,
    d.high,
  ]);

  const sma20Data = priceHistory.value.map((d, i) => {
    const slice = priceHistory.value.slice(Math.max(0, i - 19), i + 1);
    const closes = slice.map((p) => p.close);
    return closes.length >= 20
      ? closes.reduce((a, b) => a + b) / closes.length
      : null;
  });

  const sma50Data = priceHistory.value.map((d, i) => {
    const slice = priceHistory.value.slice(Math.max(0, i - 49), i + 1);
    const closes = slice.map((p) => p.close);
    return closes.length >= 50
      ? closes.reduce((a, b) => a + b) / closes.length
      : null;
  });

  return {
    backgroundColor: "transparent",
    grid: { left: "10%", right: "10%", top: "15%", bottom: "15%" },
    xAxis: {
      type: "category",
      data: timestamps,
      axisLine: { lineStyle: { color: "#6B7280" } },
      axisLabel: { color: "#9CA3AF" },
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color: "#6B7280" } },
      splitLine: { lineStyle: { color: "#374151" } },
      axisLabel: {
        color: "#9CA3AF",
        formatter: (val: number) => `$${val.toFixed(0)}`,
      },
    },
    dataZoom: [
      { type: "inside", start: 0, end: 100 },
      { show: true, type: "slider", top: "90%", start: 0, end: 100 },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      borderColor: "#374151",
      textStyle: { color: "#F3F4F6" },
      formatter: (params: any) => {
        const candle = params.find((p: any) => p.seriesName === "Price");
        if (!candle) return "";
        const [open, close, low, high] = candle.data;
        const change = close - open;
        const changePercent = ((change / open) * 100).toFixed(2);
        const color = change >= 0 ? "#10B981" : "#EF4444";
        const arrow = change >= 0 ? "▲" : "▼";

        return `
          <div style="padding: 8px;">
            <div style="color: ${color}; font-weight: bold; margin-bottom: 8px;">
              ${arrow} ${change >= 0 ? "+" : ""}$${change.toFixed(
          2
        )} (${changePercent}%)
            </div>
            <div>Open: <strong>$${open.toFixed(2)}</strong></div>
            <div style="color: #10B981;">High: <strong>$${high.toFixed(
              2
            )}</strong></div>
            <div style="color: #EF4444;">Low: <strong>$${low.toFixed(
              2
            )}</strong></div>
            <div>Close: <strong>$${close.toFixed(2)}</strong></div>
          </div>
        `;
      },
    },
    legend: {
      data: ["Price", "SMA 20", "SMA 50"],
      textStyle: { color: "#9CA3AF" },
      top: 0,
    },
    series: [
      {
        name: "Price",
        type: "candlestick",
        data: candleData,
        itemStyle: {
          color: "#10B981",
          color0: "#EF4444",
          borderColor: "#10B981",
          borderColor0: "#EF4444",
        },
      },
      {
        name: "SMA 20",
        type: "line",
        data: sma20Data,
        smooth: true,
        lineStyle: { color: "#3B82F6", width: 2 },
        showSymbol: false,
      },
      {
        name: "SMA 50",
        type: "line",
        data: sma50Data,
        smooth: true,
        lineStyle: { color: "#10B981", width: 2 },
        showSymbol: false,
      },
    ],
  };
});

// RSI Chart Option
const rsiOption = computed(() => {
  const timestamps = priceHistory.value.map((d) =>
    new Date(d.timestamp).toLocaleTimeString()
  );
  const rsiData = calculateRSIData();

  return {
    backgroundColor: "transparent",
    grid: { left: "10%", right: "10%", top: "15%", bottom: "15%" },
    xAxis: {
      type: "category",
      data: timestamps,
      axisLine: { lineStyle: { color: "#6B7280" } },
      axisLabel: { color: "#9CA3AF" },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLine: { lineStyle: { color: "#6B7280" } },
      splitLine: { lineStyle: { color: "#374151" } },
      axisLabel: { color: "#9CA3AF" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      borderColor: "#374151",
      textStyle: { color: "#F3F4F6" },
    },
    legend: {
      data: ["RSI"],
      textStyle: { color: "#9CA3AF" },
      top: 0,
    },
    series: [
      {
        name: "RSI",
        type: "line",
        data: rsiData,
        smooth: true,
        lineStyle: { color: "#8B5CF6", width: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(139, 92, 246, 0.3)" },
              { offset: 1, color: "rgba(139, 92, 246, 0.05)" },
            ],
          },
        },
        markLine: {
          silent: true,
          symbol: "none",
          label: { position: "end", formatter: "{b}" },
          data: [
            {
              yAxis: 70,
              name: "Overbought",
              lineStyle: { color: "#EF4444", type: "dashed" },
            },
            {
              yAxis: 30,
              name: "Oversold",
              lineStyle: { color: "#10B981", type: "dashed" },
            },
          ],
        },
      },
    ],
  };
});

// MACD Chart Option
const macdOption = computed(() => {
  const timestamps = priceHistory.value.map((d) =>
    new Date(d.timestamp).toLocaleTimeString()
  );

  const macdLine: (number | null)[] = [];
  const signalLine: (number | null)[] = [];
  const histogram: (number | null)[] = [];

  priceHistory.value.forEach((d, i) => {
    const slice = priceHistory.value.slice(0, i + 1);
    const closes = slice.map((p) => p.close);

    if (closes.length < 26) {
      macdLine.push(null);
      signalLine.push(null);
      histogram.push(null);
      return;
    }

    const ema12 = closes.slice(-12).reduce((a, b) => a + b) / 12;
    const ema26 = closes.slice(-26).reduce((a, b) => a + b) / 26;
    const macd = ema12 - ema26;

    macdLine.push(macd);
    signalLine.push(macd * 0.9);
    histogram.push(macd * 0.1);
  });

  return {
    backgroundColor: "transparent",
    grid: { left: "10%", right: "10%", top: "15%", bottom: "15%" },
    xAxis: {
      type: "category",
      data: timestamps,
      axisLine: { lineStyle: { color: "#6B7280" } },
      axisLabel: { color: "#9CA3AF" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#6B7280" } },
      splitLine: { lineStyle: { color: "#374151" } },
      axisLabel: { color: "#9CA3AF" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      borderColor: "#374151",
      textStyle: { color: "#F3F4F6" },
    },
    legend: {
      data: ["MACD", "Signal", "Histogram"],
      textStyle: { color: "#9CA3AF" },
      top: 0,
    },
    series: [
      {
        name: "MACD",
        type: "line",
        data: macdLine,
        smooth: true,
        lineStyle: { color: "#3B82F6", width: 2 },
        showSymbol: false,
      },
      {
        name: "Signal",
        type: "line",
        data: signalLine,
        smooth: true,
        lineStyle: { color: "#F59E0B", width: 2 },
        showSymbol: false,
      },
      {
        name: "Histogram",
        type: "bar",
        data: histogram,
        itemStyle: { color: "#6366F1" },
      },
    ],
  };
});

// Volume Chart Option
const volumeOption = computed(() => {
  const timestamps = priceHistory.value.map((d) =>
    new Date(d.timestamp).toLocaleTimeString()
  );
  const volumeData = priceHistory.value.map((d) => d.volume);

  return {
    backgroundColor: "transparent",
    grid: { left: "10%", right: "10%", top: "15%", bottom: "15%" },
    xAxis: {
      type: "category",
      data: timestamps,
      axisLine: { lineStyle: { color: "#6B7280" } },
      axisLabel: { color: "#9CA3AF" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#6B7280" } },
      splitLine: { lineStyle: { color: "#374151" } },
      axisLabel: {
        color: "#9CA3AF",
        formatter: (val: number) => `${(val / 1000000).toFixed(1)}M`,
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      borderColor: "#374151",
      textStyle: { color: "#F3F4F6" },
      formatter: (params: any) => {
        const val = params[0].value;
        return `Volume: ${(val / 1000000).toFixed(2)}M`;
      },
    },
    series: [
      {
        name: "Volume",
        type: "bar",
        data: volumeData,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#10B981" },
              { offset: 1, color: "rgba(16, 185, 129, 0.3)" },
            ],
          },
        },
      },
    ],
  };
});
</script>
