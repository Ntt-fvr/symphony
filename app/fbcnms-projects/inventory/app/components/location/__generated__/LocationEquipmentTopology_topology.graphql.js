/**
 * @generated SignedSource<<dc4ba82d94d36946dee0e62d7c3890fb>>
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
declare export opaque type LocationEquipmentTopology_topology$fragmentType: FragmentType;
export type LocationEquipmentTopology_topology$ref = LocationEquipmentTopology_topology$fragmentType;
export type LocationEquipmentTopology_topology$data = {|
  +nodes: $ReadOnlyArray<{|
    +id?: string,
    +name?: string,
  |}>,
  +$fragmentSpreads: ForceNetworkTopology_topology$fragmentType,
  +$fragmentType: LocationEquipmentTopology_topology$fragmentType,
|};
export type LocationEquipmentTopology_topology = LocationEquipmentTopology_topology$data;
export type LocationEquipmentTopology_topology$key = {
  +$data?: LocationEquipmentTopology_topology$data,
  +$fragmentSpreads: LocationEquipmentTopology_topology$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationEquipmentTopology_topology",
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

(node/*: any*/).hash = "85e688a255ed451854dcd0a64bd6cded";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationEquipmentTopology_topology$fragmentType,
  LocationEquipmentTopology_topology$data,
>*/);
