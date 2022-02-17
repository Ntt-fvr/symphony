/**
 * @generated SignedSource<<bd957bc841c8b3b02ef0a5dafcb2fb3b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$fragmentType: FragmentType;
export type ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$ref = ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$fragmentType;
export type ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +role: ?string,
  +index: number,
  +equipmentType: {|
    +id: string,
    +name: string,
  |},
  +$fragmentType: ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$fragmentType,
|}>;
export type ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions = ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$data;
export type ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$key = $ReadOnlyArray<{
  +$data?: ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$data,
  +$fragmentSpreads: ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$fragmentType,
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
  "name": "ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions",
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
      "kind": "ScalarField",
      "name": "index",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentType",
      "kind": "LinkedField",
      "name": "equipmentType",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ServiceEndpointDefinition",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "355047f79b4b79d16aa746b866d228ae";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$fragmentType,
  ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$data,
>*/);
