<template>
  <UModal v-model:open="isOpen">
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-settings" class="w-5 h-5 text-blue-500" />
          <span class="font-semibold">Trading Settings</span>
        </div>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="isOpen = false"
        />
      </div>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Timeframe Settings -->
        <div>
          <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-clock" class="w-4 h-4 text-yellow-500" />
            Timeframe Settings
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2"
                >Update Interval</label
              >
              <USelectMenu
                v-model="localSettings.updateInterval"
                :items="intervalOptions"
                class="w-full"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                How often prices update
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >Candle Period</label
              >
              <USelectMenu
                v-model="localSettings.candlePeriod"
                :items="candlePeriodOptions"
                class="w-full"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Time per candle
              </p>
            </div>
          </div>
        </div>

        <div class="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>
        <!-- Moving Averages -->
        <div>
          <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-activity" class="w-4 h-4 text-blue-500" />
            Moving Averages
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2"
                >SMA Short Period</label
              >
              <UInput
                v-model.number="localSettings.smaShort"
                type="number"
                :min="5"
                :max="50"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >SMA Long Period</label
              >
              <UInput
                v-model.number="localSettings.smaLong"
                type="number"
                :min="20"
                :max="200"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >EMA Fast Period</label
              >
              <UInput
                v-model.number="localSettings.emaFast"
                type="number"
                :min="5"
                :max="50"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >EMA Slow Period</label
              >
              <UInput
                v-model.number="localSettings.emaSlow"
                type="number"
                :min="10"
                :max="100"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div class="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>

        <!-- RSI Settings -->
        <div>
          <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-gauge" class="w-4 h-4 text-purple-500" />
            RSI Settings
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">RSI Period</label>
              <UInput
                v-model.number="localSettings.rsiPeriod"
                type="number"
                :min="5"
                :max="30"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >Overbought Level</label
              >
              <UInput
                v-model.number="localSettings.rsiOverbought"
                type="number"
                :min="60"
                :max="90"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >Oversold Level</label
              >
              <UInput
                v-model.number="localSettings.rsiOversold"
                type="number"
                :min="10"
                :max="40"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div class="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>

        <!-- MACD Settings -->
        <div>
          <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-trending-up" class="w-4 h-4 text-blue-500" />
            MACD Settings
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Fast Period</label>
              <UInput
                v-model.number="localSettings.macdFast"
                type="number"
                :min="5"
                :max="20"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Slow Period</label>
              <UInput
                v-model.number="localSettings.macdSlow"
                type="number"
                :min="15"
                :max="35"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >Signal Period</label
              >
              <UInput
                v-model.number="localSettings.macdSignal"
                type="number"
                :min="5"
                :max="15"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div class="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>

        <!-- Bollinger Bands -->
        <div>
          <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-git-branch" class="w-4 h-4 text-green-500" />
            Bollinger Bands
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Period</label>
              <UInput
                v-model.number="localSettings.bollingerPeriod"
                type="number"
                :min="10"
                :max="50"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >Standard Deviation</label
              >
              <UInput
                v-model.number="localSettings.bollingerStdDev"
                type="number"
                :min="1"
                :max="3"
                step="0.1"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div class="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>

        <!-- Price Settings -->
        <div>
          <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
            <UIcon
              name="i-lucide-dollar-sign"
              class="w-4 h-4 text-yellow-500"
            />
            Price Settings
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2"
                >Base Price ($)</label
              >
              <UInput
                v-model.number="localSettings.basePrice"
                type="number"
                :min="1000"
                :max="5000"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2"
                >Volatility (%)</label
              >
              <UInput
                v-model.number="localSettings.volatility"
                type="number"
                :min="0.1"
                :max="5"
                step="0.1"
                class="w-full"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Higher = more price movement
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-between w-full">
        <UButton
          color="neutral"
          variant="ghost"
          @click="resetToDefaults"
          icon="i-lucide-rotate-ccw"
        >
          Reset to Defaults
        </UButton>
        <div class="flex gap-2">
          <UButton color="neutral" variant="ghost" @click="isOpen = false">
            Cancel
          </UButton>
          <UButton color="primary" @click="applySettings" icon="i-lucide-check">
            Apply Settings
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

export interface TradingSettings {
  // Timeframe
  updateInterval: number;
  candlePeriod: string;

  // Moving Averages
  smaShort: number;
  smaLong: number;
  emaFast: number;
  emaSlow: number;

  // RSI
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;

  // MACD
  macdFast: number;
  macdSlow: number;
  macdSignal: number;

  // Bollinger Bands
  bollingerPeriod: number;
  bollingerStdDev: number;

  // Price
  basePrice: number;
  volatility: number;
}

const props = defineProps<{
  modelValue: boolean;
  settings: TradingSettings;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "update:settings": [settings: TradingSettings];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const localSettings = ref<TradingSettings>({ ...props.settings });

watch(
  () => props.settings,
  (newSettings) => {
    localSettings.value = { ...newSettings };
  },
  { deep: true }
);

const intervalOptions = [
  { label: "1 second (Very Fast)", value: 1000 },
  { label: "2 seconds (Fast)", value: 2000 },
  { label: "3 seconds (Normal)", value: 3000 },
  { label: "5 seconds (Slow)", value: 5000 },
  { label: "10 seconds (Very Slow)", value: 10000 },
];

const candlePeriodOptions = [
  { label: "1 Minute", value: "1m" },
  { label: "5 Minutes", value: "5m" },
  { label: "15 Minutes", value: "15m" },
  { label: "1 Hour", value: "1h" },
  { label: "4 Hours", value: "4h" },
  { label: "1 Day", value: "1d" },
];

const defaultSettings: TradingSettings = {
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
};

const resetToDefaults = () => {
  localSettings.value = { ...defaultSettings };
};

const applySettings = () => {
  emit("update:settings", { ...localSettings.value });
  isOpen.value = false;
};
</script>
