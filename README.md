# ZakatEngine V0

**Two accepted scholarly methods for calculating zakat on stocks. Same portfolio. Different answers. You decide.**

## What it does

Enter a stock ticker and number of shares. The tool calculates your zakat due using two valid scholarly methods and shows the difference side by side.

**Method A — Market Value (AAOIFI SS 35 / NZF / Islamic Relief)**
Full portfolio value × 2.5%

**Method B — Underlying Assets (Qaradawi / IFG / Hanafi-Shafi'i)**
Portfolio value × 30% × 2.5%

The 30% is a scholarly proxy for zakatable company assets when balance sheet data is unavailable.

## The insight

Method A always yields exactly 233% more than Method B. Same shares. Same price. Same day. Most online calculators only show you one method.

## Stack

Plain HTML + CSS + JS. No build step. No framework. No npm.

## Run locally

```
open index.html
```

Or serve with any static server:

```
npx serve .
# or
python3 -m http.server
```

## Deploy

Push to GitHub → connect to Vercel or Netlify → done.

## Supported tickers (V0)

AAPL, MSFT, AMZN, GOOGL, META, TSLA, NVDA, BRK.B, JPM, V, MA, NFLX, AMD, XOM, DIS, PYPL, UBER, CRM, INTC, BABA

The tool attempts to fetch live prices via Yahoo Finance. If unavailable, it falls back to hardcoded approximate prices (noted with date stamp).

## References

- AAOIFI Shariah Standard No. 35: Zakat
- AAOIFI Shariah Standard No. 21: Financial Papers
- Yusuf al-Qaradawi, *Fiqh al-Zakah*
- Islamic Finance Guru (IFG) — zakat on stocks methodology
- Nisab: 85g gold standard

## Disclaimer

Educational purposes only. This is not a fatwa. Consult a qualified scholar for your specific situation.

---

*Built by Elmehdi Zangui*
