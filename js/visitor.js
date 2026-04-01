/**
 * CoinTrendz Radar - Visitor Counter Module
 * Uses localStorage for client-side counting
 */

const Visitor = (() => {
  const STORAGE_KEY_TOTAL = 'ctr_visitors_total';
  const STORAGE_KEY_TODAY = 'ctr_visitors_today';
  const STORAGE_KEY_DATE = 'ctr_visitors_date';
  const STORAGE_KEY_VISITED = 'ctr_visited_today';

  function getTodayStr() {
    return new Date().toISOString().split('T')[0];
  }

  function track() {
    const today = getTodayStr();
    const lastDate = localStorage.getItem(STORAGE_KEY_DATE);
    let todayCount = parseInt(localStorage.getItem(STORAGE_KEY_TODAY) || '0');
    let totalCount = parseInt(localStorage.getItem(STORAGE_KEY_TOTAL) || '0');
    const visitedToday = localStorage.getItem(STORAGE_KEY_VISITED);

    // Reset daily count if new day
    if (lastDate !== today) {
      todayCount = 0;
      localStorage.setItem(STORAGE_KEY_DATE, today);
      localStorage.removeItem(STORAGE_KEY_VISITED);
    }

    // Only count once per session/day
    if (visitedToday !== today) {
      todayCount++;
      totalCount++;
      localStorage.setItem(STORAGE_KEY_TODAY, todayCount.toString());
      localStorage.setItem(STORAGE_KEY_TOTAL, totalCount.toString());
      localStorage.setItem(STORAGE_KEY_VISITED, today);
    }

    return { today: todayCount, total: totalCount };
  }

  function display() {
    const counts = track();
    const todayEl = document.getElementById('visitors-today');
    const totalEl = document.getElementById('visitors-total');
    if (todayEl) todayEl.textContent = counts.today.toLocaleString();
    if (totalEl) totalEl.textContent = counts.total.toLocaleString();
  }

  return { display, track };
})();
