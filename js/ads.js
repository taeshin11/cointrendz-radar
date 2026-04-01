/**
 * CoinTrendz Radar - Ad Unit Module
 * Manages Adsterra and Google AdSense ad placements
 */

const Ads = (() => {
  const ADSTERRA_KEY = 'ADSTERRA_KEY_HERE';
  const ADSENSE_PUB = 'ca-pub-7098271335538021';

  function initAdsterra() {
    const slots = document.querySelectorAll('.ad-slot[data-ad-type="adsterra"]');
    slots.forEach(slot => {
      const key = slot.getAttribute('data-ad-key') || ADSTERRA_KEY;
      if (key === 'ADSTERRA_KEY_HERE') {
        // Placeholder mode - show placeholder text
        slot.innerHTML = '<span style="color:var(--text-secondary);font-size:0.75rem;">Ad Space - Adsterra</span>';
        return;
      }
      const ins = document.createElement('ins');
      ins.className = 'adsterra-ad';
      ins.setAttribute('data-key', key);
      slot.appendChild(ins);
      try {
        (window.adsterra = window.adsterra || []).push({});
      } catch (e) { /* silent */ }
    });
  }

  function initAdSense() {
    const slots = document.querySelectorAll('.ad-slot[data-ad-type="adsense"]');
    slots.forEach(slot => {
      const adSlot = slot.getAttribute('data-ad-slot');
      if (!adSlot) return;

      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', ADSENSE_PUB);
      ins.setAttribute('data-ad-slot', adSlot);
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      slot.appendChild(ins);
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { /* silent */ }
    });
  }

  function init() {
    initAdsterra();
    initAdSense();
  }

  return { init };
})();
