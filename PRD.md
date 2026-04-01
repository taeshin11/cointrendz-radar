# PRD: CoinTrendz Radar

## Real-Time Crypto Sentiment & Trending Coins

---

## 1. Project Overview

### Service Name
CoinTrendz Radar

### Short Title
Real-Time Crypto Sentiment & Trending Coins

### Description
CoinTrendz Radar is a free, real-time cryptocurrency dashboard that displays today's top gaining coins, trending search coins, and the market Fear & Greed Index. It provides at-a-glance market sentiment analysis with auto-refreshing data, helping crypto enthusiasts and traders stay informed without paid subscriptions or complex tooling.

### Target Audience
- Crypto traders and investors (beginner to intermediate)
- Market watchers who want quick sentiment snapshots
- Content creators looking for trending coin data
- General public curious about crypto market conditions

### Target Keywords (SEO)
- "crypto fear greed index"
- "trending crypto today"
- "top gaining crypto"
- "crypto market sentiment"
- "bitcoin fear and greed"
- "crypto gainers today"
- "trending cryptocurrency"

---

## 2. Harness Design Methodology

### Agent Workflow

```
Planner Agent
  -> Defines milestones, feature_list.json, file structure
  -> Outputs PRD.md (this document)

Initializer Agent
  -> Reads PRD.md
  -> Generates feature_list.json
  -> Generates claude-progress.txt
  -> Generates init.sh (project scaffold)
  -> Runs init.sh to bootstrap project

Fixed Session Routine
  -> Each session: read claude-progress.txt -> pick next incomplete feature -> build -> test -> mark done -> git push

Builder Agent
  -> Implements features one by one per feature_list.json
  -> Writes code, tests locally, commits

Reviewer Agent
  -> Reviews code quality, accessibility, SEO, responsiveness
  -> Suggests fixes before milestone push
```

### Session Routine (Per Coding Session)

1. Read `claude-progress.txt` to find current milestone and next incomplete feature.
2. Implement the feature.
3. Test locally (open in browser, verify mobile responsiveness).
4. Mark feature as complete in `claude-progress.txt`.
5. Git commit with descriptive message.
6. At milestone completion: git push, verify deployment on Vercel.

---

## 3. Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Vanilla HTML/CSS/JS (or Vite+React if needed) | $0 |
| Styling | Tailwind CSS via CDN | $0 |
| Charts | Chart.js (CDN) | $0 |
| Crypto Data | CoinGecko Free API | $0 |
| Sentiment | Alternative.me Fear & Greed Index API | $0 |
| Hosting | Vercel (free tier) | $0 |
| Data Collection | Google Sheets + Apps Script Webhook | $0 |
| Ads | Adsterra (primary), Google AdSense (secondary) | Revenue |
| Version Control | GitHub (private repo) | $0 |
| **Total** | | **$0** |

---

## 4. API Details

### CoinGecko Free API
- Base URL: `https://api.coingecko.com/api/v3`
- Endpoints used:
  - `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100` (top coins)
  - `/search/trending` (trending coins)
  - `/coins/{id}/market_chart?vs_currency=usd&days=1` (sparkline data)
  - `/simple/price?ids=bitcoin,ethereum&vs_currency=usd&include_24hr_change=true` (BTC/ETH price)
- Rate limit: 10-30 calls/minute (free tier)
- No API key required

### Alternative.me Fear & Greed Index API
- URL: `https://api.alternative.me/fng/?limit=1`
- Returns: value (0-100), value_classification, timestamp
- No API key required
- No rate limit specified

---

## 5. Features List

### Core Features

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| F01 | Fear & Greed gauge (Chart.js doughnut/gauge) | P0 | M1 |
| F02 | Top gainers table (top 10 by 24h % change) | P0 | M1 |
| F03 | Top losers table (bottom 10 by 24h % change) | P0 | M1 |
| F04 | Trending coins section (from CoinGecko trending) | P0 | M1 |
| F05 | BTC price card with 24h sparkline | P0 | M2 |
| F06 | ETH price card with 24h sparkline | P0 | M2 |
| F07 | Auto-refresh every 60 seconds | P0 | M2 |
| F08 | Last updated timestamp display | P1 | M2 |
| F09 | Responsive mobile-first layout | P0 | M2 |
| F10 | Dark/light mode toggle | P1 | M3 |

