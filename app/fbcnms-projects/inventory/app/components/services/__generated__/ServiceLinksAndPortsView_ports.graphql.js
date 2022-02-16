/**
 * @generated SignedSource<<1e94e5a94ad7bbd2b999cb33b1373cdf>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceLinksAndPortsView_ports$fragmentType: FragmentType;
export type ServiceLinksAndPortsView_ports$ref = ServiceLinksAndPortsView_ports$fragmentType;
export type ServiceLinksAndPortsView_ports$data = $ReadOnlyArray<{|
  +id: string,
  +parentEquipment: {|
    +id: string,
    +name: string,
    +equipmentType: {|
      +name: string,
    |},
  |},
  +definition: {|
    +id: string,
    +name: string,
  |},
  +$fragmentType: ServiceLinksAndPortsView_ports$fragmentType,
|}>;
export type ServiceLinksAndPortsView_ports = ServiceLinksAndPortsView_ports$data;
export type ServiceLinksAndPortsView_ports$key = $ReadOnlyArray<{
  +$data?: ServiceLinksAndPortsView_ports$data,
  +$fragmentSpreads: ServiceLinksAndPortsView_ports$fragmentType,
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
  "name": "ServiceLinksAndPortsView_ports",
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
          "concreteType": "EquipmentType",
          "kind": "LinkedField",
          "name": "equipmentType",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
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

(node/*: any*/).hash = "3c5ec3c451149626125b19ee8257c1c4";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceLinksAndPortsView_ports$fragmentType,
  ServiceLinksAndPortsView_ports$data,
>*/);
