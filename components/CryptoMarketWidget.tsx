import React, { useState, useEffect } from 'react';
import { X, Search, RefreshCw, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface CryptoMarketWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

const CryptoMarketWidget: React.FC<CryptoMarketWidgetProps> = ({ isOpen, onClose }) => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMarketData = async () => {
    // Only set loading true if it's the first load or manual refresh
    // We can check if coins are already there to decide if we want 'blocking' loading or 'background' loading
    // For now, setting loading to true just spins the icon if data exists, which is good.
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      );
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please wait a moment.");
        }
        throw new Error("Failed to fetch market data.");
      }

      const data = await response.json();
      setCoins(data);
      // We do NOT setFilteredCoins(data) here anymore.
      // We let the useEffect([coins, searchInput]) handle the filtering to preserve search state.
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Setup polling when widget is open
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isOpen) {
      // Fetch immediately on open
      fetchMarketData();

      // Poll every 30 seconds
      intervalId = setInterval(() => {
        fetchMarketData();
      }, 30000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isOpen]);

  // Handle filtering reactively when coins update or search input changes
  useEffect(() => {
    const term = searchInput.toLowerCase();
    const filtered = coins.filter(
      c => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term)
    );
    setFilteredCoins(filtered);
  }, [searchInput, coins]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: val < 1 ? 4 : 2,
      maximumFractionDigits: val < 1 ? 6 : 2,
    }).format(val);
  };

  const formatCompact = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
      style: 'currency',
      currency: 'USD'
    }).format(val);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Widget Container */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-[fadeIn_0.2s_ease-out]">
        
        {/* Glow Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 border-b border-slate-800/50 bg-slate-900/90 gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Market Data
            </h2>
            <p className="text-xs text-slate-500 mt-1">Top 100 Cryptocurrencies • Auto-refresh every 30s</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search coins..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Refresh */}
            <button 
              onClick={fetchMarketData}
              disabled={loading}
              className={`p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Refresh Data"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>

            {/* Close */}
            <button 
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-rose-500/10 hover:border-rose-500/50 border border-transparent transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-900/50 relative">
          
          {error && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/90 text-center p-6">
              <AlertCircle size={48} className="text-rose-500 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Unable to load market data</h3>
              <p className="text-slate-400 text-sm max-w-xs mb-6">{error}</p>
              <button 
                onClick={fetchMarketData}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950/80 sticky top-0 z-10 backdrop-blur-sm shadow-sm">
              <tr>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16 text-center">#</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Asset</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Price</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">24h Change</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right hidden md:table-cell">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading && coins.length === 0 ? (
                // Skeleton Loader (Only show if we have NO data)
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4"><div className="h-4 w-6 bg-slate-800 rounded mx-auto"></div></td>
                    <td className="p-4"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-slate-800 rounded-full"></div><div className="h-4 w-24 bg-slate-800 rounded"></div></div></td>
                    <td className="p-4 text-right"><div className="h-4 w-20 bg-slate-800 rounded ml-auto"></div></td>
                    <td className="p-4 text-right"><div className="h-4 w-16 bg-slate-800 rounded ml-auto"></div></td>
                    <td className="p-4 text-right hidden md:table-cell"><div className="h-4 w-24 bg-slate-800 rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
                  <tr 
                    key={coin.id} 
                    className="group hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4 text-sm text-slate-500 text-center font-mono">
                      {coin.market_cap_rank}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={coin.image} 
                          alt={coin.name} 
                          className="w-8 h-8 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                            {coin.name}
                          </span>
                          <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">
                            {coin.symbol}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-sm text-slate-200">
                      {formatCurrency(coin.current_price)}
                    </td>
                    <td className="p-4 text-right">
                      <div className={`flex items-center justify-end gap-1 text-sm font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {coin.price_change_percentage_24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-sm text-slate-400 hidden md:table-cell">
                      {formatCompact(coin.market_cap)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    No coins found matching "{searchInput}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800/50 bg-slate-950/50 flex justify-between items-center text-[10px] text-slate-500">
          <span>Data provided by CoinGecko API</span>
          <span>
            {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CryptoMarketWidget;