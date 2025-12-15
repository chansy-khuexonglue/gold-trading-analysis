<template>
  <footer
    class="mt-16 border-t border-gray-700 bg-gray-900/50 backdrop-blur-lg"
  >
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <UIcon
              name="i-lucide-trending-up"
              class="w-6 h-6 text-yellow-500"
            />
            <span class="font-bold text-lg text-white">Gold Trader</span>
          </div>
          <p class="text-sm text-gray-400 mb-4">
            Professional gold trading analysis tool with real-time technical
            indicators and automated signals.
          </p>
          <div class="flex gap-2">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-github"
              size="sm"
              to="https://github.com"
              target="_blank"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-twitter"
              size="sm"
              to="https://twitter.com"
              target="_blank"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-linkedin"
              size="sm"
              to="https://linkedin.com"
              target="_blank"
            />
          </div>
        </div>

        <!-- Features -->
        <div>
          <h4 class="font-semibold text-white mb-4">Features</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500" />
              <span>Real-time Analysis</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500" />
              <span>Trading Signals</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500" />
              <span>Technical Indicators</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500" />
              <span>Customizable Settings</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500" />
              <span>Interactive Charts</span>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="font-semibold text-white mb-4">Resources</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="#"
                class="hover:text-yellow-500 transition-colors flex items-center gap-2"
              >
                <UIcon name="i-lucide-book-open" class="w-4 h-4" />
                <span>Documentation</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-yellow-500 transition-colors flex items-center gap-2"
              >
                <UIcon name="i-lucide-lightbulb" class="w-4 h-4" />
                <span>Trading Guide</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-yellow-500 transition-colors flex items-center gap-2"
              >
                <UIcon name="i-lucide-help-circle" class="w-4 h-4" />
                <span>FAQ</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-yellow-500 transition-colors flex items-center gap-2"
              >
                <UIcon name="i-lucide-mail" class="w-4 h-4" />
                <span>Contact</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                @click.prevent="$emit('donate')"
                class="hover:text-yellow-500 transition-colors flex items-center gap-2"
              >
                <UIcon name="i-lucide-heart" class="w-4 h-4 text-red-500" />
                <span>Donate</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Tech Stack -->
        <div>
          <h4 class="font-semibold text-white mb-4">Built With</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-code" class="w-4 h-4 text-blue-500" />
              <span>Nuxt 4</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-palette" class="w-4 h-4 text-purple-500" />
              <span>Nuxt UI</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon
                name="i-lucide-bar-chart-2"
                class="w-4 h-4 text-green-500"
              />
              <span>ECharts</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-code-2" class="w-4 h-4 text-yellow-500" />
              <span>TypeScript</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-zap" class="w-4 h-4 text-orange-500" />
              <span>Vue 3</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-8 border-t border-gray-700">
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div class="text-sm text-gray-400">
            <p>
              © {{ new Date().getFullYear() }} Gold Trading Analysis. All rights
              reserved.
            </p>
          </div>
          <div class="flex items-center gap-4 text-sm text-gray-400">
            <a href="#" class="hover:text-yellow-500 transition-colors"
              >Privacy Policy</a
            >
            <span>•</span>
            <a href="#" class="hover:text-yellow-500 transition-colors"
              >Terms of Service</a
            >
            <span>•</span>
            <a href="#" class="hover:text-yellow-500 transition-colors"
              >Disclaimer</a
            >
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="mt-4 p-3 rounded-lg bg-red-900/20 border border-red-500/30">
          <p class="text-xs text-red-400 flex items-start gap-2">
            <UIcon
              name="i-lucide-alert-triangle"
              class="w-4 h-4 flex-shrink-0 mt-0.5"
            />
            <span>
              <strong>Risk Warning:</strong> Trading gold and financial
              instruments involves substantial risk. This tool is for
              educational purposes only and should not be considered financial
              advice. Always conduct your own research and consult with a
              licensed financial advisor.
            </span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineEmits<{
  donate: [];
}>();
</script>
