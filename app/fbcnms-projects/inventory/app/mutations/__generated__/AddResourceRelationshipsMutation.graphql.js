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
export type AddResourceRelationshipInput = {|
  resourceRelationshipType: ResourceRelationshipTypeKind,
  resourceRelationshipMultiplicity: ResourceRelationshipMultiplicityKind,
  locationType?: ?string,
  resourceTypeA: string,
  resourceTypeB?: ?string,
|};
export type AddResourceRelationshipsMutationVariables = {|
  input: AddResourceRelationshipInput
|};
export type AddResourceRelationshipsMutationResponse = {|
  +addResourceRelationship: {|
    +id: string
  |}
|};
export type AddResourceRelationshipsMutation = {|
  variables: AddResourceRelationshipsMutationVariables,
  response: AddResourceRelationshipsMutationResponse,
|};
*/


/*
mutation AddResourceRelationshipsMutation(
  $input: AddResourceRelationshipInput!
) {
  addResourceRelationship(input: $input) {
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
    "concreteType": "ResourceRelationship",
    "kind": "LinkedField",
    "name": "addResourceRelationship",
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
    "name": "AddResourceRelationshipsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddResourceRelationshipsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "febfafe7d6922d62fc05ad337067fc22",
    "id": null,
    "metadata": {},
    "name": "AddResourceRelationshipsMutation",
    "operationKind": "mutation",
    "text": "mutation AddResourceRelationshipsMutation(\n  $input: AddResourceRelationshipInput!\n) {\n  addResourceRelationship(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '56f88c9d08cbb5e5c8711f732f805d4e';

module.exports = node;
