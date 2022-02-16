/**
 * @generated SignedSource<<daf46db72bd61bf9697e67a2e27a8344>>
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
declare export opaque type AvailablePortsTable_ports$fragmentType: FragmentType;
export type AvailablePortsTable_ports$ref = AvailablePortsTable_ports$fragmentType;
export type AvailablePortsTable_ports$data = $ReadOnlyArray<{|
  +id: string,
  +parentEquipment: {|
    +id: string,
    +name: string,
    +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
  |},
  +definition: {|
    +id: string,
    +name: string,
    +portType: ?{|
      +name: string,
    |},
    +visibleLabel: ?string,
  |},
  +$fragmentType: AvailablePortsTable_ports$fragmentType,
|}>;
export type AvailablePortsTable_ports = AvailablePortsTable_ports$data;
export type AvailablePortsTable_ports$key = $ReadOnlyArray<{
  +$data?: AvailablePortsTable_ports$data,
  +$fragmentSpreads: AvailablePortsTable_ports$fragmentType,
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
  "name": "AvailablePortsTable_ports",
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
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPortType",
          "kind": "LinkedField",
          "name": "portType",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "visibleLabel",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "EquipmentPort",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "28fb7ac76ca11ecf2ff60dae1869a25b";

module.exports = ((node/*: any*/)/*: Fragment<
  AvailablePortsTable_ports$fragmentType,
  AvailablePortsTable_ports$data,
>*/);
