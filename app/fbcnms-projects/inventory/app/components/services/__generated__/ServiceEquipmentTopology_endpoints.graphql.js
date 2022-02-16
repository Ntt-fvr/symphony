/**
 * @generated SignedSource<<224eeded4c2ba2b7f54a352ce79126ef>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceEquipmentTopology_endpoints$fragmentType: FragmentType;
export type ServiceEquipmentTopology_endpoints$ref = ServiceEquipmentTopology_endpoints$fragmentType;
export type ServiceEquipmentTopology_endpoints$data = $ReadOnlyArray<{|
  +definition: {|
    +role: ?string,
  |},
  +equipment: {|
    +id: string,
    +positionHierarchy: $ReadOnlyArray<{|
      +parentEquipment: {|
        +id: string,
      |},
    |}>,
  |},
  +$fragmentType: ServiceEquipmentTopology_endpoints$fragmentType,
|}>;
export type ServiceEquipmentTopology_endpoints = ServiceEquipmentTopology_endpoints$data;
export type ServiceEquipmentTopology_endpoints$key = $ReadOnlyArray<{
  +$data?: ServiceEquipmentTopology_endpoints$data,
  +$fragmentSpreads: ServiceEquipmentTopology_endpoints$fragmentType,
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ServiceEquipmentTopology_endpoints",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ServiceEndpointDefinition",
      "kind": "LinkedField",
      "name": "definition",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "role",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Equipment",
      "kind": "LinkedField",
      "name": "equipment",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ServiceEndpoint",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "085a9519bd88793b015ab955f716fb5f";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceEquipmentTopology_endpoints$fragmentType,
  ServiceEquipmentTopology_endpoints$data,
>*/);
