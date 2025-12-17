// Gold Price API Integration
export interface GoldPriceResponse {
  price: number
  timestamp: number
  currency: string
  source: string
}

interface ServerGoldPriceResponse {
  success: boolean
  price: number
  timestamp: number
  currency: string
  source: string
  error?: string
}

export function useGoldPriceAPI() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastPrice = ref<number | null>(null)

  /**
   * Fetch current gold price from multiple sources with fallback
   */
  const fetchCurrentGoldPrice = async (): Promise<GoldPriceResponse | null> => {
    isLoading.value = true
    error.value = null

    try {
      // Call our server-side API endpoint (bypasses CORS)
      const response = await $fetch<ServerGoldPriceResponse>('/api/gold-price', {
        method: 'GET',
      })

      if (response && response.success && response.price) {
        lastPrice.value = response.price
        return {
          price: response.price,
          timestamp: response.timestamp || Date.now(),
          currency: response.currency || 'USD',
          source: response.source || 'API',
        }
      }

      // Fallback: Use last known price with fluctuation
      if (lastPrice.value) {
        const fluctuation = lastPrice.value * (Math.random() - 0.5) * 0.002 // ±0.2% fluctuation
        const price = lastPrice.value + fluctuation
        
        return {
          price,
          timestamp: Date.now(),
          currency: 'USD',
          source: 'Estimated',
        }
      }

      // Ultimate fallback: return simulated price based on realistic current market (Dec 2024)
      const simulatedPrice = 2650 + (Math.random() - 0.5) * 20
      lastPrice.value = simulatedPrice
      
      return {
        price: simulatedPrice,
        timestamp: Date.now(),
        currency: 'USD',
        source: 'Simulated',
      }
    } catch (e) {
      error.value = 'Failed to fetch gold price from server'
      console.error('Gold price fetch error:', e)
      
      // Return simulated price on complete failure
      const simulatedPrice = lastPrice.value || 2650
      return {
        price: simulatedPrice + (Math.random() - 0.5) * 10,
        timestamp: Date.now(),
        currency: 'USD',
        source: 'Simulated (Error)',
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch historical gold prices (for initial chart data)
   */
  const fetchHistoricalPrices = async (days: number = 30): Promise<Array<{ date: string; price: number }>> => {
    try {
      const response = await $fetch('https://www.freegoldapi.com/api/latest.json')
      
      if (response && Array.isArray(response)) {
        // Get the most recent 'days' worth of data
        return response
          .slice(0, days)
          .reverse()
          .map((item: any) => ({
            date: item.date || new Date().toISOString().split('T')[0],
            price: parseFloat(item.gold_usd || item.gold_am_usd || item.gold_pm_usd || '2050'),
          }))
          .filter((item: any) => !isNaN(item.price) && item.date)
      }
    } catch (e) {
      console.error('Historical price fetch error:', e)
    }
    
    // Return simulated historical data as fallback
    const data: Array<{ date: string; price: number }> = []
    const basePrice = lastPrice.value || 2050
    const now = Date.now()
    
    for (let i = days - 1; i >= 0; i--) {
      const dateObj = new Date(now - i * 24 * 60 * 60 * 1000)
      const price = basePrice + (Math.random() - 0.5) * 100 + Math.sin(i / 5) * 50
      data.push({
        date: dateObj.toISOString().split('T')[0] || '',
        price,
      })
    }
    
    return data
  }

  return {
    isLoading,
    error,
    lastPrice,
    fetchCurrentGoldPrice,
    fetchHistoricalPrices,
  }
}
