/**
 * CoinTrendz Radar - API Module
 * Handles all CoinGecko and Fear & Greed API calls
 */

const API = (() => {
  const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
  const FNG_URL = 'https://api.alternative.me/fng/?limit=1';

  // Simple cache to avoid rate limits
  const cache = {};
  const CACHE_TTL = 55000; // 55 seconds

  function getCached(key) {
    const entry = cache[key];
    if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
      return entry.data;
    }
    return null;
  }

  function setCache(key, data) {
    cache[key] = { data, timestamp: Date.now() };
  }

  async function fetchJSON(url, cacheKey) {
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const res = await fetch(url);
      if (res.status === 429) {
        // Rate limited - increase cache TTL and use fallback
        console.warn(`Rate limited on ${cacheKey}. Using cached data.`);
        const fallback = localStorage.getItem(`ctr_${cacheKey}`);
        if (fallback) return JSON.parse(fallback);
        throw new Error('Rate limited');
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCache(cacheKey, data);
      return data;
    } catch (err) {
      console.warn(`API fetch failed for ${cacheKey}:`, err.message);
      // Return localStorage fallback
      const fallback = localStorage.getItem(`ctr_${cacheKey}`);
      if (fallback) return JSON.parse(fallback);
      throw err;
    }
  }

  async function getFearAndGreed() {
    const data = await fetchJSON(FNG_URL, 'fng');
    const result = data.data[0];
    localStorage.setItem('ctr_fng', JSON.stringify(data));
    return {
      value: parseInt(result.value),
      classification: result.value_classification,
      timestamp: result.timestamp
    };
  }

  async function getTopCoins(perPage = 100) {
    const url = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`;
    const data = await fetchJSON(url, 'top_coins');
    localStorage.setItem('ctr_top_coins', JSON.stringify(data));
    return data;
  }

  async function getTrendingCoins() {
    const url = `${COINGECKO_BASE}/search/trending`;
    const data = await fetchJSON(url, 'trending');
    localStorage.setItem('ctr_trending', JSON.stringify(data));
    return data;
  }

  async function getSparkline(coinId) {
    const url = `${COINGECKO_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=1`;
    const data = await fetchJSON(url, `sparkline_${coinId}`);
    localStorage.setItem(`ctr_sparkline_${coinId}`, JSON.stringify(data));
    return data;
  }

  async function getBtcEthPrices() {
    const url = `${COINGECKO_BASE}/simple/price?ids=bitcoin,ethereum&vs_currency=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;
    const data = await fetchJSON(url, 'btc_eth');
    localStorage.setItem('ctr_btc_eth', JSON.stringify(data));
    return data;
  }

  return {
    getFearAndGreed,
    getTopCoins,
    getTrendingCoins,
    getSparkline,
    getBtcEthPrices
  };
})();
