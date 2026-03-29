/* ==============================================
   ZakatEngine V1 — Calculation Engine
   ============================================== */

// --- Constants ---
const ZAKAT_RATE        = 0.025;   // 2.5%
const NISAB_GOLD_GRAMS  = 85;      // grams of gold
const METHOD_B_PROXY    = 0.30;    // 30% zakatable asset proxy (IFG / Qaradawi)

// Gold price hardcoded — approximately March 2026
// ~$2,950 / troy oz  ÷  31.1035 g/oz  ≈  $94.83/g
const GOLD_PRICE_PER_GRAM = 94.83;
const GOLD_PRICE_DATE     = 'March 2026';

// Nisab in USD — all internal math stays in USD; convert only at display boundary
const NISAB_USD = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM; // ≈ $8,060

// --- Hardcoded Stock Prices (approx. March 2026) ---
const STOCK_DATA = {
  'AAPL':  { price: 213.50,  name: 'Apple Inc.' },
  'MSFT':  { price: 388.20,  name: 'Microsoft Corp.' },
  'AMZN':  { price: 202.40,  name: 'Amazon.com Inc.' },
  'GOOGL': { price: 171.30,  name: 'Alphabet Inc.' },
  'META':  { price: 558.90,  name: 'Meta Platforms Inc.' },
  'TSLA':  { price: 287.40,  name: 'Tesla Inc.' },
  'NVDA':  { price: 133.60,  name: 'NVIDIA Corp.' },
  'BRK.B': { price: 463.10,  name: 'Berkshire Hathaway B' },
  'JPM':   { price: 252.80,  name: 'JPMorgan Chase & Co.' },
  'V':     { price: 348.70,  name: 'Visa Inc.' },
  'MA':    { price: 534.20,  name: 'Mastercard Inc.' },
  'NFLX':  { price: 978.40,  name: 'Netflix Inc.' },
  'AMD':   { price: 116.50,  name: 'Advanced Micro Devices' },
  'XOM':   { price: 109.80,  name: 'Exxon Mobil Corp.' },
  'DIS':   { price: 107.30,  name: 'The Walt Disney Co.' },
  'PYPL':  { price: 72.40,   name: 'PayPal Holdings Inc.' },
  'UBER':  { price: 79.60,   name: 'Uber Technologies Inc.' },
  'CRM':   { price: 319.50,  name: 'Salesforce Inc.' },
  'INTC':  { price: 21.80,   name: 'Intel Corp.' },
  'BABA':  { price: 89.20,   name: 'Alibaba Group' },
};

// --- Exchange Rates (hardcoded, approx. March 2026) ---
const EXCHANGE_RATES = {
  USD: { symbol: '$',    rate: 1.0000, label: 'USD — US Dollar' },
  EUR: { symbol: '€',    rate: 0.9210, label: 'EUR — Euro' },
  GBP: { symbol: '£',    rate: 0.7920, label: 'GBP — British Pound' },
  MAD: { symbol: 'MAD ', rate: 10.050, label: 'MAD — Moroccan Dirham' },
  SAR: { symbol: 'SAR ', rate: 3.7500, label: 'SAR — Saudi Riyal' },
  AED: { symbol: 'AED ', rate: 3.6725, label: 'AED — UAE Dirham' },
  CAD: { symbol: 'C$',   rate: 1.3850, label: 'CAD — Canadian Dollar' },
  AUD: { symbol: 'A$',   rate: 1.5420, label: 'AUD — Australian Dollar' },
};
const RATES_DATE = 'March 2026';

// --- State ---
let currentIntention = 'active'; // 'active' | 'passive'
let portfolioACs     = [];       // autocomplete instances, indexed by row

