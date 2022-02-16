/**
 * @generated SignedSource<<7a0660770aa58675f2a7950b973f10a7>>
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
declare export opaque type SiteSurveyQuestionReplyCellData_data$fragmentType: FragmentType;
export type SiteSurveyQuestionReplyCellData_data$ref = SiteSurveyQuestionReplyCellData_data$fragmentType;
export type SiteSurveyQuestionReplyCellData_data$data = {|
  +cellData: ?$ReadOnlyArray<?{|
    +networkType: CellularNetworkType,
    +signalStrength: number,
    +baseStationID: ?string,
    +cellID: ?string,
    +locationAreaCode: ?string,
    +mobileCountryCode: ?string,
    +mobileNetworkCode: ?string,
  |}>,
  +$fragmentType: SiteSurveyQuestionReplyCellData_data$fragmentType,
|};
export type SiteSurveyQuestionReplyCellData_data = SiteSurveyQuestionReplyCellData_data$data;
export type SiteSurveyQuestionReplyCellData_data$key = {
  +$data?: SiteSurveyQuestionReplyCellData_data$data,
  +$fragmentSpreads: SiteSurveyQuestionReplyCellData_data$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SiteSurveyQuestionReplyCellData_data",
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
          "name": "baseStationID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cellID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationAreaCode",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SurveyQuestion",
  "abstractKey": null
};

(node/*: any*/).hash = "586ccb85b3fc3c5e37ce3014c2a26c0b";

module.exports = ((node/*: any*/)/*: Fragment<
  SiteSurveyQuestionReplyCellData_data$fragmentType,
  SiteSurveyQuestionReplyCellData_data$data,
>*/);
