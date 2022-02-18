/**
 * @generated SignedSource<<8cffe1f08856afacb41823b7cc19b955>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type SiteSurveyQuestionReply_question$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type SiteSurveyPane_survey$fragmentType: FragmentType;
export type SiteSurveyPane_survey$ref = SiteSurveyPane_survey$fragmentType;
export type SiteSurveyPane_survey$data = {|
  +name: string,
  +completionTimestamp: number,
  +surveyResponses: $ReadOnlyArray<?{|
    +id: string,
    +questionText: string,
    +formName: ?string,
    +formIndex: number,
    +questionIndex: number,
    +$fragmentSpreads: SiteSurveyQuestionReply_question$fragmentType,
  |}>,
  +$fragmentType: SiteSurveyPane_survey$fragmentType,
|};
export type SiteSurveyPane_survey = SiteSurveyPane_survey$data;
export type SiteSurveyPane_survey$key = {
  +$data?: SiteSurveyPane_survey$data,
  +$fragmentSpreads: SiteSurveyPane_survey$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SiteSurveyPane_survey",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completionTimestamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SurveyQuestion",
      "kind": "LinkedField",
      "name": "surveyResponses",
      "plural": true,
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
          "name": "questionText",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formIndex",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "questionIndex",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SiteSurveyQuestionReply_question"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Survey",
  "abstractKey": null
};

(node/*: any*/).hash = "abb3682eadcff198afba66898e28a2a0";

module.exports = ((node/*: any*/)/*: Fragment<
  SiteSurveyPane_survey$fragmentType,
  SiteSurveyPane_survey$data,
>*/);
