<script setup>
// SEO Configuration
useHead({
  title: "Gold Trading Analysis - Real-time Technical Indicators & Signals",
  meta: [
    {
      name: "description",
      content:
        "Professional gold trading analysis tool with real-time technical indicators, automated buy/sell signals, and interactive charts. Includes RSI, MACD, Bollinger Bands, and Moving Averages.",
    },
    {
      name: "keywords",
      content:
        "gold trading, technical analysis, trading signals, RSI, MACD, Bollinger Bands, moving averages, candlestick charts, gold price analysis, trading indicators",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Gold Trading Analysis - Real-time Technical Indicators",
    },
    {
      property: "og:description",
      content:
        "Analyze gold prices with professional technical indicators, automated signals, and interactive charts. Get real-time RSI, MACD, and more.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://yoursite.com/gold-analysis" },
    {
      property: "og:image",
      content: "https://yoursite.com/og-gold-analysis.png",
    },
    { property: "og:site_name", content: "Gold Trading Analysis" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Gold Trading Analysis - Real-time Indicators",
    },
    {
      name: "twitter:description",
      content:
        "Professional gold trading analysis with RSI, MACD, Bollinger Bands, and automated trading signals.",
    },
    {
      name: "twitter:image",
      content: "https://yoursite.com/twitter-gold-analysis.png",
    },
    // Additional SEO
    { name: "author", content: "Gold Trading Analysis" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "English" },
    { name: "revisit-after", content: "7 days" },
  ],
  link: [{ rel: "canonical", href: "https://yoursite.com/gold-analysis" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Gold Trading Analysis",
        description:
          "Professional gold trading analysis tool with real-time technical indicators and automated signals",
        applicationCategory: "FinanceApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Real-time price analysis",
          "Technical indicators (RSI, MACD, Bollinger Bands)",
          "Automated trading signals",
          "Interactive candlestick charts",
          "Customizable settings",
        ],
        screenshot: "https://yoursite.com/screenshot.png",
      }),
    },
  ],
});
</script>

<template>
  <UApp>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
