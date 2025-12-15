<template>
  <div class="flex flex-col items-center gap-2">
    <div class="relative w-32 h-32">
      <!-- Background circle -->
      <svg class="transform -rotate-90 w-32 h-32">
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="currentColor"
          stroke-width="8"
          fill="none"
          class="text-white/20"
        />
        <!-- Progress circle -->
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="currentColor"
          stroke-width="8"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          class="transition-all duration-500"
          :class="getStrokeColor()"
          stroke-linecap="round"
        />
      </svg>
      <!-- Percentage in center -->
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-3xl font-bold text-white">{{ strength }}%</span>
      </div>
    </div>
    <div class="text-sm font-medium text-white/90">
      {{ getStrengthLabel() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  strength: number;
}>();

const circumference = 2 * Math.PI * 56;

const dashOffset = computed(() => {
  return circumference - (props.strength / 100) * circumference;
});

const getStrokeColor = () => {
  if (props.strength >= 80) return "text-green-400";
  if (props.strength >= 60) return "text-blue-400";
  if (props.strength >= 40) return "text-yellow-400";
  return "text-red-400";
};

const getStrengthLabel = () => {
  if (props.strength >= 80) return "Very Strong";
  if (props.strength >= 60) return "Strong";
  if (props.strength >= 40) return "Moderate";
  return "Weak";
};
</script>
