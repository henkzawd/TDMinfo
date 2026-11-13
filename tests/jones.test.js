// Tester for Jones-metoden (kritisk differanse). Kjøres med: node --test tests/*.test.js
// Regneeksemplene er regnet ut for hånd med formelen i Jones 2009:
//   SD = CV × C,  CD = 1,96 × √(SD₁² + SD₂²),  «større» bare når |C₁ − C₂| > CD.
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const J = require("../jones.js");

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-3, `${a} ≈ ${b}`);

test("standard z er 1,96 (tosidig 5 %)", () => {
  assert.equal(J.Z, 1.96);
  assert.equal(J.compare({ c: 100, cv: 10 }, { c: 100, cv: 10 }).z, 1.96);
});

test("økning større enn kritisk differanse: 100 → 150, CV 10 %", () => {
  const r = J.compare({ c: 150, cv: 10 }, { c: 100, cv: 10 });
  close(r.sd[0], 15); close(r.sd[1], 10);
  close(r.cd, 1.96 * Math.sqrt(15 * 15 + 10 * 10)); // 35,334
  close(r.diff, 50);
  assert.equal(r.status, J.LARGER);
});

test("reduksjon gir samme svar som økning (symmetri)", () => {
  const up = J.compare({ c: 150, cv: 10 }, { c: 100, cv: 10 });
  const down = J.compare({ c: 100, cv: 10 }, { c: 150, cv: 10 });
  assert.equal(down.status, up.status);
  close(down.cd, up.cd);
  close(down.diff, up.diff);
});

test("SD følger konsentrasjonen: 100 → 130 er innenfor (gammel prosentmetode sa «større»)", () => {
  const r = J.compare({ c: 130, cv: 10 }, { c: 100, cv: 10 });
  close(r.cd, 1.96 * Math.sqrt(13 * 13 + 10 * 10)); // 32,146
  assert.equal(r.status, J.WITHIN);
  // Til sammenligning: 1,96 × √(10² + 10²) = 27,7 % av 100 < 30 → gammel metode sa «større».
  assert.ok(30 > 1.96 * Math.sqrt(200));
});

test("synkende 130 → 100 er også innenfor", () => {
  assert.equal(J.compare({ c: 100, cv: 10 }, { c: 130, cv: 10 }).status, J.WITHIN);
});

test("ulike CV for hver måling (20 % under medium kontroll, 15 % over)", () => {
  // 80 nmol/L med 20 % → SD 16; 120 nmol/L med 15 % → SD 18; CD = 1,96 × √580 = 47,20
  const r = J.compare({ c: 120, cv: 15 }, { c: 80, cv: 20 });
  close(r.sd[0], 18); close(r.sd[1], 16);
  close(r.cd, 47.2027);
  assert.equal(r.status, J.WITHIN);
  // 80 → 140: SD 21 og 16, CD = 1,96 × √697 = 51,75; forskjell 60 → større
  const r2 = J.compare({ c: 140, cv: 15 }, { c: 80, cv: 20 });
  close(r2.cd, 51.7452);
  assert.equal(r2.status, J.LARGER);
});

test("grenseverdier: forskjell lik CD er ikke «større»", () => {
  // SD 3 og 4 → √25 = 5. Med z = 2 er CD = 10, og forskjellen er 10.
  assert.equal(J.compare({ c: 30, cv: 10 }, { c: 40, cv: 10 }, { z: 2 }).status, J.WITHIN);
  // Med z = 1,96 er CD = 9,8 < 10 → større.
  const r = J.compare({ c: 30, cv: 10 }, { c: 40, cv: 10 });
  close(r.cd, 9.8);
  assert.equal(r.status, J.LARGER);
  // Like verdier
  assert.equal(J.compare({ c: 50, cv: 15 }, { c: 50, cv: 15 }).status, J.WITHIN);
});

test("like konsentrasjoner like over og under CD", () => {
  // CV 10 %, C₁ = 100: finn C₂ der |C₂ − 100| = 1,96 × √(10² + (0,1 C₂)²)
  // Løses (andregradsligning): C₂ ≈ 132,54. Litt under → innenfor, litt over → større.
  assert.equal(J.compare({ c: 132.5, cv: 10 }, { c: 100, cv: 10 }).status, J.WITHIN);
  assert.equal(J.compare({ c: 132.6, cv: 10 }, { c: 100, cv: 10 }).status, J.LARGER);
});

test("kan ikke vurderes når data mangler eller metoden ikke passer", () => {
  const ok = { c: 100, cv: 10 };
  const cases = [
    [null, "missing"],
    [{ c: null, cv: 10 }, "missing"],
    [{ c: NaN, cv: 10 }, "missing"],
    [{ c: -5, cv: 10 }, "invalid"],
    [{ c: Infinity, cv: 10 }, "invalid"],
    [{ c: 0, cv: 10 }, "zero"],
    [{ c: 5, cv: 10, belowLoq: true }, "belowLoq"],
    [{ c: 100, cv: null }, "noCv"],
    [{ c: 100 }, "noCv"],
    [{ c: 100, cv: 0 }, "noCv"],
    [{ c: 100, cv: NaN }, "noCv"],
    [{ c: 100, cv: 150 }, "noCv"]
  ];
  for (const [m, reason] of cases) {
    for (const r of [J.compare(m, ok), J.compare(ok, m)]) {
      assert.equal(r.status, J.NA, JSON.stringify(m));
      assert.equal(r.reason, reason, JSON.stringify(m));
      assert.equal(r.cd, undefined);
    }
  }
});

test("ulik analytt eller enhet gir «kan ikke vurderes»", () => {
  assert.equal(J.compare({ c: 100, cv: 10, analyte: "CIT" }, { c: 300, cv: 10, analyte: "ESC" }).reason, "analyte");
  assert.equal(J.compare({ c: 100, cv: 10, unit: "nmol" }, { c: 300, cv: 10, unit: "ng" }).reason, "unit");
  assert.equal(J.compare({ c: 100, cv: 10, analyte: "sum" }, { c: 300, cv: 10, analyte: "sum" }).status, J.LARGER);
});