// --- Helpers ---

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function fmtNum(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

// --- Currency ---

function getSelectedCurrency() {
  return document.getElementById('currency-select')?.value || 'USD';
}


function initCurrencySelector() {
  const select = document.getElementById('currency-select');
  if (!select) return;
  select.innerHTML = Object.entries(EXCHANGE_RATES)
    .map(([code, { label }]) => `<option value="${escapeHtml(code)}">${escapeHtml(label)}</option>`)
    .join('');
}

function onCurrencyChange() {
  const code = getSelectedCurrency();
  const note = document.getElementById('rates-note');
  if (note) {
    if (code !== 'USD') {
      note.textContent = `Rates as of ${RATES_DATE}`;
      note.classList.remove('hidden');
    } else {
      note.classList.add('hidden');
    }
  }
  // Re-render if results are visible
  const resultsEl = document.getElementById('results-section');
  if (resultsEl && !resultsEl.classList.contains('hidden') && resultsEl._lastStocks) {
    renderPortfolioResults(resultsEl._lastStocks, code, currentIntention);
  }
}

// --- Autocomplete Factory ---
// Each call returns { show, hide, navigate, selectFocused, destroy }
// allowing per-row autocomplete with proper listener cleanup.

function createAutocomplete(inputEl, dropdownEl) {
  let acIndex = -1;

  function show(query) {
    if (!query || query.length < 1) { hide(); return; }
    const q = query.toUpperCase();
    const matches = Object.entries(STOCK_DATA)
      .filter(([t, d]) => t.startsWith(q) || d.name.toUpperCase().includes(q))
      .slice(0, 7);
    if (matches.length === 0) { hide(); return; }
    acIndex = -1;
    dropdownEl.innerHTML = matches.map(([t, d]) => `
      <div class="autocomplete-item" role="option" data-ticker="${escapeHtml(t)}"
           onmousedown="_acPickFromDropdown(event); return false;">
        <span class="ac-ticker">${escapeHtml(t)}</span>
        <span class="ac-name">${escapeHtml(d.name)}</span>
      </div>
    `).join('');
    dropdownEl.classList.remove('hidden');
  }

  function hide() {
    dropdownEl.classList.add('hidden');
    dropdownEl.innerHTML = '';
    acIndex = -1;
  }

  function navigate(direction) {
    const items = dropdownEl.querySelectorAll('.autocomplete-item');
    if (!items.length) return;
    items.forEach(el => el.classList.remove('focused'));
    acIndex = Math.max(-1, Math.min(items.length - 1, acIndex + direction));
    if (acIndex >= 0) {
      items[acIndex].classList.add('focused');
      items[acIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function selectFocused() {
    const focused = dropdownEl.querySelector('.autocomplete-item.focused');
    if (focused) {
      inputEl.value = focused.dataset.ticker;
      hide();
      return true;
    }
    return false;
  }

  function onInput() {
    const pos = inputEl.selectionStart;
    inputEl.value = inputEl.value.toUpperCase();
    try { inputEl.setSelectionRange(pos, pos); } catch (_) {}
    show(inputEl.value);
  }

  function onKeydown(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); navigate(1);  return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); navigate(-1); return; }
    if (e.key === 'Escape')    { hide(); return; }
    if (e.key === 'Enter') {
      if (selectFocused()) return;
      hide();
    }
  }

  function onFocus() {
    if (inputEl.value) show(inputEl.value);
  }

  function onDocClick(e) {
    if (!inputEl.closest('.ticker-wrapper')?.contains(e.target)) hide();
  }

  inputEl.addEventListener('input',   onInput);
  inputEl.addEventListener('keydown', onKeydown);
  inputEl.addEventListener('focus',   onFocus);
  document.addEventListener('click',  onDocClick);

  function destroy() {
    inputEl.removeEventListener('input',   onInput);
    inputEl.removeEventListener('keydown', onKeydown);
    inputEl.removeEventListener('focus',   onFocus);
    document.removeEventListener('click',  onDocClick);
    hide();
  }

  return { show, hide, navigate, selectFocused, destroy };
}

// Called from autocomplete item onmousedown — resolves which row owns the dropdown
function _acPickFromDropdown(event) {
  const item = event.target.closest('.autocomplete-item');
  if (!item) return;
  const dropdown = item.closest('.autocomplete-dropdown');
  if (!dropdown) return;
  const row = dropdown.closest('.portfolio-row');
  if (!row) return;
  const tickerInput = row.querySelector('.row-ticker');
  if (tickerInput) {
    tickerInput.value = item.dataset.ticker;
  }
  const idx = parseInt(row.dataset.rowId, 10);
  if (!isNaN(idx) && portfolioACs[idx]) portfolioACs[idx].hide();
  row.querySelector('.row-shares')?.focus();
}

// --- Ticker shortcuts ---
// pickTicker targets the first portfolio row (for ticker pill clicks)
function pickTicker(ticker) {
  const firstRow = document.querySelector('.portfolio-row');
  if (!firstRow) return;
  const input = firstRow.querySelector('.row-ticker');
  if (input) {
    input.value = ticker;
    const idx = parseInt(firstRow.dataset.rowId, 10);
    if (!isNaN(idx) && portfolioACs[idx]) portfolioACs[idx].hide();
    firstRow.querySelector('.row-shares')?.focus();
  }
}

// --- Ticker chip toggle ---
let tickerChipsExpanded = false;

function toggleMoreTickers() {
  tickerChipsExpanded = !tickerChipsExpanded;
  const extra = document.getElementById('ticker-pills-extra');
  const btn   = document.getElementById('show-more-btn');
  if (tickerChipsExpanded) {
    extra.classList.add('visible');
    btn.textContent = '− show less';
  } else {
    extra.classList.remove('visible');
    btn.textContent = '+ 12 more';
  }
}

// --- Portfolio Row Management ---
let rowIdCounter = 0;

function buildRowEl(rowId) {
  const row = document.createElement('div');
  row.className = 'portfolio-row';
  row.dataset.rowId = rowId;
  row.innerHTML = `
    <div class="input-group ticker-wrapper">
      <label>Ticker</label>
      <input type="text" class="row-ticker" placeholder="AAPL"
             maxlength="10" autocomplete="off" spellcheck="false"
             aria-autocomplete="list">
      <div class="autocomplete-dropdown hidden" role="listbox"></div>
    </div>
    <div class="input-group shares-wrapper">
      <label>Shares</label>
      <input type="number" class="row-shares" placeholder="100" min="0.001" step="any">
    </div>
    <button class="remove-row-btn" onclick="removePortfolioRow(this)" title="Remove row" aria-label="Remove row">✕</button>
  `;
  return row;
}

function addPortfolioRow() {
  const container = document.getElementById('portfolio-rows');
  const id = rowIdCounter++;
  const row = buildRowEl(id);
  container.appendChild(row);

  const inputEl    = row.querySelector('.row-ticker');
  const dropdownEl = row.querySelector('.autocomplete-dropdown');
  const ac = createAutocomplete(inputEl, dropdownEl);
  portfolioACs[id] = ac;

  row.querySelector('.row-shares').addEventListener('keydown', e => {
    if (e.key === 'Enter') calculate();
  });
}

function removePortfolioRow(btn) {
  const allRows = document.querySelectorAll('.portfolio-row');
  if (allRows.length <= 1) return; // always keep at least 1
  const row = btn.closest('.portfolio-row');
  const id  = parseInt(row.dataset.rowId, 10);
  if (!isNaN(id) && portfolioACs[id]) {
    portfolioACs[id].destroy();
    portfolioACs[id] = null;
  }
  row.remove();
}

function initPortfolio() {
  rowIdCounter = 0;
  portfolioACs = [];
  document.getElementById('portfolio-rows').innerHTML = '';
  addPortfolioRow();
}

// --- Intention Toggle ---

function setIntention(value) {
  currentIntention = value;
  document.querySelectorAll('.intention-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.intention === value);
  });
  document.getElementById('intention-hint-active')?.classList.toggle('hidden', value !== 'active');
  document.getElementById('intention-hint-passive')?.classList.toggle('hidden', value !== 'passive');
  // Re-render results if visible
  const resultsEl = document.getElementById('results-section');
  if (resultsEl && !resultsEl.classList.contains('hidden') && resultsEl._lastStocks) {
    renderPortfolioResults(resultsEl._lastStocks, getSelectedCurrency(), value);
  }
}

