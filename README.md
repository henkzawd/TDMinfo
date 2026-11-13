# TDMinfo

TDMinfo er en nettside for leger som har rekvirert serumkonsentrasjon av
psykofarmaka. Man velger legemiddel, skriver inn dose, når siste dose ble tatt,
når prøven ble tatt og målt konsentrasjon. Siden viser da en tidslinje fra 0 og
oppover der prøven plasseres sammen med:

- OUS sitt referanseområde (alltid)
- OUS sin ringegrense og toksiske grense
- feilmargin (analytisk variasjon fra laboratoriets kontroller)
- valgfritt: AGNP 2026 sitt terapeutiske referanseområde, forventet område for
  dosen og AGNP sin varslingsgrense (kan hukes av på resultatsiden)

Man kan også sammenligne med en tidligere prøve. Da vises antall dager mellom
prøvene, endring i tall og prosent, og endring i konsentrasjon per dose.
I tillegg får man én kort konklusjon om forskjellen kan skyldes målevariasjon
(laboratoriets analytiske variasjon, beregnet med Jones-metoden). Detaljer og
forbehold vises bak det lille i-symbolet.

Siden fungerer på PC og mobil, har lyst og mørkt tema (følger enheten som
standard) og kan vises på norsk eller engelsk. Enhet kan byttes mellom nmol/L og
ng/mL.

**Ingen opplysninger lagres eller sendes noe sted.** Alt regnes ut i nettleseren.
Siden trenger derfor ingen database og ingen innlogging.

## Endre verdier

Alle faglige verdier (referanseområder, grenser, AGNP-tall) ligger i filen
`data.js`. Si fra til Claude hvilke verdier som skal endres, så oppdateres de der.

## Publisering

Siden består bare av vanlige filer (`index.html`, `styles.css`, `app.js`,
`data.js`) og kan publiseres gratis med Vercel, slik som HLR-FAR:

1. Logg inn på <https://vercel.com> med samme konto som for HLR-FAR.
2. Velg å legge til et nytt prosjekt, og importer GitHub-prosjektet `TDMinfo`.
   Hvis det ikke dukker opp i listen, må Vercel få tilgang til det (Vercel
   viser selv en lenke for å justere GitHub-tilgangen).
3. Ikke endre noen innstillinger. Trykk «Deploy».
4. Etter et minutt får du en fast adresse som kan deles.

Etter dette publiseres nye endringer automatisk.
