/**
 * @generated SignedSource<<cd4252a55b64f3e1cdf3dc2e415d85bd>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type EntityDocumentsTable_files$fragmentType = any;
type EntityDocumentsTable_hyperlinks$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type LocationDocumentsCard_location$fragmentType: FragmentType;
export type LocationDocumentsCard_location$ref = LocationDocumentsCard_location$fragmentType;
export type LocationDocumentsCard_location$data = {|
  +id: string,
  +images: $ReadOnlyArray<?{|
    +$fragmentSpreads: EntityDocumentsTable_files$fragmentType,
  |}>,
  +files: $ReadOnlyArray<?{|
    +$fragmentSpreads: EntityDocumentsTable_files$fragmentType,
  |}>,
  +hyperlinks: $ReadOnlyArray<{|
    +$fragmentSpreads: EntityDocumentsTable_hyperlinks$fragmentType,
  |}>,
  +locationType: {|
    +documentCategories: $ReadOnlyArray<?{|
      +id: string,
      +name: ?string,
    |}>,
  |},
  +$fragmentType: LocationDocumentsCard_location$fragmentType,
|};
export type LocationDocumentsCard_location = LocationDocumentsCard_location$data;
export type LocationDocumentsCard_location$key = {
  +$data?: LocationDocumentsCard_location$data,
  +$fragmentSpreads: LocationDocumentsCard_location$fragmentType,
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
v1 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "EntityDocumentsTable_files"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationDocumentsCard_location",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "files",
      "plural": true,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Hyperlink",
      "kind": "LinkedField",
      "name": "hyperlinks",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityDocumentsTable_hyperlinks"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationType",
      "kind": "LinkedField",
      "name": "locationType",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "DocumentCategory",
          "kind": "LinkedField",
          "name": "documentCategories",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "133ac192485dd4df8ddabc306e27ef2c";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationDocumentsCard_location$fragmentType,
  LocationDocumentsCard_location$data,
>*/);
