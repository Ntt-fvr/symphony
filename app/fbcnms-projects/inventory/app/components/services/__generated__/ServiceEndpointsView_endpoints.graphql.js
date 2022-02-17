/**
 * @generated SignedSource<<b3c7d0abcb5c5714d0fa8a06daf0318f>>
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
declare export opaque type ServiceEndpointsView_endpoints$fragmentType: FragmentType;
export type ServiceEndpointsView_endpoints$ref = ServiceEndpointsView_endpoints$fragmentType;
export type ServiceEndpointsView_endpoints$data = $ReadOnlyArray<{|
  +id: string,
  +port: ?{|
    +parentEquipment: {|
      +name: string,
      +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
    |},
    +definition: {|
      +id: string,
      +name: string,
    |},
  |},
  +equipment: {|
    +name: string,
    +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
  |},
  +definition: {|
    +name: string,
    +role: ?string,
  |},
  +$fragmentType: ServiceEndpointsView_endpoints$fragmentType,
|}>;
export type ServiceEndpointsView_endpoints = ServiceEndpointsView_endpoints$data;
export type ServiceEndpointsView_endpoints$key = $ReadOnlyArray<{
  +$data?: ServiceEndpointsView_endpoints$data,
  +$fragmentSpreads: ServiceEndpointsView_endpoints$fragmentType,
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
},
v2 = [
  (v1/*: any*/),
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "EquipmentBreadcrumbs_equipment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ServiceEndpointsView_endpoints",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPort",
      "kind": "LinkedField",
      "name": "port",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Equipment",
          "kind": "LinkedField",
          "name": "parentEquipment",
          "plural": false,
          "selections": (v2/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Equipment",
      "kind": "LinkedField",
      "name": "equipment",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ServiceEndpointDefinition",
      "kind": "LinkedField",
      "name": "definition",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "role",
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

(node/*: any*/).hash = "c9bdfa0f5793f7884b71103e23e3c420";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceEndpointsView_endpoints$fragmentType,
  ServiceEndpointsView_endpoints$data,
>*/);
