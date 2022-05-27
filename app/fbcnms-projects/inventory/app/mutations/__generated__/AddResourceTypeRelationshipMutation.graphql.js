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
export type ResourceRelationshipMultiplicityKind = "MANY_TO_MANY" | "MANY_TO_ONE" | "ONE_TO_MANY" | "ONE_TO_ONE" | "%future added value";
export type ResourceRelationshipTypeKind = "BELONGS_TO" | "CROSS_CONNECTION" | "LOCATED_IN" | "LOGICAL_LINK" | "PHYSICAL_LINK" | "%future added value";
export type AddResourceTypeRelationshipInput = {|
  locationType?: ?string,
  resourceRelationshipMultiplicity: ResourceRelationshipMultiplicityKind,
  resourceRelationshipType: ResourceRelationshipTypeKind,
  resourceTypeA: string,
  resourceTypeB?: ?string,
|};
export type AddResourceTypeRelationshipMutationVariables = {|
  input: AddResourceTypeRelationshipInput
|};
export type AddResourceTypeRelationshipMutationResponse = {|
  +addResourceTypeRelationship: {|
    +id: string
  |}
|};
export type AddResourceTypeRelationshipMutation = {|
  variables: AddResourceTypeRelationshipMutationVariables,
  response: AddResourceTypeRelationshipMutationResponse,
|};
*/


/*
mutation AddResourceTypeRelationshipMutation(
  $input: AddResourceTypeRelationshipInput!
) {
  addResourceTypeRelationship(input: $input) {
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ResourceTypeRelationship",
    "kind": "LinkedField",
    "name": "addResourceTypeRelationship",
    "plural": false,
    "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddResourceTypeRelationshipMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddResourceTypeRelationshipMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "39fd42acccd1571e2f68e5f99d4c5108",
    "id": null,
    "metadata": {},
    "name": "AddResourceTypeRelationshipMutation",
    "operationKind": "mutation",
    "text": "mutation AddResourceTypeRelationshipMutation(\n  $input: AddResourceTypeRelationshipInput!\n) {\n  addResourceTypeRelationship(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '04d241b4a1211bdcae30820cfa99f0eb';

module.exports = node;
