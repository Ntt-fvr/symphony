/**
 * @generated SignedSource<<d82c389e9e777c5e9b48a6fc628fa839>>
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
declare export opaque type AvailableLinksAndPortsTable_ports$fragmentType: FragmentType;
export type AvailableLinksAndPortsTable_ports$ref = AvailableLinksAndPortsTable_ports$fragmentType;
export type AvailableLinksAndPortsTable_ports$data = $ReadOnlyArray<{|
  +id: string,
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
  +$fragmentType: AvailableLinksAndPortsTable_ports$fragmentType,
|}>;
export type AvailableLinksAndPortsTable_ports = AvailableLinksAndPortsTable_ports$data;
export type AvailableLinksAndPortsTable_ports$key = $ReadOnlyArray<{
  +$data?: AvailableLinksAndPortsTable_ports$data,
  +$fragmentSpreads: AvailableLinksAndPortsTable_ports$fragmentType,
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
  "name": "AvailableLinksAndPortsTable_ports",
  "selections": [
    (v0/*: any*/),
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
  "type": "EquipmentPort",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "4e8a9abce5dd51248563b09c37b80558";

module.exports = ((node/*: any*/)/*: Fragment<
  AvailableLinksAndPortsTable_ports$fragmentType,
  AvailableLinksAndPortsTable_ports$data,
>*/);
