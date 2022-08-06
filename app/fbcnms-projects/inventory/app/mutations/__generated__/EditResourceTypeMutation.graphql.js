/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ResourceTypeBaseTypeKind = "LOGICAL_RESOURCE" | "PHYSICAL_RESOURCE" | "VIRTUAL_RESOURCE" | "%future added value";
export type ResourceTypeClassKind = "CARD" | "EQUIPMENT" | "NETWORK_FUNCTION" | "PORT" | "RACK" | "SLOT" | "VLAN" | "%future added value";
export type EditResourceTypeInput = {|
  id: string,
  name: string,
  resourceTypeBaseType: ResourceTypeBaseTypeKind,
  resourceTypeClass: ResourceTypeClassKind,
|};
export type EditResourceTypeMutationVariables = {|
  input: EditResourceTypeInput
|};
export type EditResourceTypeMutationResponse = {|
  +editResourceType: {|
    +id: string,
    +name: string,
    +resourceTypeBaseType: ResourceTypeBaseTypeKind,
    +resourceTypeClass: ResourceTypeClassKind,
  |}
|};
export type EditResourceTypeMutation = {|
  variables: EditResourceTypeMutationVariables,
  response: EditResourceTypeMutationResponse,
|};
*/


/*
mutation EditResourceTypeMutation(
  $input: EditResourceTypeInput!
) {
  editResourceType(input: $input) {
    id
    name
    resourceTypeBaseType
    resourceTypeClass
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ResourceType",
    "kind": "LinkedField",
    "name": "editResourceType",
    "plural": false,
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
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "resourceTypeBaseType",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "resourceTypeClass",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditResourceTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditResourceTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "905b95d92ae09a33e7cac81dff8b8059",
    "id": null,
    "metadata": {},
    "name": "EditResourceTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditResourceTypeMutation(\n  $input: EditResourceTypeInput!\n) {\n  editResourceType(input: $input) {\n    id\n    name\n    resourceTypeBaseType\n    resourceTypeClass\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '00cdd5eaa142491dcfe856a3caf1ed6f';

module.exports = node;
