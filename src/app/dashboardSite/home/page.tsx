"use client";

import React, { useState, useEffect } from 'react';
import { TrendingUp, Globe, ChevronDown, Menu, X, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Type definitions
interface PriceData {
  day: string;
  price: number;
}

interface CoinInfo {
  name: string;
  symbol: string;
  currentPrice: {
    USD: number;
    CAD: number;
  };
  change24h: number;
  prices7d: PriceData[];
}

interface CryptoData {
  [key: string]: CoinInfo;
}

interface MarketStats {
  totalMarketCap: { USD: string; CAD: string };
  totalVolume: { USD: string; CAD: string };
  btcDominance: string;
  activeCoins: string;
}

interface ApiResponse {
  coins: CryptoData;
  marketStats: MarketStats;
  lastUpdated: string;
}

interface Translations {
  en: TranslationData;
  fr: TranslationData;
}

interface TranslationData {
  title: string;
  nav: {
    dashboard: string;
    portfolio: string;
    markets: string;
    news: string;
  };
  charts: {
    pricetrend: string;
    comparison: string;
    selectCoin: string;
    toggleCurrency: string;
  };
  stats: {
    totalMarketCap: string;
    totalVolume: string;
    btcDominance: string;
    activeCoins: string;
  };
  refresh: string;
  lastUpdated: string;
}

// Custom hook for API data
const useCryptoData = (currency: string = 'usd') => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API, but fall back to demo data if it fails
      try {
        const response = await fetch(`/api/dashboardSite/crypto?currency=${currency.toLowerCase()}`);
        
        if (response.ok) {
          const result: ApiResponse = await response.json();
          setData(result);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        console.log('API not available, using fallback data:', apiError);
      }
      
      // Use fallback data if API fails
      setTimeout(() => {
        setData(null); // This will trigger the fallback data usage
        setLoading(false);
      }, 500);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Failed to fetch crypto data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, [currency]);

  return { data, loading, error, refetch: fetchData };
};

const CryptoDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [currency, setCurrency] = useState<'USD' | 'CAD'>('USD');
  
  // Use the custom hook to fetch data
  const { data, loading, error, refetch } = useCryptoData(currency);

  const translations: Translations = {
    en: {
      title: 'Cryptocurrency Prices Dashboard',
      nav: {
        dashboard: 'Dashboard',
        portfolio: 'Portfolio',
        markets: 'Markets',
        news: 'News'
      },
      charts: {
        pricetrend: 'Price trend of selected cryptocurrency over past 7 days',
        comparison: 'Current price comparison of top 5 cryptocurrencies',
        selectCoin: 'Select Cryptocurrency',
        toggleCurrency: 'Toggle Currency'
      },
      stats: {
        totalMarketCap: 'Total Market Cap',
        totalVolume: '24h Volume',
        btcDominance: 'BTC Dominance',
        activeCoins: 'Active Coins'
      },
      refresh: 'Refresh Data',
      lastUpdated: 'Last updated'
    },
    fr: {
      title: 'Tableau de Bord des Prix de Cryptomonnaies',
      nav: {
        dashboard: 'Tableau de Bord',
        portfolio: 'Portefeuille',
        markets: 'Marchés',
        news: 'Actualités'
      },
      charts: {
        pricetrend: 'Tendance des prix de la cryptomonnaie sélectionnée sur les 7 derniers jours',
        comparison: 'Comparaison des prix actuels des 5 meilleures cryptomonnaies',
        selectCoin: 'Sélectionner Cryptomonnaie',
        toggleCurrency: 'Changer Devise'
      },
      stats: {
        totalMarketCap: 'Cap. Marché Total',
        totalVolume: 'Volume 24h',
        btcDominance: 'Dominance BTC',
        activeCoins: 'Pièces Actives'
      },
      refresh: 'Actualiser Données',
      lastUpdated: 'Dernière mise à jour'
    }
  };

  const t = translations[language];

  // Loading state
  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-red-400 text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold">Failed to load data</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Use API data or fall back to empty object
  const cryptoData = data?.coins || {};
  const marketStats = data?.marketStats;
  
  // Fallback data for demo purposes if API fails
  const fallbackData: CryptoData = {
    BTC: {
      name: 'Bitcoin',
      symbol: 'BTC',
      currentPrice: { USD: 30000, CAD: 40500 },
      change24h: 2.5,
      prices7d: [
        { day: 'Mon', price: 29500 },
        { day: 'Tue', price: 29800 },
        { day: 'Wed', price: 30000 },
        { day: 'Thu', price: 29950 },
        { day: 'Fri', price: 30100 },
        { day: 'Sat', price: 30200 },
        { day: 'Sun', price: 30000 }
      ]
    },
    ETH: {
      name: 'Ethereum',
      symbol: 'ETH',
      currentPrice: { USD: 2000, CAD: 2700 },
      change24h: 1.8,
      prices7d: [
        { day: 'Mon', price: 1900 },
        { day: 'Tue', price: 1925 },
        { day: 'Wed', price: 1950 },
        { day: 'Thu', price: 1980 },
        { day: 'Fri', price: 2000 },
        { day: 'Sat', price: 1990 },
        { day: 'Sun', price: 2000 }
      ]
    },
    SOL: {
      name: 'Solana',
      symbol: 'SOL',
      currentPrice: { USD: 90, CAD: 122 },
      change24h: -0.5,
      prices7d: [
        { day: 'Mon', price: 80 },
        { day: 'Tue', price: 82 },
        { day: 'Wed', price: 85 },
        { day: 'Thu', price: 88 },
        { day: 'Fri', price: 90 },
        { day: 'Sat', price: 92 },
        { day: 'Sun', price: 90 }
      ]
    },
    ADA: {
      name: 'Cardano',
      symbol: 'ADA',
      currentPrice: { USD: 0.40, CAD: 0.54 },
      change24h: 3.2,
      prices7d: [
        { day: 'Mon', price: 0.38 },
        { day: 'Tue', price: 0.39 },
        { day: 'Wed', price: 0.40 },
        { day: 'Thu', price: 0.42 },
        { day: 'Fri', price: 0.43 },
        { day: 'Sat', price: 0.42 },
        { day: 'Sun', price: 0.40 }
      ]
    },
    DOGE: {
      name: 'Dogecoin',
      symbol: 'DOGE',
      currentPrice: { USD: 0.08, CAD: 0.11 },
      change24h: 0.8,
      prices7d: [
        { day: 'Mon', price: 0.07 },
        { day: 'Tue', price: 0.075 },
        { day: 'Wed', price: 0.08 },
        { day: 'Thu', price: 0.085 },
        { day: 'Fri', price: 0.08 },
        { day: 'Sat', price: 0.08 },
        { day: 'Sun', price: 0.08 }
      ]
    }
  };

  const fallbackMarketStats: MarketStats = {
    totalMarketCap: { USD: '1.2T', CAD: '1.6T' },
    totalVolume: { USD: '45.2B', CAD: '61.0B' },
    btcDominance: '52.3%',
    activeCoins: '8,547'
  };

  // Use API data or fallback - with proper typing
  const finalCryptoData = Object.keys(cryptoData).length > 0 ? cryptoData : fallbackData;
  const finalMarketStats: MarketStats = marketStats || fallbackMarketStats;

  const barChartData = Object.keys(finalCryptoData).map(key => {
    const coin = finalCryptoData[key];
    return {
      name: coin.symbol,
      price: coin.currentPrice[currency],
      fullName: coin.name,
      change: coin.change24h
    };
  });

  const handleRefresh = () => {
    refetch();
  };

  const formatPrice = (price: number): string => {
    if (currency === 'USD') {
      return `$${price.toLocaleString()}`;
    } else {
      return `$${price.toLocaleString()} CAD`;
    }
  };

  const coinColors: { [key: string]: string } = {
    BTC: '#f7931a',
    ETH: '#627eea',
    SOL: '#00d4aa',
    ADA: '#0033ad',
    DOGE: '#c2a633'
  };

  // Ensure selectedCoin exists in data
  const selectedCoinData = finalCryptoData[selectedCoin] || Object.values(finalCryptoData)[0];
  if (!selectedCoinData) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">CryptoDash</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white font-medium border-b-2 border-orange-500 pb-1">
              {t.nav.dashboard}
            </a>
           
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Currency Toggle */}
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'CAD' : 'USD')}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
            >
              {currency}
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 px-6 py-4 space-y-4">
            <a href="#" className="block text-white font-medium">{t.nav.dashboard}</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors">{t.nav.portfolio}</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors">{t.nav.markets}</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors">{t.nav.news}</a>
            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              <button
                onClick={() => setCurrency(currency === 'USD' ? 'CAD' : 'USD')}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              >
                {currency}
              </button>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{t.title}</h1>
              <p className="text-gray-300">{t.lastUpdated}: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-orange-400">{finalMarketStats.totalMarketCap[currency]}</div>
              <div className="text-sm text-gray-300">{t.stats.totalMarketCap}</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-purple-400">{finalMarketStats.totalVolume[currency]}</div>
              <div className="text-sm text-gray-300">{t.stats.totalVolume}</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-green-400">{finalMarketStats.btcDominance}</div>
              <div className="text-sm text-gray-300">{t.stats.btcDominance}</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-blue-400">{finalMarketStats.activeCoins}</div>
              <div className="text-sm text-gray-300">{t.stats.activeCoins}</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Line Chart */}
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Price Trend (7 Days)</h2>
                <select
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {Object.keys(finalCryptoData).map(coin => (
                    <option key={coin} value={coin} className="bg-slate-800 text-white">
                      {finalCryptoData[coin].name} ({coin})
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-gray-300 text-sm">{t.charts.pricetrend}</p>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedCoinData.prices7d}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatPrice(value)} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value) => [formatPrice(Number(value)), 'Price']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke={coinColors[selectedCoin] || '#f59e0b'} 
                      strokeWidth={3}
                      dot={{ fill: coinColors[selectedCoin] || '#f59e0b', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: coinColors[selectedCoin] || '#f59e0b' }}
                  ></div>
                  <span className="text-sm font-medium">{selectedCoinData.name}</span>
                </div>
                <div className="text-lg font-bold">
                  {formatPrice(selectedCoinData.currentPrice[currency])}
                </div>
                <div className={`text-sm px-2 py-1 rounded ${
                  selectedCoinData.change24h >= 0 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {selectedCoinData.change24h >= 0 ? '+' : ''}{selectedCoinData.change24h}%
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 space-y-4">
              <h2 className="text-xl font-semibold">Current Price Comparison</h2>
              <p className="text-gray-300 text-sm">{t.charts.comparison}</p>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatPrice(Number(value))} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value, name, props) => [
                        formatPrice(Number(value)), 
                        props.payload?.fullName,
                        `Change: ${props.payload?.change >= 0 ? '+' : ''}${props.payload?.change}%`
                      ]}
                    />
                    <Bar 
                      dataKey="price" 
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Crypto List */}
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h2 className="text-xl font-semibold mb-6">Top Cryptocurrencies</h2>
            <div className="space-y-4">
              {Object.keys(finalCryptoData).map(coin => {
                const crypto = finalCryptoData[coin];
                return (
                  <div key={coin} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: coinColors[coin] || '#6b7280' }}
                      >
                        {coin.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-sm text-gray-400">{crypto.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-lg">
                        {formatPrice(crypto.currentPrice[currency])}
                      </div>
                      <div className={`text-sm ${
                        crypto.change24h >= 0 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function Page() {
  return <CryptoDashboard />;
}