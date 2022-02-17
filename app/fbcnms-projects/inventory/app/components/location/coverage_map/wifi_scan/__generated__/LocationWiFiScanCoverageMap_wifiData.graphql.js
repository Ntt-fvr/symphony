/**
 * @generated SignedSource<<28bf5e93a2c73c58158de7658cf431aa>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type LocationWiFiScanCoverageMap_wifiData$fragmentType: FragmentType;
export type LocationWiFiScanCoverageMap_wifiData$ref = LocationWiFiScanCoverageMap_wifiData$fragmentType;
export type LocationWiFiScanCoverageMap_wifiData$data = $ReadOnlyArray<{|
  +id: string,
  +latitude: ?number,
  +longitude: ?number,
  +frequency: number,
  +channel: number,
  +bssid: string,
  +ssid: ?string,
  +strength: number,
  +band: ?string,
  +$fragmentType: LocationWiFiScanCoverageMap_wifiData$fragmentType,
|}>;
export type LocationWiFiScanCoverageMap_wifiData = LocationWiFiScanCoverageMap_wifiData$data;
export type LocationWiFiScanCoverageMap_wifiData$key = $ReadOnlyArray<{
  +$data?: LocationWiFiScanCoverageMap_wifiData$data,
  +$fragmentSpreads: LocationWiFiScanCoverageMap_wifiData$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "LocationWiFiScanCoverageMap_wifiData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "latitude",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "longitude",
      "storageKey": null
    },
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
  "type": "SurveyWiFiScan",
  "abstractKey": null
};

(node/*: any*/).hash = "c19f1446b6147fde7dff384c07c86b60";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationWiFiScanCoverageMap_wifiData$fragmentType,
  LocationWiFiScanCoverageMap_wifiData$data,
>*/);
