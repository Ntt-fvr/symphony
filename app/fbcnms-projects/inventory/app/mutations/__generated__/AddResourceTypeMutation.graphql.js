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
    "cacheID": "79aec01d6150bc3540b8442d873e96e1",
    "id": null,
    "metadata": {},
    "name": "AddResourceTypeMutation",
    "operationKind": "mutation",
    "text": "mutation AddResourceTypeMutation(\n  $input: AddResourceTypeInput!\n) {\n  addResourceType(input: $input) {\n    id\n    name\n    resourceTypeBaseType\n    resourceTypeClass\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'add2bbed32e05504c2db1538cb8289fc';

module.exports = node;
