/**
 * @generated SignedSource<<67c66c8d943170a2384339fe6a0b2892>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type CellularNetworkType = "CDMA" | "GSM" | "LTE" | "WCDMA" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type LocationCellScanCoverageMap_cellData$fragmentType: FragmentType;
export type LocationCellScanCoverageMap_cellData$ref = LocationCellScanCoverageMap_cellData$fragmentType;
export type LocationCellScanCoverageMap_cellData$data = $ReadOnlyArray<{|
  +id: string,
  +latitude: ?number,
  +longitude: ?number,
  +networkType: CellularNetworkType,
  +signalStrength: number,
  +mobileCountryCode: ?string,
  +mobileNetworkCode: ?string,
  +operator: ?string,
  +$fragmentType: LocationCellScanCoverageMap_cellData$fragmentType,
|}>;
export type LocationCellScanCoverageMap_cellData = LocationCellScanCoverageMap_cellData$data;
export type LocationCellScanCoverageMap_cellData$key = $ReadOnlyArray<{
  +$data?: LocationCellScanCoverageMap_cellData$data,
  +$fragmentSpreads: LocationCellScanCoverageMap_cellData$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "LocationCellScanCoverageMap_cellData",
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
  "type": "SurveyCellScan",
  "abstractKey": null
};

(node/*: any*/).hash = "d94c9d40f7baef9bcd50963bcb149e0e";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationCellScanCoverageMap_cellData$fragmentType,
  LocationCellScanCoverageMap_cellData$data,
>*/);
