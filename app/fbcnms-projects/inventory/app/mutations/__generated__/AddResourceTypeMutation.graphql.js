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
export type ResourceTypeBaseTypeKind = "CARD" | "EQUIPMENT" | "PORT" | "RACK" | "SLOT" | "%future added value";
export type ResourceTypeClassKind = "LOGICAL_RESOURCE" | "PHYSICAL_RESOURCE" | "VIRTUAL_RESOURCE" | "%future added value";
export type AddResourceTypeInput = {|
  name: string,
  resourceTypeBaseType: ResourceTypeBaseTypeKind,
  resourceTypeClass: ResourceTypeClassKind,
|};
export type AddResourceTypeMutationVariables = {|
  input: AddResourceTypeInput
|};
export type AddResourceTypeMutationResponse = {|
  +addResourceType: {|
    +id: string,
    +name: string,
  |}
|};
export type AddResourceTypeMutation = {|
  variables: AddResourceTypeMutationVariables,
  response: AddResourceTypeMutationResponse,
|};
*/


/*
mutation AddResourceTypeMutation(
  $input: AddResourceTypeInput!
) {
  addResourceType(input: $input) {
    id
    name
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
    "name": "addResourceType",
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
    "name": "AddResourceTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddResourceTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b2f9e870a6f5d99b2b9a1ee36231b81",
    "id": null,
    "metadata": {},
    "name": "AddResourceTypeMutation",
    "operationKind": "mutation",
    "text": "mutation AddResourceTypeMutation(\n  $input: AddResourceTypeInput!\n) {\n  addResourceType(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8ae145a1ef224be2a3be261a26b7f878';

module.exports = node;
