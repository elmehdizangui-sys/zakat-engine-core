/* ==============================================
   Zakat Al-Mall V2 — Spectrum Engine
   Three methods · Persona-driven · Hawl Clock
   ============================================== */

// --- Constants ---
const ZAKAT_RATE      = 0.025;
const NISAB_GOLD_G    = 85;
const METHOD_B_PROXY  = 0.30;
const GOLD_USD_PER_G  = 94.83;   // ~$2,950/oz ÷ 31.1035 g/oz, Mar 2026
const NISAB_USD       = NISAB_GOLD_G * GOLD_USD_PER_G; // ~$8,061
const RATES_DATE      = 'Mar 2026';
const LUNAR_YEAR_DAYS = 354;

// --- Stock data (fallback prices, Mar 2026) ---
const STOCK_DATA = {
  'AAPL':  { price: 214.29,  name: 'Apple Inc.' },
  'MSFT':  { price: 388.20,  name: 'Microsoft Corp.' },
  'GOOGL': { price: 165.51,  name: 'Alphabet Inc.' },
  'AMZN':  { price: 195.89,  name: 'Amazon.com Inc.' },
  'TSLA':  { price: 248.05,  name: 'Tesla Inc.' },
  'META':  { price: 570.00,  name: 'Meta Platforms' },
  'NVDA':  { price: 124.92,  name: 'NVIDIA Corp.' },
  'BRK.B': { price: 474.50,  name: 'Berkshire Hathaway B' },
  'JPM':   { price: 230.10,  name: 'JPMorgan Chase' },
  'JNJ':   { price: 155.20,  name: 'Johnson & Johnson' },
  'V':     { price: 334.40,  name: 'Visa Inc.' },
  'WMT':   { price:  97.50,  name: 'Walmart Inc.' },
  'NFLX':  { price: 978.40,  name: 'Netflix Inc.' },
  'DIS':   { price: 112.30,  name: 'Walt Disney Co.' },
  'COST':  { price: 1014.00, name: 'Costco Wholesale' },
  'ADBE':  { price: 378.90,  name: 'Adobe Inc.' },
  'CRM':   { price: 285.00,  name: 'Salesforce Inc.' },
  'PYPL':  { price:  68.50,  name: 'PayPal Holdings' },
  'INTC':  { price:  22.00,  name: 'Intel Corp.' },
  'AMD':   { price: 108.00,  name: 'Advanced Micro Devices' },
};

// --- Currencies ---
const CURRENCIES = {
  USD: { symbol: '$',   rate: 1,       label: 'USD — US Dollar' },
  EUR: { symbol: '€',   rate: 0.9210,  label: 'EUR — Euro' },
  GBP: { symbol: '£',   rate: 0.7890,  label: 'GBP — British Pound' },
  SAR: { symbol: 'SR',  rate: 3.7500,  label: 'SAR — Saudi Riyal' },
  AED: { symbol: 'AED', rate: 3.6725,  label: 'AED — UAE Dirham' },
  MAD: { symbol: 'MAD', rate: 10.030,  label: 'MAD — Moroccan Dirham' },
  CAD: { symbol: 'C$',  rate: 1.3610,  label: 'CAD — Canadian Dollar' },
  AUD: { symbol: 'A$',  rate: 1.5420,  label: 'AUD — Australian Dollar' },
  TRY: { symbol: '₺',   rate: 32.80,   label: 'TRY — Turkish Lira' },
  MYR: { symbol: 'RM',  rate: 4.4730,  label: 'MYR — Malaysian Ringgit' },
  IDR: { symbol: 'Rp',  rate: 15800,   label: 'IDR — Indonesian Rupiah' },
  PKR: { symbol: '₨',   rate: 278.50,  label: 'PKR — Pakistani Rupee' },
  EGP: { symbol: 'E£',  rate: 48.65,   label: 'EGP — Egyptian Pound' },
};

