/**
 * @generated SignedSource<<439848f54bd5ac9657bb897ee8c70516>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type SiteSurveyQuestionReplyWifiData_data$fragmentType: FragmentType;
export type SiteSurveyQuestionReplyWifiData_data$ref = SiteSurveyQuestionReplyWifiData_data$fragmentType;
export type SiteSurveyQuestionReplyWifiData_data$data = {|
  +wifiData: ?$ReadOnlyArray<?{|
    +band: ?string,
    +bssid: string,
    +channel: number,
    +frequency: number,
    +strength: number,
    +ssid: ?string,
  |}>,
  +$fragmentType: SiteSurveyQuestionReplyWifiData_data$fragmentType,
|};
export type SiteSurveyQuestionReplyWifiData_data = SiteSurveyQuestionReplyWifiData_data$data;
export type SiteSurveyQuestionReplyWifiData_data$key = {
  +$data?: SiteSurveyQuestionReplyWifiData_data$data,
  +$fragmentSpreads: SiteSurveyQuestionReplyWifiData_data$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SiteSurveyQuestionReplyWifiData_data",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SurveyWiFiScan",
      "kind": "LinkedField",
      "name": "wifiData",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "band",
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
          "name": "channel",
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
          "name": "strength",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ssid",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SurveyQuestion",
  "abstractKey": null
};

(node/*: any*/).hash = "2d96d30d887d78992884a1de2ceca46c";

module.exports = ((node/*: any*/)/*: Fragment<
  SiteSurveyQuestionReplyWifiData_data$fragmentType,
  SiteSurveyQuestionReplyWifiData_data$data,
>*/);
