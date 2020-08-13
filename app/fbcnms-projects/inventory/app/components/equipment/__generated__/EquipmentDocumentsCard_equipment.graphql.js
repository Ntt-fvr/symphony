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
declare export opaque type EquipmentDocumentsCard_equipment$ref: FragmentReference;
declare export opaque type EquipmentDocumentsCard_equipment$fragmentType: EquipmentDocumentsCard_equipment$ref;
export type EquipmentDocumentsCard_equipment = {|
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
  +$refType: EquipmentDocumentsCard_equipment$ref,
|};
export type EquipmentDocumentsCard_equipment$data = EquipmentDocumentsCard_equipment;
export type EquipmentDocumentsCard_equipment$key = {
  +$data?: EquipmentDocumentsCard_equipment$data,
  +$fragmentRefs: EquipmentDocumentsCard_equipment$ref,
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
  "name": "EquipmentDocumentsCard_equipment",
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
  "type": "Equipment",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '47fa4ebbcddc93a1562ca029f897dc4e';

module.exports = node;
