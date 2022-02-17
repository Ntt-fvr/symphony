/**
 * @generated SignedSource<<699f9673a9ffc8c521a53fd3a84340b9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type SiteSurveyQuestionReplyCellData_data$fragmentType = any;
type SiteSurveyQuestionReplyWifiData_data$fragmentType = any;
export type SurveyQuestionType = "BOOL" | "EMAIL" | "COORDS" | "PHONE" | "TEXT" | "TEXTAREA" | "PHOTO" | "WIFI" | "CELLULAR" | "FLOAT" | "INTEGER" | "DATE" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type SiteSurveyQuestionReply_question$fragmentType: FragmentType;
export type SiteSurveyQuestionReply_question$ref = SiteSurveyQuestionReply_question$fragmentType;
export type SiteSurveyQuestionReply_question$data = {|
  +questionFormat: ?SurveyQuestionType,
  +longitude: ?number,
  +latitude: ?number,
  +boolData: ?boolean,
  +textData: ?string,
  +emailData: ?string,
  +phoneData: ?string,
  +floatData: ?number,
  +intData: ?number,
  +dateData: ?number,
  +photoData: ?{|
    +storeKey: ?string,
  |},
  +$fragmentSpreads: SiteSurveyQuestionReplyWifiData_data$fragmentType & SiteSurveyQuestionReplyCellData_data$fragmentType,
  +$fragmentType: SiteSurveyQuestionReply_question$fragmentType,
|};
export type SiteSurveyQuestionReply_question = SiteSurveyQuestionReply_question$data;
export type SiteSurveyQuestionReply_question$key = {
  +$data?: SiteSurveyQuestionReply_question$data,
  +$fragmentSpreads: SiteSurveyQuestionReply_question$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SiteSurveyQuestionReply_question",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "questionFormat",
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
      "name": "latitude",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "boolData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "textData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emailData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phoneData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "floatData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "intData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateData",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "photoData",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "storeKey",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SiteSurveyQuestionReplyWifiData_data"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SiteSurveyQuestionReplyCellData_data"
    }
  ],
  "type": "SurveyQuestion",
  "abstractKey": null
};

(node/*: any*/).hash = "4d9d45828bc4b9296fdd9b8347017e18";

module.exports = ((node/*: any*/)/*: Fragment<
  SiteSurveyQuestionReply_question$fragmentType,
  SiteSurveyQuestionReply_question$data,
>*/);
