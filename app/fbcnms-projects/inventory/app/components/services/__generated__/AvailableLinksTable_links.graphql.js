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
type EquipmentBreadcrumbs_equipment$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type AvailableLinksTable_links$ref: FragmentReference;
declare export opaque type AvailableLinksTable_links$fragmentType: AvailableLinksTable_links$ref;
export type AvailableLinksTable_links = $ReadOnlyArray<{|
  +id: string,
  +ports: $ReadOnlyArray<?{|
    +parentEquipment: {|
      +id: string,
      +name: string,
      +positionHierarchy: $ReadOnlyArray<{|
        +parentEquipment: {|
          +id: string
        |}
      |}>,
      +$fragmentRefs: EquipmentBreadcrumbs_equipment$ref,
    |},
    +definition: {|
      +id: string,
      +name: string,
    |},
  |}>,
  +$refType: AvailableLinksTable_links$ref,
|}>;
export type AvailableLinksTable_links$data = AvailableLinksTable_links;
export type AvailableLinksTable_links$key = $ReadOnlyArray<{
  +$data?: AvailableLinksTable_links$data,
  +$fragmentRefs: AvailableLinksTable_links$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = (function(){
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
    "plural": true
  },
  "name": "AvailableLinksTable_links",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPort",
      "kind": "LinkedField",
      "name": "ports",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Equipment",
          "kind": "LinkedField",
          "name": "parentEquipment",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "EquipmentPosition",
              "kind": "LinkedField",
              "name": "positionHierarchy",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Equipment",
                  "kind": "LinkedField",
                  "name": "parentEquipment",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "EquipmentBreadcrumbs_equipment"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPortDefinition",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Link",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '6868986f0fbbbb699a7152390136e645';

module.exports = node;
