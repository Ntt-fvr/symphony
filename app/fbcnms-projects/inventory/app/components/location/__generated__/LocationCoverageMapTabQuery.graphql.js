/**
 * @generated SignedSource<<1df974498e348b198c6836ebd189cc69>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type LocationCellScanCoverageMap_cellData$fragmentType = any;
type LocationWiFiScanCoverageMap_wifiData$fragmentType = any;
export type LocationCoverageMapTabQuery$variables = {|
  locationId: string,
|};
export type LocationCoverageMapTabQueryVariables = LocationCoverageMapTabQuery$variables;
export type LocationCoverageMapTabQuery$data = {|
  +location: ?{|
    +cellData?: $ReadOnlyArray<?{|
      +$fragmentSpreads: LocationCellScanCoverageMap_cellData$fragmentType,
    |}>,
    +wifiData?: $ReadOnlyArray<?{|
      +$fragmentSpreads: LocationWiFiScanCoverageMap_wifiData$fragmentType,
    |}>,
  |},
|};
export type LocationCoverageMapTabQueryResponse = LocationCoverageMapTabQuery$data;
export type LocationCoverageMapTabQuery = {|
  variables: LocationCoverageMapTabQueryVariables,
  response: LocationCoverageMapTabQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "locationId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "locationId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitude",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitude",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationCoverageMapTabQuery",
    "selections": [
      {
        "alias": "location",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SurveyCellScan",
                "kind": "LinkedField",
                "name": "cellData",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "LocationCellScanCoverageMap_cellData"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SurveyWiFiScan",
                "kind": "LinkedField",
                "name": "wifiData",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "LocationWiFiScanCoverageMap_wifiData"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Location",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationCoverageMapTabQuery",
    "selections": [
      {
        "alias": "location",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SurveyCellScan",
                "kind": "LinkedField",
                "name": "cellData",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "networkType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "signalStrength",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mobileCountryCode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mobileNetworkCode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "operator",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SurveyWiFiScan",
                "kind": "LinkedField",
                "name": "wifiData",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "frequency",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "channel",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bssid",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ssid",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "strength",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "band",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Location",
            "abstractKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "04d57b75c838f99279a1361c2bdbac1d",
    "id": null,
    "metadata": {},
    "name": "LocationCoverageMapTabQuery",
    "operationKind": "query",
    "text": "query LocationCoverageMapTabQuery(\n  $locationId: ID!\n) {\n  location: node(id: $locationId) {\n    __typename\n    ... on Location {\n      cellData {\n        ...LocationCellScanCoverageMap_cellData\n        id\n      }\n      wifiData {\n        ...LocationWiFiScanCoverageMap_wifiData\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment LocationCellScanCoverageMap_cellData on SurveyCellScan {\n  id\n  latitude\n  longitude\n  networkType\n  signalStrength\n  mobileCountryCode\n  mobileNetworkCode\n  operator\n}\n\nfragment LocationWiFiScanCoverageMap_wifiData on SurveyWiFiScan {\n  id\n  latitude\n  longitude\n  frequency\n  channel\n  bssid\n  ssid\n  strength\n  band\n}\n"
  }
};
})();

(node/*: any*/).hash = "16ca9fb7b04e14fdb62144f24b5ab0e5";

module.exports = ((node/*: any*/)/*: Query<
  LocationCoverageMapTabQuery$variables,
  LocationCoverageMapTabQuery$data,
>*/);
