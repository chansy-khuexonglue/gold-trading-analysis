<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-info" class="w-5 h-5 text-blue-500" />
          <span class="font-semibold">Quick Reference Guide</span>
        </div>
        <UButton
          @click="isOpen = !isOpen"
          variant="ghost"
          :icon="isOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
          size="sm"
        />
      </div>
    </template>

    <div v-show="isOpen" class="space-y-4">
      <!-- Trading Signals -->
      <div>
        <h4 class="font-semibold text-sm mb-2 flex items-center gap-2">
          <UIcon name="i-lucide-signal" class="w-4 h-4 text-green-500" />
          Trading Signals
        </h4>
        <div class="space-y-2 text-sm">
          <div class="flex items-start gap-2">
            <UBadge color="success" size="xs" class="mt-0.5">BUY</UBadge>
            <span class="text-gray-600 dark:text-gray-400"
              >Multiple indicators suggest oversold conditions or bullish
              trend</span
            >
          </div>
          <div class="flex items-start gap-2">
            <UBadge color="error" size="xs" class="mt-0.5">SELL</UBadge>
            <span class="text-gray-600 dark:text-gray-400"
              >Multiple indicators suggest overbought conditions or bearish
              trend</span
            >
          </div>
          <div class="flex items-start gap-2">
            <UBadge color="info" size="xs" class="mt-0.5">HOLD</UBadge>
            <span class="text-gray-600 dark:text-gray-400"
              >Mixed signals - wait for clearer trend confirmation</span
            >
          </div>
        </div>
      </div>

      <div class="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>

      <!-- Signal Strength -->
      <div>
        <h4 class="font-semibold text-sm mb-2 flex items-center gap-2">
          <UIcon name="i-lucide-gauge" class="w-4 h-4 text-purple-500" />
          Signal Strength
        </h4>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="text-gray-600 dark:text-gray-400"
              >80-100%: Very Strong</span
            >
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <span class="text-gray-600 dark:text-gray-400">60-79%: Strong</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span class="text-gray-600 dark:text-gray-400"
              >40-59%: Moderate</span
            >
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <span class="text-gray-600 dark:text-gray-400">0-39%: Weak</span>
          </div>
        </div>
      </div>

      <!-- Key Indicators -->
      <div>
        <h4 class="font-semibold text-sm mb-2 flex items-center gap-2">
          <UIcon name="i-lucide-chart-line" class="w-4 h-4 text-yellow-500" />
          Key Indicators
        </h4>
        <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <span class="font-medium text-gray-900 dark:text-gray-100"
              >RSI:</span
            >
            &lt;30 = Oversold (Buy), &gt;70 = Overbought (Sell)
          </div>
          <div>
            <span class="font-medium text-gray-900 dark:text-gray-100"
              >MACD:</span
            >
            Line above Signal = Bullish, Below = Bearish
          </div>
          <div>
            <span class="font-medium text-gray-900 dark:text-gray-100"
              >Bollinger:</span
            >
            Price at Lower Band = Buy, Upper Band = Sell
          </div>
          <div>
            <span class="font-medium text-gray-900 dark:text-gray-100"
              >MA Cross:</span
            >
            Golden Cross (SMA20&gt;SMA50) = Bullish
          </div>
        </div>
      </div>

      <div class="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>

      <!-- Risk Warning -->
      <div
        class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3"
      >
        <div class="flex items-start gap-2">
          <UIcon
            name="i-lucide-alert-triangle"
            class="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5"
          />
          <div class="text-xs text-yellow-800 dark:text-yellow-200">
            <strong>Disclaimer:</strong> This is a simulation tool for
            educational purposes only. Not financial advice. Always do your own
            research and consult a financial advisor before trading.
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(true);
</script>
