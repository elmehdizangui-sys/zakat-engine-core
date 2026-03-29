/* ==============================================
   ZakatEngine — i18n Translation Layer
   Supported: en, fr, ar (RTL)
   ============================================== */

const TRANSLATIONS = {

  en: {
    // Page meta
    pageTitle: 'ZakatEngine — Stock Zakat Calculator',

    // Header
    headerStandard: 'Based on AAOIFI Shariah Standard No. 35',

    // Hero
    heroNode1Label: 'Your Stock Portfolio',
    heroNode2Label: 'ZakatEngine',
    heroChipLabelA: 'Method A · Full Market Value',
    heroChipLabelB: 'Method B · 30% Proxy',
    heroCaption: 'Same portfolio. Two valid scholarly methods. See the difference.',

    // Controls
    labelCurrency: 'Currency',
    labelIntention: 'Investment Intention',
    btnIntentionActive: 'Active Trading',
    btnIntentionPassive: 'Long-Term Passive',
    hintActive: 'Holds for trading / resale — Method A applies as the primary obligation.',
    hintPassive: 'Holds for long-term growth / dividends — Method B is the scholarly recommendation.',

    // Portfolio panel
    panelTitle: 'Your Portfolio',
    quickFill: 'Quick fill:',
    showMore: '+ 12 more',
    showLess: '− show less',
    btnAddStock: '+ Add Stock',
    btnCalculate: 'Calculate Portfolio Zakat',
    btnCalculating: 'Calculating…',
    labelTicker: 'Ticker',
    labelShares: 'Shares',
    removeRowTitle: 'Remove row',
    removeRowAriaLabel: 'Remove row',

    // Results table headers
    thTicker: 'Ticker',
    thCompany: 'Company',
    thPrice: 'Price',
    thShares: 'Shares',
    thValue: 'Value',
    thZakatA: 'Zakat A',
    thZakatB: 'Zakat B',
    portfolioTotal: 'Portfolio Total',

    // Nisab status
    nisabMet: 'Nisab met ✓',
    nisabNotMet: 'Nisab not met ✗',
    nisabThreshold: 'threshold',
    ratesAsOf: 'Rates as of',
    fetchingPrices: 'Fetching prices…',
    priceUnavailable: 'Price unavailable',

    // Nisab notice
    noZakatDue: 'No Zakat Due',
    nisabNoticeBody: (value, threshold) =>
      `Your total portfolio value of <strong>${value}</strong> is below the nisab threshold of <strong>${threshold}</strong>.`,
    nisabNoticeHawl: 'Zakat on stocks is only obligatory when the portfolio meets or exceeds the nisab and has been held for one full lunar year (hawl).',

    // Method badges
    badgePrimary: 'Primary Method',
    badgeConservative: 'Conservative Alternative',
    badgeMaxObligation: 'Maximum Obligation',
    badgeRecommended: 'Recommended',

    // Method A card
    methodATitle: 'Market Value',
    // Method B card
    methodBTitle: 'Underlying Assets',

    // Method C
    methodCBadge: 'Method C — Dividend Method',
    methodCTitle: 'Dividends Only',
    methodCPassiveNote: (sym) => `As a <strong>long-term passive investor</strong>, some scholars hold that zakat applies only to dividends received — not the full market value of your shares.`,
    methodCFormula: 'Formula:',
    methodCFormulaExpr: 'Total Dividends × 2.5%',
    methodCExample: (amount, zakat) => `Example: if you received <strong>${amount}</strong> in dividends, your zakat would be <strong>${zakat}</strong>`,
    methodCNote: 'Dividend data is not fetched automatically in V1. Use your actual dividend statement to calculate.',

    // Difference box
    diffLabel: 'Difference Between Methods A & B',
    diffPct: (pct) => `Method A yields <strong>${pct}% more</strong> than Method B`,
    diffInsight: 'Same shares. Same price. Same day. Two valid scholarly methods.',

    // Assumptions
    assumptionsTitle: 'Assumptions',
    assumptionHawl: 'Holding period assumed ≥ 1 lunar year (hawl). If you have not held these shares for a full lunar year, zakat is not yet due.',
    assumptionNisab: (formula, date) => `Nisab: ${formula} (gold price as of ${date})`,
    assumptionProxy: 'Method B uses a 30% proxy for zakatable assets — a scholarly approximation when company balance sheet data is unavailable. (Source: IFG, Qaradawi)',
    assumptionProxySource: 'Method B Proxy: The 30% is a common approximation for major indices (S&P 500 / FTSE).',
    assumptionActiveRule: 'Intention Rule: "Active Trading" assumes intent to sell the stock for profit.',
    assumptionPassiveRule: 'Passive Rule: "Long-Term Passive" assumes you hold for growth/dividends with no immediate intent to sell the principal.',
    assumptionRate: 'Zakat rate: 2.5% (assumes lunar year; solar equivalent ≈ 2.5775% — not used here)',
    assumptionCurrencyUSD: 'Currency: USD',
    assumptionCurrencyForeign: (code, date) => `Currency: ${code} — converted at hardcoded rates as of ${date}. Verify current rates for precision.`,
    disclaimer: 'This tool produces estimates — it is not a religious ruling (fatwa). Consult a qualified scholar for your specific situation.',

    // Errors
    errNoStocks: 'Please enter at least one stock ticker and number of shares.',
    errMissingTicker: 'One of your rows is missing a ticker symbol.',
    errInvalidShares: (ticker) => `Please enter a valid number of shares for <strong>${ticker}</strong>.`,

    // Methodology section
    methodologyTitle: 'The Two Methods',
    methodologySub: 'Same shares. Same price. Same day. Two valid scholarly positions.',
    methodACardLabel: 'Method A — Full Market Value',
    methodACardTitle: 'Treat Stocks as Trading Goods',
    methodACardBody: 'Treats stocks as <strong>trading goods</strong>. Zakat is due on the full market value of the portfolio, regardless of the company\'s underlying assets.',
    methodAFormula: 'Portfolio Value × 2.5%',
    methodAScholars: '· Qaradawi · Hanafi/Shafi\'i scholars',
    methodBCardLabel: 'Method B — Underlying Assets',
    methodBCardTitle: 'Treat Stocks as Ownership Stakes',
    methodBCardBody: 'Treats stocks as <strong>partial ownership</strong> of a company. Only the zakatable assets of the company (cash, receivables, inventory) are dutiable — approximated at 30% of market value.',
    methodBFormula: 'Portfolio Value × 30% × 2.5%',
    methodBScholars: '· AAOIFI Standard No. 35 · IFG',
    proxyNote: 'The 30% is a scholarly proxy when company balance sheet data is unavailable. (IFG, Qaradawi)',
    keyInsightTitle: 'Why the difference matters:',
    keyInsightBody: 'Method A always yields significantly more than Method B. Most online calculators only show you one method. ZakatEngine shows both so you can make an informed decision — or consult a scholar.',

    // Sources
    sourcesTitle: 'Sources & Further Reading',
    sourceNZF: 'National Zakat Foundation',
    sourceIFG: 'Islamic Finance Guru — Zakat on Shares',
    sourceIslamQA: 'IslamQA on stocks',
    sourceIFGDetail: 'IFG detailed guide',
    sourceSeeAlso: 'See also:',

    // Footer
    footerBuiltBy: 'Built by',
    footerAuthor: 'Elmehdi Zangui',
    footerDisclaimer: 'Educational purposes only. This is not a fatwa. Consult a qualified scholar for your specific situation.',
    footerStandard: 'Based on AAOIFI Shariah Standard No. 35 and classical fiqh positions',
  },

  fr: {
    pageTitle: 'ZakatEngine — Calculateur de Zakat sur Actions',

    headerStandard: 'Basé sur la norme AAOIFI n° 35',

    heroNode1Label: 'Votre Portefeuille d\'Actions',
    heroNode2Label: 'ZakatEngine',
    heroChipLabelA: 'Méthode A · Valeur de marché',
    heroChipLabelB: 'Méthode B · Proxy 30%',
    heroCaption: 'Même portefeuille. Deux méthodes savantes valides. Comparez.',

    labelCurrency: 'Devise',
    labelIntention: 'Intention d\'Investissement',
    btnIntentionActive: 'Trading Actif',
    btnIntentionPassive: 'Passif Long Terme',
    hintActive: 'Détenu pour trading / revente — la Méthode A s\'applique comme obligation principale.',
    hintPassive: 'Détenu pour croissance / dividendes — la Méthode B est la recommandation savante.',

    panelTitle: 'Votre Portefeuille',
    quickFill: 'Saisie rapide :',
    showMore: '+ 12 autres',
    showLess: '− voir moins',
    btnAddStock: '+ Ajouter une action',
    btnCalculate: 'Calculer la Zakat du Portefeuille',
    btnCalculating: 'Calcul en cours…',
    labelTicker: 'Symbole',
    labelShares: 'Actions',
    removeRowTitle: 'Supprimer la ligne',
    removeRowAriaLabel: 'Supprimer la ligne',

    thTicker: 'Symbole',
    thCompany: 'Société',
    thPrice: 'Prix',
    thShares: 'Actions',
    thValue: 'Valeur',
    thZakatA: 'Zakat A',
    thZakatB: 'Zakat B',
    portfolioTotal: 'Total Portefeuille',

    nisabMet: 'Nisab atteint ✓',
    nisabNotMet: 'Nisab non atteint ✗',
    nisabThreshold: 'seuil',
    ratesAsOf: 'Taux au',
    fetchingPrices: 'Récupération des cours…',
    priceUnavailable: 'Prix indisponible',

    noZakatDue: 'Aucune Zakat Due',
    nisabNoticeBody: (value, threshold) =>
      `La valeur totale de votre portefeuille de <strong>${value}</strong> est inférieure au seuil du nisab de <strong>${threshold}</strong>.`,
    nisabNoticeHawl: 'La zakat sur les actions n\'est obligatoire que lorsque le portefeuille atteint ou dépasse le nisab et a été détenu pendant une année lunaire complète (hawl).',

    badgePrimary: 'Méthode Principale',
    badgeConservative: 'Alternative Conservative',
    badgeMaxObligation: 'Obligation Maximale',
    badgeRecommended: 'Recommandée',

    methodATitle: 'Valeur de Marché',
    methodBTitle: 'Actifs Sous-jacents',

    methodCBadge: 'Méthode C — Méthode des Dividendes',
    methodCTitle: 'Dividendes Uniquement',
    methodCPassiveNote: () => `En tant qu'<strong>investisseur passif long terme</strong>, certains savants estiment que la zakat ne s'applique qu'aux dividendes reçus — et non à la valeur totale de vos actions.`,
    methodCFormula: 'Formule :',
    methodCFormulaExpr: 'Total Dividendes × 2,5%',
    methodCExample: (amount, zakat) => `Exemple : si vous avez reçu <strong>${amount}</strong> en dividendes, votre zakat serait de <strong>${zakat}</strong>`,
    methodCNote: 'Les données de dividendes ne sont pas récupérées automatiquement en V1. Utilisez votre relevé de dividendes réel pour calculer.',

    diffLabel: 'Différence entre Méthodes A et B',
    diffPct: (pct) => `La Méthode A produit <strong>${pct}% de plus</strong> que la Méthode B`,
    diffInsight: 'Mêmes actions. Même prix. Même jour. Deux méthodes savantes valides.',

    assumptionsTitle: 'Hypothèses',
    assumptionHawl: 'Période de détention supposée ≥ 1 année lunaire (hawl). Si vous n\'avez pas détenu ces actions pendant une année lunaire complète, la zakat n\'est pas encore due.',
    assumptionNisab: (formula, date) => `Nisab : ${formula} (prix de l'or au ${date})`,
    assumptionProxy: 'La Méthode B utilise un proxy de 30% pour les actifs zakatable — une approximation savante lorsque les données du bilan n\'sont pas disponibles. (Source : IFG, Qaradawi)',
    assumptionProxySource: 'Proxy Méthode B : Les 30% sont une approximation courante pour les grands indices (S&P 500 / FTSE).',
    assumptionActiveRule: 'Règle d\'intention : "Trading Actif" suppose une intention de revendre l\'action pour un bénéfice.',
    assumptionPassiveRule: 'Règle Passive : "Passif Long Terme" suppose que vous détenez pour la croissance/dividendes sans intention immédiate de vendre le principal.',
    assumptionRate: 'Taux de zakat : 2,5% (suppose une année lunaire ; équivalent solaire ≈ 2,5775% — non utilisé ici)',
    assumptionCurrencyUSD: 'Devise : USD',
    assumptionCurrencyForeign: (code, date) => `Devise : ${code} — converti aux taux figés au ${date}. Vérifiez les taux actuels pour plus de précision.`,
    disclaimer: 'Cet outil fournit des estimations — ce n\'est pas une décision religieuse (fatwa). Consultez un érudit qualifié pour votre situation spécifique.',

    errNoStocks: 'Veuillez saisir au moins un symbole boursier et un nombre d\'actions.',
    errMissingTicker: 'Une de vos lignes est manquante un symbole boursier.',
    errInvalidShares: (ticker) => `Veuillez saisir un nombre d\'actions valide pour <strong>${ticker}</strong>.`,

    methodologyTitle: 'Les Deux Méthodes',
    methodologySub: 'Mêmes actions. Même prix. Même jour. Deux positions savantes valides.',
    methodACardLabel: 'Méthode A — Valeur de Marché Totale',
    methodACardTitle: 'Traiter les Actions comme Marchandises',
    methodACardBody: 'Traite les actions comme des <strong>marchandises</strong>. La zakat est due sur la valeur totale de marché du portefeuille, indépendamment des actifs sous-jacents.',
    methodAFormula: 'Valeur Portefeuille × 2,5%',
    methodAScholars: '· Qaradawi · Savants Hanafi/Shafi\'i',
    methodBCardLabel: 'Méthode B — Actifs Sous-jacents',
    methodBCardTitle: 'Traiter les Actions comme Parts de Propriété',
    methodBCardBody: 'Traite les actions comme une <strong>propriété partielle</strong> d\'une entreprise. Seuls les actifs zakatable de la société (trésorerie, créances, stocks) sont imposables — approximés à 30% de la valeur de marché.',
    methodBFormula: 'Valeur Portefeuille × 30% × 2,5%',
    methodBScholars: '· Norme AAOIFI n° 35 · IFG',
    proxyNote: 'Les 30% sont un proxy savant lorsque les données du bilan n\'sont pas disponibles. (IFG, Qaradawi)',
    keyInsightTitle: 'Pourquoi la différence est importante :',
    keyInsightBody: 'La Méthode A produit toujours significativement plus que la Méthode B. La plupart des calculateurs en ligne ne montrent qu\'une seule méthode. ZakatEngine montre les deux pour vous permettre de prendre une décision éclairée — ou de consulter un érudit.',

    sourcesTitle: 'Sources et Lectures Complémentaires',
    sourceNZF: 'Fondation Nationale de la Zakat',
    sourceIFG: 'Islamic Finance Guru — Zakat sur les Actions',
    sourceIslamQA: 'IslamQA sur les actions',
    sourceIFGDetail: 'Guide détaillé IFG',
    sourceSeeAlso: 'Voir aussi :',

    footerBuiltBy: 'Réalisé par',
    footerAuthor: 'Elmehdi Zangui',
    footerDisclaimer: 'À des fins éducatives uniquement. Ce n\'est pas une fatwa. Consultez un érudit qualifié pour votre situation spécifique.',
    footerStandard: 'Basé sur la norme AAOIFI n° 35 et les positions du fiqh classique',
  },

  ar: {
    pageTitle: 'ZakatEngine — حاسبة زكاة الأسهم',

    headerStandard: 'وفقاً لمعيار هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية رقم 35',

    heroNode1Label: 'محفظتك الاستثمارية',
    heroNode2Label: 'ZakatEngine',
    heroChipLabelA: 'الطريقة أ · القيمة السوقية الكاملة',
    heroChipLabelB: 'الطريقة ب · وكيل 30%',
    heroCaption: 'نفس المحفظة. طريقتان علميتان معتمدتان. قارن الفرق.',

    labelCurrency: 'العملة',
    labelIntention: 'نية الاستثمار',
    btnIntentionActive: 'تداول نشط',
    btnIntentionPassive: 'استثمار طويل الأمد',
    hintActive: 'يحتفظ بها للتداول / إعادة البيع — الطريقة أ هي الالتزام الأساسي.',
    hintPassive: 'يحتفظ بها للنمو / الأرباح — الطريقة ب هي التوصية الفقهية.',

    panelTitle: 'محفظتك',
    quickFill: 'تعبئة سريعة:',
    showMore: '+ 12 إضافية',
    showLess: '− عرض أقل',
    btnAddStock: '+ إضافة سهم',
    btnCalculate: 'احسب زكاة المحفظة',
    btnCalculating: 'جارٍ الحساب…',
    labelTicker: 'رمز السهم',
    labelShares: 'الأسهم',
    removeRowTitle: 'حذف الصف',
    removeRowAriaLabel: 'حذف الصف',

    thTicker: 'الرمز',
    thCompany: 'الشركة',
    thPrice: 'السعر',
    thShares: 'الأسهم',
    thValue: 'القيمة',
    thZakatA: 'زكاة أ',
    thZakatB: 'زكاة ب',
    portfolioTotal: 'إجمالي المحفظة',

    nisabMet: 'النصاب مكتمل ✓',
    nisabNotMet: 'النصاب غير مكتمل ✗',
    nisabThreshold: 'الحد',
    ratesAsOf: 'الأسعار بتاريخ',
    fetchingPrices: 'جارٍ جلب الأسعار…',
    priceUnavailable: 'السعر غير متاح',

    noZakatDue: 'لا زكاة مستحقة',
    nisabNoticeBody: (value, threshold) =>
      `إجمالي قيمة محفظتك البالغة <strong>${value}</strong> أقل من حد النصاب البالغ <strong>${threshold}</strong>.`,
    nisabNoticeHawl: 'زكاة الأسهم واجبة فقط عندما تبلغ المحفظة النصاب أو تتجاوزه وتمر عليها سنة قمرية كاملة (الحول).',

    badgePrimary: 'الطريقة الأساسية',
    badgeConservative: 'البديل المحافظ',
    badgeMaxObligation: 'الحد الأقصى للالتزام',
    badgeRecommended: 'الموصى بها',

    methodATitle: 'القيمة السوقية',
    methodBTitle: 'الأصول الأساسية',

    methodCBadge: 'الطريقة ج — طريقة الأرباح الموزعة',
    methodCTitle: 'الأرباح الموزعة فقط',
    methodCPassiveNote: () => `بوصفك <strong>مستثمراً طويل الأمد</strong>، يرى بعض العلماء أن الزكاة تجب فقط على الأرباح الموزعة المستلمة — لا على القيمة السوقية الكاملة لأسهمك.`,
    methodCFormula: 'الصيغة:',
    methodCFormulaExpr: 'إجمالي الأرباح × 2.5%',
    methodCExample: (amount, zakat) => `مثال: إذا استلمت <strong>${amount}</strong> أرباحاً موزعة، فإن زكاتك ستكون <strong>${zakat}</strong>`,
    methodCNote: 'لا يتم جلب بيانات الأرباح الموزعة تلقائياً في الإصدار الأول. استخدم كشف أرباحك الفعلي للحساب.',

    diffLabel: 'الفرق بين الطريقة أ والطريقة ب',
    diffPct: (pct) => `الطريقة أ تنتج <strong>أكثر بنسبة ${pct}%</strong> من الطريقة ب`,
    diffInsight: 'نفس الأسهم. نفس السعر. نفس اليوم. طريقتان علميتان معتمدتان.',

    assumptionsTitle: 'الافتراضات',
    assumptionHawl: 'مدة الاحتفاظ المفترضة ≥ سنة قمرية واحدة (الحول). إذا لم تحتفظ بهذه الأسهم لسنة قمرية كاملة، فالزكاة لم تجب بعد.',
    assumptionNisab: (formula, date) => `النصاب: ${formula} (سعر الذهب بتاريخ ${date})`,
    assumptionProxy: 'تستخدم الطريقة ب نسبة 30% كوكيل للأصول الخاضعة للزكاة — تقريب فقهي عند عدم توفر بيانات الميزانية. (المصدر: IFG، القرضاوي)',
    assumptionProxySource: 'وكيل الطريقة ب: نسبة 30% هي تقريب شائع للمؤشرات الرئيسية (S&P 500 / FTSE).',
    assumptionActiveRule: 'قاعدة النية: "التداول النشط" يفترض نية بيع السهم لتحقيق ربح.',
    assumptionPassiveRule: 'قاعدة الاستثمار الطويل: "الاستثمار طويل الأمد" يفترض الاحتفاظ للنمو / الأرباح دون نية فورية لبيع الأصل.',
    assumptionRate: 'معدل الزكاة: 2.5% (يفترض سنة قمرية؛ المعادل الشمسي ≈ 2.5775% — غير مستخدم هنا)',
    assumptionCurrencyUSD: 'العملة: دولار أمريكي',
    assumptionCurrencyForeign: (code, date) => `العملة: ${code} — تم التحويل بأسعار مثبتة بتاريخ ${date}. تحقق من الأسعار الحالية للدقة.`,
    disclaimer: 'هذه الأداة تقدم تقديرات — وليست حكماً شرعياً (فتوى). استشر عالماً مؤهلاً لحالتك الخاصة.',

    errNoStocks: 'يرجى إدخال رمز سهم واحد على الأقل وعدد الأسهم.',
    errMissingTicker: 'إحدى صفوفك تفتقر إلى رمز السهم.',
    errInvalidShares: (ticker) => `يرجى إدخال عدد أسهم صحيح لـ <strong>${ticker}</strong>.`,

    methodologyTitle: 'الطريقتان',
    methodologySub: 'نفس الأسهم. نفس السعر. نفس اليوم. موقفان علميان معتمدان.',
    methodACardLabel: 'الطريقة أ — القيمة السوقية الكاملة',
    methodACardTitle: 'معاملة الأسهم كسلع تجارية',
    methodACardBody: 'تعامل الأسهم باعتبارها <strong>سلعاً تجارية</strong>. تجب الزكاة على القيمة السوقية الكاملة للمحفظة، بغض النظر عن الأصول الأساسية للشركة.',
    methodAFormula: 'قيمة المحفظة × 2.5%',
    methodAScholars: '· القرضاوي · علماء الحنفية / الشافعية',
    methodBCardLabel: 'الطريقة ب — الأصول الأساسية',
    methodBCardTitle: 'معاملة الأسهم كحصص ملكية',
    methodBCardBody: 'تعامل الأسهم باعتبارها <strong>ملكية جزئية</strong> في شركة. الأصول الخاضعة للزكاة فقط (النقد، المستحقات، المخزون) — تُقدَّر بـ 30% من القيمة السوقية.',
    methodBFormula: 'قيمة المحفظة × 30% × 2.5%',
    methodBScholars: '· معيار AAOIFI رقم 35 · IFG',
    proxyNote: 'نسبة 30% هي وكيل فقهي عند عدم توفر بيانات الميزانية. (IFG، القرضاوي)',
    keyInsightTitle: 'لماذا يهم الفرق:',
    keyInsightBody: 'الطريقة أ تنتج دائماً أكثر بشكل ملحوظ من الطريقة ب. معظم الحاسبات الإلكترونية تُظهر طريقة واحدة فقط. يُظهر ZakatEngine الطريقتين لتتخذ قراراً مستنيراً — أو تستشير عالماً.',

    sourcesTitle: 'المصادر وقراءات إضافية',
    sourceNZF: 'المؤسسة الوطنية للزكاة',
    sourceIFG: 'Islamic Finance Guru — زكاة الأسهم',
    sourceIslamQA: 'IslamQA عن الأسهم',
    sourceIFGDetail: 'دليل IFG التفصيلي',
    sourceSeeAlso: 'انظر أيضاً:',

    footerBuiltBy: 'من تطوير',
    footerAuthor: 'المهدي الزنكوي',
    footerDisclaimer: 'لأغراض تعليمية فقط. هذا ليس فتوى. استشر عالماً مؤهلاً لحالتك الخاصة.',
    footerStandard: 'استناداً إلى معيار AAOIFI رقم 35 ومواقف الفقه الكلاسيكي',
  },
};

