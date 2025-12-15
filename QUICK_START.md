# Quick Start Guide - Gold Trading Analysis Tool

## 🚀 Get Started in 3 Steps

### Step 1: Access the Page

Open your browser and navigate to:

```
http://localhost:3000/gold-analysis
```

### Step 2: Start the Simulation

Click the **green "Start Analysis"** button in the top right corner.

### Step 3: Watch the Analysis

- Price updates every 3 seconds
- Charts automatically refresh
- Trading signals generate in real-time

## 📊 Understanding the Dashboard

### Current Price Card (Yellow)

- Shows live gold price
- Green = price increasing
- Red = price decreasing

### Trading Signal Card (Color-coded)

- **Green Background** = **BUY** signal
- **Red Background** = **SELL** signal
- **Blue Background** = **HOLD** signal
- Circular meter shows signal strength (0-100%)
- Bullet points explain why the signal was generated

### Technical Indicators (3 Cards)

**Card 1: Moving Averages**

- SMA 20 & 50: Trend indicators
- EMA 12 & 26: Short-term trends

**Card 2: Momentum**

- RSI: Shows overbought/oversold
  - < 30 = Oversold (potential buy)
  - > 70 = Overbought (potential sell)
- MACD: Trend momentum

**Card 3: Bollinger Bands**

- Shows volatility range
- Price at lower band = buy opportunity
- Price at upper band = sell opportunity

### Interactive Charts (4 Charts)

**1. Price Chart (Top Left)**

- Yellow line = Current price
- Blue line = SMA 20
- Green line = SMA 50

**2. RSI Chart (Top Right)**

- Purple line shows RSI value
- Red zone (70+) = Overbought
- Green zone (30-) = Oversold

**3. MACD Chart (Bottom Left)**

- Blue line = MACD
- Orange line = Signal
- Bars = Histogram

**4. Volume Chart (Bottom Right)**

- Green bars show trading volume

## 🎯 How to Trade Based on Signals

### Strong BUY Signal (Strength 70%+)

✅ Multiple indicators confirm oversold conditions

- Consider entering a long position
- Set stop-loss below recent support
- Wait for confirmation on next candle

### Strong SELL Signal (Strength 70%+)

❌ Multiple indicators confirm overbought conditions

- Consider exiting long positions
- Consider entering short position
- Set stop-loss above recent resistance

### HOLD Signal (Strength below 70%)

⏸️ Mixed or weak signals

- Don't enter new positions
- Hold existing positions
- Wait for stronger confirmation

## 🔧 Chart Controls

All charts have interactive toolbars:

- **Zoom**: Click and drag on chart area
- **Pan**: Use pan tool in toolbar
- **Reset View**: Click home icon
- **Download**: Click download icon for chart image

## ⚡ Tips for Best Results

1. **Let it run**: Wait 30-60 seconds for enough data to accumulate
2. **Watch for convergence**: Best signals when multiple indicators agree
3. **Check strength**: Only act on signals with 70%+ strength
4. **Use stop-losses**: Always protect your positions
5. **Don't overtrade**: Wait for clear, strong signals

## 📖 Quick Reference

### Signal Scoring Breakdown

- RSI Analysis: 25 points
- MA Crossover: 20 points
- MACD Crossover: 20 points
- Bollinger Bands: 15 points
- EMA Trend: 10 points

**Total possible**: 90 points
**BUY threshold**: 30+ points (combined)
**SELL threshold**: -30 points (combined)

### Color Legend

- 🟢 Green = Bullish/Buy/Positive
- 🔴 Red = Bearish/Sell/Negative
- 🔵 Blue = Neutral/Hold
- 🟡 Yellow/Gold = Price display
- 🟣 Purple = RSI indicator
- 🟠 Orange = Signal lines

## ⚠️ Important Reminders

⚠️ **This is a SIMULATION for educational purposes**

- Not real market data
- Not financial advice
- Practice tool only

⚠️ **Before real trading**:

- Do your own research
- Consult a financial advisor
- Understand the risks
- Use proper position sizing
- Always use stop-losses

## 🛑 Stopping the Simulation

Click the **red "Stop"** button in the top right to pause the price updates.

## 🆘 Troubleshooting

**Charts not showing?**

- Refresh the page
- Check browser console for errors
- Make sure dev server is running

**Prices not updating?**

- Click "Start Analysis" button
- Check if page is in focus (not minimized)

**Indicators showing dashes (-)?**

- Not enough data yet (need 50+ candles for all indicators)
- Let the simulation run longer

## 📚 Learn More

For detailed documentation, see:

- `GOLD_ANALYSIS_README.md` - Full feature documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical details

---

**Ready to start?** Go to `http://localhost:3000/gold-analysis` and click "Start Analysis"! 🚀
