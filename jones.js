/* =====================================================================
   TDMinfo — kritisk differanse mellom to målinger (Jones-metoden)
   ---------------------------------------------------------------------
   Jones GRD. Critical difference calculations revised: inclusion of
   variation in standard deviation with analyte concentration.
   Ann Clin Biochem 2009;46:517–519. doi:10.1258/acb.2009.009083

   Hver måling får sitt eget standardavvik ut fra sin egen konsentrasjon
   og sin egen analytiske CV:  SD = CV × C.
   Kritisk differanse:          CD = z × √(SD₁² + SD₂²)
   Forskjellen regnes som større enn forventet målevariasjon bare når
   |C₁ − C₂| > CD. Med z = 1,96 tilsvarer det tosidig 5 % signifikansnivå.

   Gjelder analytisk variasjon alene (ikke biologisk variasjon).
   Ren beregning uten avhengigheter: brukes av appen og av testene.
   ===================================================================== */
(function (root) {
  "use strict";

  var Z_TWO_SIDED_5 = 1.96;

  // Status for vurderingen
  var LARGER = "larger", WITHIN = "within", NA = "na";

  function finite(x) { return typeof x === "number" && isFinite(x); }

  // Hvorfor en enkeltmåling ikke kan brukes, eller null hvis den kan det.
  function measurementProblem(m) {
    if (!m || m.c == null || (typeof m.c === "number" && isNaN(m.c))) return "missing";
    if (!finite(m.c) || m.c < 0) return "invalid";
    if (m.belowLoq) return "belowLoq";
    if (m.c === 0) return "zero";
    if (m.cv == null || !finite(m.cv) || m.cv <= 0 || m.cv >= 100) return "noCv";
    return null;
  }

  /**
   * Sammenlign to målinger.
   * a, b: { c: konsentrasjon (samme enhet), cv: analytisk CV i %,
   *         analyte?: id, unit?: enhet, belowLoq?: true hvis under
   *         kvantifiseringsgrensen }
   * opts.z: z-verdi (standard 1,96)
   * Returnerer { status: "larger" | "within" | "na", reason?, diff, cd, sd: [SD₁, SD₂], z }
   */
  function compare(a, b, opts) {
    var z = opts && finite(opts.z) && opts.z > 0 ? opts.z : Z_TWO_SIDED_5;
    var out = { status: NA, z: z };
    var p = measurementProblem(a) || measurementProblem(b);
    if (p) { out.reason = p; return out; }
    if (a.analyte != null && b.analyte != null && a.analyte !== b.analyte) { out.reason = "analyte"; return out; }
    if (a.unit != null && b.unit != null && a.unit !== b.unit) { out.reason = "unit"; return out; }

    var sd1 = a.cv / 100 * a.c, sd2 = b.cv / 100 * b.c;
    var cd = z * Math.sqrt(sd1 * sd1 + sd2 * sd2);
    var diff = Math.abs(a.c - b.c);
    out.sd = [sd1, sd2];
    out.cd = cd;
    out.diff = diff;
    // Streng ulikhet med toleranse for avrunding: lik CD gir «kan skyldes målevariasjon».
    out.status = diff - cd > cd * 1e-9 ? LARGER : WITHIN;
    return out;
  }

  var api = { compare: compare, Z: Z_TWO_SIDED_5, LARGER: LARGER, WITHIN: WITHIN, NA: NA };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.TDM_JONES = api;
})(typeof window !== "undefined" ? window : this);
