/**
 * @generated SignedSource<<f053d088e14d17fed9cf7742497dade7>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceEndpointDefinitionTable_serviceEndpointDefinitions$fragmentType: FragmentType;
export type ServiceEndpointDefinitionTable_serviceEndpointDefinitions$ref = ServiceEndpointDefinitionTable_serviceEndpointDefinitions$fragmentType;
export type ServiceEndpointDefinitionTable_serviceEndpointDefinitions$data = $ReadOnlyArray<{|
  +id: string,
  +index: number,
  +role: ?string,
  +name: string,
  +equipmentType: {|
    +name: string,
    +id: string,
  |},
  +$fragmentType: ServiceEndpointDefinitionTable_serviceEndpointDefinitions$fragmentType,
|}>;
export type ServiceEndpointDefinitionTable_serviceEndpointDefinitions = ServiceEndpointDefinitionTable_serviceEndpointDefinitions$data;
export type ServiceEndpointDefinitionTable_serviceEndpointDefinitions$key = $ReadOnlyArray<{
  +$data?: ServiceEndpointDefinitionTable_serviceEndpointDefinitions$data,
  +$fragmentSpreads: ServiceEndpointDefinitionTable_serviceEndpointDefinitions$fragmentType,
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
  "name": "ServiceEndpointDefinitionTable_serviceEndpointDefinitions",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "index",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "role",
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentType",
      "kind": "LinkedField",
      "name": "equipmentType",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ServiceEndpointDefinition",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "5e4e6ca6fca81e3fafa893676cb515fa";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceEndpointDefinitionTable_serviceEndpointDefinitions$fragmentType,
  ServiceEndpointDefinitionTable_serviceEndpointDefinitions$data,
>*/);
