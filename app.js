/* =====================================================================
   TDMinfo — applogikk
   Ingen data lagres eller sendes. Alt beregnes i nettleseren.
   Innstillinger (språk, tema, enhet, AGNP-valg) huskes lokalt.
   ===================================================================== */
(function () {
  "use strict";

  var DATA = window.TDM_DATA;
  var DRUGS = DATA.drugs;
  var HOUR = 3600e3, DAY = 86400e3;

  /* ------------------------------------------------------------------
     1. TEKSTER (norsk / engelsk)
     ------------------------------------------------------------------ */
  var T = {
    nb: {
      heroTitle: "Tolkning av serumkonsentrasjon",
      heroText: "Se hvordan en målt konsentrasjon av psykofarmaka ligger i forhold til referanseområde, forventet område for dosen og toksiske grenser, med feilmargin.",
      disclaimer: "Hjelpemiddel for helsepersonell. Erstatter ikke klinisk vurdering eller laboratoriets svarkommentar. Ikke skriv inn opplysninger som kan identifisere pasienten.",
      drug: "Legemiddel", drugPh: "Skriv eller velg legemiddel …", noMatch: "Ingen treff",
      groups: { ad: "Antidepressiva", ap: "Antipsykotika", ms: "Stemningsstabiliserende" },
      sampleNew: "Prøve", sampleNewTag: "Ny", samplePrev: "Forrige prøve", samplePrevTag: "Tidligere",
      form: "Legemiddelform", tablet: "Tabletter / kapsler", depot: "Depotinjeksjon",
      formulation: "Formulering",
      dosePer: "Dose per inntak", perDay: "Antall inntak per døgn", dailyDose: "Døgndose",
      depotProduct: "Preparat", depotOther: "Annet depotpreparat", depotDose: "Dose per injeksjon", interval: "Intervall mellom injeksjoner", days: "dager",
      lastDose: "Siste dose tatt", lastInj: "Siste injeksjon gitt", sampleTime: "Prøven tatt",
      measured: "Målt konsentrasjon", optional: "valgfritt",
      changeDate: "Oppstart eller siste doseendring", changeHint: "Valgfritt – brukes til å vurdere om steady state er nådd.",
      compare: "Sammenlikne med tidligere prøve", compareHint: "Legg inn en tidligere prøve av samme legemiddel.",
      show: "Vis resultat", edit: "Endre opplysninger", reset: "Nullstill",
      units: "Enhet",
      req: "Fyll inn feltene som er markert.",
      reqDrug: "Velg legemiddel.",
      timeOrder: "Prøven må være tatt etter siste dose.",
      agnpTrr: "Vis AGNP terapeutisk referanseområde", agnpDrr: "Vis AGNP forventet område for dosen", agnpAlert: "Vis AGNP varslingsgrense",
      agnpTrrShort: "AGNP terapeutisk område", agnpDrrShort: "AGNP forventet for dose", agnpAlertShort: "AGNP varslingsgrense",
      timeline: "Konsentrasjon", interpretation: "Vurdering", comparison: "Sammenlikning av prøvene", sources: "Verdier og kilder for",
      legRef: "OUS referanseområde", legRinge: "Over OUS ringegrense", legTox: "OUS toksisk område", legCv: "Feilmargin (± analytisk CV)",
      legNew: "Ny prøve", legPrev: "Forrige prøve",
      measuredLbl: "Målt", margin: "Feilmargin", hoursAfter: "t etter siste dose", daysAfterInj: "døgn etter siste injeksjon",
      inRef: "Innenfor OUS referanseområde ({r}).",
      belowRef: "Under OUS referanseområde ({r}).",
      aboveRef: "Over OUS referanseområde ({r}).",
      nearEdge: "Verdien ligger så nær grensen at feilmarginen ({lo}–{hi}) går over den.",
      overRinge: "Over OUS ringegrense ({v}). Laboratoriet varsler normalt rekvirent ved slike verdier.",
      overTox: "I OUS toksisk område (fra {v}).",
      fatal: "Komatøse/fatale forgiftninger er beskrevet fra ca. {v}.",
      inTrr: "Innenfor AGNP terapeutisk referanseområde ({r}).",
      belowTrr: "Under AGNP terapeutisk referanseområde ({r}).",
      aboveTrr: "Over AGNP terapeutisk referanseområde ({r}).",
      overAlert: "Over AGNP varslingsgrense ({v}).",
      trrOf: "AGNP-området gjelder {x} alene ({v}).",
      inDrr: "I tråd med forventet konsentrasjon for dosen (AGNP: {r}).",
      belowDrr: "Lavere enn forventet for dosen (AGNP: {r}). Mulige årsaker: ufullstendig etterlevelse, rask omsetning (f.eks. enzyminduksjon, røyking) eller tidspunkt.",
      aboveDrr: "Høyere enn forventet for dosen (AGNP: {r}). Mulige årsaker: langsom omsetning (genetikk, hemmere), nedsatt nyre-/leverfunksjon eller tidspunkt.",
      drrNa: "AGNP forventet område kan ikke beregnes: {why}",
      drrWhyDepot: "ikke tilgjengelig for depotinjeksjoner.",
      drrWhyEarly: "prøven er tatt for kort tid etter dose.",
      drrWhyLate: "for lang tid siden siste dose.",
      drrWhyMissing: "dose eller antall inntak mangler.",
      drrNote: "Forventet område (AGNP) er middel ± 1 SD hos «normale» pasienter (18–65 år, ikke-røykere, uten interaksjoner) ved regelmessig inntak, beregnet for {n} inntak à {d} med siste dose {h} t før prøven.",
      drrExtrap: "Beregnet ved omregning fra AGNPs tabellverdier med halveringstid – tolkes med forsiktighet.",
      timingOk: "Prøvetidspunktet ({h} t etter dose) passer med OUS referanseområde ({w}).",
      timingEarly: "Prøven er tatt {h} t etter siste dose. OUS referanseområde gjelder prøver tatt {w} etter dose (rett før neste dose). Konsentrasjonen er trolig høyere enn bunnverdien, og resultatet kan ikke sammenlignes direkte med referanseområdet.",
      timingLate: "Prøven er tatt {h} t etter siste dose. OUS referanseområde gjelder prøver tatt {w} etter dose. Konsentrasjonen er trolig lavere enn ved regelmessig dosering, og resultatet kan ikke sammenlignes direkte med referanseområdet.",
      agnpTimingBad: "Prøvetidspunktet ({h} t) passer ikke med AGNP sitt terapeutiske referanseområde, som gjelder prøver tatt {w} etter siste dose. AGNP-området kan derfor ikke brukes direkte for denne prøven.",
      agnpTimingOk: "Prøvetidspunktet passer også med AGNP terapeutisk referanseområde ({w}).",
      depotOk: "Prøven er tatt {d} døgn etter injeksjon (intervall {i} døgn), dvs. som bunnverdi før neste injeksjon.",
      depotEarly: "Prøven er tatt {d} døgn etter injeksjon (intervall {i} døgn). Ved depot skal prøven tas rett før neste injeksjon. Konsentrasjonen er trolig høyere enn bunnverdien, og resultatet kan ikke sammenlignes direkte med referanseområdene.",
      depotLate: "Prøven er tatt {d} døgn etter injeksjon, mer enn en uke etter planlagt neste injeksjon (intervall {i} døgn). Konsentrasjonen kan være lavere enn ved regelmessige injeksjoner.",
      depotRefNote: "OUS referanseområde er i hovedsak basert på tablettbehandling.",
      ssNot: "Steady state er trolig ikke nådd: {d} døgn siden oppstart/doseendring (forventet tid til steady state: {s} døgn).",
      ssMaybe: "Steady state er muligens ikke helt nådd: {d} døgn siden oppstart/doseendring (forventet tid til steady state: {s} døgn).",
      ssOk: "Steady state er trolig nådd ({d} døgn siden oppstart/doseendring; forventet {s} døgn).",
      ssDepotGeneric: "Ved depotinjeksjoner nås steady state først etter flere måneder (ca. 4–5 halveringstider).",
      doseOutside: "Dosen ({d}) ligger utenfor doseintervallet OUS referanseområde er basert på ({r}).",
      doseSpcOutside: "Dosen ({d}) ligger utenfor vanlig dosering ({r}).",
      mpr: "Forhold {m}/{p}: {v} (AGNP normalt {r}).",
      mprOut: "Forholdet {m}/{p} er {v}, utenfor det AGNP angir som normalt ({r}). Kan tyde på avvikende omsetning (f.eks. genetikk eller interaksjoner) eller ufullstendig etterlevelse.",
      noCv: "Feilmargin er ikke tilgjengelig for denne analysen.",
      cvNote: "Feilmarginen er ± analytisk CV ({cv} %) basert på laboratoriets kontroller.",
      cmpDays: "Tid mellom prøvene", cmpAbs: "Endring", cmpPct: "Endring i prosent", cmpCd: "Endring i konsentrasjon/dose",
      cmpExpected: "Forventet ved ny dose (lineær kinetikk)", cmpRcv: "Endringen er større enn det analytisk variasjon alene kan forklare (± {v} %).",
      cmpRcvNo: "Endringen er innenfor det analytisk variasjon alene kan forklare (± {v} %).",
      cmpCdNote: "AGNP: variasjon i konsentrasjon/dose over 20 % hos samme pasient kan tyde på endret etterlevelse eller endret farmakokinetikk (f.eks. interaksjoner).",
      cmpDiffDrr: "Forventet område for dosene (AGNP): ny dose {a}, forrige dose {b}.",
      cmpDosesOus: "Doser: ny {a}, forrige {b}.",
      dayUnit: "døgn",
      srcOus: "OUS", srcAgnp: "AGNP 2026",
      sRef: "Referanseområde", sWin: "Prøvetaking (timer etter dose)", sDose: "Doseintervall referanseområdet bygger på", sDoseSpc: "Vanlig dosering (preparatomtale)",
      sRinge: "Ringegrense", sTox: "Toksisk område fra", sFatal: "Komatøs/fatal fra ca.", sCv: "Analytisk CV",
      sTrr: "Terapeutisk referanseområde", sTime: "Tid fra siste dose til prøve", sSs: "Tid til steady state", sAlert: "Varslingsgrense (laboratory alert level)",
      sLevel: "Anbefalingsnivå for TDM", sBasis: "Grunnlag", sMpr: "Normalt forhold metabolitt/morstoff", sDrc: "Doserelatert område (DRC)",
      levels: { 1: "1 – sterkt anbefalt", 2: "2 – anbefalt", 3: "3 – nyttig", 4: "4 – potensielt nyttig" },
      basis: { meta: "Meta-analyse/systematisk oversikt", conc: "Studier av konsentrasjon og effekt", pk: "Farmakokinetisk forventet område", tdm: "TDM-data/responderdata", pet: "PET/reseptorokkupans" },
      revised: "revidert/ny i 2026",
      drcAvail: "Tilgjengelig", drcNa: "Ikke beregnet",
      sum: "sum", ofLbl: "gjelder",
      footer: "TDMinfo er et hjelpemiddel og erstatter ikke klinisk vurdering eller laboratoriets svarkommentar. Kilder: OUS (interne referanser og Referanseområdeprosjektet 2005–2008) og AGNP-konsensusretningslinjene 2026 (Hart XM et al., Pharmacopsychiatry 2026;59:166–295). Ingen opplysninger lagres eller sendes – alt beregnes i nettleseren. Data oppdatert {d}.",
      themeAuto: "Tema: følger enheten", themeLight: "Tema: lyst", themeDark: "Tema: mørkt",
      tipRef: "OUS referanseområde", tipRingeT: "OUS ringegrense", tipToxT: "OUS toksisk område",
      tipRefBody: "Basert på Referanseområdeprosjektet (10.–90. persentil ved vanlige doser).",
      tipLevel: "Anbefalingsnivå for TDM", tipBasis: "Grunnlag",
      tipTimingBad: "Gjelder ikke for dette prøvetidspunktet.",
      noTrr: "AGNP angir ikke terapeutisk område for dette legemidlet.",
      litDose: "Lithionit 42 mg = 6 mmol Li⁺",
      cvShort: "CV"
    },
    en: {
      heroTitle: "Interpreting serum concentrations",
      heroText: "See how a measured concentration of a psychotropic drug relates to the reference range, the expected range for the dose and toxic limits, including the margin of error.",
      disclaimer: "A tool for health professionals. It does not replace clinical judgement or the laboratory's interpretive comment. Do not enter information that could identify the patient.",
      drug: "Drug", drugPh: "Type or choose a drug …", noMatch: "No matches",
      groups: { ad: "Antidepressants", ap: "Antipsychotics", ms: "Mood stabilisers" },
      sampleNew: "Sample", sampleNewTag: "New", samplePrev: "Previous sample", samplePrevTag: "Earlier",
      form: "Formulation type", tablet: "Tablets / capsules", depot: "Depot injection",
      formulation: "Formulation",
      dosePer: "Dose per intake", perDay: "Intakes per day", dailyDose: "Daily dose",
      depotProduct: "Product", depotOther: "Other depot product", depotDose: "Dose per injection", interval: "Injection interval", days: "days",
      lastDose: "Last dose taken", lastInj: "Last injection given", sampleTime: "Sample taken",
      measured: "Measured concentration", optional: "optional",
      changeDate: "Start or last dose change", changeHint: "Optional – used to assess whether steady state has been reached.",
      compare: "Compare with a previous sample", compareHint: "Add an earlier sample of the same drug.",
      show: "Show result", edit: "Edit details", reset: "Reset",
      units: "Unit",
      req: "Please fill in the highlighted fields.",
      reqDrug: "Choose a drug.",
      timeOrder: "The sample must be taken after the last dose.",
      agnpTrr: "Show AGNP therapeutic reference range", agnpDrr: "Show AGNP expected range for the dose", agnpAlert: "Show AGNP alert level",
      agnpTrrShort: "AGNP therapeutic range", agnpDrrShort: "AGNP expected for dose", agnpAlertShort: "AGNP alert level",
      timeline: "Concentration", interpretation: "Assessment", comparison: "Comparison of samples", sources: "Values and sources for",
      legRef: "OUS reference range", legRinge: "Above OUS alert limit", legTox: "OUS toxic range", legCv: "Margin of error (± analytical CV)",
      legNew: "New sample", legPrev: "Previous sample",
      measuredLbl: "Measured", margin: "Margin of error", hoursAfter: "h after last dose", daysAfterInj: "days after last injection",
      inRef: "Within the OUS reference range ({r}).",
      belowRef: "Below the OUS reference range ({r}).",
      aboveRef: "Above the OUS reference range ({r}).",
      nearEdge: "The value is so close to the limit that the margin of error ({lo}–{hi}) crosses it.",
      overRinge: "Above the OUS alert limit ({v}). The laboratory normally notifies the requester at such values.",
      overTox: "In the OUS toxic range (from {v}).",
      fatal: "Comatose/fatal poisonings have been reported from approx. {v}.",
      inTrr: "Within the AGNP therapeutic reference range ({r}).",
      belowTrr: "Below the AGNP therapeutic reference range ({r}).",
      aboveTrr: "Above the AGNP therapeutic reference range ({r}).",
      overAlert: "Above the AGNP laboratory alert level ({v}).",
      trrOf: "The AGNP range applies to {x} alone ({v}).",
      inDrr: "Consistent with the expected concentration for the dose (AGNP: {r}).",
      belowDrr: "Lower than expected for the dose (AGNP: {r}). Possible causes: partial adherence, fast metabolism (e.g. induction, smoking) or timing.",
      aboveDrr: "Higher than expected for the dose (AGNP: {r}). Possible causes: slow metabolism (genetics, inhibitors), impaired renal/hepatic function or timing.",
      drrNa: "The AGNP expected range cannot be calculated: {why}",
      drrWhyDepot: "not available for depot injections.",
      drrWhyEarly: "the sample was taken too soon after the dose.",
      drrWhyLate: "too long since the last dose.",
      drrWhyMissing: "dose or number of intakes missing.",
      drrNote: "The expected range (AGNP) is mean ± 1 SD in 'normal' patients (18–65 y, non-smokers, no interactions) with regular intake, calculated for {n} intake(s) of {d} with the last dose {h} h before sampling.",
      drrExtrap: "Calculated by adjusting AGNP table values with the half-life – interpret with caution.",
      timingOk: "The sampling time ({h} h after dose) matches the OUS reference range ({w}).",
      timingEarly: "The sample was taken {h} h after the last dose. The OUS reference range applies to samples taken {w} after the dose (just before the next dose). The concentration is probably higher than the trough and cannot be compared directly with the reference range.",
      timingLate: "The sample was taken {h} h after the last dose. The OUS reference range applies to samples taken {w} after the dose. The concentration is probably lower than with regular dosing and cannot be compared directly with the reference range.",
      agnpTimingBad: "The sampling time ({h} h) does not match the AGNP therapeutic reference range, which applies to samples taken {w} after the last dose. The AGNP range therefore cannot be applied directly to this sample.",
      agnpTimingOk: "The sampling time also matches the AGNP therapeutic reference range ({w}).",
      depotOk: "The sample was taken {d} days after the injection (interval {i} days), i.e. as a trough before the next injection.",
      depotEarly: "The sample was taken {d} days after the injection (interval {i} days). With depot injections the sample should be taken just before the next injection. The concentration is probably above the trough and cannot be compared directly with the ranges.",
      depotLate: "The sample was taken {d} days after the injection, more than a week after the planned next injection (interval {i} days). The concentration may be lower than with regular injections.",
      depotRefNote: "The OUS reference range is mainly based on oral treatment.",
      ssNot: "Steady state has probably not been reached: {d} days since start/dose change (expected time to steady state: {s} days).",
      ssMaybe: "Steady state may not be fully reached: {d} days since start/dose change (expected time to steady state: {s} days).",
      ssOk: "Steady state has probably been reached ({d} days since start/dose change; expected {s} days).",
      ssDepotGeneric: "With depot injections, steady state is only reached after several months (approx. 4–5 half-lives).",
      doseOutside: "The dose ({d}) is outside the dose interval the OUS reference range is based on ({r}).",
      doseSpcOutside: "The dose ({d}) is outside usual dosing ({r}).",
      mpr: "Ratio {m}/{p}: {v} (AGNP normal {r}).",
      mprOut: "The ratio {m}/{p} is {v}, outside what AGNP considers normal ({r}). May indicate altered metabolism (e.g. genetics or interactions) or partial adherence.",
      noCv: "No margin of error is available for this assay.",
      cvNote: "The margin of error is ± analytical CV ({cv}%) based on the laboratory's controls.",
      cmpDays: "Time between samples", cmpAbs: "Change", cmpPct: "Change in percent", cmpCd: "Change in concentration/dose",
      cmpExpected: "Expected at new dose (linear kinetics)", cmpRcv: "The change is larger than analytical variation alone can explain (± {v}%).",
      cmpRcvNo: "The change is within what analytical variation alone can explain (± {v}%).",
      cmpCdNote: "AGNP: intra-individual variation in concentration/dose above 20% may indicate changed adherence or pharmacokinetics (e.g. interactions).",
      cmpDiffDrr: "Expected ranges for the doses (AGNP): new dose {a}, previous dose {b}.",
      cmpDosesOus: "Doses: new {a}, previous {b}.",
      dayUnit: "days",
      srcOus: "OUS", srcAgnp: "AGNP 2026",
      sRef: "Reference range", sWin: "Sampling (hours after dose)", sDose: "Dose interval the reference range is based on", sDoseSpc: "Usual dosing (SmPC)",
      sRinge: "Alert limit", sTox: "Toxic range from", sFatal: "Comatose/fatal from approx.", sCv: "Analytical CV",
      sTrr: "Therapeutic reference range", sTime: "Time from last dose to sampling", sSs: "Time to steady state", sAlert: "Laboratory alert level",
      sLevel: "Level of recommendation for TDM", sBasis: "Basis", sMpr: "Normal metabolite/parent ratio", sDrc: "Dose-related range (DRC)",
      levels: { 1: "1 – strongly recommended", 2: "2 – recommended", 3: "3 – useful", 4: "4 – potentially useful" },
      basis: { meta: "Meta-analysis/systematic review", conc: "Concentration–effect studies", pk: "Pharmacokinetically expected range", tdm: "TDM/responder data", pet: "PET/receptor occupancy" },
      revised: "revised/new in 2026",
      drcAvail: "Available", drcNa: "Not calculated",
      sum: "sum", ofLbl: "applies to",
      footer: "TDMinfo is a support tool and does not replace clinical judgement or the laboratory's interpretive comment. Sources: OUS (internal references and the Reference Range Project 2005–2008) and the AGNP consensus guidelines 2026 (Hart XM et al., Pharmacopsychiatry 2026;59:166–295). No information is stored or sent – everything is calculated in the browser. Data updated {d}.",
      themeAuto: "Theme: follows device", themeLight: "Theme: light", themeDark: "Theme: dark",
      tipRef: "OUS reference range", tipRingeT: "OUS alert limit", tipToxT: "OUS toxic range",
      tipRefBody: "Based on the Reference Range Project (10th–90th percentile at usual doses).",
      tipLevel: "Level of recommendation for TDM", tipBasis: "Basis",
      tipTimingBad: "Not valid for this sampling time.",
      noTrr: "AGNP gives no therapeutic range for this drug.",
      litDose: "Lithionit 42 mg = 6 mmol Li⁺",
      cvShort: "CV"
    }
  };

  /* ------------------------------------------------------------------
     2. TILSTAND
     ------------------------------------------------------------------ */
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var prefs = {};
  try { prefs = JSON.parse(store("tdmPrefs") || "{}") || {}; } catch (e) { prefs = {}; }

  function blankSample() {
    return { form: "tablet", formulation: null, dose: null, perDay: 1, depotId: null, interval: null, last: "", sample: "", values: {}, change: "" };
  }
  var S = {
    lang: prefs.lang || ((navigator.language || "nb").slice(0, 2) === "en" ? "en" : "nb"),
    units: prefs.units || "mol",
    show: prefs.show || { trr: false, drr: false, alert: false },
    view: "form",
    drugId: null,
    compare: false,
    samples: [blankSample(), blankSample()],
    errors: {}
  };
  function savePrefs() { store("tdmPrefs", JSON.stringify({ lang: S.lang, units: S.units, show: S.show })); }
  function t(k) { return T[S.lang][k]; }
  function fill(s, o) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function drug() { return DRUGS.find(function (d) { return d.id === S.drugId; }) || null; }
  function nm(o) { return o ? (o[S.lang] || o.nb || o.no) : ""; }
  function dname(d) { return S.lang === "en" ? d.en : d.no; }
  function aname(a) { return S.lang === "en" ? a.en : a.no; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ------------------------------------------------------------------
     3. ENHETER (internt alltid nmol/L)
     ------------------------------------------------------------------ */
  var FACT = { nmol: 1, umol: 1e3, mmol: 1e6 };
  function baseUnit(d) { return d.unit || "nmol"; }
  function qtyMw(d, q) {
    if (q === "sum") return d.analytes[0].mw;
    var a = d.analytes.find(function (x) { return x.key === q; });
    return a ? a.mw : d.analytes[0].mw;
  }
  function gramMode(d) { return S.units === "g" && baseUnit(d) !== "mmol"; }
  function unitLabel(d) {
    var b = baseUnit(d);
    if (gramMode(d)) return b === "umol" ? "µg/mL" : "ng/mL";
    return b === "umol" ? "µmol/L" : b === "mmol" ? "mmol/L" : "nmol/L";
  }
  // nmol/L -> visningsenhet
  function toDisp(d, q, nmol) {
    if (nmol == null || isNaN(nmol)) return null;
    var b = baseUnit(d);
    if (gramMode(d)) { var ngml = nmol * qtyMw(d, q) / 1000; return b === "umol" ? ngml / 1000 : ngml; }
    return nmol / FACT[b];
  }
  function fromDisp(d, q, v) {
    if (v == null || isNaN(v)) return null;
    var b = baseUnit(d);
    if (gramMode(d)) { var ngml = b === "umol" ? v * 1000 : v; return ngml * 1000 / qtyMw(d, q); }
    return v * FACT[b];
  }
  function ousToN(d, v) { return v == null ? null : v * FACT[baseUnit(d)]; }
  function agnpToN(d, q, v) {
    if (v == null) return null;
    if (d.agnp && d.agnp.unit === "mmol") return v * 1e6;
    return v * 1000 / qtyMw(d, q);
  }

  function num(v, dec) {
    if (v == null || isNaN(v)) return "–";
    var a = Math.abs(v);
    if (dec == null) dec = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
    var s = v.toLocaleString(S.lang === "en" ? "en-GB" : "nb-NO", { minimumFractionDigits: 0, maximumFractionDigits: dec });
    return s.replace(/ /g, " ");
  }
  function cfmt(d, q, nmol) { return num(toDisp(d, q, nmol)) + " " + unitLabel(d); }
  function rfmt(d, q, lo, hi) { return num(toDisp(d, q, lo)) + "–" + num(toDisp(d, q, hi)) + " " + unitLabel(d); }
  function parseNum(s) { if (s == null) return null; s = String(s).trim().replace(/\s/g, "").replace(",", "."); if (s === "") return null; var v = Number(s); return isFinite(v) ? v : NaN; }
  function doseUnit(d) { return d.doseUnit === "mmol" ? "mmol" : "mg"; }
  function dfmt(d, v) { return num(v, 2) + " " + doseUnit(d); }

  /* ------------------------------------------------------------------
     4. BEREGNINGER
     ------------------------------------------------------------------ */
  function qtyLabel(d, q) {
    if (q === "sum") return nm(d.sumLabel) || t("sum");
    var a = d.analytes.find(function (x) { return x.key === q; });
    return a ? aname(a) : dname(d);
  }
  function qtyValue(d, s, q) {
    if (q === "sum") {
      var tot = 0, any = false, missing = false;
      d.analytes.forEach(function (a) { if (a.optional) return; var v = s.values[a.key]; if (v == null || isNaN(v)) missing = true; else { tot += v; any = true; } });
      return any && !missing ? tot : null;
    }
    var v = s.values[q]; return v == null || isNaN(v) ? null : v;
  }
  // Analytisk CV (%) for en størrelse; kvadratsum for summer.
  function qtyCv(d, s, q) {
    var list = q === "sum" ? d.analytes.filter(function (a) { return !a.optional; }) : d.analytes.filter(function (a) { return a.key === q; });
    var tot = 0, varSum = 0;
    for (var i = 0; i < list.length; i++) {
      var a = list[i], v = s.values[a.key];
      if (v == null || isNaN(v)) return null;
      if (a.qcm == null) return null;
      var cv = v < a.qcm ? DATA.cv.low : DATA.cv.high;
      varSum += Math.pow(cv / 100 * v, 2); tot += v;
    }
    return tot > 0 ? Math.sqrt(varSum) / tot * 100 : null;
  }
  function dt(a, b) { var x = Date.parse(a), y = Date.parse(b); return isNaN(x) || isNaN(y) ? null : (y - x); }

  // DRC-faktor for én døgndose-strøm ved Δt (timer)
  function drcAt(d, set, h) {
    var pts = set.pts.slice().sort(function (a, b) { return a[0] - b[0]; });
    var minH = (d.tmax || 2) + 2;
    if (h < minH) return { why: "early" };
    if (h > 48) return { why: "late" };
    for (var i = 0; i < pts.length; i++) if (Math.abs(pts[i][0] - h) < 0.01) return { v: pts[i].slice(1), extrap: false };
    for (i = 0; i < pts.length - 1; i++) {
      var p = pts[i], q = pts[i + 1];
      if (h > p[0] && h < q[0]) {
        var f = (h - p[0]) / (q[0] - p[0]);
        return { v: [1, 2, 3].map(function (k) { return Math.exp(Math.log(p[k]) + f * (Math.log(q[k]) - Math.log(p[k]))); }), extrap: false };
      }
    }
    var near = h < pts[0][0] ? pts[0] : pts[pts.length - 1];
    var ke = Math.LN2 / (d.t12 || 24);
    var g = Math.exp(-ke * (h - near[0]));
    return { v: [near[1] * g, near[2] * g, near[3] * g], extrap: Math.abs(h - near[0]) > 1.5 };
  }
  function drcSet(d, s) {
    if (!d.drc) return null;
    var keys = Object.keys(d.drc);
    var k = s.formulation && d.drc[s.formulation] ? s.formulation : keys[0];
    return d.drc[k];
  }
  // Forventet område (AGNP DRR) i nmol/L
  function calcDrr(d, s, hLast) {
    if (s.form === "depot") return { why: t("drrWhyDepot") };
    var set = drcSet(d, s);
    if (!set) return { why: nm(d.drcNote) || "–" };
    if (!(s.dose > 0) || !(s.perDay >= 1)) return { why: t("drrWhyMissing") };
    if (hLast == null) return { why: t("drrWhyMissing") };
    var tau = 24 / s.perDay, sum = [0, 0, 0], extrap = false;
    for (var k = 0; k < s.perDay; k++) {
      var r = drcAt(d, set, hLast + k * tau);
      if (!r.v) return { why: r.why === "early" ? t("drrWhyEarly") : t("drrWhyLate") };
      extrap = extrap || r.extrap;
      for (var j = 0; j < 3; j++) sum[j] += r.v[j] * s.dose;
    }
    var conv = function (x) { return set.unit === "umolPerMmol" ? x * 1000 : agnpToN(d, set.of, x); };
    return { of: set.of, mean: conv(sum[0]), lo: conv(sum[1]), hi: conv(sum[2]), extrap: extrap };
  }
  function windowOk(h, w, tol) { return h >= w[0] - tol && h <= w[1] + tol; }
  function winTxt(w) { return w[0] === w[1] ? num(w[0]) + " t" : num(w[0]) + "–" + num(w[1]) + " t"; }
  function winTxtL(w) { var u = S.lang === "en" ? " h" : " t"; return w[0] === w[1] ? num(w[0]) + u : num(w[0]) + "–" + num(w[1]) + u; }
  function depotOf(d, s) { return (d.depot || []).find(function (x) { return x.id === s.depotId; }) || null; }

  // Full vurdering av én prøve
  function evaluate(d, s) {
    var q = d.measure, r = { notes: [], q: q };
    r.value = qtyValue(d, s, q);
    r.cv = qtyCv(d, s, q);
    var ms = dt(s.last, s.sample);
    r.hours = ms == null ? null : ms / HOUR;
    r.daily = s.form === "depot" ? (s.dose > 0 && s.interval > 0 ? s.dose / s.interval : null) : (s.dose > 0 ? s.dose * (s.perDay || 1) : null);
    r.timingOus = true; r.timingAgnp = true;
    var N = r.notes;

    // Tidspunkt
    if (s.form === "depot") {
      var dd = ms / DAY, iv = s.interval;
      if (iv > 0 && dd != null) {
        var lo = iv - Math.max(2, 0.15 * iv);
        if (dd < lo) { r.timingOus = r.timingAgnp = false; N.push(["err", fill(t("depotEarly"), { d: num(dd, 1), i: num(iv) })]); }
        else if (dd > iv + 7) { r.timingOus = r.timingAgnp = false; N.push(["err", fill(t("depotLate"), { d: num(dd, 1), i: num(iv) })]); }
        else N.push(["ok", fill(t("depotOk"), { d: num(dd, 1), i: num(iv) })]);
      }
      N.push(["info", t("depotRefNote")]);
    } else if (r.hours != null) {
      var w = d.ous.window || [12, 24], tol = d.ous.windowTol != null ? d.ous.windowTol : 1;
      if (!windowOk(r.hours, w, tol)) {
        r.timingOus = false;
        N.push(["err", fill(r.hours < w[0] ? t("timingEarly") : t("timingLate"), { h: num(r.hours, 1), w: winTxtL(w) })]);
      } else N.push(["ok", fill(t("timingOk"), { h: num(r.hours, 1), w: winTxtL(w) })]);
      if (d.agnp && d.agnp.time) {
        var aw = d.agnp.time, at = aw[0] === aw[1] ? Math.max(1, 0.1 * aw[0]) : 1;
        r.timingAgnp = windowOk(r.hours, aw, at);
        if (S.show.trr) {
          if (!r.timingAgnp) N.push([r.timingOus ? "warn" : "err", fill(t("agnpTimingBad"), { h: num(r.hours, 1), w: winTxtL(aw) })]);
          else N.push(["ok", fill(t("agnpTimingOk"), { w: winTxtL(aw) })]);
        }
      }
    }

    // Steady state
    if (s.change) {
      var cd = dt(s.change, s.sample);
      if (cd != null && cd >= 0) {
        var days = cd / DAY, ss = null;
        if (s.form === "depot") { var dp = depotOf(d, s); if (dp && dp.t12d) ss = [4 * dp.t12d, 5 * dp.t12d]; }
        else if (d.agnp && d.agnp.ss) ss = d.agnp.ss;
        else if (d.t12) ss = [4 * d.t12 / 24, 5 * d.t12 / 24];
        if (ss) {
          var sst = ss[0] === ss[1] ? num(ss[0]) : num(ss[0]) + "–" + num(ss[1]);
          if (days < ss[0]) N.push(["warn", fill(t("ssNot"), { d: num(days, 1), s: sst })]);
          else if (days < ss[1]) N.push(["info", fill(t("ssMaybe"), { d: num(days, 1), s: sst })]);
          else N.push(["ok", fill(t("ssOk"), { d: num(days, 1), s: sst })]);
        } else if (s.form === "depot") N.push(["info", t("ssDepotGeneric")]);
      }
    } else if (s.form === "depot") N.push(["info", t("ssDepotGeneric")]);

    if (r.value == null) return r;
    var v = r.value, cvF = r.cv != null ? r.cv / 100 : 0;
    r.lo = v * (1 - cvF); r.hi = v * (1 + cvF);

    // OUS
    var ref = [ousToN(d, d.ous.ref[0]), ousToN(d, d.ous.ref[1])];
    var rt = rfmt(d, q, ref[0], ref[1]);
    var cls = v < ref[0] ? "below" : v > ref[1] ? "above" : "in";
    N.push([cls === "in" ? (r.timingOus ? "ok" : "info") : "warn", fill(t(cls === "in" ? "inRef" : cls === "below" ? "belowRef" : "aboveRef"), { r: rt })]);
    if (cvF && ((r.lo < ref[0] && r.hi > ref[0]) || (r.lo < ref[1] && r.hi > ref[1])))
      N.push(["info", fill(t("nearEdge"), { lo: num(toDisp(d, q, r.lo)), hi: cfmt(d, q, r.hi) })]);
    var ringe = ousToN(d, d.ous.ringe), tox = ousToN(d, d.ous.tox), fatal = ousToN(d, d.ous.fatal);
    if (tox != null && v >= tox) N.push(["err", fill(t("overTox"), { v: cfmt(d, q, tox) })]);
    else if (ringe != null && v >= ringe) N.push(["err", fill(t("overRinge"), { v: cfmt(d, q, ringe) })]);
    if (fatal != null && v >= 0.5 * fatal) N.push(["err", fill(t("fatal"), { v: cfmt(d, q, fatal) })]);
    if (d.ous.note) N.push(["info", nm(d.ous.note)]);

    // Dose i forhold til doseintervallet
    if (r.daily != null && s.form !== "depot") {
      var dr = d.ous.dose || d.ous.doseSpc;
      if (dr && (r.daily < dr[0] - 1e-9 || r.daily > dr[1] + 1e-9))
        N.push(["info", fill(t(d.ous.dose ? "doseOutside" : "doseSpcOutside"), { d: dfmt(d, r.daily), r: num(dr[0]) + "–" + num(dr[1]) + " " + doseUnit(d) })]);
    }

    // AGNP terapeutisk område
    if (S.show.trr && d.agnp && d.agnp.trr) {
      var aq = d.agnp.of, av = qtyValue(d, s, aq);
      var tr = [agnpToN(d, aq, d.agnp.trr[0]), agnpToN(d, aq, d.agnp.trr[1])];
      r.trr = { of: aq, lo: tr[0], hi: tr[1], value: av };
      if (av != null) {
        var tt = rfmt(d, aq, tr[0], tr[1]);
        var c2 = av < tr[0] ? "belowTrr" : av > tr[1] ? "aboveTrr" : "inTrr";
        N.push([!r.timingAgnp ? "info" : c2 === "inTrr" ? "ok" : "warn", fill(t(c2), { r: tt }) + (r.timingAgnp ? "" : " (" + t("tipTimingBad").toLowerCase().replace(/\.$/, "") + ")")]);
        if (aq !== q) N.push(["info", fill(t("trrOf"), { x: qtyLabel(d, aq), v: cfmt(d, aq, av) })]);
      }
    }
    if (S.show.alert && d.agnp && d.agnp.alert != null) {
      var alq = d.agnp.of, alv = qtyValue(d, s, alq), al = agnpToN(d, alq, d.agnp.alert);
      r.alert = { of: alq, v: al };
      if (alv != null && alv >= al) N.push(["err", fill(t("overAlert"), { v: cfmt(d, alq, al) })]);
    }
    // AGNP forventet for dose
    if (S.show.drr) {
      var drr = calcDrr(d, s, r.hours);
      r.drr = drr;
      if (drr.why) N.push(["info", fill(t("drrNa"), { why: drr.why })]);
      else {
        var dv = qtyValue(d, s, drr.of), dtt = rfmt(d, drr.of, drr.lo, drr.hi);
        if (dv != null) {
          var c3 = dv < drr.lo ? "belowDrr" : dv > drr.hi ? "aboveDrr" : "inDrr";
          N.push([c3 === "inDrr" ? "ok" : "warn", fill(t(c3), { r: dtt })]);
        }
        N.push(["info", fill(t("drrNote"), { n: s.perDay, d: dfmt(d, s.dose), h: num(r.hours, 1) }) + (drr.extrap ? " " + t("drrExtrap") : "")]);
      }
    }
    // Metabolitt/morstoff
    if (d.mpr) {
      var m = s.values[d.mpr.pair[0]], p = s.values[d.mpr.pair[1]];
      if (m != null && p > 0 && !isNaN(m)) {
        var ratio = m / p, rr = s.form === "depot" && d.mpr.rangeDepot ? d.mpr.rangeDepot : d.mpr.range;
        var ma = d.analytes.find(function (a) { return a.key === d.mpr.pair[0]; }), pa = d.analytes.find(function (a) { return a.key === d.mpr.pair[1]; });
        var o = { m: aname(ma), p: aname(pa), v: num(ratio, 2), r: num(rr[0], 2) + "–" + num(rr[1], 2) };
        r.mpr = ratio;
        N.push([ratio < rr[0] || ratio > rr[1] ? "warn" : "info", fill(t(ratio < rr[0] || ratio > rr[1] ? "mprOut" : "mpr"), o)]);
      }
    }
    if (r.cv == null) N.push(["info", t("noCv")]);
    return r;
  }

  /* ------------------------------------------------------------------
     5. SKJEMA
     ------------------------------------------------------------------ */
  var app = document.getElementById("app");

  function sampleCard(i) {
    var d = drug(), s = S.samples[i], E = S.errors[i] || {};
    var isPrev = i === 1;
    var h = '<section class="card" data-sample="' + i + '"><h2>' + (isPrev ? t("samplePrev") + ' <span class="tag prev">' + t("samplePrevTag") + "</span>" : t("sampleNew")) + "</h2>";
    if (!d) return h + '<p class="subtle-box">' + t("reqDrug") + "</p></section>";
    h += '<div class="grid">';
    if (d.depot) {
      h += '<div class="field full"><span class="lbl">' + t("form") + '</span><div class="seg wide" role="group">' +
        '<button type="button" data-act="form" data-v="tablet" aria-pressed="' + (s.form === "tablet") + '">' + t("tablet") + "</button>" +
        '<button type="button" data-act="form" data-v="depot" aria-pressed="' + (s.form === "depot") + '">' + t("depot") + "</button></div></div>";
    }
    if (s.form === "depot") {
      h += '<div class="field"><label for="dp' + i + '">' + t("depotProduct") + '</label><select class="input" id="dp' + i + '" data-f="depotId">';
      d.depot.forEach(function (p) { h += '<option value="' + p.id + '"' + (s.depotId === p.id ? " selected" : "") + ">" + esc(p.name) + "</option>"; });
      h += '<option value="other"' + (s.depotId === "other" ? " selected" : "") + ">" + t("depotOther") + "</option></select></div>";
      h += numField(i, "dose", t("depotDose"), "mg", s.dose, E.dose);
      h += numField(i, "interval", t("interval"), t("days"), s.interval, E.interval);
      h += dtField(i, "last", t("lastInj"), s.last, E.last);
    } else {
      if (d.drc && Object.keys(d.drc).length > 1) {
        h += '<div class="field full"><label for="fm' + i + '">' + t("formulation") + '</label><select class="input" id="fm' + i + '" data-f="formulation">';
        Object.keys(d.drc).forEach(function (k) { h += '<option value="' + k + '"' + ((s.formulation || Object.keys(d.drc)[0]) === k ? " selected" : "") + ">" + esc(nm(d.drc[k].label) || k) + "</option>"; });
        h += "</select></div>";
      }
      h += numField(i, "dose", t("dosePer"), doseUnit(d), s.dose, E.dose, d.id === "litium" ? t("litDose") : null);
      h += '<div class="field"><label for="pd' + i + '">' + t("perDay") + '</label><select class="input" id="pd' + i + '" data-f="perDay">';
      [1, 2, 3, 4].forEach(function (n) { h += '<option value="' + n + '"' + (s.perDay === n ? " selected" : "") + ">" + n + "</option>"; });
      h += '</select><div class="hint" id="dd' + i + '">' + dailyHint(d, s) + "</div></div>";
      h += dtField(i, "last", t("lastDose"), s.last, E.last);
    }
    h += dtField(i, "sample", t("sampleTime"), s.sample, E.sample);
    d.analytes.forEach(function (a) {
      var q = d.analytes.length > 1 ? a.key : d.measure;
      var shown = s.values[a.key] != null && !isNaN(s.values[a.key]) ? fmtInput(toDisp(d, q === "sum" ? a.key : a.key, s.values[a.key])) : "";
      h += '<div class="field"><label for="v' + i + a.key + '">' + (d.analytes.length > 1 ? esc(aname(a)) : t("measured")) + (a.optional ? ' <span class="opt">(' + t("optional") + ")</span>" : "") + "</label>" +
        '<div class="with-unit"><input class="input' + (E["v" + a.key] ? " invalid" : "") + '" id="v' + i + a.key + '" data-val="' + a.key + '" inputmode="decimal" autocomplete="off" value="' + esc(shown) + '"><span class="unit">' + unitLabel(d) + "</span></div></div>";
    });
    h += '<div class="field full"><label for="ch' + i + '">' + t("changeDate") + ' <span class="opt">(' + t("optional") + ')</span></label><input class="input" type="date" id="ch' + i + '" data-f="change" value="' + esc(s.change) + '"><div class="hint">' + t("changeHint") + "</div></div>";
    h += "</div>";
    if (E.order) h += '<p class="err-text">' + t("timeOrder") + "</p>";
    return h + "</section>";
  }
  function dailyHint(d, s) { return s.dose > 0 && s.form !== "depot" ? t("dailyDose") + ": " + dfmt(d, s.dose * (s.perDay || 1)) : ""; }
  function fmtInput(v) { if (v == null) return ""; var r = Math.round(v * 1000) / 1000; return num(r, 3).replace(/\s/g, ""); }
  function numField(i, f, label, unit, val, err, hint) {
    return '<div class="field"><label for="' + f + i + '">' + label + '</label><div class="with-unit"><input class="input' + (err ? " invalid" : "") + '" id="' + f + i + '" data-f="' + f + '" inputmode="decimal" autocomplete="off" value="' + (val != null && !isNaN(val) ? esc(num(val, 3).replace(/\s/g, "")) : "") + '"><span class="unit">' + esc(unit) + "</span></div>" + (hint ? '<div class="hint">' + esc(hint) + "</div>" : "") + "</div>";
  }
  function dtField(i, f, label, val, err) {
    return '<div class="field"><label for="' + f + i + '">' + label + '</label><input class="input' + (err ? " invalid" : "") + '" type="datetime-local" id="' + f + i + '" data-f="' + f + '" value="' + esc(val) + '"></div>';
  }
  function unitSeg() {
    var d = drug();
    var mol = d ? (baseUnit(d) === "umol" ? "µmol/L" : baseUnit(d) === "mmol" ? "mmol/L" : "nmol/L") : "nmol/L";
    var g = d ? (baseUnit(d) === "umol" ? "µg/mL" : baseUnit(d) === "mmol" ? "mmol/L" : "ng/mL") : "ng/mL";
    if (d && baseUnit(d) === "mmol") return "";
    return '<div class="seg" role="group" aria-label="' + t("units") + '"><button type="button" data-act="units" data-v="mol" aria-pressed="' + (S.units === "mol") + '">' + mol + '</button><button type="button" data-act="units" data-v="g" aria-pressed="' + (S.units === "g") + '">' + g + "</button></div>";
  }

  function renderForm() {
    var d = drug();
    var h = '<div class="hero"><h1>' + t("heroTitle") + "</h1><p>" + t("heroText") + "</p></div>";
    h += '<p class="disclaimer">' + t("disclaimer") + "</p>";
    h += '<section class="card"><div class="card-head"><h2>' + t("drug") + "</h2>" + unitSeg() + "</div>" +
      '<div class="combo" id="combo"><input class="input' + (S.errors.drug ? " invalid" : "") + '" id="drugInput" role="combobox" aria-expanded="false" aria-controls="drugList" autocomplete="off" placeholder="' + t("drugPh") + '" value="' + esc(d ? dname(d) : "") + '">' +
      '<ul class="combo-list" id="drugList" role="listbox" hidden></ul></div>' +
      '<label class="check"><input type="checkbox" id="cmpBox"' + (S.compare ? " checked" : "") + "><span>" + t("compare") + "<small>" + t("compareHint") + "</small></span></label></section>";
    h += sampleCard(0);
    if (S.compare) h += sampleCard(1);
    h += '<div class="actions"><button type="button" class="btn btn-ghost" data-act="reset">' + t("reset") + '</button><button type="button" class="btn btn-primary" data-act="submit">' + t("show") + "</button></div>";
    if (Object.keys(S.errors).length) h += '<p class="err-text" style="text-align:right">' + (S.errors.drug ? t("reqDrug") : t("req")) + "</p>";
    app.innerHTML = h;
    bindCombo();
  }

  function bindCombo() {
    var inp = document.getElementById("drugInput"), list = document.getElementById("drugList");
    var active = -1, items = [];
    function open(filter) {
      var f = (filter || "").toLowerCase().trim(), h = "";
      items = [];
      ["ad", "ap", "ms"].forEach(function (g) {
        var ds = DRUGS.filter(function (x) { return x.group === g && (!f || x.no.toLowerCase().indexOf(f) >= 0 || x.en.toLowerCase().indexOf(f) >= 0); })
          .sort(function (a, b) { return dname(a).localeCompare(dname(b), S.lang); });
        if (!ds.length) return;
        h += '<li class="grp" role="presentation">' + t("groups")[g] + "</li>";
        ds.forEach(function (x) { items.push(x.id); h += '<li class="opt-item" role="option" data-id="' + x.id + '" id="opt-' + x.id + '"><span>' + esc(dname(x)) + "</span>" + (S.lang === "nb" && x.en !== x.no ? "<small>" + esc(x.en) + "</small>" : "") + "</li>"; });
      });
      list.innerHTML = h || '<li class="empty">' + t("noMatch") + "</li>";
      list.hidden = false; inp.setAttribute("aria-expanded", "true"); active = -1;
    }
    function close() { list.hidden = true; inp.setAttribute("aria-expanded", "false"); }
    function choose(id) {
      if (S.drugId !== id) { S.drugId = id; S.samples = [blankSample(), blankSample()]; var d = drug(); if (d.depot) { S.samples[0].depotId = d.depot[0].id; S.samples[1].depotId = d.depot[0].id; } }
      delete S.errors.drug; close(); renderForm();
    }
    function hl() { [].forEach.call(list.querySelectorAll(".opt-item"), function (el, k) { el.classList.toggle("active", k === active); }); if (active >= 0) { var el = list.querySelectorAll(".opt-item")[active]; el.scrollIntoView({ block: "nearest" }); inp.setAttribute("aria-activedescendant", el.id); } }
    inp.addEventListener("focus", function () { inp.select(); open(""); });
    inp.addEventListener("input", function () { open(inp.value); });
    inp.addEventListener("keydown", function (e) {
      if (list.hidden && (e.key === "ArrowDown" || e.key === "Enter")) { open(inp.value); }
      if (e.key === "ArrowDown") { active = Math.min(items.length - 1, active + 1); hl(); e.preventDefault(); }
      else if (e.key === "ArrowUp") { active = Math.max(0, active - 1); hl(); e.preventDefault(); }
      else if (e.key === "Enter") { e.preventDefault(); if (active >= 0) choose(items[active]); else if (items.length) choose(items[0]); }
      else if (e.key === "Escape") { close(); inp.blur(); }
    });
    list.addEventListener("mousedown", function (e) { var li = e.target.closest(".opt-item"); if (li) { e.preventDefault(); choose(li.dataset.id); } });
    inp.addEventListener("blur", function () { setTimeout(function () { close(); var d = drug(); inp.value = d ? dname(d) : ""; }, 120); });
  }

  // Lesing av felt
  app.addEventListener("input", function (e) {
    var el = e.target, card = el.closest("[data-sample]"); if (!card) return;
    var s = S.samples[+card.dataset.sample], d = drug();
    if (el.dataset.val) { var v = parseNum(el.value); s.values[el.dataset.val] = v == null ? null : fromDisp(d, el.dataset.val, v); }
    else if (el.dataset.f) {
      var f = el.dataset.f;
      if (f === "dose" || f === "interval") s[f] = parseNum(el.value);
      else if (f === "perDay") s.perDay = +el.value;
      else s[f] = el.value;
      if (f === "dose" || f === "perDay") { var hd = document.getElementById("dd" + card.dataset.sample); if (hd) hd.textContent = dailyHint(d, s); }
    }
  });
  app.addEventListener("change", function (e) {
    var el = e.target;
    if (el.id === "cmpBox") { S.compare = el.checked; if (S.compare && !S.samples[1].form) S.samples[1] = blankSample(); renderForm(); return; }
    if (el.dataset && el.dataset.show) { S.show[el.dataset.show] = el.checked; savePrefs(); renderResults(); return; }
    var card = el.closest && el.closest("[data-sample]"); if (!card) return;
    var s = S.samples[+card.dataset.sample], d = drug();
    if (el.dataset.f === "depotId") { s.depotId = el.value; var p = depotOf(d, s); if (p && p.interval) s.interval = p.interval; renderForm(); }
    else if (el.dataset.f === "formulation") s.formulation = el.value;
  });
  app.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]"); if (!b) return;
    var act = b.dataset.act;
    if (act === "form") { var s = S.samples[+b.closest("[data-sample]").dataset.sample], d = drug(); s.form = b.dataset.v; if (s.form === "depot" && !s.depotId) s.depotId = d.depot[0].id; if (s.form === "depot") { var p = depotOf(d, s); if (p && !s.interval) s.interval = p.interval; } renderForm(); }
    else if (act === "units") { S.units = b.dataset.v; savePrefs(); S.view === "form" ? renderForm() : renderResults(); }
    else if (act === "submit") submit();
    else if (act === "reset") { S.drugId = null; S.compare = false; S.samples = [blankSample(), blankSample()]; S.errors = {}; renderForm(); }
    else if (act === "edit") { S.view = "form"; renderForm(); window.scrollTo(0, 0); }
  });

  function validate() {
    var errs = {}, d = drug();
    if (!d) { errs.drug = true; return errs; }
    var n = S.compare ? 2 : 1;
    for (var i = 0; i < n; i++) {
      var s = S.samples[i], E = {};
      if (!(s.dose > 0)) E.dose = 1;
      if (s.form === "depot" && !(s.interval > 0)) E.interval = 1;
      if (!s.last || isNaN(Date.parse(s.last))) E.last = 1;
      if (!s.sample || isNaN(Date.parse(s.sample))) E.sample = 1;
      if (!E.last && !E.sample && Date.parse(s.sample) <= Date.parse(s.last)) { E.order = 1; E.sample = 1; }
      d.analytes.forEach(function (a) { var v = s.values[a.key]; if (a.optional) { if (v != null && (isNaN(v) || v < 0)) E["v" + a.key] = 1; } else if (v == null || isNaN(v) || v < 0) E["v" + a.key] = 1; });
      if (Object.keys(E).length) errs[i] = E;
    }
    return errs;
  }
  function submit() {
    S.errors = validate();
    if (Object.keys(S.errors).length) { renderForm(); var el = app.querySelector(".invalid"); if (el) el.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
    S.view = "results"; renderResults(); window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------
     6. RESULTAT
     ------------------------------------------------------------------ */
  function renderResults() {
    var d = drug();
    if (!d) { S.view = "form"; return renderForm(); }
    var R0 = evaluate(d, S.samples[0]), R1 = S.compare ? evaluate(d, S.samples[1]) : null;
    var q = d.measure;
    var sub = qtyLabel(d, q) + " · " + (S.samples[0].form === "depot" ? num(R0.hours / 24, 1) + " " + t("daysAfterInj") : num(R0.hours, 1) + " " + t("hoursAfter"));
    var h = '<div class="res-title"><div><h1>' + esc(dname(d)) + '</h1><div class="sub">' + esc(sub) + '</div></div><button type="button" class="btn btn-ghost" data-act="edit">← ' + t("edit") + "</button></div>";

    // Tidslinje
    h += '<section class="card"><div class="card-head"><h2>' + t("timeline") + " <span class=\"tag\">" + esc(unitLabel(d)) + "</span></h2>" + unitSeg() + "</div>";
    h += '<div class="timeline-wrap" id="tl"></div><div class="legend" id="legend"></div>';
    h += '<div class="toggles">' +
      toggle("trr", t("agnpTrr")) + toggle("drr", t("agnpDrr")) + toggle("alert", t("agnpAlert")) + "</div></section>";

    // Sammenlikning
    if (R1) h += compareCard(d, R0, R1);

    // Vurdering
    h += '<section class="card"><h2>' + t("interpretation") + (R1 ? ' <span class="tag">' + t("legNew") + "</span>" : "") + "</h2>" + kvBlock(d, R0, S.samples[0]) + notesHtml(R0.notes) + "</section>";
    if (R1) h += '<section class="card"><h2>' + t("interpretation") + ' <span class="tag prev">' + t("legPrev") + "</span></h2>" + kvBlock(d, R1, S.samples[1]) + notesHtml(R1.notes) + "</section>";

    h += sourcesCard(d);
    app.innerHTML = h;
    drawTimeline(d, R0, R1);
  }
  function toggle(k, label) { return '<label class="check"><input type="checkbox" data-show="' + k + '"' + (S.show[k] ? " checked" : "") + "><span>" + label + "</span></label>"; }
  function notesHtml(N) {
    var order = { err: 0, warn: 1, info: 2, ok: 3 };
    return '<ul class="notes">' + N.slice().sort(function (a, b) { return order[a[0]] - order[b[0]]; }).map(function (n) { return '<li class="note ' + n[0] + '">' + esc(n[1]) + "</li>"; }).join("") + "</ul>";
  }
  function kvBlock(d, R, smp) {
    if (R.value == null) return "";
    var q = R.q, h = '<div class="kv" style="margin-bottom:12px">';
    h += '<div class="item"><div class="k">' + t("measuredLbl") + (q === "sum" ? " (" + t("sum") + ")" : "") + '</div><div class="v">' + num(toDisp(d, q, R.value)) + " <small>" + unitLabel(d) + "</small></div></div>";
    if (R.cv != null) h += '<div class="item"><div class="k">' + t("margin") + " (±" + num(R.cv, 0) + ' %)</div><div class="v">' + num(toDisp(d, q, R.lo)) + "–" + num(toDisp(d, q, R.hi)) + "</div></div>";
    if (R.hours != null) h += '<div class="item"><div class="k">' + t("sTime") + '</div><div class="v">' + (smp.form === "depot" ? num(R.hours / 24, 1) + " <small>" + t("dayUnit") + "</small>" : num(R.hours, 1) + " <small>" + (S.lang === "en" ? "h" : "t") + "</small>") + "</div></div>";
    return h + "</div>";
  }

  function compareCard(d, R0, R1) {
    var s0 = S.samples[0], s1 = S.samples[1], q = d.measure;
    var h = '<section class="card"><h2>' + t("comparison") + "</h2>";
    var ms = dt(s1.sample, s0.sample);
    h += '<div class="kv">';
    if (ms != null) h += '<div class="item"><div class="k">' + t("cmpDays") + '</div><div class="v">' + num(ms / DAY, 1) + " <small>" + t("dayUnit") + "</small></div></div>";
    var notes = [];
    if (R0.value != null && R1.value != null) {
      var diff = R0.value - R1.value, pct = R1.value > 0 ? diff / R1.value * 100 : null;
      var cls = diff > 0 ? "up" : diff < 0 ? "down" : "";
      h += '<div class="item"><div class="k">' + t("cmpAbs") + '</div><div class="v ' + cls + '">' + (diff > 0 ? "+" : "") + num(toDisp(d, q, diff)) + " <small>" + unitLabel(d) + "</small></div></div>";
      if (pct != null) h += '<div class="item"><div class="k">' + t("cmpPct") + '</div><div class="v ' + cls + '">' + (pct > 0 ? "+" : "") + num(pct, 0) + " %</div></div>";
      if (R0.daily > 0 && R1.daily > 0 && s0.form === s1.form) {
        var cd0 = R0.value / R0.daily, cd1 = R1.value / R1.daily, cdp = (cd0 - cd1) / cd1 * 100;
        h += '<div class="item"><div class="k">' + t("cmpCd") + '</div><div class="v ' + (cdp > 0 ? "up" : cdp < 0 ? "down" : "") + '">' + (cdp > 0 ? "+" : "") + num(cdp, 0) + " %</div></div>";
        if (Math.abs(R0.daily - R1.daily) > 1e-9) {
          var exp = R1.value * R0.daily / R1.daily;
          h += '<div class="item"><div class="k">' + t("cmpExpected") + '</div><div class="v">' + num(toDisp(d, q, exp)) + " <small>" + unitLabel(d) + "</small></div></div>";
        }
        if (Math.abs(cdp) > 20) notes.push(["warn", t("cmpCdNote")]);
      }
      if (R0.cv != null && R1.cv != null && pct != null) {
        var rcv = 1.96 * Math.sqrt(R0.cv * R0.cv + R1.cv * R1.cv);
        notes.push([Math.abs(pct) > rcv ? "info" : "ok", fill(t(Math.abs(pct) > rcv ? "cmpRcv" : "cmpRcvNo"), { v: num(rcv, 0) })]);
      }
      var dd = function (s, R) { return s.form === "depot" ? dfmt(d, s.dose) + " / " + num(s.interval) + " " + t("dayUnit") : dfmt(d, R.daily) + (S.lang === "en" ? "/day" : "/døgn"); };
      if (S.show.drr && R0.drr && R1.drr && !R0.drr.why && !R1.drr.why)
        notes.push(["info", fill(t("cmpDiffDrr"), { a: dd(s0, R0) + ": " + rfmt(d, R0.drr.of, R0.drr.lo, R0.drr.hi), b: dd(s1, R1) + ": " + rfmt(d, R1.drr.of, R1.drr.lo, R1.drr.hi) })]);
      else notes.push(["info", fill(t("cmpDosesOus"), { a: dd(s0, R0), b: dd(s1, R1) })]);
    }
    h += "</div>";
    if (notes.length) h += '<div style="margin-top:12px">' + notesHtml(notes) + "</div>";
    return h + "</section>";
  }

  function sourcesCard(d) {
    var q = d.measure, O = d.ous, A = d.agnp;
    var row = function (src, k, v) { return v == null || v === "" ? "" : "<tr><th>" + (src ? '<span class="badge-src ' + src + '">' + (src === "ous" ? "OUS" : "AGNP") + "</span>" : "") + esc(k) + "</th><td>" + esc(v) + "</td></tr>"; };
    var h = '<details class="card"><summary>' + t("sources") + " " + esc(dname(d)) + '</summary><table class="src-table">';
    h += row("ous", t("sRef") + (q === "sum" ? " (" + qtyLabel(d, q) + ")" : ""), rfmt(d, q, ousToN(d, O.ref[0]), ousToN(d, O.ref[1])));
    h += row("ous", t("sWin"), winTxtL(O.window || [12, 24]) + (O.windowTol != null ? " (± " + num(O.windowTol, 1) + ")" : ""));
    if (O.dose) h += row("ous", t("sDose"), num(O.dose[0]) + "–" + num(O.dose[1]) + " " + doseUnit(d));
    if (O.doseSpc) h += row(null, t("sDoseSpc"), num(O.doseSpc[0]) + "–" + num(O.doseSpc[1]) + " " + doseUnit(d));
    if (O.ringe != null) h += row("ous", t("sRinge"), cfmt(d, q, ousToN(d, O.ringe)));
    if (O.tox != null) h += row("ous", t("sTox"), cfmt(d, q, ousToN(d, O.tox)));
    if (O.fatal != null) h += row("ous", t("sFatal"), cfmt(d, q, ousToN(d, O.fatal)));
    h += row("ous", t("sCv"), d.analytes[0].qcm != null ? "≤ " + DATA.cv.low + " % / ≤ " + DATA.cv.high + " %" : "–");
    if (A) {
      h += row("agnp", t("sTrr") + " (" + qtyLabel(d, A.of) + ")", rfmt(d, A.of, agnpToN(d, A.of, A.trr[0]), agnpToN(d, A.of, A.trr[1])) + (A.revised ? " – " + t("revised") : ""));
      h += row("agnp", t("sTime"), winTxtL(A.time));
      h += row("agnp", t("sSs"), (A.ss[0] === A.ss[1] ? num(A.ss[0]) : num(A.ss[0]) + "–" + num(A.ss[1])) + " " + t("dayUnit"));
      h += row("agnp", t("sAlert"), cfmt(d, A.of, agnpToN(d, A.of, A.alert)));
      h += row("agnp", t("sLevel"), t("levels")[A.level]);
      h += row("agnp", t("sBasis"), A.basis.map(function (b) { return t("basis")[b]; }).join(", ") + ". " + nm(A.note));
    }
    if (d.mpr) h += row("agnp", t("sMpr"), num(d.mpr.range[0], 2) + "–" + num(d.mpr.range[1], 2) + (d.mpr.rangeDepot ? " (depot " + num(d.mpr.rangeDepot[0], 1) + "–" + num(d.mpr.rangeDepot[1], 1) + ")" : ""));
    h += row("agnp", t("sDrc"), d.drc ? t("drcAvail") : (nm(d.drcNote) || t("drcNa")));
    return h + "</table></details>";
  }

  /* ------------------------------------------------------------------
     7. TIDSLINJE (SVG)
     ------------------------------------------------------------------ */
  function niceStep(range, target) {
    var raw = range / target, mag = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / mag;
    return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * mag;
  }
  function drawTimeline(d, R0, R1) {
    var wrap = document.getElementById("tl"); if (!wrap) return;
    var W = Math.max(300, wrap.clientWidth || 600), q = d.measure, O = d.ous;
    var ref = [ousToN(d, O.ref[0]), ousToN(d, O.ref[1])], ringe = ousToN(d, O.ringe), tox = ousToN(d, O.tox);
    var tipsHtml = {}, tipId = 0;
    function tip(html) { tipId++; tipsHtml["t" + tipId] = html; return ' class="tl-hit" data-tip="t' + tipId + '"'; }

    // Skala i visningsenhet
    var D = function (n) { return toDisp(d, q, n); };
    var cands = [D(ref[1]) * 1.6];
    if (ringe != null) cands.push(D(ringe) * 1.25);
    if (tox != null) cands.push(D(tox) * 1.3);
    [R0, R1].forEach(function (R) {
      if (!R || R.value == null) return;
      cands.push(D(R.hi || R.value) * 1.12);
      if (R.trr && R.trr.of === q) cands.push(D(R.trr.hi) * 1.2);
      if (R.drr && !R.drr.why && R.drr.of === q) cands.push(D(R.drr.hi) * 1.1);
      if (R.alert && R.alert.of === q) cands.push(D(R.alert.v) * 1.15);
    });
    var vmax = Math.max.apply(null, cands.filter(function (x) { return x > 0 && isFinite(x); }));
    var step = niceStep(vmax, W < 480 ? 4 : 6), max = Math.ceil(vmax / step) * step;
    var L = 14, Rr = 14, plotW = W - L - Rr;
    var X = function (disp) { return L + Math.max(0, Math.min(1, disp / max)) * plotW; };
    var XN = function (n, qq) { return X(toDisp(d, qq || q, n)); };

    // Baner
    var lanes = [];
    var Rs = [R0, R1].filter(Boolean);
    if (S.show.trr && d.agnp) lanes.push({ type: "trr" });
    if (S.show.drr) Rs.forEach(function (R, i) { if (R.drr && !R.drr.why) lanes.push({ type: "drr", R: R, i: i }); });
    var labelRows = 2, rowH = 16, laneH = 14, laneLbl = 14, trackH = 30;
    var y0 = labelRows * rowH + 8;
    var laneY = function (k) { return y0 + laneLbl + k * (laneH + laneLbl + 8); };
    var trackY = lanes.length ? laneY(lanes.length) - laneLbl : y0;
    var H = trackY + trackH + 34;
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(t("timeline")) + '">';

    // Hovedspor
    var ty = trackY, th = trackH;
    s += '<rect x="' + L + '" y="' + ty + '" width="' + plotW + '" height="' + th + '" rx="8" style="fill:var(--zone-low)"/>';
    var refTip = "<b>" + t("tipRef") + "</b>" + esc(rfmt(d, q, ref[0], ref[1])) + '<br><span class="muted">' + t("tipRefBody") + " " + t("sWin") + ": " + esc(winTxtL(O.window || [12, 24])) + (O.dose ? ". " + t("sDose") + ": " + O.dose[0] + "–" + O.dose[1] + " " + doseUnit(d) : "") + "</span>";
    s += '<rect x="' + XN(ref[0]) + '" y="' + ty + '" width="' + Math.max(2, XN(ref[1]) - XN(ref[0])) + '" height="' + th + '" style="fill:var(--zone-ref)"' + tip(refTip) + "/>";
    if (ringe != null) {
      var rEnd = tox != null && tox > ringe ? XN(tox) : L + plotW;
      s += '<rect x="' + XN(ringe) + '" y="' + ty + '" width="' + Math.max(0, rEnd - XN(ringe)) + '" height="' + th + '" style="fill:var(--zone-ringe)"' + tip("<b>" + t("tipRingeT") + "</b>≥ " + esc(cfmt(d, q, ringe))) + "/>";
    }
    if (tox != null) {
      var tx0 = XN(Math.max(tox, ringe || 0));
      if (ringe != null && tox < ringe) tx0 = XN(tox);
      s += '<rect x="' + tx0 + '" y="' + ty + '" width="' + Math.max(0, L + plotW - tx0) + '" height="' + th + '" rx="0" style="fill:var(--zone-tox)"' + tip("<b>" + t("tipToxT") + "</b>≥ " + esc(cfmt(d, q, tox)) + (O.fatal ? '<br><span class="muted">' + esc(fill(t("fatal"), { v: cfmt(d, q, ousToN(d, O.fatal)) })) + "</span>" : "")) + "/>";
    }
    // avrunde endene
    s += '<rect x="' + L + '" y="' + ty + '" width="' + plotW + '" height="' + th + '" rx="8" style="fill:none;stroke:var(--border)"/>';

    // AGNP varslingsgrense
    if (S.show.alert && d.agnp && d.agnp.alert != null && d.agnp.of === q) {
      var ax = XN(agnpToN(d, q, d.agnp.alert));
      s += '<line x1="' + ax + '" x2="' + ax + '" y1="' + (y0 - 2) + '" y2="' + (ty + th + 4) + '" style="stroke:var(--zone-tox);stroke-width:2;stroke-dasharray:4 3"/>';
      s += '<rect x="' + (ax - 6) + '" y="' + (y0 - 2) + '" width="12" height="' + (ty + th + 6 - y0) + '" style="fill:transparent"' + tip("<b>" + t("agnpAlertShort") + "</b>" + esc(cfmt(d, q, agnpToN(d, q, d.agnp.alert))) + '<br><span class="muted">' + t("tipLevel") + ": " + t("levels")[d.agnp.level] + "</span>") + "/>";
    }

    // Baner (AGNP)
    lanes.forEach(function (ln, k) {
      var y = laneY(k);
      if (ln.type === "trr") {
        var A = d.agnp, aq = A.of, lo = agnpToN(d, aq, A.trr[0]), hi = agnpToN(d, aq, A.trr[1]);
        var bad = !R0.timingAgnp;
        var tipH = "<b>" + t("agnpTrrShort") + (aq !== q ? " (" + esc(qtyLabel(d, aq)) + ")" : "") + "</b>" + esc(rfmt(d, aq, lo, hi)) +
          "<br>" + t("tipLevel") + ": " + t("levels")[A.level] + "<br>" + t("tipBasis") + ": " + esc(A.basis.map(function (b) { return t("basis")[b]; }).join(", ")) +
          '<br><span class="muted">' + esc(nm(A.note)) + "</span>" + "<br>" + t("sTime") + ": " + esc(winTxtL(A.time)) + (bad ? "<br><b>" + t("tipTimingBad") + "</b>" : "");
        s += '<rect x="' + XN(lo, aq) + '" y="' + y + '" width="' + Math.max(2, XN(hi, aq) - XN(lo, aq)) + '" height="' + laneH + '" rx="5" style="fill:var(--agnp-soft);stroke:var(--agnp);stroke-width:1.5;' + (bad ? "stroke-dasharray:4 3;opacity:.55" : "") + '"' + tip(tipH) + "/>";
        s += laneLabel(t("agnpTrrShort") + (aq !== q ? " – " + qtyLabel(d, aq) : ""), y, "var(--agnp)");
        if (aq !== q) Rs.forEach(function (R, i) { var v = qtyValue(d, S.samples[i], aq); if (v != null) s += smallMarker(XN(v, aq), y, i); });
      } else {
        var R = ln.R, dq = R.drr.of;
        var tipD = "<b>" + t("agnpDrrShort") + "</b>" + esc(rfmt(d, dq, R.drr.lo, R.drr.hi)) + "<br>" + esc(dfmt(d, S.samples[ln.i].dose)) + " × " + S.samples[ln.i].perDay + (R.drr.extrap ? '<br><span class="muted">' + esc(t("drrExtrap")) + "</span>" : "");
        s += '<rect x="' + XN(R.drr.lo, dq) + '" y="' + y + '" width="' + Math.max(2, XN(R.drr.hi, dq) - XN(R.drr.lo, dq)) + '" height="' + laneH + '" rx="5" style="fill:var(--gold-soft);stroke:var(--gold-line);stroke-width:1.5"' + tip(tipD) + "/>";
        s += laneLabel(t("agnpDrrShort") + " " + dfmt(d, S.samples[ln.i].dose * S.samples[ln.i].perDay) + (Rs.length > 1 ? " (" + (ln.i === 0 ? t("legNew") : t("legPrev")).toLowerCase() + ")" : ""), y, "var(--gold)");
        if (dq !== q) { var v2 = qtyValue(d, S.samples[ln.i], dq); if (v2 != null) s += smallMarker(XN(v2, dq), y, ln.i); }
      }
    });
    function laneLabel(txt, y, col) { return '<text x="' + L + '" y="' + (y - 4) + '" style="fill:' + col + ';font-size:11px;font-weight:600;pointer-events:none">' + esc(txt) + "</text>"; }
    function smallMarker(x, y, i) { return '<line x1="' + x + '" x2="' + x + '" y1="' + (y - 2) + '" y2="' + (y + laneH + 2) + '" style="stroke:' + (i === 0 ? "var(--marker-new)" : "var(--marker-prev)") + ';stroke-width:2.5"/>'; }

    // Akse
    var axY = ty + th + 6;
    for (var v = 0; v <= max + 1e-9; v += step) {
      var x = X(v);
      s += '<line x1="' + x + '" x2="' + x + '" y1="' + axY + '" y2="' + (axY + 5) + '" style="stroke:var(--text-muted)"/>';
      s += '<text x="' + x + '" y="' + (axY + 18) + '" text-anchor="' + (v === 0 ? "start" : v >= max - 1e-9 ? "end" : "middle") + '" style="fill:var(--text-muted);font-size:11px">' + num(v) + "</text>";
    }

    // Markører (prøver)
    var marks = [];
    Rs.forEach(function (R, i) { if (R.value != null) marks.push({ R: R, i: i, x: XN(R.value) }); });
    marks.sort(function (a, b) { return a.x - b.x; });
    marks.forEach(function (m, k) { m.w = ((Rs.length > 1 ? (m.i === 0 ? t("legNew") : t("legPrev")) + ": " : "") + num(toDisp(d, q, m.R.value))).length * 7 + 12; m.row = k > 0 && (m.x - marks[k - 1].x) < (m.w + marks[k - 1].w) / 2 ? (marks[k - 1].row + 1) % 2 : 0; });
    marks.forEach(function (m) {
      var R = m.R, col = m.i === 0 ? "var(--marker-new)" : "var(--marker-prev)";
      var lblY = 12 + m.row * rowH, cy = ty + th / 2;
      if (R.cv != null) {
        var xl = XN(R.lo), xh = XN(R.hi);
        s += '<rect x="' + xl + '" y="' + (cy - 5) + '" width="' + Math.max(1, xh - xl) + '" height="10" rx="5" style="fill:' + col + ';opacity:.22"/>';
        s += '<line x1="' + xl + '" x2="' + xh + '" y1="' + cy + '" y2="' + cy + '" style="stroke:' + col + ';stroke-width:2"/>';
        s += '<line x1="' + xl + '" x2="' + xl + '" y1="' + (cy - 6) + '" y2="' + (cy + 6) + '" style="stroke:' + col + ';stroke-width:2"/><line x1="' + xh + '" x2="' + xh + '" y1="' + (cy - 6) + '" y2="' + (cy + 6) + '" style="stroke:' + col + ';stroke-width:2"/>';
      }
      s += '<line x1="' + m.x + '" x2="' + m.x + '" y1="' + (lblY + 4) + '" y2="' + (cy - 7) + '" style="stroke:' + col + ';stroke-width:1.5;stroke-dasharray:2 2"/>';
      var tipM = "<b>" + (m.i === 0 ? (Rs.length > 1 ? t("legNew") : t("measuredLbl")) : t("legPrev")) + "</b>" + esc(cfmt(d, q, R.value)) + (R.cv != null ? "<br>" + t("margin") + " ±" + num(R.cv, 0) + " %: " + esc(rfmt(d, q, R.lo, R.hi)) : "");
      s += '<circle cx="' + m.x + '" cy="' + cy + '" r="7" style="fill:' + (m.i === 0 ? col : "var(--surface)") + ";stroke:" + col + ';stroke-width:2.5"' + tip(tipM) + "/>";
      var anchor = m.x < 60 ? "start" : m.x > W - 60 ? "end" : "middle";
      s += '<text x="' + m.x + '" y="' + lblY + '" text-anchor="' + anchor + '" style="fill:' + col + ';font-size:12px;font-weight:700">' + esc((Rs.length > 1 ? (m.i === 0 ? t("legNew") : t("legPrev")) + ": " : "") + num(toDisp(d, q, R.value))) + "</text>";
    });
    s += "</svg>";
    wrap.innerHTML = s;
    wrap._tips = tipsHtml;

    // Tegnforklaring
    var lg = '<span><i style="background:var(--zone-ref)"></i>' + t("legRef") + "</span>";
    if (ringe != null && (tox == null || ringe < tox)) lg += '<span><i style="background:var(--zone-ringe)"></i>' + t("legRinge") + "</span>";
    if (tox != null) lg += '<span><i style="background:var(--zone-tox)"></i>' + t("legTox") + "</span>";
    if (R0.cv != null) lg += '<span><i style="background:var(--marker-new);opacity:.3"></i>' + t("legCv") + "</span>";
    if (lanes.some(function (l) { return l.type === "trr"; })) lg += '<span><i style="background:var(--agnp-soft);border:1.5px solid var(--agnp)"></i>' + t("agnpTrrShort") + "</span>";
    if (lanes.some(function (l) { return l.type === "drr"; })) lg += '<span><i style="background:var(--gold-soft);border:1.5px solid var(--gold-line)"></i>' + t("agnpDrrShort") + "</span>";
    if (S.show.alert && d.agnp && d.agnp.of === q) lg += '<span><i style="background:none;border-left:2px dashed var(--zone-tox);width:8px;border-radius:0"></i>' + t("agnpAlertShort") + "</span>";
    if (R1) lg += '<span><i style="background:var(--marker-new);border-radius:50%;width:10px"></i>' + t("legNew") + '</span><span><i style="border:2px solid var(--marker-prev);border-radius:50%;width:10px"></i>' + t("legPrev") + "</span>";
    document.getElementById("legend").innerHTML = lg;
  }

  /* Verktøytips (mus og berøring) */
  var tipEl = document.getElementById("tip"), tipPinned = false;
  function showTip(target, x, y) {
    var wrap = target.closest(".timeline-wrap"); if (!wrap || !wrap._tips) return;
    tipEl.innerHTML = wrap._tips[target.getAttribute("data-tip")] || ""; tipEl.hidden = false;
    var r = tipEl.getBoundingClientRect(), px = Math.min(window.innerWidth - r.width - 12, Math.max(12, x - r.width / 2)), py = y - r.height - 14;
    if (py < 8) py = y + 18;
    tipEl.style.left = px + "px"; tipEl.style.top = py + "px";
  }
  document.addEventListener("mousemove", function (e) {
    if (tipPinned) return;
    var tg = e.target.closest && e.target.closest(".tl-hit");
    if (tg) showTip(tg, e.clientX, e.clientY); else tipEl.hidden = true;
  });
  document.addEventListener("click", function (e) {
    var tg = e.target.closest && e.target.closest(".tl-hit");
    if (tg) { tipPinned = true; showTip(tg, e.clientX, e.clientY); } else { tipPinned = false; tipEl.hidden = true; }
  });
  window.addEventListener("scroll", function () { if (tipPinned) { tipPinned = false; tipEl.hidden = true; } }, { passive: true });
  var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { if (S.view === "results") { var d = drug(); drawTimeline(d, evaluate(d, S.samples[0]), S.compare ? evaluate(d, S.samples[1]) : null); } }, 150); });

  /* ------------------------------------------------------------------
     8. TEMA, SPRÅK, OPPSTART
     ------------------------------------------------------------------ */
  var ICON = {
    auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
  };
  function themeMode() { var v = store("tdmTheme"); return v === "light" || v === "dark" ? v : "auto"; }
  function applyTheme() {
    var m = themeMode();
    if (m === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", m);
    var b = document.getElementById("themeBtn"), lbl = t(m === "auto" ? "themeAuto" : m === "light" ? "themeLight" : "themeDark");
    b.innerHTML = ICON[m]; b.title = lbl; b.setAttribute("aria-label", lbl);
  }
  document.getElementById("themeBtn").addEventListener("click", function () {
    var m = themeMode(), next = m === "auto" ? "light" : m === "light" ? "dark" : "auto";
    store("tdmTheme", next === "auto" ? "" : next); applyTheme();
  });
  function applyLang() {
    document.documentElement.lang = S.lang === "en" ? "en" : "nb";
    [].forEach.call(document.querySelectorAll("#langSeg button"), function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === S.lang)); });
    document.getElementById("footerText").textContent = fill(t("footer"), { d: DATA.updated });
    applyTheme();
  }
  document.getElementById("langSeg").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    S.lang = b.dataset.lang; savePrefs(); applyLang(); S.view === "form" ? renderForm() : renderResults();
  });
  document.getElementById("brandLink").addEventListener("click", function (e) { e.preventDefault(); S.view = "form"; renderForm(); });

  applyLang();
  renderForm();
})();