### SEO & Meta

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| S01 | Meta tags (title, description, keywords) | P0 | M3 |
| S02 | Open Graph tags | P0 | M3 |
| S03 | Twitter Card tags | P0 | M3 |
| S04 | JSON-LD structured data (WebSite, WebApplication) | P0 | M3 |
| S05 | sitemap.xml generation | P0 | M3 |
| S06 | robots.txt | P0 | M3 |
| S07 | Semantic HTML (header, main, nav, section, footer) | P0 | M1 |
| S08 | Canonical URL tag | P1 | M3 |

### Monetization & Analytics

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| A01 | Adsterra ad unit placeholders (header banner, sidebar, in-feed) | P0 | M3 |
| A02 | Adsterra ad key injection script | P0 | M3 |
| A03 | Google AdSense fallback slot | P1 | M4 |
| A04 | Visitor counter (Today + Total) in footer | P0 | M3 |
| A05 | Google Sheets webhook (Apps Script) - POST on page visit | P0 | M3 |

### Internationalization & UX

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| I01 | Auto i18n - browser language detection | P0 | M4 |
| I02 | Support 8+ languages (EN, KO, JA, ZH, ES, FR, DE, PT) | P0 | M4 |
| I03 | Language selector dropdown in header | P1 | M4 |
| I04 | Social sharing buttons (Twitter, Facebook, Reddit, Telegram) | P0 | M4 |
| I05 | Feedback email link (taeshinkim11@gmail.com) | P0 | M4 |

### Static Pages

| ID | Feature | Priority | Milestone |
|----|---------|----------|-----------|
| P01 | About page | P0 | M4 |
| P02 | How to Use / FAQ page | P0 | M4 |
| P03 | Privacy Policy page | P0 | M4 |
| P04 | Terms of Service page | P0 | M4 |

---

## 6. File & Folder Structure

```
CoinTrendzRadar/
├── index.html                  # Main dashboard page
├── about.html                  # About page
├── faq.html                    # How to Use / FAQ
├── privacy.html                # Privacy Policy
├── terms.html                  # Terms of Service
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # SEO robots
├── manifest.json               # PWA manifest (optional)
├── css/
│   └── style.css               # Custom styles (soft colors, overrides)
├── js/
│   ├── app.js                  # Main application logic
│   ├── api.js                  # API fetch functions (CoinGecko, Fear&Greed)
│   ├── charts.js               # Chart.js gauge & sparkline rendering
│   ├── i18n.js                 # Internationalization logic
│   ├── visitor.js              # Visitor counter logic
│   ├── ads.js                  # Ad unit injection
│   └── sheets-webhook.js       # Google Sheets POST webhook
├── data/
│   └── translations.json       # i18n string translations
├── assets/
│   ├── og-image.png            # Open Graph image
│   ├── favicon.ico             # Favicon
│   └── icons/                  # PWA icons
├── feature_list.json           # Harness: feature tracking
├── claude-progress.txt         # Harness: session progress tracker
├── init.sh                     # Harness: project initializer script
├── vercel.json                 # Vercel configuration
├── package.json                # (if using Vite) or for scripts
├── .gitignore
└── README.md
```

---

## 7. Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background (primary) | Soft warm gray | #F5F3F0 |
| Background (card) | Warm white | #FAFAF8 |
| Background (dark mode) | Deep charcoal | #1E1E2E |
| Text (primary) | Dark charcoal | #2D2D3A |
| Text (secondary) | Medium gray | #6B7280 |
| Accent (bullish/gain) | Soft green | #22C55E |
| Accent (bearish/loss) | Soft red | #EF4444 |
| Accent (primary) | Indigo | #6366F1 |
| Accent (secondary) | Amber | #F59E0B |
| Fear (gauge) | Orange-red gradient | #EF4444 to #F59E0B |
| Greed (gauge) | Green gradient | #22C55E to #10B981 |

### Typography

- Headings: `Inter` or `system-ui` (700 weight)
- Body: `Inter` or `system-ui` (400 weight)
- Monospace (numbers): `JetBrains Mono` or `monospace`

### Spacing

- Base unit: 4px
- Card padding: 16px (mobile), 24px (desktop)
- Section gap: 32px
- Border radius: 12px (cards), 8px (buttons)

### Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

---

## 8. Milestones & Git Strategy

### Milestone 1: Core Dashboard (MVP)
**Deliverables:**
- Project scaffold (index.html, CSS, JS structure)
- Fear & Greed gauge rendering
- Top gainers/losers tables
- Trending coins section
- Semantic HTML structure
- Basic responsive layout

**Git commits:**
- `feat: scaffold project structure`
- `feat: implement Fear & Greed gauge`
- `feat: add top gainers/losers tables`
- `feat: add trending coins section`
- `milestone: M1 complete - core dashboard`

**Push to GitHub at milestone completion.**

