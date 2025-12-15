<template>
  <UModal v-model:open="isOpen">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-heart"
          class="w-5 h-5 text-red-500 animate-pulse"
        />
        <span class="font-semibold">Support This Project</span>
      </div>
    </template>

    <template #body>
      <div class="space-y-6">
        <!-- Thank You Message -->
        <div class="text-center">
          <h3 class="text-xl font-bold mb-2">Thank You! ❤️</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Your support helps keep this project free and open-source for
            everyone.
          </p>
        </div>

        <!-- Crypto Donations -->
        <div>
          <h4 class="font-semibold mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-coins" class="w-4 h-4 text-yellow-500" />
            Crypto Donations
          </h4>

          <div class="space-y-4">
            <!-- Bitcoin -->
            <div
              class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center"
                  >
                    <span class="text-white font-bold text-sm">₿</span>
                  </div>
                  <span class="font-semibold">Bitcoin (BTC)</span>
                </div>
                <UButton
                  @click="copyToClipboard(btcAddress)"
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-copy"
                  size="xs"
                >
                  Copy
                </UButton>
              </div>
              <code class="text-xs break-all text-gray-600 dark:text-gray-400">
                {{ btcAddress }}
              </code>
            </div>

            <!-- Ethereum -->
            <div
              class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
                  >
                    <span class="text-white font-bold text-sm">Ξ</span>
                  </div>
                  <span class="font-semibold">Ethereum (ETH)</span>
                </div>
                <UButton
                  @click="copyToClipboard(ethAddress)"
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-copy"
                  size="xs"
                >
                  Copy
                </UButton>
              </div>
              <code class="text-xs break-all text-gray-600 dark:text-gray-400">
                {{ ethAddress }}
              </code>
            </div>

            <!-- USDT (Tether) -->
            <div
              class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <span class="text-white font-bold text-xs">USDT</span>
                  </div>
                  <span class="font-semibold">Tether (USDT TRC20)</span>
                </div>
                <UButton
                  @click="copyToClipboard(usdtAddress)"
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-copy"
                  size="xs"
                >
                  Copy
                </UButton>
              </div>
              <code class="text-xs break-all text-gray-600 dark:text-gray-400">
                {{ usdtAddress }}
              </code>
            </div>
          </div>
        </div>

        <div class="h-1 w-full bg-gray-200 dark:bg-gray-700"></div>
        <!-- Additional Support -->
        <div>
          <h4 class="font-semibold mb-3 flex items-center gap-2">
            <UIcon name="i-lucide-gift" class="w-4 h-4 text-purple-500" />
            Other Ways to Support
          </h4>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-start gap-2">
              <UIcon
                name="i-lucide-star"
                class="w-4 h-4 mt-0.5 text-yellow-500"
              />
              <span>Star the project on GitHub</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon
                name="i-lucide-share-2"
                class="w-4 h-4 mt-0.5 text-blue-500"
              />
              <span>Share with friends and colleagues</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon
                name="i-lucide-message-circle"
                class="w-4 h-4 mt-0.5 text-green-500"
              />
              <span>Provide feedback and suggestions</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-bug" class="w-4 h-4 mt-0.5 text-red-500" />
              <span>Report bugs and issues</span>
            </li>
          </ul>
        </div>

        <!-- Success Message -->
        <div
          v-if="showCopySuccess"
          class="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-400 text-sm flex items-center gap-2"
        >
          <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
          <span>Address copied to clipboard!</span>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton color="primary" @click="isOpen = false"> Close </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Placeholder addresses - Replace with your actual crypto addresses
const btcAddress = ref("1MsJWxmvncNHwRQdw15TXBxJMyNP4QYk1Q");
const ethAddress = ref("0x3a77b0935ef1a95f22233464fef48bfe00cfa645");
const usdtAddress = ref("TBHzUPxySLm6DjnFMJrNNFdokzGw9z7LWx");

const showCopySuccess = ref(false);

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    showCopySuccess.value = true;
    setTimeout(() => {
      showCopySuccess.value = false;
    }, 3000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};
</script>