// --- State ---
let currentLang = 'en';

// --- Core lookup ---
function t(key, ...args) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const val = dict[key] ?? TRANSLATIONS.en[key];
  if (val === undefined) return key;
  if (typeof val === 'function') return val(...args);
  return val;
}

// --- Apply translations to all data-i18n elements in the DOM ---
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const val = t(key);
    if (typeof val === 'string') el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });
  // Page title
  document.title = t('pageTitle');
}

// --- RTL support ---
function applyDirection() {
  const isRTL = currentLang === 'ar';
  document.documentElement.lang = currentLang;
  document.documentElement.dir  = isRTL ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', isRTL);
}

// --- Language switcher init ---
function initLangSwitcher() {
  const switcher = document.getElementById('lang-switcher');
  if (!switcher) return;

  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'عر' },
  ];

  switcher.innerHTML = langs.map(({ code, label }) =>
    `<button class="lang-btn${currentLang === code ? ' active' : ''}" data-lang="${code}">${label}</button>`
  ).join('');

  switcher.addEventListener('click', e => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    if (lang === currentLang) return;
    setLanguage(lang);
  });
}

// --- Switch language ---
function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;

  // Update switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  applyDirection();
  applyTranslations();

  // Re-render dynamic portfolio rows labels (Ticker / Shares labels inside rows)
  document.querySelectorAll('.portfolio-row').forEach(row => {
    const tickerLabel = row.querySelector('.ticker-wrapper label');
    const sharesLabel = row.querySelector('.shares-wrapper label');
    const removeBtn   = row.querySelector('.remove-row-btn');
    if (tickerLabel) tickerLabel.textContent = t('labelTicker');
    if (sharesLabel) sharesLabel.textContent = t('labelShares');
    if (removeBtn) {
      removeBtn.title = t('removeRowTitle');
      removeBtn.setAttribute('aria-label', t('removeRowAriaLabel'));
    }
  });

  // Re-render results if visible
  const resultsEl = document.getElementById('results-section');
  if (resultsEl && !resultsEl.classList.contains('hidden') && resultsEl._lastStocks) {
    // renderPortfolioResults is defined in app.js; call it
    if (typeof renderPortfolioResults === 'function') {
      const currency = typeof getSelectedCurrency === 'function' ? getSelectedCurrency() : 'USD';
      const intention = typeof currentIntention !== 'undefined' ? currentIntention : 'active';
      renderPortfolioResults(resultsEl._lastStocks, currency, intention);
    }
  }

  // Update show-more button text
  const showMoreBtn = document.getElementById('show-more-btn');
  if (showMoreBtn) {
    const expanded = typeof tickerChipsExpanded !== 'undefined' && tickerChipsExpanded;
    showMoreBtn.textContent = expanded ? t('showLess') : t('showMore');
  }

  // Update calculate button if in idle state
  const calcBtn = document.getElementById('calculate-btn');
  if (calcBtn && !calcBtn.disabled) {
    calcBtn.textContent = t('btnCalculate');
  }
}
