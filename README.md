# Automind's Crypto Regulations Guide (CRG)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-orange)

A high-end, AI-powered regulatory intelligence platform designed for Web3 founders, legal teams, and institutional investors. 

This application provides real-time access to global crypto regulations, jurisdiction-specific compliance frameworks, and live market data, all wrapped in an enterprise-grade "Dark Mode" aesthetic.

## 🚀 Features

### 1. **AI Compliance Engine (CRG AI)**
- **Powered by Gemini 2.5 Flash**: Delivers low-latency, high-accuracy responses.
- **Search Grounding**: Responses are verified against real-time Google Search data to ensure regulatory information is current (e.g., MiCA updates, SEC rulings).
- **Context-Aware**: Automatically adjusts system instructions based on whether the user is querying global trends or specific country laws.

### 2. **Jurisdiction Context Mode**
- **Country Selector**: Visual grid to select specific jurisdictions (e.g., UAE, Singapore, USA).
- **Scoped Analysis**: Once a country is selected, the AI focuses exclusively on local laws, licensing (VARA, MAS, SEC), and tax implications for that region.

### 3. **Live Market Data Widget**
- **Real-Time Prices**: Fetches data from CoinGecko for the Top 100 cryptocurrencies.
- **Auto-Refresh**: Updates market data every 30 seconds.
- **Smart Filtering**: Search and filter coins without losing the live data stream.

### 4. **Enterprise UI/UX**
- **Glassmorphism Design**: Modern, translucent layers with neon accents.
- **Responsive**: Fully optimized for desktop and mobile workflows.
- **Markdown Support**: Renders complex regulatory text with proper formatting and citation links.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (Dark Mode, Custom Animations)
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Icons**: Lucide React
- **Data Source**: CoinGecko API (Market Data)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/cryptobee876-svg/crypto-regulations-guide.git
   cd crypto-regulations-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   API_KEY=your_google_gemini_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🔒 Privacy & Disclaimer

This tool is for informational purposes only. While it utilizes advanced AI and real-time grounding, regulatory frameworks change rapidly. Always verify critical compliance decisions with certified legal counsel.

---

**Automind AI Agency** © 2025
