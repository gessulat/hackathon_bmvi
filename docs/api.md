### API Description for BADMaP

- GET /route?src=lat:lng&dst=lat:lng

Sends the source and destination coordinates to the server as query parameters. (For the purposes of the BMVI-DATA-RUN these points will be fixed).

The server responds with a JSON-object containing the route options with pricing metadata. An example JSON can look like this:

```
{
 "metadata": {
    "count": 2,
    "next": null,
    "previous": null,
  },
  "results": [
    {
  "distance_m": 577123,
  "duration_s": 18194,
  "start_location": {
    "lat": 52.5167,
    "lon": 13.3833,
    "accuracy_m": 3.9
  },
  "start_address": {
    "name": "Bundesministerium für Verkehr und digitale Infrastruktur",
    "street_number": "44",
    "street_name": "Invalidenstraße",
    "city": "Berlin",
    "country": "DE"
  },
  "end_location": {
    "lat": 48.1333,
    "lon": 11.5667,
    "accuracy_m": 9
  },
  "end_address": {
    "name": "Allianz Arena",
    "street_number": "25",
    "street_name": "Werner-Heisenberg-Allee",
    "city": "München",
    "country": "DE"
  },
  "path": "_kfnE|aqqUAka@?aFBmDAuB}B?eN@wH@oL?iB@{@C[MUOOO}AcCaAsBUm@qD}LkEgOkBp@uAVsA?e@Ei@I{@WeBk@cBa@a@GmBGsBIkAEm@?}B?QLiECeDBcTAeC?cB@OKyA?yF?wD?qBD_FLyK\\sTr@uBByACyAM}@MkAYo@QeGuBQM{Ai@qBq@uCs@gB[oBQ{BEeD?_CJ{K|@_Ff@mAXuBx@mVdLaGfDyBl@_BT}DVkDPsCHwVi@aBB_AH}AZoBn@mFdBgBTm@DsA@m@AoAOiAUmA_@oHeDuBy@iAWcAMoAEqCCG?QH_BCuFKgHUgIMaEM_KQcGKo@Wc@E{@QyBi@_IoCuJkDgEuA_Cy@{CcAm@M_@IeBEoBRiA\\kB|@iDhBk@R}@Tu@DoA?UCgBk@{Bw@mCw@_Bo@eIgCcD}@sHwAaNaCeEs@sA@mBEgASgOmFeLcEgFgBgBs@qMmF{DcBeBs@qAc@[E}B?eACuI?eD?KjB{@fPaDYyE]_@Ao@Fe@PuDzBeC~Aq@Vi@Hm@BqD?_RHoC?w_@AmHB",
  "maut_cost_eur": 10.92,
    },
    {
      "distance_m": 616345,
      "duration_s": 20040,
      "start_location": {
        "lat": 52.5167,
        "lon": 13.3833,
        "accuracy_m": 3.9
      },
      "start_address": {
        "name": "Bundesministerium für Verkehr und digitale Infrastruktur",
        "street_number": "44",
        "street_name": "Invalidenstraße",
        "city": "Berlin",
        "country": "DE"
      },
      "end_location": {
        "lat": 48.1333,
        "lon": 11.5667,
        "accuracy_m": 9
      },
      "end_address": {
        "name": "Allianz Arena",
        "street_number": "25",
        "street_name": "Werner-Heisenberg-Allee",
        "city": "München",
        "country": "DE"
      },
      "path": "_kfnE|aqqUAka@?aFBmDAuB}B?eN@wH@oL?iB@{@C[MUOOO}AcCaAsBUm@qD}LkEgOkBp@uAVsA?e@Ei@I{@WeBk@cBa@a@GmBGsBIkAEm@?}B?QLiECeDBcTAeC?cB@OKyA?yF?wD?qBD_FLyK\\sTr@uBByACyAM}@MkAYo@QeGuBQM{Ai@qBq@uCs@gB[oBQ{BEeD?_CJ{K|@_Ff@mAXuBx@mVdLaGfDyBl@_BT}DVkDPsCHwVi@aBB_AH}AZoBn@mFdBgBTm@DsA@m@AoAOiAUmA_@oHeDuBy@iAWcAMoAEqCCG?QH_BCuFKgHUgIMaEM_KQcGKo@Wc@E{@QyBi@_IoCuJkDgEuA_Cy@{CcAm@M_@IeBEoBRiA\\kB|@iDhBk@R}@Tu@DoA?UCgBk@{Bw@mCw@_Bo@eIgCcD}@sHwAaNaCeEs@sA@mBEgASgOmFeLcEgFgBgBs@qMmF{DcBeBs@qAc@[E}B?eACuI?eD?KjB{@fPaDYyE]_@Ao@Fe@PuDzBeC~Aq@Vi@Hm@BqD?_RHoC?w_@AmHB",
      "maut_cost_eur": 15.78,
    },
  ]
}
```