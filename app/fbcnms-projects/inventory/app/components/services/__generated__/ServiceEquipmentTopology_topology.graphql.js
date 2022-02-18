/**
 * @generated SignedSource<<42673980cca3e71a17f8fd8465d91f83>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ForceNetworkTopology_topology$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceEquipmentTopology_topology$fragmentType: FragmentType;
export type ServiceEquipmentTopology_topology$ref = ServiceEquipmentTopology_topology$fragmentType;
export type ServiceEquipmentTopology_topology$data = {|
  +nodes: $ReadOnlyArray<{|
    +id?: string,
    +name?: string,
  |}>,
  +$fragmentSpreads: ForceNetworkTopology_topology$fragmentType,
  +$fragmentType: ServiceEquipmentTopology_topology$fragmentType,
|};
export type ServiceEquipmentTopology_topology = ServiceEquipmentTopology_topology$data;
export type ServiceEquipmentTopology_topology$key = {
  +$data?: ServiceEquipmentTopology_topology$data,
  +$fragmentSpreads: ServiceEquipmentTopology_topology$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServiceEquipmentTopology_topology",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
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
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "type": "Equipment",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ForceNetworkTopology_topology"
    }
  ],
  "type": "NetworkTopology",
  "abstractKey": null
};

(node/*: any*/).hash = "3aacf7059c6ccea42895132c69cbb030";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceEquipmentTopology_topology$fragmentType,
  ServiceEquipmentTopology_topology$data,
>*/);