// --- Live Price Fetch (CORS proxy) ---

async function fetchLivePrice(ticker) {
  try {
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=1d`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    if (typeof price !== 'number' || price <= 0 || !isFinite(price)) return null;
    return price;
  } catch {
    return null;
  }
}

// --- Main Calculate ---

async function calculate() {
  // Collect non-empty rows
  const rowEls = document.querySelectorAll('.portfolio-row');
  const rowData = [];
  for (const row of rowEls) {
    const ticker    = row.querySelector('.row-ticker').value.trim().toUpperCase();
    const sharesRaw = row.querySelector('.row-shares').value.trim();
    if (!ticker && !sharesRaw) continue; // skip fully empty rows
    rowData.push({ ticker, sharesRaw });
  }

  if (rowData.length === 0) {
    showError('Please enter at least one stock ticker and number of shares.');
    return;
  }
  for (const { ticker, sharesRaw } of rowData) {
    if (!ticker) { showError('One of your rows is missing a ticker symbol.'); return; }
    const shares = parseFloat(sharesRaw);
    if (!sharesRaw || isNaN(shares) || shares <= 0) {
      showError(`Please enter a valid number of shares for <strong>${escapeHtml(ticker)}</strong>.`);
      return;
    }
  }

  const btn = document.getElementById('calculate-btn');
  btn.disabled = true;
  btn.textContent = 'Calculating…';

  const resultsEl = document.getElementById('results-section');
  resultsEl.classList.remove('hidden');
  resultsEl.innerHTML = '<p class="loading-msg">Fetching prices…</p>';

  // Fetch all prices in parallel, tolerate individual failures
  const settled = await Promise.allSettled(
    rowData.map(({ ticker }) => fetchLivePrice(ticker))
  );

  const stocks = rowData.map(({ ticker, sharesRaw }, i) => {
    const shares = parseFloat(sharesRaw);
    let stockPrice, priceSource, stockName, priceError = false;

    const result = settled[i];
    if (result.status === 'fulfilled' && result.value !== null) {
      stockPrice  = result.value;
      priceSource = 'live';
      stockName   = STOCK_DATA[ticker]?.name || ticker;
    } else if (STOCK_DATA[ticker]) {
      stockPrice  = STOCK_DATA[ticker].price;
      stockName   = STOCK_DATA[ticker].name;
      priceSource = `approx. ${GOLD_PRICE_DATE}`;
    } else {
      stockPrice  = null;
      stockName   = ticker;
      priceSource = 'unavailable';
      priceError  = true;
    }

    const portfolioValueUSD = priceError ? 0 : shares * stockPrice;
    const zakatAusd         = portfolioValueUSD * ZAKAT_RATE;
    const zakatBusd         = portfolioValueUSD * METHOD_B_PROXY * ZAKAT_RATE;

    return { ticker, stockName, shares, stockPrice, priceSource, priceError,
             portfolioValueUSD, zakatAusd, zakatBusd };
  });

  btn.disabled = false;
  btn.textContent = 'Calculate Portfolio Zakat';

  renderPortfolioResults(stocks, getSelectedCurrency(), currentIntention);
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Render (canonical signature: stocks[], currencyCode, intention) ---

function renderPortfolioResults(stocks, currencyCode, intention) {
  const el = document.getElementById('results-section');
  // Persist for re-render on currency / intention change
  el._lastStocks = stocks;

  const cur = EXCHANGE_RATES[currencyCode] || EXCHANGE_RATES.USD;

  function cvt(usd) {
    return cur.symbol + new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(usd * cur.rate);
  }

  // All comparison math stays in USD
  const totalValueUSD  = stocks.reduce((s, r) => s + r.portfolioValueUSD, 0);
  const totalZakatAusd = stocks.reduce((s, r) => s + r.zakatAusd, 0);
  const totalZakatBusd = stocks.reduce((s, r) => s + r.zakatBusd, 0);
  const nisabMet       = totalValueUSD >= NISAB_USD;
  const difference     = totalZakatAusd - totalZakatBusd;
  const diffPct        = totalZakatBusd > 0 ? ((totalZakatAusd / totalZakatBusd) - 1) * 100 : 0;

  const nisabDisplay = cvt(NISAB_USD);
  const nisabFormula = `${NISAB_GOLD_GRAMS}g gold × ${cvt(GOLD_PRICE_PER_GRAM)}/g = ${nisabDisplay}`;

  // Per-stock table rows
  const stockRows = stocks.map(s => {
    if (s.priceError) {
      return `<tr class="stock-row price-error-row">
        <td><strong>${escapeHtml(s.ticker)}</strong></td>
        <td>—</td>
        <td class="price-warn">Price unavailable</td>
        <td>—</td><td>—</td><td>—</td><td>—</td>
      </tr>`;
    }
    return `<tr class="stock-row">
      <td><strong>${escapeHtml(s.ticker)}</strong></td>
      <td class="stock-name-cell">${escapeHtml(s.stockName)}</td>
      <td>${cvt(s.stockPrice)}<span class="price-source-note">${escapeHtml(s.priceSource)}</span></td>
      <td>${fmtNum(s.shares)}</td>
      <td>${cvt(s.portfolioValueUSD)}</td>
      <td class="zakat-a-cell">${cvt(s.zakatAusd)}</td>
      <td class="zakat-b-cell">${cvt(s.zakatBusd)}</td>
    </tr>`;
  }).join('');

  // Method badge labels depend on intention
  const isPassive  = intention === 'passive';
  const labelA     = isPassive ? 'Maximum Obligation' : 'Primary Method';
  const labelB     = isPassive ? 'Recommended'        : 'Conservative Alternative';
  const classA     = isPassive ? 'badge-secondary'    : 'badge-primary';
  const classB     = isPassive ? 'badge-primary'      : 'badge-secondary';
  const cardAExtra = isPassive ? 'card-secondary'     : 'card-primary';
  const cardBExtra = isPassive ? 'card-primary'       : 'card-secondary';

  // Method C — passive only, placeholder (no dividend data in V1)
  const methodCHtml = isPassive ? `
    <div class="result-card card-c">
      <span class="result-badge badge-info">Method C — Dividend Method</span>
      <h3>Dividends Only</h3>
      <div class="method-c-body">
        <p>As a <strong>long-term passive investor</strong>, some scholars hold that zakat applies only to dividends received — not the full market value of your shares.</p>
        <p class="method-c-formula">Formula: <em>Total Dividends × 2.5%</em></p>
        <div class="method-c-example">
          Example: if you received <strong>${cvt(1000)}</strong> in dividends, your zakat would be <strong>${cvt(25)}</strong>
        </div>
        <p class="method-c-note">Dividend data is not fetched automatically in V1. Use your actual dividend statement to calculate.</p>
      </div>
    </div>` : '';

  const ratesNote = currencyCode !== 'USD'
    ? `<span class="rates-inline-note">Rates as of ${RATES_DATE}</span>` : '';

  const nisabStatus = `
    <div class="portfolio-meta">
      <span class="nisab-status ${nisabMet ? 'nisab-met' : 'nisab-not-met'}">
        Nisab ${nisabMet ? 'met ✓' : 'not met ✗'} — threshold: ${nisabDisplay}
      </span>
      ${ratesNote}
    </div>`;

  const nisabNotice = !nisabMet ? `
    <div class="nisab-notice">
      <h3>No Zakat Due</h3>
      <p>Your total portfolio value of <strong>${cvt(totalValueUSD)}</strong> is below the nisab threshold of <strong>${nisabDisplay}</strong>.</p>
      <p>Zakat on stocks is only obligatory when the portfolio meets or exceeds the nisab and has been held for one full lunar year (hawl).</p>
    </div>` : '';

  const methodsGrid = nisabMet ? `
    <div class="methods-grid${isPassive ? ' passive-mode' : ''}">
      <div class="result-card card-a ${cardAExtra}">
        <span class="result-badge ${classA}">${labelA} — Method A</span>
        <h3>Market Value</h3>
        <div class="zakat-amount">${cvt(totalZakatAusd)}</div>
        <div class="result-formula">${cvt(totalValueUSD)} × 2.5%</div>
      </div>
      <div class="result-card card-b ${cardBExtra}">
        <span class="result-badge ${classB}">${labelB} — Method B</span>
        <h3>Underlying Assets</h3>
        <div class="zakat-amount">${cvt(totalZakatBusd)}</div>
        <div class="result-formula">${cvt(totalValueUSD)} × 30% × 2.5%</div>
      </div>
      ${methodCHtml}
    </div>

    <div class="difference-box">
      <div class="difference-label">Difference Between Methods A &amp; B</div>
      <div class="difference-amount">${cvt(difference)}</div>
      <div class="difference-pct">Method A yields <strong>${diffPct.toFixed(0)}% more</strong> than Method B</div>
      <div class="difference-insight">Same shares. Same price. Same day. Two valid scholarly methods.</div>
    </div>` : '';

  const assumptions = `
    <div class="assumptions-box">
      <h4>Assumptions</h4>
      <ul class="assumptions-list">
        <li>Holding period assumed ≥ 1 lunar year (hawl). If you have not held these shares for a full lunar year, zakat is not yet due.</li>
        <li>Nisab: ${nisabFormula} (gold price as of ${GOLD_PRICE_DATE})</li>
        <li>Method B uses a 30% proxy for zakatable assets — a scholarly approximation when company balance sheet data is unavailable. (Source: IFG, Qaradawi)</li>
        <li>Method B Proxy: The 30% is a common approximation for major indices (S&amp;P 500 / FTSE).</li>
        <li>Intention Rule: "Active Trading" assumes intent to sell the stock for profit.</li>
        <li>Passive Rule: "Long-Term Passive" assumes you hold for growth/dividends with no immediate intent to sell the principal.</li>
        <li>Zakat rate: 2.5% (assumes lunar year; solar equivalent ≈ 2.5775% — not used here)</li>
        ${currencyCode !== 'USD'
          ? `<li>Currency: ${currencyCode} — converted at hardcoded rates as of ${RATES_DATE}. Verify current rates for precision.</li>`
          : '<li>Currency: USD</li>'}
      </ul>
      <p class="disclaimer">This tool produces estimates — it is not a religious ruling (fatwa). Consult a qualified scholar for your specific situation.</p>
    </div>`;

  el.innerHTML = `
    <div class="portfolio-summary">
      <div class="portfolio-table-wrap">
        <table class="portfolio-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Company</th>
              <th>Price</th>
              <th>Shares</th>
              <th>Value</th>
              <th class="zakat-a-col">Zakat A</th>
              <th class="zakat-b-col">Zakat B</th>
            </tr>
          </thead>
          <tbody>${stockRows}</tbody>
          <tfoot>
            <tr class="totals-row">
              <td colspan="4"><strong>Portfolio Total</strong></td>
              <td><strong>${cvt(totalValueUSD)}</strong></td>
              <td class="zakat-a-cell"><strong>${cvt(totalZakatAusd)}</strong></td>
              <td class="zakat-b-cell"><strong>${cvt(totalZakatBusd)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
      ${nisabStatus}
    </div>

    ${nisabNotice}
    ${methodsGrid}
    ${assumptions}
  `;
}

// --- Error ---

function showError(message) {
  const el = document.getElementById('results-section');
  el.classList.remove('hidden');
  el.innerHTML = `<div class="error-box"><strong>Error:</strong> ${message}</div>`;
  const btn = document.getElementById('calculate-btn');
  if (btn) { btn.disabled = false; btn.textContent = 'Calculate Portfolio Zakat'; }
}

// --- Init ---

document.addEventListener('DOMContentLoaded', () => {
  initCurrencySelector();
  initPortfolio();
});
