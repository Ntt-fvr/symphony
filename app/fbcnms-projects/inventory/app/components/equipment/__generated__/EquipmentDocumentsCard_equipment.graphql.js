/**
 * @generated SignedSource<<cd4991ca5986a50dc4e2c52e786350d9>>
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
declare export opaque type EquipmentDocumentsCard_equipment$fragmentType: FragmentType;
export type EquipmentDocumentsCard_equipment$ref = EquipmentDocumentsCard_equipment$fragmentType;
export type EquipmentDocumentsCard_equipment$data = {|
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
  +parentLocation: ?{|
    +locationType: {|
      +documentCategories: $ReadOnlyArray<?{|
        +id: string,
        +name: ?string,
      |}>,
    |},
  |},
  +$fragmentType: EquipmentDocumentsCard_equipment$fragmentType,
|};
export type EquipmentDocumentsCard_equipment = EquipmentDocumentsCard_equipment$data;
export type EquipmentDocumentsCard_equipment$key = {
  +$data?: EquipmentDocumentsCard_equipment$data,
  +$fragmentSpreads: EquipmentDocumentsCard_equipment$fragmentType,
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
  "name": "EquipmentDocumentsCard_equipment",
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
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "parentLocation",
      "plural": false,
      "selections": [
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
      "storageKey": null
    }
  ],
  "type": "Equipment",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "9abc148ec98dcd8b498b5ad14c20d525";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentDocumentsCard_equipment$fragmentType,
  EquipmentDocumentsCard_equipment$data,
>*/);
