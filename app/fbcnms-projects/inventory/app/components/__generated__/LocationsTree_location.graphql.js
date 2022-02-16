/**
 * @generated SignedSource<<112b342b526ae7fd165f38b7f496d7bb>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type LocationsTree_location$fragmentType: FragmentType;
export type LocationsTree_location$ref = LocationsTree_location$fragmentType;
export type LocationsTree_location$data = {
  +id: string,
  +externalId: ?string,
  +name: string,
  +locationType: {
    +id: string,
    +name: string,
    ...
  },
  +numChildren: number,
  +siteSurveyNeeded: boolean,
  ...
};
export type LocationsTree_location = LocationsTree_location$data;
export type LocationsTree_location$key = {
  +$data?: LocationsTree_location$data,
  +$fragmentSpreads: LocationsTree_location$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "mask": false
  },
  "name": "LocationsTree_location",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "externalId",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationType",
      "kind": "LinkedField",
      "name": "locationType",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "numChildren",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "siteSurveyNeeded",
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "5f66e0c34ff91e14429645285c63ea7f";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationsTree_location$fragmentType,
  LocationsTree_location$data,
>*/);
