/**
 * CoinTrendz Radar - Main Application
 */

const App = (() => {
  let refreshInterval = null;
  const REFRESH_MS = 60000; // 60 seconds

  // ---- Theme ----
  function initTheme() {
    const saved = localStorage.getItem('ctr_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    setTheme(theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ctr_theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    }
  }

  // ---- Utility ----
  function formatCurrency(num) {
    if (num == null) return '--';
    if (num >= 1) return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  }

  function formatPercent(num) {
    if (num == null) return '--';
    const sign = num >= 0 ? '+' : '';
    return sign + num.toFixed(2) + '%';
  }

  function formatLargeNumber(num) {
    if (num == null) return '--';
    if (num >= 1e12) return '$' + (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
    return '$' + num.toLocaleString();
  }

  // ---- Fear & Greed ----
  async function loadFearAndGreed() {
    try {
      const data = await API.getFearAndGreed();
      Charts.createGauge('fear-greed-gauge', data.value);
      const valueEl = document.getElementById('fng-value');
      const labelEl = document.getElementById('fng-label');
      if (valueEl) valueEl.textContent = data.value;
      if (labelEl) {
        labelEl.textContent = Charts.getGaugeLabel(data.value);
        labelEl.style.color = Charts.getGaugeColor(data.value);
      }
    } catch (err) {
      console.error('Fear & Greed load failed:', err);
    }
  }

  // ---- Top Gainers / Losers ----
  async function loadGainersLosers() {
    try {
      const coins = await API.getTopCoins(100);

      // Sort by 24h change
      const sorted = [...coins].sort((a, b) =>
        (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
      );

      const gainers = sorted.slice(0, 10);
      const losers = sorted.slice(-10).reverse();

      renderTable('gainers-tbody', gainers);
      renderTable('losers-tbody', losers);
    } catch (err) {
      console.error('Gainers/Losers load failed:', err);
    }
  }

  function renderTable(tbodyId, coins) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    tbody.innerHTML = coins.map((coin, i) => {
      const change = coin.price_change_percentage_24h || 0;
      const changeClass = change >= 0 ? 'text-gain' : 'text-loss';
      return `
        <tr>
          <td class="font-mono">${i + 1}</td>
          <td>
            <div style="display:flex;align-items:center;gap:8px;">
              <img src="${coin.image}" alt="${coin.name}" loading="lazy" width="24" height="24">
              <span>${coin.name}</span>
              <span style="color:var(--text-secondary);font-size:0.75rem;">${coin.symbol.toUpperCase()}</span>
            </div>
          </td>
          <td class="font-mono">${formatCurrency(coin.current_price)}</td>
          <td class="font-mono ${changeClass}">${formatPercent(change)}</td>
          <td class="font-mono" style="display:none;">${formatLargeNumber(coin.market_cap)}</td>
        </tr>`;
    }).join('');
  }

  // ---- Trending Coins ----
  async function loadTrending() {
    try {
      const data = await API.getTrendingCoins();
      const container = document.getElementById('trending-container');
      if (!container) return;

      const coins = data.coins || [];
      container.innerHTML = coins.slice(0, 8).map(item => {
        const coin = item.item;
        return `
          <div class="trending-badge">
            <img src="${coin.small}" alt="${coin.name}" loading="lazy" width="24" height="24">
            <span>${coin.name}</span>
            <span style="color:var(--text-secondary);font-size:0.75rem;">${coin.symbol}</span>
            <span style="color:var(--text-secondary);font-size:0.75rem;">#${coin.market_cap_rank || '?'}</span>
          </div>`;
      }).join('');
    } catch (err) {
      console.error('Trending load failed:', err);
    }
  }

  // ---- Price Cards (BTC/ETH) ----
  async function loadPriceCards() {
    try {
      const prices = await API.getBtcEthPrices();

      // BTC
      if (prices.bitcoin) {
        updatePriceCard('btc', prices.bitcoin);
      }
      // ETH
      if (prices.ethereum) {
        updatePriceCard('eth', prices.ethereum);
      }

      // Load sparklines
      loadSparkline('bitcoin', 'btc-sparkline', prices.bitcoin?.usd_24h_change >= 0);
      loadSparkline('ethereum', 'eth-sparkline', prices.ethereum?.usd_24h_change >= 0);
    } catch (err) {
      console.error('Price cards load failed:', err);
    }
  }

  function updatePriceCard(prefix, data) {
    const priceEl = document.getElementById(`${prefix}-price`);
    const changeEl = document.getElementById(`${prefix}-change`);
    const mcapEl = document.getElementById(`${prefix}-mcap`);
    const volEl = document.getElementById(`${prefix}-vol`);

    if (priceEl) priceEl.textContent = formatCurrency(data.usd);
    if (changeEl) {
      const change = data.usd_24h_change || 0;
      changeEl.textContent = formatPercent(change);
      changeEl.className = `font-mono ${change >= 0 ? 'text-gain' : 'text-loss'}`;
    }
    if (mcapEl) mcapEl.textContent = formatLargeNumber(data.usd_market_cap);
    if (volEl) volEl.textContent = formatLargeNumber(data.usd_24h_vol);
  }

  async function loadSparkline(coinId, canvasId, isPositive) {
    try {
      const data = await API.getSparkline(coinId);
      if (data.prices) {
        const prices = data.prices.map(p => p[1]);
        Charts.createSparkline(canvasId, prices, isPositive);
      }
    } catch (err) {
      console.warn(`Sparkline load failed for ${coinId}:`, err);
    }
  }

  // ---- Last Updated ----
  function updateTimestamp() {
    const el = document.getElementById('last-updated');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }

  // ---- Auto Refresh ----
  function startAutoRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      refreshAll();
    }, REFRESH_MS);

    // Update countdown
    updateRefreshCountdown();
  }

  function updateRefreshCountdown() {
    let seconds = 60;
    const el = document.getElementById('refresh-countdown');
    if (!el) return;

    const countdownInterval = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        seconds = 60;
      }
      el.textContent = `${seconds}s`;
    }, 1000);
  }

  async function refreshAll() {
    const indicator = document.getElementById('refresh-indicator');
    if (indicator) indicator.classList.add('refresh-pulse');

    await Promise.allSettled([
      loadFearAndGreed(),
      loadGainersLosers(),
      loadTrending(),
      loadPriceCards()
    ]);

    updateTimestamp();

    if (indicator) {
      setTimeout(() => indicator.classList.remove('refresh-pulse'), 1000);
    }
  }

  // ---- Scroll to Top ----
  function initScrollToTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Social Sharing ----
  function initSharing() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('CoinTrendz Radar - Real-Time Crypto Sentiment & Trending Coins');

    const twitterBtn = document.getElementById('share-twitter');
    const fbBtn = document.getElementById('share-facebook');
    const redditBtn = document.getElementById('share-reddit');
    const telegramBtn = document.getElementById('share-telegram');

    if (twitterBtn) twitterBtn.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    if (fbBtn) fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (redditBtn) redditBtn.href = `https://reddit.com/submit?url=${url}&title=${title}`;
    if (telegramBtn) telegramBtn.href = `https://t.me/share/url?url=${url}&text=${title}`;
  }

  // ---- Init ----
  async function init() {
    initTheme();
    initScrollToTop();
    initSharing();

    // Load data
    await refreshAll();

    // Start auto-refresh
    startAutoRefresh();

    // Init other modules
    Visitor.display();
    Ads.init();
    SheetsWebhook.init();
    await I18n.init();
  }

  return { init };
})();

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
