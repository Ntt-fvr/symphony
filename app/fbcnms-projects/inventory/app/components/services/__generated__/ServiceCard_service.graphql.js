/**
 * @generated SignedSource<<27000af25861fc19e56fd520e688259e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ServiceDetailsPanel_service$fragmentType = any;
type ServiceEquipmentTopology_endpoints$fragmentType = any;
type ServiceEquipmentTopology_topology$fragmentType = any;
type ServicePanel_service$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceCard_service$fragmentType: FragmentType;
export type ServiceCard_service$ref = ServiceCard_service$fragmentType;
export type ServiceCard_service$data = {|
  +id: string,
  +name: string,
  +topology: {|
    +$fragmentSpreads: ServiceEquipmentTopology_topology$fragmentType,
  |},
  +endpoints: $ReadOnlyArray<?{|
    +$fragmentSpreads: ServiceEquipmentTopology_endpoints$fragmentType,
  |}>,
  +$fragmentSpreads: ServiceDetailsPanel_service$fragmentType & ServicePanel_service$fragmentType,
  +$fragmentType: ServiceCard_service$fragmentType,
|};
export type ServiceCard_service = ServiceCard_service$data;
export type ServiceCard_service$key = {
  +$data?: ServiceCard_service$data,
  +$fragmentSpreads: ServiceCard_service$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServiceCard_service",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServiceDetailsPanel_service"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServicePanel_service"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "NetworkTopology",
      "kind": "LinkedField",
      "name": "topology",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ServiceEquipmentTopology_topology"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ServiceEndpoint",
      "kind": "LinkedField",
      "name": "endpoints",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ServiceEquipmentTopology_endpoints"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Service",
  "abstractKey": null
};

(node/*: any*/).hash = "b365b307bdc31d3d737c3f7f1b6d33fe";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceCard_service$fragmentType,
  ServiceCard_service$data,
>*/);
