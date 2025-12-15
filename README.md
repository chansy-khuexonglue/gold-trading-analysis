# 📈 Gold Trading Analysis

A professional real-time gold trading analysis tool built with Nuxt 4 and Vue 3, featuring advanced technical indicators, automated trading signals, and interactive charts.

![Gold Trading Analysis](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)

## ✨ Features

### 📊 Real-Time Analysis

- **Live Price Tracking**: Real-time gold price simulation with dynamic updates
- **Price History**: Comprehensive candlestick data with OHLC (Open, High, Low, Close) values
- **Volume Analysis**: Trading volume tracking and visualization

### 🎯 Technical Indicators

#### Moving Averages

- **SMA (Simple Moving Average)**: Customizable short (20) and long (50) periods
- **EMA (Exponential Moving Average)**: Fast (12) and slow (26) periods
- **Golden/Death Cross Detection**: Automatic trend reversal identification

#### Momentum Indicators

- **RSI (Relative Strength Index)**: 14-period RSI with overbought/oversold levels
- **MACD (Moving Average Convergence Divergence)**: Complete MACD line, signal line, and histogram
- **Custom Period Settings**: Adjustable parameters for all indicators

#### Volatility Indicators

- **Bollinger Bands**: Upper, middle, and lower bands with customizable standard deviation
- **Band Width Analysis**: Volatility measurement and breakout detection

### 🚦 Trading Signals

- **Automated Signal Generation**: BUY, SELL, or HOLD recommendations
- **Multi-Indicator Analysis**: Combines multiple indicators for higher accuracy
- **Signal Strength Meter**: Visual confidence level (0-100%)
- **Detailed Reasoning**: Explanation of each signal based on indicator consensus

### 📈 Interactive Charts

Built with ECharts for high-performance visualization:

- **Candlestick Chart**: OHLC data with moving average overlays
- **RSI Chart**: Real-time RSI with overbought/oversold zones
- **MACD Chart**: MACD line, signal line, and histogram
- **Volume Chart**: Trading volume with gradient visualization
- **Responsive Design**: Fully responsive charts with zoom and pan capabilities

### ⚙️ Customizable Settings

- **Update Interval**: Control simulation speed (500ms - 10s)
- **Candle Period**: Switch between different timeframes (1m, 5m, 15m, 1h, 4h, 1d)
- **Indicator Parameters**: Fine-tune all technical indicator settings
- **Price Simulation**: Adjust base price and volatility levels

### 🎨 Modern UI/UX

