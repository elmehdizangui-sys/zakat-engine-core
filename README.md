# Zakat Al-Mall — زكاة المال

**A stock zakat calculator that shows three scholarly methods side by side, so you can see the difference and decide — or ask a scholar.**

---

## What it does

You own stocks. Islam requires zakat on wealth that has been held for a full lunar year (hawl) above a minimum threshold (nisab). The problem: scholars disagree on *how* to calculate it.

Most online calculators pick one method and hide the others. Zakat Al-Mall shows all three:

| Method | Basis | Who it applies to |
|--------|-------|-------------------|
| **A — Market Value** | Full portfolio value × 2.5% | Active traders, frequent buyers/sellers |
| **B — Underlying Assets** | Portfolio value × 30% × 2.5% | Long-term passive investors |
| **C — Dividends Only** | Dividends received × 2.5% | Investors who live off income and rarely sell |

The 30% in Method B is a scholarly proxy for a company's zakatable liquid assets (cash, receivables, inventory) when balance sheet data isn't available — accepted by Qaradawi, IFG, and many Hanafi/Shafi'i scholars.

## How to use it

1. **Pick your investor type** — the app highlights the method most relevant to your situation
2. **Add your holdings** — search by ticker, enter share count; prices are fetched live or fall back to March 2026 hardcoded values
3. **Set your currency** — 13 currencies supported
4. **Check the Hawl Clock** — enter the date your portfolio first reached nisab; the clock shows whether a full lunar year (354 days) has passed
5. **Read the results** — all three methods calculated, gaps explained

## The key insight

Method A yields roughly 8× more than Method B. Same portfolio. Same day. Most people have no idea this gap exists. This tool makes it visible.

## Language support

The app is fully translated into **Arabic (العربية)** and French — switch with the EN / AR toggle in the header.

Arabic mode activates full right-to-left layout and all labels, method descriptions, scholar attributions, assumptions, and error messages in Arabic. The i18n layer (`i18n.js`) drives every visible string — nothing is hardcoded in the HTML.

### i18n architecture

```
i18n.js
├── en: { … }   — English (default)
├── fr: { … }   — French
└── ar: { … }   — Arabic, RTL
```

`setLang(code)` sets `document.documentElement.lang` and `dir`, then walks every `[data-i18n]` element and replaces its content. Currency display is also direction-aware: in Arabic, the number appears before the symbol (`32,859 ر.س` instead of `SR32,859`).

### Adding a new language

1. Copy the `en` block in `i18n.js` and translate the values
2. Add the language code to the `SUPPORTED_LANGS` array
3. Add a button to the `lang-toggle` group in `index.html`

No build step. No tooling. Plain JS.

## Stack

Plain HTML + CSS + JS. No framework, no npm, no build step.

```
open index.html
```

Or serve it:

```
npx serve .
python3 -m http.server
```

## Supported tickers

25 major US equities with fallback prices (Mar 2026): AAPL, MSFT, GOOGL, AMZN, TSLA, META, NVDA, BRK.B, JPM, JNJ, V, WMT, NFLX, DIS, COST, ADBE, CRM, PYPL, INTC, AMD, and more. Live prices fetched via Yahoo Finance when available.

## References

- AAOIFI Shariah Standard No. 35: Zakat
- AAOIFI Shariah Standard No. 21: Financial Papers
- Yusuf al-Qaradawi, *Fiqh al-Zakah*
- Islamic Finance Guru (IFG) — zakat on stocks methodology
- Nisab: 85g gold standard (~$8,061 at Mar 2026 prices)

## Disclaimer

Educational only. Not a fatwa. Verify with a qualified scholar for your specific situation.

---

*Built by Elmehdi Zangui*
