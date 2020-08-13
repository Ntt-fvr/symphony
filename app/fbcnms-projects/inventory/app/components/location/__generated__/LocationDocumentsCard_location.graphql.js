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
type EntityDocumentsTable_files$ref = any;
type EntityDocumentsTable_hyperlinks$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type LocationDocumentsCard_location$ref: FragmentReference;
declare export opaque type LocationDocumentsCard_location$fragmentType: LocationDocumentsCard_location$ref;
export type LocationDocumentsCard_location = {|
  +id: string,
  +images: $ReadOnlyArray<?{|
    +$fragmentRefs: EntityDocumentsTable_files$ref
  |}>,
  +files: $ReadOnlyArray<?{|
    +$fragmentRefs: EntityDocumentsTable_files$ref
  |}>,
  +hyperlinks: $ReadOnlyArray<{|
    +$fragmentRefs: EntityDocumentsTable_hyperlinks$ref
  |}>,
  +$refType: LocationDocumentsCard_location$ref,
|};
export type LocationDocumentsCard_location$data = LocationDocumentsCard_location;
export type LocationDocumentsCard_location$key = {
  +$data?: LocationDocumentsCard_location$data,
  +$fragmentRefs: LocationDocumentsCard_location$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
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
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "files",
      "plural": true,
      "selections": (v0/*: any*/),
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
    }
  ],
  "type": "Location",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c1e05fd5d50af01cf1f5b5f42ac1d27';

module.exports = node;