- **Dark Theme Only**: Sleek dark mode interface optimized for trading
- **Glassmorphic Design**: Modern backdrop blur effects
- **Responsive Layout**: Mobile-first design that works on all devices
- **Real-time Updates**: Smooth animations and transitions
- **Quick Reference Guide**: Built-in educational resources

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or higher
- npm, pnpm, or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd trading
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) - The Intuitive Vue Framework
- **UI Library**: [Nuxt UI v4](https://ui.nuxt.com/) - Beautiful and accessible UI components
- **Charts**: [Apache ECharts](https://echarts.apache.org/) - Powerful charting library
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS (via Nuxt UI)
- **Icons**:
  - [Lucide Icons](https://lucide.dev/)
  - [Simple Icons](https://simpleicons.org/)
  - [Streamline Icons](https://streamlinehq.com/)

## 📁 Project Structure

```
trading/
├── app/
│   ├── components/          # Vue components
│   │   ├── DonateModal.vue
│   │   ├── GoldAnalysisFooter.vue
│   │   ├── GoldAnalysisHeader.vue
│   │   ├── IndicatorRow.vue
│   │   ├── QuickReferenceGuide.vue
│   │   ├── StrengthMeter.vue
│   │   └── TradingSettings.vue
│   ├── composables/         # Vue composables
│   │   └── useGoldAnalysis.ts
│   ├── pages/               # Application pages
│   │   └── index.vue
│   ├── types/               # TypeScript type definitions
│   │   └── trading.ts
│   ├── assets/              # Static assets
│   │   └── css/
│   └── app.vue              # Root component
├── public/                  # Public static files
│   └── logo.png
├── nuxt.config.ts          # Nuxt configuration
├── package.json            # Dependencies
└── README.md              # This file
```

## 🔧 Configuration

### Nuxt Config

The application uses a custom Nuxt configuration with:

- Dark mode forced as default
- Client-side rendering (SSR disabled)
- ESLint integration with custom rules
- Prerendering for the home page

### Environment Variables

No environment variables are required for basic usage. The application simulates gold price data locally.

## 📚 Technical Indicators Explained

### RSI (Relative Strength Index)

- **Range**: 0-100
- **Oversold**: Below 30 (potential BUY signal)
- **Overbought**: Above 70 (potential SELL signal)
- **Calculation**: Based on average gains vs. average losses over 14 periods

### MACD

- **Components**: MACD Line, Signal Line, Histogram
- **Bullish Signal**: MACD crosses above Signal line
- **Bearish Signal**: MACD crosses below Signal line
- **Default Settings**: 12/26/9 periods

### Bollinger Bands

- **Components**: Upper Band, Middle Band (SMA), Lower Band
- **Buy Signal**: Price touches or crosses below lower band
- **Sell Signal**: Price touches or crosses above upper band
- **Settings**: 20-period SMA with 2 standard deviations

### Moving Averages

- **Golden Cross**: Short-term MA crosses above long-term MA (bullish)
- **Death Cross**: Short-term MA crosses below long-term MA (bearish)
- **Default Periods**: SMA 20/50, EMA 12/26

## 🎓 How Trading Signals Work

The application generates trading signals by analyzing multiple indicators:

1. **Signal Generation**:

   - Each indicator contributes a vote (BUY, SELL, or HOLD)
   - Votes are weighted based on indicator reliability
   - Consensus determines the final signal

2. **Strength Calculation**:

   - **80-100%**: Very Strong (4+ indicators agree)
   - **60-79%**: Strong (3 indicators agree)
   - **40-59%**: Moderate (2 indicators agree)
   - **0-39%**: Weak (mixed signals)

3. **Signal Display**:
   - Color-coded cards (Green=BUY, Red=SELL, Blue=HOLD)
   - Detailed reasoning showing which indicators support the signal
   - Real-time updates as market conditions change

## 🎯 Usage Tips

1. **Start the Analysis**: Click "Start Analysis" to begin price simulation
2. **Review Indicators**: Monitor the technical indicators in real-time
3. **Check Signals**: Watch for BUY/SELL signals with high strength (>70%)
4. **Adjust Settings**: Fine-tune indicator parameters in the Settings panel
5. **Learn**: Use the Quick Reference Guide to understand each indicator

## ⚠️ Disclaimer

**This is a simulation tool for educational purposes only.**

- Not financial advice
- Uses simulated price data
- Always do your own research (DYOR)
- Consult a licensed financial advisor before making trading decisions
- Past performance does not guarantee future results

## 💝 Support the Project

If you find this project helpful, consider supporting its development:

- **Bitcoin (BTC)**: `1MsJWxmvncNHwRQdw15TXBxJMyNP4QYk1Q`
- **Ethereum (ETH)**: `0x3a77b0935ef1a95f22233464fef48bfe00cfa645`
- **USDT (TRC20)**: `TBHzUPxySLm6DjnFMJrNNFdokzGw9z7LWx`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions, suggestions, or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with [Nuxt](https://nuxt.com/) and [Vue](https://vuejs.org/)
- UI components from [Nuxt UI](https://ui.nuxt.com/)
- Charts powered by [Apache ECharts](https://echarts.apache.org/)
- Icons from [Lucide](https://lucide.dev/), [Simple Icons](https://simpleicons.org/), and [Streamline](https://streamlinehq.com/)

---

**Made with ❤️ for traders and developers**
