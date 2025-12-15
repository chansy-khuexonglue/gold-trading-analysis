<template>
  <div
    class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
  >
    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{
      label
    }}</span>
    <div class="flex items-center gap-2">
      <span
        v-if="value !== null && value !== undefined"
        class="text-sm font-semibold"
        :class="getValueColor()"
      >
        {{ formatValue(value) }}
      </span>
      <span v-else class="text-sm text-gray-400">-</span>
      <div v-if="isRSI && value !== null" class="ml-2">
        <UBadge :color="getRSIBadgeColor()" variant="soft" size="xs">
          {{ getRSILabel() }}
        </UBadge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: number | null | undefined;
  isRSI?: boolean;
}>();

const formatValue = (val: number) => {
  if (props.isRSI) {
    return val.toFixed(2);
  }
  return `$${val.toFixed(2)}`;
};

const getValueColor = () => {
  if (!props.isRSI || props.value === null || props.value === undefined) {
    return "text-gray-900 dark:text-gray-100";
  }

  if (props.value > 70) return "text-red-600 dark:text-red-400";
  if (props.value < 30) return "text-green-600 dark:text-green-400";
  return "text-gray-900 dark:text-gray-100";
};

const getRSIBadgeColor = () => {
  if (props.value === null || props.value === undefined) return "neutral";
  if (props.value > 70) return "error";
  if (props.value < 30) return "success";
  return "info";
};

const getRSILabel = () => {
  if (props.value === null || props.value === undefined) return "N/A";
  if (props.value > 70) return "Overbought";
  if (props.value < 30) return "Oversold";
  return "Neutral";
};
</script>