### Milestone 2: Price Cards & Auto-Refresh
**Deliverables:**
- BTC price card with sparkline
- ETH price card with sparkline
- Auto-refresh every 60 seconds
- Last updated timestamp
- Mobile-first responsive polish

**Git commits:**
- `feat: add BTC/ETH price cards with sparklines`
- `feat: implement auto-refresh (60s interval)`
- `feat: add last updated timestamp`
- `style: mobile responsive polish`
- `milestone: M2 complete - price cards and auto-refresh`

**Push to GitHub at milestone completion.**

### Milestone 3: SEO, Ads & Analytics
**Deliverables:**
- Full SEO (meta, OG, JSON-LD, sitemap, robots.txt)
- Adsterra ad unit placeholders and injection script
- Visitor counter (Today + Total) in footer
- Google Sheets webhook integration
- Dark/light mode toggle

**Git commits:**
- `feat: add SEO meta tags, OG, JSON-LD`
- `feat: add sitemap.xml and robots.txt`
- `feat: integrate Adsterra ad placeholders`
- `feat: add visitor counter in footer`
- `feat: integrate Google Sheets webhook`
- `feat: add dark/light mode toggle`
- `milestone: M3 complete - SEO, ads, analytics`

**Push to GitHub at milestone completion.**

### Milestone 4: i18n, Static Pages & Polish
**Deliverables:**
- Auto i18n with 8+ languages
- Language selector
- Social sharing buttons
- Feedback email mechanism
- About, FAQ, Privacy Policy, Terms of Service pages
- Google AdSense fallback
- Final QA and performance optimization

**Git commits:**
- `feat: implement auto i18n (8 languages)`
- `feat: add social sharing buttons`
- `feat: add feedback email link`
- `feat: create About, FAQ, Privacy, Terms pages`
- `feat: add Google AdSense fallback`
- `chore: final QA and optimization`
- `milestone: M4 complete - full release`

**Push to GitHub at milestone completion.**

---

## 9. Google Sheets Webhook (Apps Script)

### Setup

1. Create a Google Sheet with columns: `Timestamp`, `Event`, `Page`, `UserAgent`, `Language`, `Country`.
2. Go to Extensions > Apps Script.
3. Deploy the following as a Web App (Execute as: Me, Access: Anyone):

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.event || "page_visit",
    data.page || "/",
    data.userAgent || "",
    data.language || "",
    data.country || ""
  ]);
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

4. Copy the Web App URL and inject into `js/sheets-webhook.js`.

### Client-Side POST

```javascript
// js/sheets-webhook.js
const SHEET_WEBHOOK_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL";

async function logVisit() {
  try {
    await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify({
        event: "page_visit",
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

document.addEventListener("DOMContentLoaded", logVisit);
```

---

## 10. Ad Monetization Strategy

### Adsterra (Primary)

Ad placement slots:

| Slot | Position | Type | Size |
|------|----------|------|------|
| ad-header-banner | Top of page, below nav | Banner | 728x90 (desktop), 320x50 (mobile) |
| ad-sidebar | Right sidebar (desktop only) | Native banner | 300x250 |
| ad-in-feed | Between trending coins and gainers | Native | 300x250 |
| ad-footer | Above footer | Banner | 728x90 |

### Injection Pattern

```html
<!-- Ad Placeholder -->
<div class="ad-slot" id="ad-header-banner" data-ad-key="ADSTERRA_KEY_HERE">
  <ins class="adsterra-ad" data-key="ADSTERRA_KEY_HERE"></ins>
  <script>(adsterra = window.adsterra || []).push({});</script>
</div>
```

### Google AdSense (Secondary/Fallback)

- Apply for AdSense once site has content and traffic.
- Use `<ins class="adsbygoogle">` tags as fallback in ad slots.
- AdSense auto-ads as supplementary.

---

## 11. Visitor Counter Implementation

### Approach
Use a lightweight counter service or Google Sheets as backend.

### Footer Display

```html
<footer>
  <div class="visitor-counter">
    <span>Today: <strong id="visitors-today">--</strong></span>
    <span>Total: <strong id="visitors-total">--</strong></span>
  </div>
</footer>
```

### Logic
- On page load, POST to Google Sheets webhook with event `"visit"`.
- Read visitor counts from a separate published Google Sheet (JSON endpoint).
- Display in footer, non-intrusive, small text.

---

## 12. i18n Strategy

### Browser Language Detection

```javascript
const userLang = navigator.language || navigator.languages[0];
const supportedLangs = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const lang = supportedLangs.find(l => userLang.startsWith(l)) || 'en';
```

### Translation File Structure (`data/translations.json`)

