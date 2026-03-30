/* ==============================================
   Zakat Al-Mall — i18n Translation Layer
   Supported: en, fr, ar (RTL)
   ============================================== */

const TRANSLATIONS = {

  en: {
    // Page meta
    pageTitle: 'Zakat Al-Mall — Stock Zakat Calculator',

    // Header
    headerStandard: 'Based on AAOIFI Shariah Standard No. 35',

    // Hero
    heroNode1Label: 'Your Stock Portfolio',
    heroNode2Label: 'Zakat Al-Mall',
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
    methodologyTitle: 'The Three Methods',
    methodCCardBody: 'For <strong>long-term passive investors</strong> who do not intend to sell. Some scholars hold that only received dividends are zakatable — not the full market value of shares.',
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
    keyInsightBody: 'Method A always yields significantly more than Method B. Most online calculators only show you one method. Zakat Al-Mall shows all three so you can make an informed decision — or consult a scholar.',

    // Sources
    sourcesLabel: 'Sources:',
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
    footerNote: 'Zakat Al-Mall is educational — always verify with a qualified scholar.',

    // Hero
    heroTitle: 'Calculate Zakat on Stocks',
    heroCaption: 'Same portfolio. Two scholarly methods. You decide.',

    // Holdings panel
    btnAddHolding: 'Add Holding',
    emptyHoldings: 'No holdings yet — add a stock above to get started.',
    thHolding: 'Holding',
    thStrategy: 'Strategy',
    thShares: 'Shares',
    thPrice: 'Price',
    thValue: 'Value',
    longTerm: 'Long-term',
    shortTerm: 'Short-term',

    // Results
    totalZakatDue: 'Total zakat due',
    nisabNoticePrefix: 'Portfolio is below the nisab threshold of',
    nisabNoticeSuffix: 'Zakat is not yet obligatory.',
    shortTermHoldings: 'Short-term holdings',
    longTermHoldings: 'Long-term holdings',
    methodAShort: 'Method A · Full market value',
    methodBLong: 'Method B · Zakatable assets 30%',
    thZakatLiable: 'Zakat Liable',
    thZakatDue: 'Zakat Due',
    shortTermTotal: 'Short-term subtotal',
    longTermTotal: 'Long-term subtotal',
    shareLabel: 'Share this calculator',

    // Method cards
    methodABadge: 'Method A',
    methodBBadge: 'Method B',
    sourceAAOIFI: 'AAOIFI Standard 35',

    // Modal
    modalTitle: 'Add a Holding',
    modalSymbolLabel: 'Symbol',
    modalPriceLabel: 'Price per share',
    modalSharesLabel: 'Shares',
    modalPeriodLabel: 'Holding period',
    modalCancel: 'Cancel',
    modalAdd: 'Add Holding',

    // Persona selector
    personaLabel: 'Which best describes your relationship with these stocks?',
    personaSpeculatorName: 'The Speculator',
    personaSpeculatorDesc: 'I trade frequently or hold < 12 months',
    personaSpeculatorMethod: 'Method A applies',
    personaPassiveName: 'The Passive Owner',
    personaPassiveDesc: 'I hold long-term for growth',
    personaPassiveMethod: 'Method B applies',
    personaLegacyName: 'The Legacy Builder',
    personaLegacyDesc: 'I live off dividends, rarely trade',
    personaLegacyMethod: 'Method C applies',

    // Spectrum
    spectrumTitle: 'The Methodology Spectrum',
    spectrumCaption: 'Same portfolio · Three scholarly interpretations · You decide',
    yourObligation: 'Your obligation',
    eqLabel: 'Formula:',
    methodACardDesc: 'Treats shares as trading goods. The full market value of your portfolio is zakatable.',
    methodBCardDesc: 'Treats shares as ownership. Only liquid assets (cash, receivables, inventory) — approximated at 30% — are zakatable.',
    methodCBadge: 'Method C',
    methodCTitle: 'Dividends Only',
    methodCCardDesc: 'Some scholars hold only received dividends are zakatable for long-term passive investors who do not intend to sell.',
    dividendLabel: 'Annual dividends received',
    vsLabel: 'vs',
    gapLabel: 'Difference:',

    // Hawl Clock
    hawlTitle: 'Hawl Clock',
    hawlDesc: 'One lunar year (354 days) must pass after your portfolio reaches nisab before zakat becomes obligatory.',
    hawlDateLabel: 'When did your portfolio first reach nisab',
    gapCaption: (val) => `${val} portfolio · same stocks · same day · two valid scholarly positions`,
    hawlCycleInProgress: (n) => `${n}${n===1?'st':n===2?'nd':n===3?'rd':'th'} Hawl in progress`,
    hawlDueBadge: 'Due Now',
    hawlStatusDue: (date, extra) => `Zakat is due — hawl was completed on ${date}${extra}.`,
    hawlStatusOverdue: (n) => ` (${n} hawls overdue)`,
    hawlStatusPending: (days, date) => `${days} day${days!==1?'s':''} remaining until hawl completes (${date})`,
    livePriceLabel: '✓ Live price',
    cachedPriceLabel: (date) => `~ Cached · ${date}`,
    gapPctText: (pct) => `That's a ${pct}% difference based on methodology alone.`,
    methodCHintText: (low, high) => `Based on ~2–4% average yield, estimate: ${low} – ${high}`,
  },

  fr: {
    pageTitle: 'Zakat Al-Mall — Calculateur de Zakat sur Actions',

    headerStandard: 'Basé sur la norme AAOIFI n° 35',

    heroNode1Label: 'Votre Portefeuille d\'Actions',
    heroNode2Label: 'Zakat Al-Mall',
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

    methodologyTitle: 'Les Trois Méthodes',
    methodCCardBody: 'Pour les <strong>investisseurs passifs à long terme</strong> qui n\'ont pas l\'intention de vendre. Certains savants estiment que seuls les dividendes reçus sont zakatable.',
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
    keyInsightBody: 'La Méthode A produit toujours significativement plus que la Méthode B. La plupart des calculateurs en ligne ne montrent qu\'une seule méthode. Zakat Al-Mall montre les trois pour vous permettre de prendre une décision éclairée — ou de consulter un érudit.',

    sourcesLabel: 'Sources :',
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
    footerNote: 'Zakat Al-Mall est éducatif — vérifiez toujours avec un érudit qualifié.',

    heroTitle: 'Calculer la Zakat sur les Actions',
    heroCaption: 'Même portefeuille. Deux méthodes savantes valides. Comparez.',

    btnAddHolding: 'Ajouter',
    emptyHoldings: 'Aucune position — ajoutez une action pour commencer.',
    thHolding: 'Position',
    thStrategy: 'Stratégie',
    thShares: 'Actions',
    thPrice: 'Prix',
    thValue: 'Valeur',
    longTerm: 'Long terme',
    shortTerm: 'Court terme',

    totalZakatDue: 'Zakat totale due',
    nisabNoticePrefix: 'Le portefeuille est en dessous du seuil du nisab de',
    nisabNoticeSuffix: 'La zakat n\'est pas encore obligatoire.',
    shortTermHoldings: 'Positions court terme',
    longTermHoldings: 'Positions long terme',
    methodAShort: 'Méthode A · Valeur de marché totale',
    methodBLong: 'Méthode B · Actifs zakatable 30%',
    thZakatLiable: 'Montant zakatable',
    thZakatDue: 'Zakat due',
    shortTermTotal: 'Sous-total court terme',
    longTermTotal: 'Sous-total long terme',
    shareLabel: 'Partager ce calculateur',

    methodABadge: 'Méthode A',
    methodBBadge: 'Méthode B',
    sourceAAOIFI: 'Norme AAOIFI 35',

    modalTitle: 'Ajouter une position',
    modalSymbolLabel: 'Symbole',
    modalPriceLabel: 'Prix par action',
    modalSharesLabel: 'Nombre d\'actions',
    modalPeriodLabel: 'Durée de détention',
    modalCancel: 'Annuler',
    modalAdd: 'Ajouter',

    // Persona selector
    personaLabel: 'Comment décririez-vous votre relation avec ces actions ?',
    personaSpeculatorName: 'Le Spéculateur',
    personaSpeculatorDesc: 'Je trade fréquemment ou détiens < 12 mois',
    personaSpeculatorMethod: 'Méthode A applicable',
    personaPassiveName: 'Le Propriétaire Passif',
    personaPassiveDesc: 'Je détiens à long terme pour la croissance',
    personaPassiveMethod: 'Méthode B applicable',
    personaLegacyName: 'Le Bâtisseur de Patrimoine',
    personaLegacyDesc: 'Je vis de dividendes, je trade rarement',
    personaLegacyMethod: 'Méthode C applicable',

    // Spectrum
    spectrumTitle: 'Le Spectre Méthodologique',
    spectrumCaption: 'Même portefeuille · Trois interprétations savantes · Vous décidez',
    yourObligation: 'Votre obligation',
    eqLabel: 'Formule :',
    methodACardDesc: 'Traite les actions comme des biens commerciaux. La valeur de marché totale est zakatable.',
    methodBCardDesc: 'Traite les actions comme une participation. Seuls les actifs liquides (30%) sont zakatable.',
    methodCBadge: 'Méthode C',
    methodCTitle: 'Dividendes uniquement',
    methodCCardDesc: "Certains savants soutiennent que seuls les dividendes reçus sont zakatable pour les investisseurs passifs à long terme.",
    dividendLabel: 'Dividendes annuels reçus',
    vsLabel: 'vs',
    gapLabel: 'Différence :',

    // Hawl Clock
    hawlTitle: 'Horloge du Hawl',
    hawlDesc: "Une année lunaire (354 jours) doit s'écouler après que le portefeuille atteint le nisab avant que la zakat devienne obligatoire.",
    hawlDateLabel: 'Quand votre portefeuille a-t-il atteint le nisab',
    gapCaption: (val) => `${val} portefeuille · mêmes actions · même jour · deux positions scientifiques valides`,
    hawlCycleInProgress: (n) => `${n}${n===1?'er':'ème'} Hawl en cours`,
    hawlDueBadge: 'Dû Maintenant',
    hawlStatusDue: (date, extra) => `Zakat due — hawl complété le ${date}${extra}.`,
    hawlStatusOverdue: (n) => ` (${n} hawls en retard)`,
    hawlStatusPending: (days, date) => `${days} jour${days!==1?'s':''} restant${days!==1?'s':''} (${date})`,
    livePriceLabel: '✓ Prix en direct',
    cachedPriceLabel: (date) => `~ Mis en cache · ${date}`,
    gapPctText: (pct) => `C'est une différence de ${pct}% basée uniquement sur la méthodologie.`,
    methodCHintText: (low, high) => `Basé sur un rendement moyen de ~2–4%, estimation: ${low} – ${high}`,
  },

  ar: {
    pageTitle: 'زكاة المال — حاسبة زكاة الأسهم',

    headerStandard: 'وفقاً لمعيار هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية رقم 35',

    heroNode1Label: 'محفظتك الاستثمارية',
    heroNode2Label: 'Zakat Al-Mall',
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

    methodologyTitle: 'الطرق الثلاث',
    methodCCardBody: 'للمستثمرين السلبيين طويلي الأمد الذين لا ينوون البيع. يرى بعض العلماء أن الزكاة تجب فقط في <strong>الأرباح الموزعة المستلمة</strong> — لا في القيمة السوقية الكاملة للأسهم.',
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
    keyInsightBody: 'الطريقة أ تنتج دائماً أكثر بشكل ملحوظ من الطريقة ب. معظم الحاسبات الإلكترونية تُظهر طريقة واحدة فقط. تُظهر زكاة المال الطرق الثلاث لتتخذ قراراً مستنيراً — أو تستشير عالماً.',

    sourcesLabel: 'المصادر:',
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
    footerNote: 'زكاة المال أداة تعليمية — تحقق دائماً مع عالم مؤهل.',

    heroTitle: 'احسب زكاة الأسهم',
    heroCaption: 'نفس المحفظة. طريقتان علميتان معتمدتان. قارن الفرق.',

    btnAddHolding: 'إضافة ورقة مالية',
    emptyHoldings: 'لا توجد أوراق مالية — أضف سهماً للبدء.',
    thHolding: 'الورقة المالية',
    thStrategy: 'الاستراتيجية',
    thShares: 'الأسهم',
    thPrice: 'السعر',
    thValue: 'القيمة',
    longTerm: 'طويل الأمد',
    shortTerm: 'قصير الأمد',

    totalZakatDue: 'إجمالي الزكاة المستحقة',
    nisabNoticePrefix: 'المحفظة أقل من عتبة النصاب البالغة',
    nisabNoticeSuffix: 'الزكاة غير واجبة بعد.',
    shortTermHoldings: 'الأوراق المالية قصيرة الأمد',
    longTermHoldings: 'الأوراق المالية طويلة الأمد',
    methodAShort: 'الطريقة أ · القيمة السوقية الكاملة',
    methodBLong: 'الطريقة ب · الأصول الزكوية 30%',
    thZakatLiable: 'الوعاء الزكوي',
    thZakatDue: 'الزكاة المستحقة',
    shortTermTotal: 'مجموع قصير الأمد',
    longTermTotal: 'مجموع طويل الأمد',
    shareLabel: 'شارك هذه الآلة الحاسبة',

    methodABadge: 'الطريقة أ',
    methodBBadge: 'الطريقة ب',
    sourceAAOIFI: 'معيار AAOIFI رقم 35',

    modalTitle: 'إضافة ورقة مالية',
    modalSymbolLabel: 'الرمز',
    modalPriceLabel: 'سعر السهم',
    modalSharesLabel: 'عدد الأسهم',
    modalPeriodLabel: 'مدة الاحتفاظ',
    modalCancel: 'إلغاء',
    modalAdd: 'إضافة',

    // Persona selector
    personaLabel: 'ما الذي يصف علاقتك بهذه الأسهم؟',
    personaSpeculatorName: 'المضارب / المتاجر',
    personaSpeculatorDesc: 'أتداول كثيراً أو أحتفظ أقل من 12 شهراً',
    personaSpeculatorMethod: 'الطريقة أ تنطبق',
    personaPassiveName: 'المستثمر طويل الأمد',
    personaPassiveDesc: 'أحتفظ بالأسهم طويل الأمد للنمو',
    personaPassiveMethod: 'الطريقة ب تنطبق',
    personaLegacyName: 'مستثمر الأجيال',
    personaLegacyDesc: 'أعيش على الأرباح، نادراً ما أتداول',
    personaLegacyMethod: 'الطريقة ج تنطبق',

    // Spectrum
    spectrumTitle: 'الطيف المنهجي',
    spectrumCaption: 'نفس المحفظة · ثلاثة تفسيرات فقهية · أنت تقرر',
    yourObligation: 'التزامك',
    eqLabel: 'الصيغة:',
    methodACardDesc: 'تعامل الأسهم كبضاعة تجارية. القيمة السوقية الكاملة وعاء للزكاة.',
    methodBCardDesc: 'تعامل الأسهم كحصة ملكية. الموجودات الزكوية فقط (تقديراً فقهياً: 30%) هي الوعاء الزكوي.',
    methodCBadge: 'الطريقة ج',
    methodCTitle: 'الأرباح فقط',
    methodCCardDesc: 'يرى بعض العلماء أن المستثمر السلبي طويل الأمد لا تجب عليه الزكاة إلا في الأرباح الموزعة.',
    dividendLabel: 'الأرباح السنوية المستلمة',
    vsLabel: 'مقابل',
    gapLabel: 'الفرق:',

    // Hawl Clock
    hawlTitle: 'ساعة الحول',
    hawlDesc: 'يجب أن يمر حول كامل (354 يوماً) بعد بلوغ النصاب قبل وجوب الزكاة.',
    hawlDateLabel: 'متى بلغت محفظتك النصاب',
    gapCaption: (val) => `محفظة ${val} · نفس الأسهم · نفس اليوم · موقفان فقهيان معتمدان`,
    hawlCycleInProgress: (n) => `الحول ${n === 1 ? 'الأول' : n === 2 ? 'الثاني' : n === 3 ? 'الثالث' : n} جارٍ`,
    hawlDueBadge: 'الزكاة واجبة',
    hawlStatusDue: (date, extra) => `اكتمل الحول — تجب الزكاة الآن (${date})${extra}.`,
    hawlStatusOverdue: (n) => ` · ${n} أحوال متأخرة`,
    hawlStatusPending: (days, date) => `${days} يوم${days !== 1 ? 'اً' : ''} متبقٍ حتى اكتمال الحول (${date})`,
    livePriceLabel: '✓ السعر المباشر',
    cachedPriceLabel: (date) => `~ مخزّن · ${date}`,
    gapPctText: (pct) => `هذا فرق بنسبة ${pct}% بسبب اختلاف المنهجية وحدها.`,
    methodCHintText: (low, high) => `بناءً على عائد توزيعات ~2–4%، التقدير: ${low} – ${high}`,
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

  // Sync lang attribute on date input so browser picker respects locale
  const dateInput = document.getElementById('hawl-date-input');
  if (dateInput) dateInput.lang = lang;

  // Re-render holdings table and results (V2 app)
  if (typeof renderHoldingsTable === 'function') renderHoldingsTable();

  const resultsEl = document.getElementById('results-section');
  if (resultsEl && !resultsEl.classList.contains('hidden')) {
    if (typeof renderSpectrum === 'function') renderSpectrum();
    if (typeof updateHawlClock === 'function') updateHawlClock();
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

// Alias for HTML onclick handlers
function setLang(lang) { setLanguage(lang); }
