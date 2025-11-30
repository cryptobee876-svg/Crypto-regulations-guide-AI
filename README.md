# Automind's Crypto Regulations Guide (CRG)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-orange)

A high-end, AI-powered regulatory intelligence platform designed for Web3 founders, legal teams, and institutional investors.

## 🚀 Features

### 1. **AI Compliance Engine (CRG AI)**
- **Powered by Gemini 2.5 Flash**: Delivers low-latency, high-accuracy responses.
- **Search Grounding**: Responses are verified against real-time Google Search data.
- **Context-Aware**: Adjusts analysis based on Global vs. Country-specific contexts.

### 2. **Jurisdiction Context Mode**
- **Country Selector**: Visual grid to select specific jurisdictions.
- **Scoped Analysis**: Focuses exclusively on local laws (VARA, MAS, SEC) when a country is selected.

### 3. **Live Market Data Widget**
- **Real-Time Prices**: Fetches Top 100 cryptocurrencies via CoinGecko API.
- **Auto-Refresh**: Updates every 30 seconds.

## 🛠️ Deployment on Vercel

1. **Push to GitHub**: Commit all files including `package.json` and `vite.config.ts`.
2. **Import Project**: In Vercel, import your repository.
3. **Framework Preset**: Select **Vite**.
4. **Environment Variables**:
   - Go to **Project Settings > Environment Variables**.
   - Add Key: `VITE_API_KEY`
   - Add Value: `Your_Google_Gemini_API_Key`
5. **Deploy**: Click Deploy.

## 📦 Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file in the root:
   ```env
   VITE_API_KEY=your_google_gemini_api_key_here
   ```

3. **Run**
   ```bash
   npm run dev
   ```

## 🔒 Privacy & Disclaimer

This tool is for informational purposes only. Always verify critical compliance decisions with certified legal counsel.

**Automind AI Agency** © 2025