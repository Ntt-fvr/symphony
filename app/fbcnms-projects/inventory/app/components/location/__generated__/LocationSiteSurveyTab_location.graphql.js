/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type SiteSurveyPane_survey$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type LocationSiteSurveyTab_location$ref: FragmentReference;
declare export opaque type LocationSiteSurveyTab_location$fragmentType: LocationSiteSurveyTab_location$ref;
export type LocationSiteSurveyTab_location = {|
  +id: string,
  +siteSurveyNeeded: boolean,
  +surveys: $ReadOnlyArray<?{|
    +id: string,
    +completionTimestamp: number,
    +name: string,
    +ownerName: ?string,
    +sourceFile: ?{|
      +id: string,
      +fileName: string,
      +storeKey: ?string,
    |},
    +$fragmentRefs: SiteSurveyPane_survey$ref,
  |}>,
  +$refType: LocationSiteSurveyTab_location$ref,
|};
export type LocationSiteSurveyTab_location$data = LocationSiteSurveyTab_location;
export type LocationSiteSurveyTab_location$key = {
  +$data?: LocationSiteSurveyTab_location$data,
  +$fragmentRefs: LocationSiteSurveyTab_location$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationSiteSurveyTab_location",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "siteSurveyNeeded",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Survey",
      "kind": "LinkedField",
      "name": "surveys",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ownerName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "File",
          "kind": "LinkedField",
          "name": "sourceFile",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "fileName",
              "storageKey": null
            },
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
          "name": "SiteSurveyPane_survey"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd42a66c9f702b247082792e87c3b7a84';

module.exports = node;
