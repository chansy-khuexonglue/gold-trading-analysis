<template>
  <div
    class="border-b border-gray-700 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-10"
  >
    <div class="container mx-auto px-4 py-3 md:py-4">
      <!-- Desktop Layout -->
      <div class="hidden md:flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" class="size-12" />
          <div>
            <h1 class="text-2xl font-bold text-white">Gold Trading Analysis</h1>
            <p class="text-sm text-gray-400">
              Real-time technical analysis & trading signals
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <UButton
            @click="$emit('donate')"
            color="warning"
            variant="soft"
            icon="i-lucide-heart"
            size="lg"
          >
            Donate
          </UButton>
          <UButton
            @click="$emit('settings')"
            color="neutral"
            variant="ghost"
            icon="i-lucide-settings"
            size="lg"
          >
            Settings
          </UButton>
          <UButton
            v-if="!isRunning"
            @click="$emit('start')"
            color="success"
            icon="i-lucide-play"
            size="lg"
          >
            Start Analysis
          </UButton>
          <UButton
            v-else
            @click="$emit('stop')"
            color="error"
            icon="i-lucide-pause"
            size="lg"
          >
            Stop
          </UButton>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="md:hidden">
        <!-- Title Row -->
        <div class="flex items-center gap-3 mb-3">
          <UIcon
            name="i-lucide-trending-up"
            class="w-6 h-6 text-yellow-500 flex-shrink-0"
          />
          <div class="min-w-0 flex-1">
            <h1 class="text-lg font-bold text-white truncate">
              Gold Trading Analysis
            </h1>
            <p class="text-xs text-gray-400 truncate">
              Real-time analysis & signals
            </p>
          </div>
        </div>

        <!-- Buttons Row -->
        <div class="flex gap-2 justify-between">
          <!-- Icon-only buttons for mobile -->
          <div class="flex gap-2">
            <UButton
              @click="$emit('donate')"
              color="warning"
              variant="soft"
              icon="i-lucide-heart"
              size="sm"
              square
            />
            <UButton
              @click="$emit('settings')"
              color="neutral"
              variant="ghost"
              icon="i-lucide-settings"
              size="sm"
              square
            />
          </div>

          <!-- Main action button with text -->
          <div class="flex">
            <UButton
              v-if="!isRunning"
              @click="$emit('start')"
              color="success"
              icon="i-lucide-play"
              size="sm"
              class="flex-1 max-w-[160px]"
            >
              Start
            </UButton>
            <UButton
              v-else
              @click="$emit('stop')"
              color="error"
              icon="i-lucide-pause"
              size="sm"
              class="flex-1 max-w-[160px]"
            >
              Stop
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isRunning: boolean;
}>();

defineEmits<{
  donate: [];
  settings: [];
  start: [];
  stop: [];
}>();
</script>
