import { NextApiRequest, NextApiResponse } from 'next';

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d: {
    price: number[];
  };
}

interface MarketData {
  data: {
    total_market_cap: { usd: number; cad: number };
    total_volume: { usd: number; cad: number };
    market_cap_percentage: { btc: number };
    active_cryptocurrencies: number;
  };
}

interface TransformedCoin {
  name: string;
  symbol: string;
  currentPrice: {
    USD: number;
    CAD: number;
  };
  change24h: number;
  prices7d: Array<{
    day: string;
    price: number;
  }>;
}

interface TransformedCoins {
  [key: string]: TransformedCoin;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { currency = 'usd' } = req.query;
    
    // Fetch top 5 coins with 7-day sparkline data
    const coinsResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=bitcoin,ethereum,solana,cardano,dogecoin&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=24h`
    );
    
    // Fetch global market data
    const globalResponse = await fetch(
      'https://api.coingecko.com/api/v3/global'
    );

    if (!coinsResponse.ok || !globalResponse.ok) {
      throw new Error('Failed to fetch data from CoinGecko');
    }

    const coinsData: CoinData[] = await coinsResponse.json();
    const globalData: MarketData = await globalResponse.json();

    // Transform data to match our dashboard format
    const transformedCoins: TransformedCoins = coinsData.reduce((acc: TransformedCoins, coin) => {
      // Convert 7-day sparkline to our format
      const sparkline = coin.sparkline_in_7d.price;
      const prices7d = [];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      
      // Take last 7 days (one price per day)
      for (let i = 0; i < 7; i++) {
        const priceIndex = Math.floor((sparkline.length - 7 + i) * (sparkline.length / 168)); // 168 = 24*7 hours
        prices7d.push({
          day: days[i],
          price: sparkline[Math.min(priceIndex, sparkline.length - 1)] || coin.current_price
        });
      }

      acc[coin.symbol.toUpperCase()] = {
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        currentPrice: {
          USD: currency === 'usd' ? coin.current_price : coin.current_price * 1.35, // Rough USD to CAD conversion
          CAD: currency === 'cad' ? coin.current_price : coin.current_price * 1.35
        },
        change24h: parseFloat(coin.price_change_percentage_24h?.toFixed(2) || '0'),
        prices7d
      };
      
      return acc;
    }, {});

    const marketStats = {
      totalMarketCap: {
        USD: formatLargeNumber(globalData.data.total_market_cap.usd),
        CAD: formatLargeNumber(globalData.data.total_market_cap.cad || globalData.data.total_market_cap.usd * 1.35)
      },
      totalVolume: {
        USD: formatLargeNumber(globalData.data.total_volume.usd),
        CAD: formatLargeNumber(globalData.data.total_volume.cad || globalData.data.total_volume.usd * 1.35)
      },
      btcDominance: `${globalData.data.market_cap_percentage.btc?.toFixed(1) || '0'}%`,
      activeCoins: globalData.data.active_cryptocurrencies?.toLocaleString() || '0'
    };

    res.status(200).json({
      coins: transformedCoins,
      marketStats,
      lastUpdated: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ 
      message: 'Failed to fetch cryptocurrency data',
      error: errorMessage
    });
  }
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(1)}T`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  }
  return num.toLocaleString();
}