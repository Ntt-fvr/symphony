/**
 * @generated SignedSource<<5338841f1cd454f6ba18c5807cc98c84>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ServiceEndpointsView_endpoints$fragmentType = any;
type ServiceLinksAndPortsView_links$fragmentType = any;
type ServiceLinksAndPortsView_ports$fragmentType = any;
export type DiscoveryMethod = "MANUAL" | "INVENTORY" | "%future added value";
export type ServiceStatus = "PENDING" | "IN_SERVICE" | "MAINTENANCE" | "DISCONNECTED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ServicePanel_service$fragmentType: FragmentType;
export type ServicePanel_service$ref = ServicePanel_service$fragmentType;
export type ServicePanel_service$data = {|
  +id: string,
  +name: string,
  +externalId: ?string,
  +status: ServiceStatus,
  +customer: ?{|
    +name: string,
  |},
  +serviceType: {|
    +name: string,
    +discoveryMethod: DiscoveryMethod,
    +endpointDefinitions: $ReadOnlyArray<{|
      +id: string,
      +name: string,
      +role: ?string,
      +equipmentType: {|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
  +links: $ReadOnlyArray<?{|
    +id: string,
    +$fragmentSpreads: ServiceLinksAndPortsView_links$fragmentType,
  |}>,
  +ports: $ReadOnlyArray<?{|
    +id: string,
    +$fragmentSpreads: ServiceLinksAndPortsView_ports$fragmentType,
  |}>,
  +endpoints: $ReadOnlyArray<?{|
    +id: string,
    +definition: {|
      +id: string,
      +name: string,
    |},
    +$fragmentSpreads: ServiceEndpointsView_endpoints$fragmentType,
  |}>,
  +$fragmentType: ServicePanel_service$fragmentType,
|};
export type ServicePanel_service = ServicePanel_service$data;
export type ServicePanel_service$key = {
  +$data?: ServicePanel_service$data,
  +$fragmentSpreads: ServicePanel_service$fragmentType,
  ...
};
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
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServicePanel_service",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "externalId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Customer",
      "kind": "LinkedField",
      "name": "customer",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ServiceType",
      "kind": "LinkedField",
      "name": "serviceType",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "discoveryMethod",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ServiceEndpointDefinition",
          "kind": "LinkedField",
          "name": "endpointDefinitions",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "role",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "EquipmentType",
              "kind": "LinkedField",
              "name": "equipmentType",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Link",
      "kind": "LinkedField",
      "name": "links",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ServiceLinksAndPortsView_links"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPort",
      "kind": "LinkedField",
      "name": "ports",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ServiceLinksAndPortsView_ports"
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ServiceEndpointDefinition",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ServiceEndpointsView_endpoints"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Service",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "462ddda2544779eb7db1b972279683c5";

module.exports = ((node/*: any*/)/*: Fragment<
  ServicePanel_service$fragmentType,
  ServicePanel_service$data,
>*/);