// --- App state ---
let holdings         = []; // { id, ticker, name, shares, price, priceSource }
let holdingIdCounter = 0;
let selectedCurrency = 'USD';
let selectedPersona  = 'passive'; // 'speculator' | 'passive' | 'legacy'
let modalAC          = null;

// --- Utilities ---
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = String(str ?? '');
  return d.innerHTML;
}

function fmtNum(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

function cvt(usd) {
  const c   = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  const val = usd * c.rate;
  const num = val >= 1000 ? fmtNum(Math.round(val)) : fmtNum(Number(val.toFixed(2)));
  // RTL: put number before symbol/name
  if (typeof currentLang !== 'undefined' && currentLang === 'ar') {
    return num + '\u00A0' + c.symbol;
  }
  return c.symbol + num;
}

// Returns a currency label suitable for prose (e.g. gap caption)
// In Arabic: "32,859 يورو EUR" — spelled-out name + code
function cvtLabel(usd) {
  const c   = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  const val = usd * c.rate;
  const num = val >= 1000 ? fmtNum(Math.round(val)) : fmtNum(Number(val.toFixed(2)));
  const code = selectedCurrency;
  if (typeof currentLang !== 'undefined' && currentLang === 'ar') {
    const names = { USD: 'دولار', EUR: 'يورو', GBP: 'جنيه', SAR: 'ريال', AED: 'درهم',
                    MYR: 'رينغيت', IDR: 'روبية', PKR: 'روبية', EGP: 'جنيه', TRY: 'ليرة' };
    const arName = names[code] || code;
    return num + '\u00A0' + arName + ' ' + code;
  }
  return c.symbol + num;
}

// --- Currency selectors ---
function initCurrencySelectors() {
  const options = Object.entries(CURRENCIES)
    .map(([code, d]) => `<option value="${code}">${escapeHtml(d.label)}</option>`)
    .join('');

  document.getElementById('currency-select').innerHTML = options;
  document.getElementById('currency-select').value = 'USD';
  document.getElementById('currency-select').addEventListener('change', e => {
    selectedCurrency = e.target.value;
    renderHoldingsTable();
    if (!document.getElementById('results-section').classList.contains('hidden')) renderSpectrum();
  });
}

// --- Live price fetch ---
async function fetchLivePrice(ticker) {
  try {
    const encoded    = encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`);
    const controller = new AbortController();
    const timer      = setTimeout(() => controller.abort(), 4000);
    const res        = await fetch(`https://api.allorigins.win/get?url=${encoded}`, { signal: controller.signal });
    clearTimeout(timer);
    const json       = await res.json();
    const data       = JSON.parse(json.contents);
    const price      = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    if (price && price > 0) return { price, source: 'live' };
  } catch (_) {}
  return null;
}

// ═══════════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════════

function openAddHoldingModal() {
  const modal = document.getElementById('add-holding-modal');
  modal.classList.remove('hidden');
  document.getElementById('modal-ticker').value = '';
  document.getElementById('modal-price').value  = '';
  document.getElementById('modal-shares').value = '';
  setModalPriceStatus('', '');
  if (modalAC) { modalAC.destroy(); modalAC = null; }
  modalAC = initAutocomplete(
    document.getElementById('modal-ticker'),
    document.getElementById('modal-ticker-dropdown'),
    onModalTickerSelected
  );
  setTimeout(() => document.getElementById('modal-ticker').focus(), 60);
}

function closeAddHoldingModal() {
  document.getElementById('add-holding-modal').classList.add('hidden');
  if (modalAC) { modalAC.destroy(); modalAC = null; }
}

function setModalPriceStatus(text, type) {
  const el = document.getElementById('modal-price-status');
  el.textContent = text;
  el.className   = 'price-status' + (type ? ' price-status--' + type : '');
}

async function onModalTickerSelected(ticker) {
  setModalPriceStatus('Fetching…', 'loading');
  const live = await fetchLivePrice(ticker);
  if (live) {
    document.getElementById('modal-price').value = live.price.toFixed(2);
    setModalPriceStatus(t('livePriceLabel'), 'live');
  } else if (STOCK_DATA[ticker]) {
    document.getElementById('modal-price').value = STOCK_DATA[ticker].price.toFixed(2);
    setModalPriceStatus(t('cachedPriceLabel', RATES_DATE), 'cached');
  } else {
    document.getElementById('modal-price').value = '';
    setModalPriceStatus('Not found — enter manually', 'error');
  }
}

async function submitAddHolding() {
  const tickerEl = document.getElementById('modal-ticker');
  const priceEl  = document.getElementById('modal-price');
  const sharesEl = document.getElementById('modal-shares');
  const ticker   = tickerEl.value.trim().toUpperCase();
  const price    = parseFloat(priceEl.value);
  const shares   = parseFloat(sharesEl.value);

  if (!ticker)                               { shakeInput(tickerEl);  tickerEl.focus();  return; }
  if (!priceEl.value || isNaN(price) || price  <= 0) { shakeInput(priceEl);  priceEl.focus();  return; }
  if (!sharesEl.value || isNaN(shares) || shares <= 0) { shakeInput(sharesEl); sharesEl.focus(); return; }

  const statusClass  = document.getElementById('modal-price-status').className;
  const priceSource  = statusClass.includes('live') ? 'live' : 'cached';

  holdings.push({
    id: holdingIdCounter++,
    ticker,
    name: STOCK_DATA[ticker]?.name || ticker,
    shares,
    price,
    priceSource,
  });

  renderHoldingsTable();
  closeAddHoldingModal();

  const resultsEl = document.getElementById('results-section');
  if (!resultsEl.classList.contains('hidden')) renderSpectrum();
}

function shakeInput(el) {
  el.classList.add('input-error');
  setTimeout(() => el.classList.remove('input-error'), 600);
}

// ═══════════════════════════════════════════════
//  HOLDINGS TABLE
// ═══════════════════════════════════════════════

function renderHoldingsTable() {
  const tbody     = document.getElementById('holdings-tbody');
  const emptyEl   = document.getElementById('holdings-empty');
  const tableWrap = document.getElementById('holdings-table-wrap');
  const countEl   = document.getElementById('holdings-count');
  const calcBtn   = document.getElementById('calculate-btn');

  countEl.textContent = holdings.length ? `(${holdings.length})` : '';
  const isEmpty = holdings.length === 0;
  emptyEl.classList.toggle('hidden', !isEmpty);
  tableWrap.classList.toggle('hidden', isEmpty);
  if (calcBtn) calcBtn.disabled = isEmpty;

  tbody.innerHTML = holdings.map(h => {
    const value  = h.shares * h.price;
    const srcDot = h.priceSource === 'live'
      ? `<span class="price-live-dot" title="Live price"></span>`
      : `<span class="price-cached-dot" title="Cached ${RATES_DATE}"></span>`;
    return `<tr>
      <td class="holding-cell">
        <span class="holding-ticker">${escapeHtml(h.ticker)}</span>
        <span class="holding-name">${escapeHtml(h.name)}</span>
      </td>
      <td class="num-cell">${fmtNum(h.shares)}</td>
      <td class="num-cell">${srcDot}${cvt(h.price)}</td>
      <td class="num-cell">${cvt(value)}</td>
      <td class="action-cell">
        <button class="remove-btn" onclick="removeHolding(${h.id})" aria-label="Remove ${escapeHtml(h.ticker)}">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/></svg>
        </button>
      </td>
    </tr>`;
  }).join('');
}

function removeHolding(id) {
  holdings = holdings.filter(h => h.id !== id);
  renderHoldingsTable();
  const resultsEl = document.getElementById('results-section');
  if (holdings.length === 0) {
    resultsEl.classList.add('hidden');
  } else if (!resultsEl.classList.contains('hidden')) {
    renderSpectrum();
  }
}

// ═══════════════════════════════════════════════
//  PERSONA
// ═══════════════════════════════════════════════

function setPersona(persona) {
  selectedPersona = persona;
  document.querySelectorAll('.persona-card').forEach(c =>
    c.classList.toggle('active', c.dataset.persona === persona)
  );
  highlightActiveMethod();
}

function highlightActiveMethod() {
  const methodMap = { speculator: 'a', passive: 'b', legacy: 'c' };
  const active    = methodMap[selectedPersona];
  ['a', 'b', 'c'].forEach(m => {
    const card = document.getElementById(`method-card-${m}`);
    const tag  = card?.querySelector('.msc-highlighted-tag');
    if (!card) return;
    card.classList.toggle('method-card--highlighted', m === active);
    if (tag) tag.classList.toggle('hidden', m !== active);
  });
}

// ═══════════════════════════════════════════════
//  CALCULATE
// ═══════════════════════════════════════════════

async function calculate() {
  if (!holdings.length) return;
  const btn       = document.getElementById('calculate-btn');
  const resultsEl = document.getElementById('results-section');

  btn.disabled  = true;
  btn.innerHTML = `<span class="btn-spinner"></span>`;

  // Refresh live prices
  const updates = await Promise.all(
    holdings.map(async h => {
      const live = await fetchLivePrice(h.ticker);
      return live ? { id: h.id, price: live.price, priceSource: 'live' } : null;
    })
  );
  updates.forEach(u => {
    if (!u) return;
    const h = holdings.find(x => x.id === u.id);
    if (h) { h.price = u.price; h.priceSource = u.priceSource; }
  });

  renderHoldingsTable();
  renderSpectrum();

  resultsEl.classList.remove('hidden');
  setTimeout(() => resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);

  btn.disabled  = false;
  btn.innerHTML = `<span>${escapeHtml(t('btnCalculate'))}</span>`;
}

// ═══════════════════════════════════════════════
//  SPECTRUM RENDER
// ═══════════════════════════════════════════════

function renderSpectrum() {
  const totalValueUSD = holdings.reduce((s, h) => s + h.shares * h.price, 0);

  const zakatA = totalValueUSD * ZAKAT_RATE;
  const zakatB = totalValueUSD * METHOD_B_PROXY * ZAKAT_RATE;
  const gapAB  = zakatA - zakatB;

  // Dividend input (Method C) — user-entered in selected currency, convert to USD
  const divInputEl  = document.getElementById('dividend-input');
  const divInputVal = parseFloat(divInputEl?.value || 0) || 0;
  const divUSD      = divInputVal / (CURRENCIES[selectedCurrency]?.rate || 1);
  const zakatC      = divUSD * ZAKAT_RATE;

  // Method A
  document.getElementById('method-a-amount').textContent = cvt(zakatA);
  document.getElementById('method-a-formula').textContent =
    `${cvt(totalValueUSD)} × 2.5% = ${cvt(zakatA)}`;

  // Method B
  document.getElementById('method-b-amount').textContent = cvt(zakatB);
  document.getElementById('method-b-formula').textContent =
    `${cvt(totalValueUSD)} × 30% × 2.5% = ${cvt(zakatB)}`;

  // Method C
  document.getElementById('method-c-amount').textContent =
    divInputVal > 0 ? cvt(zakatC) : '—';
  document.getElementById('method-c-formula').textContent =
    divInputVal > 0
      ? `${cvt(divUSD)} × 2.5% = ${cvt(zakatC)}`
      : 'dividends × 2.5%';

  // Gap
  document.getElementById('gap-amount').textContent = cvt(gapAB);
  const gapPct = zakatB > 0 ? Math.round((gapAB / zakatB) * 100) : 0;
  const gapPctEl = document.getElementById('gap-pct');
  if (gapPctEl) {
    gapPctEl.textContent = gapPct > 0 ? t('gapPctText', gapPct) : '';
  }
  const gapCaption = document.getElementById('gap-caption');
  if (gapCaption) {
    gapCaption.textContent = t('gapCaption', cvtLabel(totalValueUSD));
  }

  // Method C hint (when no dividends entered)
  const hintEl = document.getElementById('method-c-hint');
  if (hintEl) {
    if (divInputVal <= 0 && totalValueUSD > 0) {
      const yieldLow  = cvt(totalValueUSD * 0.02 * ZAKAT_RATE);
      const yieldHigh = cvt(totalValueUSD * 0.04 * ZAKAT_RATE);
      hintEl.textContent = t('methodCHintText', yieldLow, yieldHigh);
    } else {
      hintEl.textContent = '';
    }
  }

  // Nisab
  const nisabEl  = document.getElementById('nisab-notice');
  const nisabMet = totalValueUSD >= NISAB_USD;
  if (!nisabMet) {
    nisabEl.querySelector('.nisab-value').textContent = cvt(NISAB_USD);
    nisabEl.classList.remove('hidden');
  } else {
    nisabEl.classList.add('hidden');
  }

  // Update hawl nisab display
  const hawlNisabEl = document.getElementById('hawl-nisab-value');
  if (hawlNisabEl) hawlNisabEl.textContent = cvt(NISAB_USD);

  // Highlight persona card
  highlightActiveMethod();
  updateHawlClock();
}

function onDividendInput() {
  if (holdings.length && !document.getElementById('results-section').classList.contains('hidden')) {
    renderSpectrum();
  }
}

// ═══════════════════════════════════════════════
//  HAWL CLOCK
// ═══════════════════════════════════════════════

function updateHawlClock() {
  const input       = document.getElementById('hawl-date-input');
  const displayEl   = document.getElementById('hawl-clock-display');
  if (!input || !input.value) { displayEl?.classList.add('hidden'); return; }

  const nisabDate   = new Date(input.value + 'T00:00:00');
  const HAWL_MS     = LUNAR_YEAR_DAYS * 86400000;
  const today       = new Date();
  today.setHours(0, 0, 0, 0);

  const elapsedMs      = today - nisabDate;
  const completedHawls = Math.max(0, Math.floor(elapsedMs / HAWL_MS));
  const currentHawlNum = completedHawls + 1;
  const cycleStart     = new Date(nisabDate.getTime() + completedHawls * HAWL_MS);
  const cycleDue       = new Date(nisabDate.getTime() + currentHawlNum * HAWL_MS);
  const cycleElapsed   = today - cycleStart;
  const pct            = Math.min(100, Math.max(0, Math.round((cycleElapsed / HAWL_MS) * 100)));
  const daysLeft       = Math.ceil((cycleDue - today) / 86400000);
  const isDue          = completedHawls >= 1;

  const fmt = d => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Cycle label & due badge
  const cycleLabelEl = document.getElementById('hawl-cycle-label');
  const dueBadgeEl   = document.getElementById('hawl-due-badge');
  if (cycleLabelEl) {
    cycleLabelEl.textContent = t('hawlCycleInProgress', currentHawlNum);
  }
  if (dueBadgeEl) {
    dueBadgeEl.textContent = t('hawlDueBadge');
    dueBadgeEl.classList.toggle('hidden', !isDue);
  }

  document.getElementById('hawl-progress-bar').style.width = pct + '%';
  document.getElementById('hawl-progress-bar').className =
    'hawl-progress-fill' + (isDue ? ' hawl-fill--due' : '');
  document.getElementById('hawl-pct').textContent  = pct + '%';
  document.getElementById('hawl-start-label').textContent = fmt(cycleStart);
  document.getElementById('hawl-due-label').textContent   = fmt(cycleDue);

  const statusEl = document.getElementById('hawl-status');
  if (isDue) {
    const extra = completedHawls > 1 ? t('hawlStatusOverdue', completedHawls) : '';
    statusEl.textContent = t('hawlStatusDue', fmt(new Date(nisabDate.getTime() + HAWL_MS)), extra);
    statusEl.className   = 'hawl-status hawl-status--due';
  } else {
    statusEl.textContent = t('hawlStatusPending', daysLeft, fmt(cycleDue));
    statusEl.className   = 'hawl-status hawl-status--pending';
  }

  displayEl.classList.remove('hidden');
}

// ═══════════════════════════════════════════════
//  AUTOCOMPLETE
// ═══════════════════════════════════════════════

function initAutocomplete(inputEl, dropdownEl, onSelect) {
  let acIndex = -1;

  function show(matches) {
    if (!matches.length) { hide(); return; }
    dropdownEl.innerHTML = matches.map(([ticker, d]) =>
      `<div class="autocomplete-item" data-ticker="${escapeHtml(ticker)}">
        <span class="ac-ticker">${escapeHtml(ticker)}</span>
        <span class="ac-name">${escapeHtml(d.name)}</span>
      </div>`
    ).join('');
    dropdownEl.classList.remove('hidden');
    acIndex = -1;
  }

  function hide() {
    dropdownEl.classList.add('hidden');
    dropdownEl.innerHTML = '';
    acIndex = -1;
  }

  function onInput() {
    const q = inputEl.value.trim().toUpperCase();
    if (!q) { hide(); return; }
    const matches = Object.entries(STOCK_DATA)
      .filter(([t, d]) => t.startsWith(q) || d.name.toUpperCase().includes(q))
      .slice(0, 7);
    show(matches);
  }

  function onKeydown(e) {
    const items = dropdownEl.querySelectorAll('.autocomplete-item');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      acIndex = Math.min(items.length - 1, acIndex + 1);
      items.forEach((el, i) => el.classList.toggle('focused', i === acIndex));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      acIndex = Math.max(-1, acIndex - 1);
      items.forEach((el, i) => el.classList.toggle('focused', i === acIndex));
    } else if (e.key === 'Enter' && acIndex >= 0) {
      e.preventDefault();
      const f = items[acIndex];
      inputEl.value = f.dataset.ticker; hide(); onSelect(f.dataset.ticker);
    } else if (e.key === 'Escape') {
      hide();
    } else if (e.key === 'Tab' && !dropdownEl.classList.contains('hidden')) {
      const f = items[acIndex >= 0 ? acIndex : 0];
      if (f) { e.preventDefault(); inputEl.value = f.dataset.ticker; hide(); onSelect(f.dataset.ticker); }
    }
  }

  function onDocClick(e) {
    if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) hide();
  }

  function onDropdownClick(e) {
    const item = e.target.closest('.autocomplete-item');
    if (!item) return;
    inputEl.value = item.dataset.ticker; hide(); onSelect(item.dataset.ticker);
  }

  inputEl.addEventListener('input',   onInput);
  inputEl.addEventListener('keydown', onKeydown);
  dropdownEl.addEventListener('click', onDropdownClick);
  document.addEventListener('click',  onDocClick);

  return {
    destroy() {
      inputEl.removeEventListener('input',   onInput);
      inputEl.removeEventListener('keydown', onKeydown);
      dropdownEl.removeEventListener('click', onDropdownClick);
      document.removeEventListener('click',  onDocClick);
      hide();
    }
  };
}

// --- Quick-pick ---
function pickTicker(ticker) {
  openAddHoldingModal();
  setTimeout(() => {
    document.getElementById('modal-ticker').value = ticker;
    onModalTickerSelected(ticker);
  }, 80);
}

// ═══════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initCurrencySelectors();
  renderHoldingsTable();

  document.getElementById('add-holding-modal').addEventListener('click', e => {
    if (e.target.id === 'add-holding-modal') closeAddHoldingModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAddHoldingModal();
  });
  document.getElementById('modal-shares').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAddHolding();
  });
});
