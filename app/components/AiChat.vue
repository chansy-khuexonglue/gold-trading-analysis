<template>
  <div>
    <!-- Floating Chat Button -->
    <UButton
      @click="showModal = true"
      color="primary"
      size="xl"
      icon="i-lucide-message-circle"
      class="fixed bottom-6 right-6 z-50 shadow-2xl hover:scale-110 transition-transform duration-200"
      aria-label="Chat with AI"
    >
      <span class="hidden sm:inline ml-2">Chat with AI</span>
    </UButton>

    <!-- Coming Soon Modal -->
    <UModal v-model:open="showModal" :ui="{ width: 'sm:max-w-md' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              Chat with AI
            </h3>
            <UButton
              @click="showModal = false"
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              size="sm"
              square
            />
          </div>
        </template>

       <template #content>
         <div class="text-center py-8">
          <!-- Icon -->
          <div class="mb-6 flex justify-center">
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center animate-pulse"
            >
              <UIcon name="i-lucide-sparkles" class="w-10 h-10 text-white" />
            </div>
          </div>

          <!-- Title -->
          <h2
            class="text-2xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent"
          >
            Coming Soon!
          </h2>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            We're building an AI-powered trading assistant to help you analyze
            markets, understand indicators, and make better trading decisions.
          </p>

          <!-- Features Preview -->
          <div class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-6">
            <p
              class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
            >
              What to expect:
            </p>
            <ul
              class="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-left"
            >
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-amber-500" />
                <span>Real-time market analysis</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-amber-500" />
                <span>Trading strategy recommendations</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-amber-500" />
                <span>Technical indicator explanations</span>
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-amber-500" />
                <span>Personalized risk management tips</span>
              </li>
            </ul>
          </div>

          <!-- Call to Action -->
          <p class="text-xs text-gray-500 dark:text-gray-500">
            Stay tuned for updates! 🚀
          </p>
        </div>
       </template>

        <template #footer>
          <div class="flex justify-center">
            <UButton
              @click="showModal = false"
              color="primary"
              size="lg"
              class="w-full sm:w-auto"
            >
              Got it!
            </UButton>
          </div>
        </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(false);
</script>
