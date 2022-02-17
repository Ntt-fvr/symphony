/**
 * @generated SignedSource<<9b903bbfbd0ea609a29cf14cbee772e8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type EquipmentBreadcrumbs_equipment$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type AvailableLinksAndPortsTable_links$fragmentType: FragmentType;
export type AvailableLinksAndPortsTable_links$ref = AvailableLinksAndPortsTable_links$fragmentType;
export type AvailableLinksAndPortsTable_links$data = $ReadOnlyArray<{|
  +id: string,
  +ports: $ReadOnlyArray<?{|
    +parentEquipment: {|
      +id: string,
      +name: string,
      +positionHierarchy: $ReadOnlyArray<{|
        +parentEquipment: {|
          +id: string,
        |},
      |}>,
      +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
    |},
    +definition: {|
      +id: string,
      +name: string,
    |},
  |}>,
  +$fragmentType: AvailableLinksAndPortsTable_links$fragmentType,
|}>;
export type AvailableLinksAndPortsTable_links = AvailableLinksAndPortsTable_links$data;
export type AvailableLinksAndPortsTable_links$key = $ReadOnlyArray<{
  +$data?: AvailableLinksAndPortsTable_links$data,
  +$fragmentSpreads: AvailableLinksAndPortsTable_links$fragmentType,
  ...
}>;
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
    "plural": true
  },
  "name": "AvailableLinksAndPortsTable_links",
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

(node/*: any*/).hash = "e3f5879ccbd1a0bc982fc5c83526b90f";

module.exports = ((node/*: any*/)/*: Fragment<
  AvailableLinksAndPortsTable_links$fragmentType,
  AvailableLinksAndPortsTable_links$data,
>*/);
