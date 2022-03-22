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
export type ResourceTypeClassKind = "CARD" | "EQUIPMENT" | "PORT" | "RACK" | "SLOT" | "%future added value";
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
    +name: string,
    +resourceTypeBaseType: ResourceTypeBaseTypeKind,
    +resourceTypeClass: ResourceTypeClassKind,
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
    name
    resourceTypeBaseType
    resourceTypeClass
    id
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceTypeBaseType",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceTypeClass",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddResourceTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ResourceType",
        "kind": "LinkedField",
        "name": "addResourceType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddResourceTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ResourceType",
        "kind": "LinkedField",
        "name": "addResourceType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b959f5b6f0e7b86c33f393828137f381",
    "id": null,
    "metadata": {},
    "name": "AddResourceTypeMutation",
    "operationKind": "mutation",
    "text": "mutation AddResourceTypeMutation(\n  $input: AddResourceTypeInput!\n) {\n  addResourceType(input: $input) {\n    name\n    resourceTypeBaseType\n    resourceTypeClass\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bbdceeaaa46bd7703507eca340bb7194';

module.exports = node;