```json
{
  "en": {
    "title": "CoinTrendz Radar",
    "subtitle": "Real-Time Crypto Sentiment & Trending Coins",
    "fear_greed": "Fear & Greed Index",
    "top_gainers": "Top Gainers",
    "top_losers": "Top Losers",
    "trending": "Trending Coins",
    "last_updated": "Last updated",
    "about": "About",
    "faq": "FAQ",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service"
  },
  "ko": {
    "title": "CoinTrendz Radar",
    "subtitle": "...Korean translation...",
    ...
  }
}
```

### Languages Supported
1. English (en)
2. Korean (ko)
3. Japanese (ja)
4. Chinese Simplified (zh)
5. Spanish (es)
6. French (fr)
7. German (de)
8. Portuguese (pt)

---

## 13. SEO Implementation

### Meta Tags

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Real-time crypto Fear & Greed Index, trending coins, and top gainers. Free cryptocurrency sentiment dashboard updated every 60 seconds.">
<meta name="keywords" content="crypto fear greed index, trending crypto today, top gaining crypto, cryptocurrency sentiment, bitcoin fear and greed">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://cointrendz-radar.vercel.app/">
```

### Open Graph

```html
<meta property="og:title" content="CoinTrendz Radar - Real-Time Crypto Sentiment">
<meta property="og:description" content="Track crypto Fear & Greed Index, trending coins, and top gainers in real time.">
<meta property="og:image" content="https://cointrendz-radar.vercel.app/assets/og-image.png">
<meta property="og:url" content="https://cointrendz-radar.vercel.app/">
<meta property="og:type" content="website">
```

### JSON-LD

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CoinTrendz Radar",
  "description": "Real-time crypto sentiment dashboard with Fear & Greed Index and trending coins.",
  "url": "https://cointrendz-radar.vercel.app/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
```

---

## 14. Deployment Checklist

### Pre-Deployment
- [ ] All features in feature_list.json marked complete
- [ ] Mobile responsive tested (320px, 375px, 768px, 1024px, 1440px)
- [ ] All API calls working with error handling
- [ ] SEO tags in place (validate with metatags.io)
- [ ] Ad placeholders in place with Adsterra keys
- [ ] Visitor counter functional
- [ ] Google Sheets webhook receiving data
- [ ] i18n working for all 8 languages
- [ ] All static pages (About, FAQ, Privacy, Terms) complete
- [ ] Social sharing buttons functional
- [ ] Feedback email link working
- [ ] Dark/light mode toggle working
- [ ] Performance: Lighthouse score > 90
- [ ] Accessibility: basic ARIA labels, contrast ratios

### Deployment Steps
1. Create GitHub repo: `gh repo create CoinTrendzRadar --private --source=. --push`
2. Connect to Vercel: `vercel --prod`
3. Set custom domain if desired via Vercel dashboard.
4. Verify deployment at Vercel URL.
5. Submit sitemap to Google Search Console.
6. Test all features on production.

### Post-Deployment
- [ ] Google Search Console sitemap submitted
- [ ] Adsterra account approved and keys injected
- [ ] Monitor Google Sheets for visit data
- [ ] Share on social media / Reddit / crypto communities

---

## 15. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| CoinGecko rate limit hit | Data stops refreshing | Cache responses in localStorage, increase refresh interval to 120s if errors detected |
| API downtime | Dashboard shows stale data | Show "Last updated X min ago" warning, graceful fallback UI |
| Adsterra rejection | No ad revenue | Apply to multiple ad networks, use affiliate links as backup |
| Low SEO ranking | Low traffic | Regular content updates, backlink building, social media promotion |

---

## 16. Success Metrics

| Metric | Target (30 days) |
|--------|-----------------|
| Daily visitors | 100+ |
| Google indexed pages | All pages |
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 95 |
| Ad impressions | 500+/day |
| Google Sheets rows | 3000+ visits logged |

---

## 17. Privacy & Data

- No user accounts or login required.
- Visitor data collected: timestamp, page, user agent, language, timezone (no PII).
- All data collection disclosed in Privacy Policy.
- No cookies except for ad networks (disclosed in Privacy Policy).
- GDPR-friendly: no personal data stored beyond anonymous analytics.

---

## 18. Future Enhancements (Post-Launch)

- Push notifications for major market moves
- Portfolio tracker (localStorage-based)
- Historical Fear & Greed chart
- Coin comparison tool
- Email newsletter signup
- PWA support (offline caching)
- Custom alerts for specific coins

---

*Document Version: 1.0*
*Created: 2026-04-01*
*Methodology: Harness Design*
