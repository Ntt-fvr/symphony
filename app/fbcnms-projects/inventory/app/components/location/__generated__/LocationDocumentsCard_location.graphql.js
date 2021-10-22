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
type DocumentTable_hyperlinks$ref = any;
type EntityDocumentsTable_files$ref = any;
export type FileType = "FILE" | "IMAGE" | "%future added value";
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
    +$fragmentRefs: DocumentTable_hyperlinks$ref
  |}>,
  +locationType: {|
    +documentCategories: $ReadOnlyArray<?{|
      +id: string,
      +name: ?string,
      +index: ?number,
      +filesByEntity: $ReadOnlyArray<?{|
        +id: string,
        +fileName: string,
        +sizeInBytes: ?number,
        +modified: ?any,
        +uploaded: ?any,
        +fileType: ?FileType,
        +mimeType: ?string,
        +storeKey: ?string,
        +category: ?string,
        +annotation: ?string,
      |}>,
      +hyperlinksByEntity: $ReadOnlyArray<?{|
        +id: string,
        +url: string,
        +displayName: ?string,
        +category: ?string,
        +createTime: any,
      |}>,
    |}>
  |},
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
],
v2 = [
  {
    "kind": "Literal",
    "name": "entity",
    "value": "LOCATION"
  },
  {
    "kind": "Variable",
    "name": "entityID",
    "variableName": "locationId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "locationId"
    }
  ],
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
          "name": "DocumentTable_hyperlinks"
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "index",
              "storageKey": null
            },
            {
              "alias": null,
              "args": (v2/*: any*/),
              "concreteType": "File",
              "kind": "LinkedField",
              "name": "filesByEntity",
              "plural": true,
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
                  "name": "sizeInBytes",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "modified",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "uploaded",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "fileType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mimeType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "storeKey",
                  "storageKey": null
                },
                (v3/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "annotation",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": (v2/*: any*/),
              "concreteType": "Hyperlink",
              "kind": "LinkedField",
              "name": "hyperlinksByEntity",
              "plural": true,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "displayName",
                  "storageKey": null
                },
                (v3/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "createTime",
                  "storageKey": null
                }
              ],
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
// prettier-ignore
(node/*: any*/).hash = 'c88d45100f40c33eff1e8fdcfb7fdcea';

module.exports = node;
