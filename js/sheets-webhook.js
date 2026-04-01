/**
 * CoinTrendz Radar - Google Sheets Webhook
 * Posts anonymous visit data to Google Sheets via Apps Script
 */

const SheetsWebhook = (() => {
  // Replace with your deployed Apps Script Web App URL
  const SHEET_WEBHOOK_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL';

  async function logVisit() {
    if (SHEET_WEBHOOK_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL') {
      console.log('[SheetsWebhook] No webhook URL configured. Skipping.');
      return;
    }

    try {
      await fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'page_visit',
          page: window.location.pathname,
          userAgent: navigator.userAgent,
          language: navigator.language,
          country: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      });
    } catch (err) {
      // Silent fail - do not block UX
    }
  }

  function init() {
    logVisit();
  }

  return { init };
})();
