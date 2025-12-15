// Gold Price Analysis Composables and Trading Strategies
export interface PriceData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface TechnicalIndicators {
  smaShort: number | null
  smaLong: number | null
  emaFast: number | null
  emaSlow: number | null
  rsi: number | null
  macd: number | null
  macdSignal: number | null
  macdHistogram: number | null
  bollingerUpper: number | null
  bollingerMiddle: number | null
  bollingerLower: number | null
}

export interface TradeSignal {
  type: 'BUY' | 'SELL' | 'HOLD'
  strength: number // 0-100
  reason: string[]
  price: number
  timestamp: number
}

export interface AnalysisSettings {
  updateInterval: number
  candlePeriod: string
  smaShort: number
  smaLong: number
  emaFast: number
  emaSlow: number
  rsiPeriod: number
  rsiOverbought: number
  rsiOversold: number
  macdFast: number
  macdSlow: number
  macdSignal: number
  bollingerPeriod: number
  bollingerStdDev: number
  basePrice: number
  volatility: number
}

export function useGoldAnalysis(settings: Ref<AnalysisSettings>) {
  const priceHistory = ref<PriceData[]>([])
  const currentPrice = ref(settings.value.basePrice)
  const isRunning = ref(false)
  let intervalId: ReturnType<typeof setInterval> | null = null

  // Watch for settings changes and restart if running
  watch(settings, () => {
    if (isRunning.value) {
      stopSimulation()
      startSimulation()
    }
  }, { deep: true })

  const generatePriceData = (count: number = 100): PriceData[] => {
    const data: PriceData[] = []
    let basePrice = settings.value.basePrice
    const now = Date.now()

    for (let i = 0; i < count; i++) {
      const volatilityRange = settings.value.basePrice * (settings.value.volatility / 100)
      const trend = Math.sin(i / 10) * (volatilityRange / 2)
      const noise = (Math.random() - 0.5) * volatilityRange

      const open = basePrice
      const close = basePrice + trend + noise
      const high = Math.max(open, close) + Math.random() * (volatilityRange / 5)
      const low = Math.min(open, close) - Math.random() * (volatilityRange / 5)
      const volume = 1000000 + Math.random() * 500000

      data.push({
        timestamp: now - (count - i) * 60000,
        open,
        high,
        low,
        close,
        volume,
      })

      basePrice = close
    }

    return data
  }

  const calculateSMA = (data: number[], period: number): number | null => {
    if (data.length < period) return null
    const sum = data.slice(-period).reduce((a, b) => a + b, 0)
    return sum / period
  }

  const calculateEMA = (data: number[], period: number): number | null => {
    if (data.length < period) return null
    const multiplier = 2 / (period + 1)
    let ema = data.slice(0, period).reduce((a, b) => a + b, 0) / period

    for (let i = period; i < data.length; i++) {
      ema = (data[i] - ema) * multiplier + ema
    }
    return ema
  }

  const calculateRSI = (data: number[], period: number): number | null => {
    if (data.length < period + 1) return null

    const changes = []
    for (let i = 1; i < data.length; i++) {
      changes.push(data[i] - data[i - 1])
    }

    const gains = changes.slice(-period).map(c => c > 0 ? c : 0)
    const losses = changes.slice(-period).map(c => c < 0 ? -c : 0)

    const avgGain = gains.reduce((a, b) => a + b, 0) / period
    const avgLoss = losses.reduce((a, b) => a + b, 0) / period

    if (avgLoss === 0) return 100
    const rs = avgGain / avgLoss
    return 100 - (100 / (1 + rs))
  }

  const calculateMACD = (data: number[], fast: number, slow: number, signal: number) => {
    const emaFast = calculateEMA(data, fast)
    const emaSlow = calculateEMA(data, slow)

    if (!emaFast || !emaSlow) return { macd: null, signal: null, histogram: null }

    const macd = emaFast - emaSlow

    const macdLine = []
    for (let i = slow; i <= data.length; i++) {
      const ef = calculateEMA(data.slice(0, i), fast)
      const es = calculateEMA(data.slice(0, i), slow)
      if (ef && es) macdLine.push(ef - es)
    }

    const signalLine = calculateEMA(macdLine, signal)
    const histogram = signalLine ? macd - signalLine : null

    return { macd, signal: signalLine, histogram }
  }

  const calculateBollingerBands = (data: number[], period: number, stdDev: number) => {
    if (data.length < period) return { upper: null, middle: null, lower: null }

    const sma = calculateSMA(data, period)
    if (!sma) return { upper: null, middle: null, lower: null }

    const slice = data.slice(-period)
    const variance = slice.reduce((sum, val) => sum + Math.pow(val - sma, 2), 0) / period
    const standardDeviation = Math.sqrt(variance)

    return {
      upper: sma + (standardDeviation * stdDev),
      middle: sma,
      lower: sma - (standardDeviation * stdDev),
    }
  }

  const calculateIndicators = (data: PriceData[]): TechnicalIndicators => {
    const closes = data.map(d => d.close)
    const s = settings.value

    const smaShort = calculateSMA(closes, s.smaShort)
    const smaLong = calculateSMA(closes, s.smaLong)
    const emaFast = calculateEMA(closes, s.emaFast)
    const emaSlow = calculateEMA(closes, s.emaSlow)
    const rsi = calculateRSI(closes, s.rsiPeriod)
    const macdData = calculateMACD(closes, s.macdFast, s.macdSlow, s.macdSignal)
    const bollinger = calculateBollingerBands(closes, s.bollingerPeriod, s.bollingerStdDev)

    return {
      smaShort,
      smaLong,
      emaFast,
      emaSlow,
      rsi,
      macd: macdData.macd,
      macdSignal: macdData.signal,
      macdHistogram: macdData.histogram,
      bollingerUpper: bollinger.upper,
      bollingerMiddle: bollinger.middle,
      bollingerLower: bollinger.lower,
    }
  }

  const generateTradeSignal = (data: PriceData[], indicators: TechnicalIndicators): TradeSignal => {
    const currentPrice = data[data.length - 1]?.close ?? 0
    const reasons: string[] = []
    let buyScore = 0
    let sellScore = 0
    const s = settings.value

    // RSI Analysis
    if (indicators.rsi !== null) {
      if (indicators.rsi < s.rsiOversold) {
        buyScore += 25
        reasons.push(`RSI oversold (${indicators.rsi.toFixed(2)})`)
      } else if (indicators.rsi > s.rsiOverbought) {
        sellScore += 25
        reasons.push(`RSI overbought (${indicators.rsi.toFixed(2)})`)
      }
    }

    // Moving Average Crossover
    if (indicators.smaShort !== null && indicators.smaLong !== null) {
      if (indicators.smaShort > indicators.smaLong && currentPrice > indicators.smaShort) {
        buyScore += 20
        reasons.push(`Golden cross - SMA${s.smaShort} above SMA${s.smaLong}`)
      } else if (indicators.smaShort < indicators.smaLong && currentPrice < indicators.smaShort) {
        sellScore += 20
        reasons.push(`Death cross - SMA${s.smaShort} below SMA${s.smaLong}`)
      }
    }

    // MACD Analysis
    if (indicators.macd !== null && indicators.macdSignal !== null) {
      if (indicators.macd > indicators.macdSignal && indicators.macd > 0) {
        buyScore += 20
        reasons.push('MACD bullish crossover')
      } else if (indicators.macd < indicators.macdSignal && indicators.macd < 0) {
        sellScore += 20
        reasons.push('MACD bearish crossover')
      }
    }

    // Bollinger Bands
    if (indicators.bollingerUpper !== null && indicators.bollingerLower !== null) {
      if (currentPrice <= indicators.bollingerLower) {
        buyScore += 15
        reasons.push('Price at lower Bollinger Band')
      } else if (currentPrice >= indicators.bollingerUpper) {
        sellScore += 15
        reasons.push('Price at upper Bollinger Band')
      }
    }

    // Trend Analysis
    if (indicators.emaFast !== null && indicators.emaSlow !== null) {
      if (indicators.emaFast > indicators.emaSlow) {
        buyScore += 10
        reasons.push('Short-term uptrend')
      } else {
        sellScore += 10
        reasons.push('Short-term downtrend')
      }
    }

    const netScore = buyScore - sellScore
    let type: 'BUY' | 'SELL' | 'HOLD' = 'HOLD'
    let strength = 50

    if (netScore > 30) {
      type = 'BUY'
      strength = Math.min(100, 50 + netScore)
    } else if (netScore < -30) {
      type = 'SELL'
      strength = Math.min(100, 50 + Math.abs(netScore))
    } else {
      reasons.push('Signals mixed - waiting for clearer trend')
    }

    return {
      type,
      strength,
      reason: reasons,
      price: currentPrice,
      timestamp: Date.now(),
    }
  }

  const startSimulation = () => {
    isRunning.value = true
    priceHistory.value = generatePriceData(100)
    currentPrice.value = priceHistory.value[priceHistory.value.length - 1]?.close ?? settings.value.basePrice

    if (intervalId) clearInterval(intervalId)

    intervalId = setInterval(() => {
      if (!isRunning.value) {
        if (intervalId) clearInterval(intervalId)
        return
      }

      const lastPrice = priceHistory.value[priceHistory.value.length - 1]?.close ?? settings.value.basePrice
      const volatilityRange = settings.value.basePrice * (settings.value.volatility / 100)
      const change = (Math.random() - 0.5) * volatilityRange

      const newData: PriceData = {
        timestamp: Date.now(),
        open: lastPrice,
        close: lastPrice + change,
        high: Math.max(lastPrice, lastPrice + change) + Math.random() * (volatilityRange / 10),
        low: Math.min(lastPrice, lastPrice + change) - Math.random() * (volatilityRange / 10),
        volume: 1000000 + Math.random() * 500000,
      }

      priceHistory.value.push(newData)
      if (priceHistory.value.length > 150) {
        priceHistory.value.shift()
      }

      currentPrice.value = newData.close
    }, settings.value.updateInterval)
  }

  const stopSimulation = () => {
    isRunning.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const indicators = computed(() => {
    if (priceHistory.value.length === 0) return null
    return calculateIndicators(priceHistory.value)
  })

  const currentSignal = computed(() => {
    if (priceHistory.value.length === 0 || !indicators.value) return null
    return generateTradeSignal(priceHistory.value, indicators.value)
  })

  const priceChange = computed(() => {
    if (priceHistory.value.length < 2) return { amount: 0, percentage: 0 }
    const current = priceHistory.value[priceHistory.value.length - 1]?.close ?? 0
    const previous = priceHistory.value[priceHistory.value.length - 2]?.close ?? 0
    const amount = current - previous
    const percentage = previous !== 0 ? (amount / previous) * 100 : 0
    return { amount, percentage }
  })

  return {
    priceHistory,
    currentPrice,
    isRunning,
    indicators,
    currentSignal,
    priceChange,
    startSimulation,
    stopSimulation,
  }
}
