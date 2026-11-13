/* =====================================================================
   TDMinfo — legemiddeldata
   ---------------------------------------------------------------------
   All faglig informasjon som appen bruker, ligger i denne filen.
   Kilder:
     • OUS: OneNote «Psykofarmaka» (Svarkommentering, FAR) og
       Referanseområdeprosjektet 2005–2008 (Diakonhjemmet/St. Olavs).
     • AGNP: Hart XM et al. Consensus Guidelines for Therapeutic Drug
       Monitoring in Neuropsychopharmacology: Update 2026.
       Pharmacopsychiatry 2026; 59: 166–295. Tabell 5 (TRR, alert level,
       anbefalingsnivå), tabell 6 (DRC-faktorer) og tabell 7 (MPR).
     • Analytisk variasjon (CV): OUS kontroller lav/medium/høy (QCL/QCM/QCH).

   Enheter:
     • Konsentrasjoner fra OUS er i nmol/L (litium mmol/L, lamotrigin µmol/L).
     • AGNP-tall er lagret slik de står i artikkelen (ng/mL, litium mmol/L,
       lamotrigin µg/mL) og regnes om i appen med molmasse (mw, g/mol).
     • DRC-faktorer: [Δt (timer), middel, lav, høy] i (ng/mL)/mg
       (litium: (µmol/L)/mmol). Gjelder én døgndose-«strøm» tatt Δt timer
       før prøvetaking ved steady state.
   ===================================================================== */

window.TDM_DATA = {
  updated: "2026-11-13",

  // Analytisk variasjon fra OUS: CV ≤ 20 % ved laveste kontroll,
  // ≤ 15 % ved medium og høyeste kontroll. Konsentrasjoner under
  // medium kontroll (QCM) får 20 %, ellers 15 %.
  cv: { low: 20, high: 15 },

  drugs: [
    /* ------------------------------ ANTIDEPRESSIVA ------------------------------ */
    {
      id: "amitriptylin", no: "Amitriptylin", en: "Amitriptyline", group: "ad",
      analytes: [
        { key: "AMI", no: "Amitriptylin", en: "Amitriptyline", mw: 277.40, qcm: 100 },
        { key: "NOR", no: "Nortriptylin", en: "Nortriptyline", mw: 263.38, qcm: 100, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Amitriptylin + nortriptylin", en: "Amitriptyline + nortriptyline" },
      ous: { ref: [400, 900], dose: [25, 200], window: [12, 24], ringe: 1800, tox: 1800 },
      agnp: { trr: [80, 200], of: "sum", time: [12, 12], ss: [4, 9], alert: 300, level: 1,
        basis: ["meta", "conc"],
        note: { no: "Basert på meta-analyse; sammenheng mellom konsentrasjon, effekt og (sentral og kardial) toksisitet er godt etablert.",
                en: "Based on a meta-analysis; the concentration–effect and toxicity relationship is well established." } },
      mpr: { pair: ["NOR", "AMI"], range: [0.2, 1.8] },
      drc: { tablet: { of: "sum", pts: [[24, 0.775, 0.557, 2.008], [12, 1.055, 0.762, 2.684]] } },
      t12: 25, tmax: 4
    },
    {
      id: "bupropion", no: "Bupropion (hydroksybupropion)", en: "Bupropion (hydroxybupropion)", group: "ad",
      analytes: [
        { key: "HBUP", no: "Hydroksybupropion", en: "Hydroxybupropion", mw: 255.74, qcm: 400, metabolite: true }
      ],
      measure: "HBUP",
      ous: { ref: [500, 4000], doseSpc: [150, 300], window: [12, 24], ringe: 8000, tox: 5000, fatal: 16000,
        note: { no: "Kun hydroksybupropion måles. Kramper beskrevet fra ca. 5000 nmol/L.", en: "Only hydroxybupropion is measured. Seizures reported from approx. 5000 nmol/L." } },
      agnp: { trr: [850, 1500], of: "HBUP", time: [24, 24], ss: [4, 10], alert: 1500, level: 2,
        basis: ["tdm"],
        note: { no: "Nedre grense fra ROC-analyse av retrospektive TDM-data; øvre grense er ekspertvurdering.",
                en: "Lower limit from ROC analysis of retrospective TDM data; upper limit is expert opinion." } },
      drc: { tablet: { of: "HBUP", label: { no: "Depottablett (XR, 1 gang daglig)", en: "Extended release (XR, once daily)" }, pts: [[24, 2.363, 1.788, 3.486]] } },
      t12: 20, tmax: 6
    },
    {
      id: "citalopram", no: "Citalopram", en: "Citalopram", group: "ad",
      analytes: [{ key: "CIT", no: "Citalopram", en: "Citalopram", mw: 324.39, qcm: 100 }],
      measure: "CIT",
      ous: { ref: [70, 350], dose: [20, 60], window: [12, 24], ringe: 700, tox: 700, fatal: 10000 },
      agnp: { trr: [50, 110], of: "CIT", time: [24, 24], ss: [8, 10], alert: 220, level: 1,
        basis: ["conc", "pet"],
        note: { no: "Godt etablert sammenheng konsentrasjon–effekt; nedre grense tilsvarer 80 % SERT-okkupans (validert med ROC).",
                en: "Well-established concentration–effect relationship; lower limit corresponds to 80% SERT occupancy (ROC-validated)." } },
      drc: { tablet: { of: "CIT", pts: [[24, 1.217, 1.019, 1.511]] } },
      t12: 36, tmax: 3
    },
    {
      id: "doksepin", no: "Doksepin", en: "Doxepin", group: "ad",
      analytes: [
        { key: "DOX", no: "Doksepin", en: "Doxepin", mw: 279.38, qcm: 80 },
        { key: "DDOX", no: "Desmetyldoksepin", en: "N-desmethyldoxepin", mw: 265.35, qcm: 80, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Doksepin + desmetyldoksepin", en: "Doxepin + N-desmethyldoxepin" },
      ous: { ref: [180, 550], doseSpc: [30, 300], window: [12, 24], ringe: 1000, tox: 1800, fatal: 3600 },
      agnp: { trr: [50, 200], of: "sum", time: [12, 12], ss: [3, 4], alert: 300, level: 3, revised: true,
        basis: ["conc"],
        note: { no: "Område basert på studie av Leucht et al. (2021); varslingsgrensen er ekspertvurdering.",
                en: "Range based on Leucht et al. (2021); alert level is expert opinion." } },
      mpr: { pair: ["DDOX", "DOX"], range: [0.6, 1.6] },
      drc: { tablet: { of: "sum", pts: [[24, 0.601, 0.387, 1.357], [20, 0.668, 0.429, 1.51], [12, 0.829, 0.532, 1.886]] } },
      t12: 17, tmax: 3
    },
    {
      id: "duloksetin", no: "Duloksetin", en: "Duloxetine", group: "ad",
      analytes: [{ key: "DUL", no: "Duloksetin", en: "Duloxetine", mw: 297.42, qcm: 100 }],
      measure: "DUL",
      ous: { ref: [30, 300], dose: [60, 120], window: [12, 24], ringe: 600, tox: 800 },
      agnp: { trr: [20, 120], of: "DUL", time: [24, 24], ss: [2, 4], alert: 240, level: 2, revised: true,
        basis: ["conc", "tdm"],
        note: { no: "Positiv sammenheng konsentrasjon–effekt i tre studier; IQR 22–72 ng/mL i fire studier.",
                en: "Positive concentration–effect correlation in three studies; IQR 22–72 ng/mL across four studies." } },
      drc: { tablet: { of: "DUL", label: { no: "Gjelder ikke-røykere", en: "Valid for non-smokers" }, pts: [[24, 0.505, 0.318, 1.235]] } },
      t12: 12, tmax: 6
    },
    {
      id: "escitalopram", no: "Escitalopram", en: "Escitalopram", group: "ad",
      analytes: [{ key: "ESC", no: "Escitalopram", en: "Escitalopram", mw: 324.39, qcm: 100 }],
      measure: "ESC",
      ous: { ref: [25, 140], dose: [10, 30], window: [12, 24], ringe: 280 },
      agnp: { trr: [20, 40], of: "ESC", time: [24, 24], ss: [6, 7], alert: 160, level: 2, revised: true,
        basis: ["meta", "pet"],
        note: { no: "Basert på systematisk oversikt med meta-analyse; nedre grense støttes av 80 % SERT-okkupans. Øvre grense er et terapeutisk maksimum, ikke en toleransegrense.",
                en: "Based on a systematic review with meta-analysis; lower limit supported by 80% SERT occupancy. Upper limit is a therapeutic maximum, not a tolerability limit." } },
      mpr: null,
      drc: { tablet: { of: "ESC", pts: [[24, 1.385, 0.918, 2.821]] } },
      t12: 30, tmax: 4
    },
    {
      id: "fluoksetin", no: "Fluoksetin", en: "Fluoxetine", group: "ad",
      analytes: [
        { key: "FLU", no: "Fluoksetin", en: "Fluoxetine", mw: 309.33, qcm: 500 },
        { key: "NFLU", no: "Norfluoksetin", en: "Norfluoxetine", mw: 295.30, qcm: 500, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Fluoksetin + norfluoksetin", en: "Fluoxetine + norfluoxetine" },
      ous: { ref: [400, 2500], dose: [20, 60], window: [12, 24], ringe: 5000, tox: 3200, fatal: 7000 },
      agnp: { trr: [150, 300], of: "sum", time: [24, 24], ss: [20, 35], alert: 1000, level: 3, revised: true,
        basis: ["pk"],
        note: { no: "Ingen sammenheng konsentrasjon–respons funnet. Området er middel ± SD fra en farmakokinetisk studie med 20 mg/d.",
                en: "No concentration–response relationship found. Range is mean ± SD from a PK study at 20 mg/d." } },
      mpr: { pair: ["NFLU", "FLU"], range: [0.7, 1.9] },
      drc: null, drcNote: { no: "AGNP har ikke beregnet doserelatert område pga. ikke-lineær kinetikk.", en: "AGNP did not calculate a dose-related range due to non-linear kinetics." },
      t12: 144, tmax: 7
    },
    {
      id: "fluvoksamin", no: "Fluvoksamin", en: "Fluvoxamine", group: "ad",
      analytes: [{ key: "FLV", no: "Fluvoksamin", en: "Fluvoxamine", mw: 318.33, qcm: 80 }],
      measure: "FLV",
      ous: { ref: [60, 900], dose: [100, 300], window: [12, 24], ringe: 1800, tox: 1600, fatal: 9000 },
      agnp: { trr: [60, 210], of: "FLV", time: [24, 24], ss: [4, 4], alert: 500, level: 3, revised: true,
        basis: ["conc"],
        note: { no: "Basert på konsentrasjon–respons-studie (ROC, nedre terskel 61 ng/mL); øvre grense fra 75-persentil hos respondere.",
                en: "Based on a concentration–response study (ROC, lower threshold 61 ng/mL); upper limit from the 75th percentile in responders." } },
      drc: { tablet: { of: "FLV", pts: [[24, 0.695, 0.504, 1.12], [20, 0.8, 0.58, 1.289], [12, 1.056, 0.766, 1.703]] } },
      t12: 20, tmax: 5
    },
    {
      id: "klomipramin", no: "Klomipramin", en: "Clomipramine", group: "ad",
      analytes: [
        { key: "KLO", no: "Klomipramin", en: "Clomipramine", mw: 314.85, qcm: 100 },
        { key: "DKLO", no: "Desmetylklomipramin", en: "N-desmethylclomipramine", mw: 300.83, qcm: 80, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Klomipramin + desmetylklomipramin", en: "Clomipramine + N-desmethylclomipramine" },
      ous: { ref: [700, 1500], dose: [50, 250], window: [12, 24], ringe: 2000, tox: 1600, fatal: 3200 },
      agnp: { trr: [230, 570], of: "sum", time: [12, 12], ss: [8, 9], alert: 650, level: 1, revised: true,
        basis: ["conc"],
        note: { no: "Konsentrasjon–effekt godt etablert ved depresjon; bivirkninger mer sannsynlig over øvre grense. Varslingsgrense er ekspertvurdering.",
                en: "Concentration–effect well established in depression; ADRs more likely above the upper limit. Alert level is expert opinion." } },
      mpr: { pair: ["DKLO", "KLO"], range: [0.8, 2.6] },
      drc: { tablet: { of: "sum", label: { no: "Vanlige tabletter (IR)", en: "Immediate release" }, pts: [[24, 1.417, 0.927, 3.236], [20, 1.544, 1.011, 3.506], [12, 1.828, 1.201, 4.106]] } },
      t12: 32, tmax: 4
    },
    {
      id: "mianserin", no: "Mianserin", en: "Mianserin", group: "ad",
      analytes: [
        { key: "MIA", no: "Mianserin", en: "Mianserin", mw: 264.37, qcm: 100 },
        { key: "DMIA", no: "Desmetylmianserin", en: "N-desmethylmianserin", mw: 250.34, qcm: 100, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Mianserin + desmetylmianserin", en: "Mianserin + N-desmethylmianserin" },
      ous: { ref: [150, 900], dose: [60, 120], window: [12, 24], ringe: 1800, fatal: 7500 },
      agnp: { trr: [15, 70], of: "MIA", time: [12, 12], ss: [3, 6], alert: 140, level: 3,
        basis: ["conc"],
        note: { no: "Dårligere respons over 70 ng/mL i én klinisk studie. Gjelder mianserin alene.",
                en: "Poorer response above 70 ng/mL in one clinical study. Applies to mianserin alone." } },
      mpr: { pair: ["DMIA", "MIA"], range: [0.5, 0.8] },
      drc: { tablet: { of: "MIA", pts: [[24, 0.28, 0.184, 0.58], [20, 0.33, 0.217, 0.683], [12, 0.457, 0.301, 0.949]] } },
      t12: 33, tmax: 3
    },
    {
      id: "mirtazapin", no: "Mirtazapin", en: "Mirtazapine", group: "ad",
      analytes: [{ key: "MIR", no: "Mirtazapin", en: "Mirtazapine", mw: 265.36, qcm: 100 }],
      measure: "MIR",
      ous: { ref: [50, 350], dose: [15, 60], window: [12, 24], ringe: 700, fatal: 7500 },
      agnp: { trr: [30, 80], of: "MIR", time: [12, 12], ss: [4, 8], alert: 160, level: 2,
        basis: ["conc"],
        note: { no: "Høyere konsentrasjoner hos respondere (terskel 30 ng/mL). Øvre grense er et terapeutisk maksimum.",
                en: "Higher concentrations in responders (threshold 30 ng/mL). Upper limit is a therapeutic maximum." } },
      drc: { tablet: { of: "MIR", pts: [[24, 1.01, 0.888, 1.17], [12, 1.331, 1.171, 1.542]] } },
      t12: 30, tmax: 1.5
    },
    {
      id: "nortriptylin", no: "Nortriptylin", en: "Nortriptyline", group: "ad",
      analytes: [{ key: "NOR", no: "Nortriptylin", en: "Nortriptyline", mw: 263.38, qcm: 100 }],
      measure: "NOR",
      ous: { ref: [200, 600], dose: [25, 150], window: [12, 24], ringe: 1200, tox: 1200 },
      agnp: { trr: [70, 170], of: "NOR", time: [12, 12], ss: [4, 9], alert: 300, level: 1,
        basis: ["conc"],
        note: { no: "Sammenheng mellom konsentrasjon og klinisk effekt/bivirkninger er godt etablert.",
                en: "The concentration–effect/ADR relationship is well established." } },
      drc: { tablet: { of: "NOR", pts: [[24, 0.804, 0.578, 1.319], [20, 0.881, 0.634, 1.446], [14, 1.012, 0.728, 1.659], [12, 1.059, 0.761, 1.736]] } },
      t12: 26, tmax: 7
    },
    {
      id: "paroksetin", no: "Paroksetin", en: "Paroxetine", group: "ad",
      analytes: [{ key: "PAR", no: "Paroksetin", en: "Paroxetine", mw: 329.37, qcm: 40 }],
      measure: "PAR",
      ous: { ref: [40, 400], dose: [20, 60], window: [12, 24], ringe: 800, fatal: 3600 },
      agnp: { trr: [30, 80], of: "PAR", time: [24, 24], ss: [3, 9], alert: 120, level: 2, revised: true,
        basis: ["conc"],
        note: { no: "Prospektiv kohort (n = 921) fant høy sannsynlighet for respons og god toleranse ved 32–80 ng/mL.",
                en: "Prospective cohort (n = 921) found high probability of response and good tolerability at 32–80 ng/mL." } },
      drc: { tablet: { of: "PAR", pts: [[24, 0.856, 0.621, 1.377]] } },
      t12: 21, tmax: 6
    },
    {
      id: "sertralin", no: "Sertralin", en: "Sertraline", group: "ad",
      analytes: [{ key: "SER", no: "Sertralin", en: "Sertraline", mw: 306.23, qcm: 50 }],
      measure: "SER",
      ous: { ref: [20, 250], dose: [50, 200], window: [12, 24], ringe: 500, tox: 1000, fatal: 3600 },
      agnp: { trr: [10, 50], of: "SER", time: [24, 24], ss: [5, 8], alert: 150, level: 2, revised: true,
        basis: ["pk", "pet"],
        note: { no: "Nedre grense fra PK/PD-studier ved effektive doser og 80 % SERT-okkupans; over 50 ng/mL kan effekten avta og bivirkningsrisikoen øke.",
                en: "Lower limit from PK/PD data at effective doses and 80% SERT occupancy; above 50 ng/mL efficacy may decrease and ADR risk increase." } },
      drc: { tablet: { of: "SER", pts: [[24, 0.452, 0.326, 0.736], [12, 0.622, 0.449, 1.014]] } },
      t12: 26, tmax: 6
    },
    {
      id: "trimipramin", no: "Trimipramin", en: "Trimipramine", group: "ad",
      analytes: [{ key: "TRI", no: "Trimipramin", en: "Trimipramine", mw: 294.43, qcm: 100 }],
      measure: "TRI",
      ous: { ref: [100, 800], doseSpc: [25, 400], window: [12, 24], ringe: 1600, tox: 2000, fatal: 5800 },
      agnp: { trr: [50, 500], of: "TRI", time: [12, 12], ss: [5, 5], alert: 600, level: 3, revised: true,
        basis: ["tdm"],
        note: { no: "God toleranse opp til 500 ng/mL hos PM; i tråd med data fra klinisk praksis (Reis et al. 2009). Varslingsgrense er ekspertvurdering.",
                en: "Good tolerability up to 500 ng/mL in PMs; consistent with real-world data (Reis et al. 2009). Alert level is expert opinion." } },
      drc: { tablet: { of: "TRI", pts: [[24, 0.442, 0.341, 0.628], [20, 0.496, 0.383, 0.705], [12, 0.625, 0.482, 0.889]] } },
      t12: 23, tmax: 3
    },
    {
      id: "venlafaksin", no: "Venlafaksin", en: "Venlafaxine", group: "ad",
      analytes: [
        { key: "VEN", no: "Venlafaksin", en: "Venlafaxine", mw: 277.40, qcm: 200 },
        { key: "ODV", no: "O-desmetylvenlafaksin", en: "O-desmethylvenlafaxine", mw: 263.38, qcm: 200, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Venlafaksin + O-desmetylvenlafaksin", en: "Venlafaxine + O-desmethylvenlafaxine" },
      ous: { ref: [400, 2000], dose: [75, 375], window: [12, 24], ringe: 4000, tox: 3000, fatal: 11000 },
      agnp: { trr: [140, 600], of: "sum", time: [24, 24], ss: [2, 4], alert: 1200, level: 2, revised: true,
        basis: ["meta"],
        note: { no: "Basert på systematisk oversikt med meta-analyse (Lense et al. 2024). Øvre grense er et terapeutisk tak; mer tremor ved høyere nivåer.",
                en: "Based on a systematic review with meta-analysis (Lense et al. 2024). Upper limit is a therapeutic ceiling; more tremor at higher levels." } },
      mpr: { pair: ["ODV", "VEN"], range: [2.7, 7.7] },
      drc: {
        xr: { of: "sum", label: { no: "Depotkapsel (XR, 1 gang daglig)", en: "Extended release (XR, once daily)" }, pts: [[24, 1.12, 0.862, 1.75]] },
        tablet: { of: "sum", label: { no: "Vanlige tabletter (IR)", en: "Immediate release" }, pts: [[24, 1.135, 0.923, 1.478], [20, 1.496, 1.215, 1.956], [12, 2.663, 2.149, 3.523]] }
      },
      t12: 11, tmax: 6
    },
    {
      id: "vortioksetin", no: "Vortioksetin", en: "Vortioxetine", group: "ad",
      analytes: [{ key: "VOR", no: "Vortioksetin", en: "Vortioxetine", mw: 298.45, qcm: 20 }],
      measure: "VOR",
      ous: { ref: [20, 100], doseSpc: [5, 20], window: [12, 24], ringe: 200, tox: 270 },
      agnp: { trr: [10, 40], of: "VOR", time: [24, 24], ss: [14, 14], alert: 80, level: 2,
        basis: ["conc"],
        note: { no: "Basert på populasjons-PK/PD-analyse; 50 % av maksimal respons ved 25 ng/mL.",
                en: "Based on a population PK/PD analysis; 50% of maximum response at 25 ng/mL." } },
      drc: { tablet: { of: "VOR", pts: [[24, 0.89, 0.645, 1.436]] } },
      t12: 66, tmax: 9
    },

    /* ------------------------------ ANTIPSYKOTIKA ------------------------------ */
    {
      id: "amisulprid", no: "Amisulprid", en: "Amisulpride", group: "ap",
      analytes: [{ key: "AMS", no: "Amisulprid", en: "Amisulpride", mw: 369.48, qcm: 75 }],
      measure: "AMS",
      ous: { ref: [100, 1500], dose: [50, 1200], window: [12, 24] },
      agnp: { trr: [200, 550], of: "AMS", time: [24, 24], ss: [3, 3], alert: 1100, level: 1,
        basis: ["conc", "pet"],
        note: { no: "Basert på konsentrasjon–effekt-studier; PET støtter inntil 550 ng/mL for optimal effekt, med økende bivirkninger over dette.",
                en: "Based on concentration–effect studies; PET supports up to 550 ng/mL for optimal efficacy, with more ADRs above." } },
      drc: { tablet: { of: "AMS", pts: [[24, 0.547, 0.342, 0.751], [20, 0.593, 0.431, 0.947], [14, 0.84, 0.611, 1.342], [10, 1.058, 0.77, 1.691]] } },
      t12: 12, tmax: 4
    },
    {
      id: "aripiprazol", no: "Aripiprazol", en: "Aripiprazole", group: "ap",
      analytes: [
        { key: "ARI", no: "Aripiprazol", en: "Aripiprazole", mw: 448.39, qcm: 100 },
        { key: "DARI", no: "Dehydroaripiprazol", en: "Dehydroaripiprazole", mw: 446.37, qcm: 100, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Aripiprazol + dehydroaripiprazol", en: "Aripiprazole + dehydroaripiprazole" },
      ous: { ref: [200, 1300], dose: [10, 30], window: [12, 24], ringe: 2200, tox: 2200, fatal: 4200 },
      agnp: { trr: [180, 380], of: "sum", time: [12, 24], ss: [13, 17], alert: 540, level: 2, revised: true,
        basis: ["meta"],
        note: { no: "Basert på systematisk oversikt med meta-analyse (Hart et al. 2022). Over øvre grense er bedre effekt usannsynlig. Aripiprazol alene: 120–270 ng/mL.",
                en: "Based on a systematic review with meta-analysis (Hart et al. 2022). Above the upper limit further improvement is unlikely. Aripiprazole alone: 120–270 ng/mL." } },
      mpr: { pair: ["DARI", "ARI"], range: [0.3, 0.5] },
      drc: { tablet: { of: "sum", pts: [[24, 17.725, 13.348, 26.422], [12, 19.412, 14.626, 28.91]] } },
      depot: [{ id: "maintena", name: "Abilify Maintena", interval: 28, t12d: 47 }],
      t12: 75, tmax: 4
    },
    {
      id: "brekspiprazol", no: "Brekspiprazol", en: "Brexpiprazole", group: "ap",
      analytes: [{ key: "BRE", no: "Brekspiprazol", en: "Brexpiprazole", mw: 433.57, qcm: 100 }],
      measure: "BRE",
      ous: { ref: [50, 350], doseSpc: [1, 4], window: [12, 24], ringe: 600 },
      agnp: { trr: [30, 300], of: "BRE", time: [24, 24], ss: [10, 10], alert: 600, level: 3, revised: true,
        basis: ["pk"],
        note: { no: "Farmakokinetisk forventet område ved 2–4 mg/d. 90 % D2-okkupans rundt 70 ng/mL.",
                en: "Pharmacokinetically expected range at 2–4 mg/d. 90% D2 occupancy around 70 ng/mL." } },
      drc: { tablet: { of: "BRE", pts: [[24, 25.871, 15.523, 77.613]] } },
      t12: 91, tmax: 4
    },
    {
      id: "flupentiksol", no: "Flupentiksol", en: "Flupentixol", group: "ap",
      analytes: [{ key: "FLX", no: "Flupentiksol", en: "Flupentixol", mw: 434.52, qcm: 6 }],
      measure: "FLX",
      ous: { ref: [1, 15], dose: [1, 15], window: [12, 24], ringe: 36, tox: 36 },
      agnp: { trr: [0.5, 10], of: "FLX", time: [12, 12], ss: [4, 8], alert: 15, level: 2, revised: true,
        basis: ["pk", "pet"],
        note: { no: "Basert på farmakokinetiske studier (bl.a. Jönsson et al. 2019); 60 % D2-okkupans ved 1 ng/mL. Gjelder cis-isomeren.",
                en: "Based on PK studies (incl. Jönsson et al. 2019); 60% D2 occupancy at 1 ng/mL. Refers to the cis isomer." } },
      drc: { tablet: { of: "FLX", pts: [[24, 1.205, 0.874, 1.938], [20, 1.305, 0.947, 2.099], [12, 1.532, 1.112, 2.464]] } },
      depot: [{ id: "fluanxol", name: "Fluanxol depot", interval: 14, t12d: 17 }],
      t12: 35, tmax: 4
    },
    {
      id: "haloperidol", no: "Haloperidol", en: "Haloperidol", group: "ap",
      analytes: [{ key: "HAL", no: "Haloperidol", en: "Haloperidol", mw: 375.86, qcm: 10 }],
      measure: "HAL",
      ous: { ref: [2, 25], dose: [1, 20], window: [12, 24], ringe: 40, tox: 40, fatal: 480 },
      agnp: { trr: [1, 5], of: "HAL", time: [12, 12], ss: [3, 8], alert: 12, level: 1, revised: true,
        basis: ["conc", "pet"],
        note: { no: "Basert på kliniske studier og PET. Ingen ulike målområder for depot og tabletter.",
                en: "Based on clinical and PET studies. No separate target range for the LAI formulation." } },
      drc: { tablet: { of: "HAL", pts: [[24, 0.339, 0.234, 0.611], [20, 0.381, 0.263, 0.686], [12, 0.48, 0.332, 0.866]] } },
      depot: [{ id: "haldol", name: "Haldol depot", interval: 28, t12d: 21 }],
      t12: 20, tmax: 4
    },
    {
      id: "kariprazin", no: "Kariprazin", en: "Cariprazine", group: "ap",
      analytes: [
        { key: "KAR", no: "Kariprazin", en: "Cariprazine", mw: 427.41, qcm: 20 },
        { key: "DKAR", no: "Desmetylkariprazin", en: "Desmethylcariprazine", mw: 413.4, qcm: 20, metabolite: true },
        { key: "DDKAR", no: "Didesmetylkariprazin", en: "Didesmethylcariprazine", mw: 399.4, qcm: 50, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Kariprazin + metabolitter", en: "Cariprazine + metabolites" },
      ous: { ref: [20, 150], doseSpc: [1.5, 6], window: [12, 24], ringe: 300 },
      agnp: { trr: [4, 14], of: "KAR", time: [24, 24], ss: [10, 10], alert: 28, level: 3, revised: true,
        basis: ["pk"],
        note: { no: "Farmakokinetisk forventet område (middel ± SD) ved 3–10,5 mg/d. Gjelder kariprazin alene.",
                en: "Pharmacokinetically expected range (mean ± SD) at 3–10.5 mg/d. Applies to cariprazine alone." } },
      mpr: { pair: ["DDKAR", "KAR"], range: [3, 6] },
      drc: { tablet: { of: "sum", pts: [[24, 6.44, 4.668, 10.378]] } },
      t12: 48, tmax: 4
    },
    {
      id: "klorprotiksen", no: "Klorprotiksen", en: "Chlorprothixene", group: "ap",
      analytes: [{ key: "KLP", no: "Klorprotiksen", en: "Chlorprothixene", mw: 315.86, qcm: 20 }],
      measure: "KLP",
      ous: { ref: [10, 100], dose: [15, 300], window: [12, 24], ringe: 1200, tox: 1200, fatal: 1200,
        note: { no: "Referanseområdet gjelder bruk som tilleggsmedikasjon (lave doser). Tidligere høydoseområde: 100–800 nmol/L.", en: "The range applies to low-dose add-on use. Former high-dose range: 100–800 nmol/L." } },
      agnp: { trr: [15, 140], of: "KLP", time: [12, 12], ss: [2, 3], alert: 400, level: 3,
        basis: ["pk"],
        note: { no: "Farmakokinetisk forventet område ved 30–200 mg to ganger daglig. Lavpotente førstegenerasjons antipsykotika anbefales ikke lenger som antipsykotika; området er kun orienterende.",
                en: "PK-expected range at 30–200 mg twice daily. Low-potency FGAs are no longer recommended as antipsychotics; the range is for orientation only." } },
      drc: { tablet: { of: "KLP", pts: [[24, 0.352, 0.295, 0.436], [20, 0.464, 0.389, 0.575], [12, 0.805, 0.675, 0.997]] } },
      t12: 15, tmax: 3
    },
    {
      id: "klozapin", no: "Klozapin", en: "Clozapine", group: "ap",
      analytes: [
        { key: "KLZ", no: "Klozapin", en: "Clozapine", mw: 326.82, qcm: 300 },
        { key: "NKLZ", no: "Desmetylklozapin", en: "N-desmethylclozapine", mw: 312.80, qcm: 100, metabolite: true, optional: true }
      ],
      measure: "KLZ",
      ous: { ref: [300, 2500], dose: [100, 900], window: [12, 24], ringe: 3000 },
      agnp: { trr: [350, 600], of: "KLZ", time: [12, 12], ss: [3, 4], alert: 1000, level: 1, revised: true,
        basis: ["conc"],
        note: { no: "Nivåer over 350 ng/mL er mest optimale for respons. Over 1000 ng/mL økt risiko for kramper.",
                en: "Levels above 350 ng/mL are most optimal for response. Above 1000 ng/mL increased seizure risk." } },
      mpr: { pair: ["NKLZ", "KLZ"], range: [0.45, 0.79] },
      drc: { tablet: { of: "KLZ", pts: [[24, 0.986, 0.715, 1.587], [12, 1.978, 1.435, 3.183]] } },
      t12: 12, tmax: 2.5
    },
    {
      id: "kvetiapin", no: "Kvetiapin", en: "Quetiapine", group: "ap",
      analytes: [
        { key: "KVE", no: "Kvetiapin", en: "Quetiapine", mw: 383.51, qcm: 150 },
        { key: "NKVE", no: "Desalkylkvetiapin", en: "N-desalkylquetiapine", mw: 295.4, qcm: 150, metabolite: true, optional: true }
      ],
      measure: "KVE",
      ous: { ref: [50, 700], dose: [50, 1000], window: [12, 12], windowTol: 1, ringe: 2600, tox: 3600, fatal: 3600 },
      agnp: { trr: [100, 500], of: "KVE", time: [24, 24], ss: [3, 3], alert: 1000, level: 2,
        basis: ["tdm"],
        note: { no: "Utledet fra konsentrasjoner hos respondere med schizofreni (IQR fra flere studier).",
                en: "Derived from concentrations in responders with schizophrenia (IQRs from several studies)." } },
      mpr: { pair: ["NKVE", "KVE"], range: [0.54, 3.1] },
      drc: {
        tablet: { of: "KVE", label: { no: "Vanlige tabletter (IR)", en: "Immediate release" }, pts: [[24, 0.138, 0.104, 0.203], [10, 0.551, 0.417, 0.81]] },
        xr: { of: "KVE", label: { no: "Depottablett (XR, om kvelden)", en: "Extended release (XR, evening)" }, pts: [[10, 1.074, 0.933, 1.264]] }
      },
      t12: 7, tmax: 1.5
    },
    {
      id: "levomepromazin", no: "Levomepromazin", en: "Levomepromazine", group: "ap",
      analytes: [{ key: "LEV", no: "Levomepromazin", en: "Levomepromazine", mw: 328.47, qcm: 20 }],
      measure: "LEV",
      ous: { ref: [10, 300], dose: [25, 400], window: [12, 24], ringe: 970, tox: 970, fatal: 1500,
        note: { no: "Tidligere høydoseområde: 150–800 (1500) nmol/L.", en: "Former high-dose range: 150–800 (1500) nmol/L." } },
      agnp: { trr: [10, 160], of: "LEV", time: [12, 12], ss: [3, 16], alert: 320, level: 3,
        basis: ["pk"],
        note: { no: "Basert på farmakokinetiske studier. Lavpotente førstegenerasjons antipsykotika: området er kun orienterende.",
                en: "Based on PK studies. Low-potency FGA: the range is for orientation only." } },
      drc: { tablet: { of: "LEV", pts: [[24, 0.196, 0.122, 0.49], [20, 0.216, 0.135, 0.541], [12, 0.264, 0.165, 0.661]] } },
      t12: 30, tmax: 2
    },
    {
      id: "lurasidon", no: "Lurasidon", en: "Lurasidone", group: "ap",
      analytes: [{ key: "LUR", no: "Lurasidon", en: "Lurasidone", mw: 492.68, qcm: 8 }],
      measure: "LUR",
      ous: { ref: [5, 60], doseSpc: [18.5, 148], window: [12, 24], ringe: 120 },
      agnp: { trr: [10, 25], of: "LUR", time: [24, 24], ss: [4, 8], alert: 50, level: 3, revised: true,
        basis: ["pk"],
        note: { no: "Ingen studie har beskrevet sammenheng konsentrasjon–effekt. Opptaket påvirkes av mat.",
                en: "No study has described a concentration–effect relationship. Absorption is influenced by food." } },
      drc: { tablet: { of: "LUR", pts: [[24, 0.135, 0.114, 0.164]] } },
      t12: 30, tmax: 2
    },
    {
      id: "olanzapin", no: "Olanzapin", en: "Olanzapine", group: "ap",
      analytes: [{ key: "OLA", no: "Olanzapin", en: "Olanzapine", mw: 312.43, qcm: 100 }],
      measure: "OLA",
      ous: { ref: [30, 200], dose: [5, 30], window: [12, 24], ringe: 400, tox: 385 },
      agnp: { trr: [20, 40], of: "OLA", time: [12, 15], ss: [7, 7], alert: 80, level: 1, revised: true,
        basis: ["meta", "pet"],
        note: { no: "Basert på systematiske oversikter med meta-analyse; terskel 20 ng/mL for respons, terapeutisk maksimum ved 40 ng/mL. Gjelder 12–15 t etter inntak ved én daglig dose.",
                en: "Based on systematic reviews with meta-analysis; response threshold 20 ng/mL, therapeutic maximum at 40 ng/mL. Valid 12–15 h after once-daily intake." } },
      drc: { tablet: { of: "OLA", label: { no: "Gjelder ikke-røykere", en: "Valid for non-smokers" }, pts: [[12, 1.642, 1.122, 3.063]] } },
      depot: [{ id: "zypadhera", name: "Zypadhera", interval: 28, t12d: 30 }],
      t12: 33, tmax: 6
    },
    {
      id: "paliperidon", no: "Paliperidon", en: "Paliperidone", group: "ap",
      analytes: [{ key: "PAL", no: "Paliperidon", en: "Paliperidone", mw: 426.49, qcm: 100 }],
      measure: "PAL",
      ous: { ref: [20, 120], doseSpc: [3, 12], window: [12, 24], ringe: 240, tox: 280 },
      agnp: { trr: [20, 60], of: "PAL", time: [24, 24], ss: [2, 4], alert: 80, level: 2,
        basis: ["tdm", "pet"],
        note: { no: "Fra retrospektiv studie av serumkonsentrasjoner og klinisk effekt; i tråd med PET (70–80 % D2-okkupans ved 24–36 ng/mL).",
                en: "From a retrospective study of serum levels and clinical effect; consistent with PET (70–80% D2 occupancy at 24–36 ng/mL)." } },
      drc: { tablet: { of: "PAL", label: { no: "Depottablett (XR, om morgenen)", en: "Extended release (morning)" }, pts: [[24, 5.695, 3.85, 10.935]] } },
      depot: [
        { id: "xeplion", name: "Xeplion", interval: 28, t12d: 49 },
        { id: "trevicta", name: "Trevicta", interval: 91, t12d: 139 },
        { id: "byannli", name: "Byannli", interval: 182, t12d: 159 }
      ],
      t12: 23, tmax: 24
    },
    {
      id: "perfenazin", no: "Perfenazin", en: "Perphenazine", group: "ap",
      analytes: [{ key: "PER", no: "Perfenazin", en: "Perphenazine", mw: 403.97, qcm: 6 }],
      measure: "PER",
      ous: { ref: [1, 7], dose: [4, 32], window: [12, 24], ringe: 14, tox: 12 },
      agnp: { trr: [0.7, 3.6], of: "PER", time: [12, 12], ss: [2, 3], alert: 7, level: 2, revised: true,
        basis: ["conc", "pet"],
        note: { no: "Basert på oversiktsartikkel over fire studier; støttes av nevroavbildning.",
                en: "Based on a review of four studies; supported by neuroimaging." } },
      drc: { tablet: { of: "PER", pts: [[24, 0.039, 0.028, 0.063], [20, 0.051, 0.037, 0.083], [12, 0.089, 0.064, 0.145]] } },
      depot: [{ id: "trilafon", name: "Trilafon dekanoat", interval: 21 }],
      t12: 10, tmax: 2
    },
    {
      id: "risperidon", no: "Risperidon", en: "Risperidone", group: "ap",
      analytes: [
        { key: "RIS", no: "Risperidon", en: "Risperidone", mw: 410.49, qcm: 100 },
        { key: "PAL", no: "9-hydroksyrisperidon (paliperidon)", en: "9-hydroxyrisperidone (paliperidone)", mw: 426.49, qcm: 100, metabolite: true }
      ],
      measure: "sum", sumLabel: { no: "Risperidon + 9-hydroksyrisperidon", en: "Risperidone + 9-hydroxyrisperidone" },
      ous: { ref: [20, 120], dose: [1, 8], window: [12, 24], ringe: 240, tox: 280 },
      agnp: { trr: [20, 60], of: "sum", time: [12, 12], ss: [2, 4], alert: 80, level: 2,
        basis: ["conc", "pet"],
        note: { no: "Aktiv del (risperidon + 9-OH-risperidon) må vurderes samlet. PET: målokkupans ved 13–28 ng/mL; > 40 ng/mL bare ved utilstrekkelig respons.",
                en: "The active moiety must be considered. PET: target occupancy at 13–28 ng/mL; > 40 ng/mL only for insufficient response." } },
      mpr: { pair: ["PAL", "RIS"], range: [3.6, 22.7], rangeDepot: [1.2, 4.3] },
      drc: { tablet: { of: "sum", pts: [[24, 3.344, 2.407, 5.483], [12, 4.977, 3.561, 8.32]] } },
      depot: [{ id: "consta", name: "Risperdal Consta", interval: 14 }],
      t12: 20, tmax: 1.5
    },
    {
      id: "ziprasidon", no: "Ziprasidon", en: "Ziprasidone", group: "ap",
      analytes: [{ key: "ZIP", no: "Ziprasidon", en: "Ziprasidone", mw: 412.94, qcm: 100 }],
      measure: "ZIP",
      ous: { ref: [40, 300], dose: [40, 240], window: [12, 24], ringe: 600, tox: 970 },
      agnp: { trr: [50, 160], of: "ZIP", time: [12, 12], ss: [1, 2], alert: 320, level: 2,
        basis: ["conc", "pet"],
        note: { no: "Tilstrekkelig reseptorokkupans > 70 ng/mL; økende EPS-risiko rundt 250 ng/mL. Tas med måltid.",
                en: "Sufficient receptor occupancy > 70 ng/mL; increasing EPS risk around 250 ng/mL. Take with a meal." } },
      drc: { tablet: { of: "ZIP", pts: [[24, 0.566, 0.426, 0.843], [12, 1.508, 1.135, 2.247]] } },
      t12: 7, tmax: 7
    },
    {
      id: "zuklopentiksol", no: "Zuklopentiksol", en: "Zuclopenthixol", group: "ap",
      analytes: [{ key: "ZUK", no: "Zuklopentiksol", en: "Zuclopenthixol", mw: 400.97, qcm: 10 }],
      measure: "ZUK",
      ous: { ref: [5, 35], dose: [2, 30], window: [12, 24], ringe: 100, tox: 250 },
      agnp: { trr: [3, 25], of: "ZUK", time: [12, 12], ss: [3, 5], alert: 50, level: 2, revised: true,
        basis: ["conc", "pet"],
        note: { no: "Klinisk respons ved 2–14 ng/mL i små studier; effektterskel ~3 ng/mL tilsvarer 70 % D2-okkupans. Rutine-TDM-data tilsier 2–26 ng/mL.",
                en: "Clinical response at 2–14 ng/mL in small studies; efficacy threshold ~3 ng/mL relates to 70% D2 occupancy. Routine TDM data suggest 2–26 ng/mL." } },
      drc: { tablet: { of: "ZUK", pts: [[24, 0.534, 0.387, 0.862], [20, 0.615, 0.445, 0.991], [12, 0.813, 0.589, 1.311]] } },
      depot: [{ id: "cisordinol", name: "Cisordinol depot", interval: 14, t12d: 19 }],
      t12: 20, tmax: 4
    },

    /* --------------------------- STEMNINGSSTABILISERENDE --------------------------- */
    {
      id: "litium", no: "Litium", en: "Lithium", group: "ms",
      unit: "mmol", doseUnit: "mmol",
      analytes: [{ key: "LI", no: "Litium", en: "Lithium", mw: 6.94 }],
      measure: "LI",
      ous: { ref: [0.5, 1.0], window: [12, 12], windowTol: 0.5, ringe: 1.5, tox: 1.5,
        note: { no: "Alvorlig forgiftning vanligvis > 2,5–3 mmol/L. Ved dosering én gang daglig (kveld) tas prøven 12 t etter siste inntak.", en: "Severe poisoning usually > 2.5–3 mmol/L. With once-daily (evening) dosing, sample 12 h after the last intake." } },
      agnp: { trr: [0.4, 0.8], of: "LI", time: [12, 12], ss: [3, 6], alert: 1.2, level: 1, revised: true, unit: "mmol",
        basis: ["conc"],
        note: { no: "Lavere tilbakefallsrisiko ved 0,4–0,8 mmol/L (vedlikehold). Akutt mani: inntil 1,2 mmol/L. Eldre 60–79 år: 0,4–0,8; > 80 år: 0,4–0,7 mmol/L.",
                en: "Lower recurrence risk at 0.4–0.8 mmol/L (maintenance). Acute mania: up to 1.2 mmol/L. Age 60–79: 0.4–0.8; > 80: 0.4–0.7 mmol/L." } },
      drc: null, drcNote: { no: "Ikke tatt med: AGNPs dosefaktor for litium må avklares (doseenhet).", en: "Not included: the AGNP dose factor for lithium needs clarification (dose unit)." },
      t12: 24, tmax: 3
    },
    {
      id: "lamotrigin", no: "Lamotrigin", en: "Lamotrigine", group: "ms",
      unit: "umol",
      analytes: [{ key: "LTG", no: "Lamotrigin", en: "Lamotrigine", mw: 256.09, qcm: 10000 }],
      measure: "LTG",
      ous: { ref: [10, 50], window: [12, 24] },
      agnp: { trr: [3000, 15000], of: "LTG", time: [12, 12], ss: [3, 22], alert: 20000, level: 2,
        basis: ["tdm"],
        note: { no: "Basert på retrospektive TDM-analyser (bipolar lidelse, epilepsi). Valproat forlenger og enzyminduktorer forkorter halveringstiden.",
                en: "Based on retrospective TDM analyses (bipolar disorder, epilepsy). Valproate prolongs and enzyme inducers shorten the half-life." } },
      drc: { tablet: { of: "LTG", pts: [[24, 15.44, 11.297, 24.378], [12, 19.865, 14.535, 31.365]] } },
      t12: 29, tmax: 2.5
    }
  ]
};
