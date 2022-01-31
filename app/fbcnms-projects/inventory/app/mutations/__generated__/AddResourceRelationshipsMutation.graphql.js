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
export type AddResourceRelationshipInput = {|
  name: string,
  resourceRelationshipTypeFk: string,
  resourceRelationshipMultiplicityFk: string,
  locationTypeFk?: ?string,
  resourceTypeFkA: string,
  resourceTypeFkB?: ?string,
|};
export type AddResourceRelationshipsMutationVariables = {|
  input: AddResourceRelationshipInput
|};
export type AddResourceRelationshipsMutationResponse = {|
  +addResourceRelationship: {|
    +id: string,
    +name: string,
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
    "cacheID": "0aa91bbf5e953847fd25ab19b58eca44",
    "id": null,
    "metadata": {},
    "name": "AddResourceRelationshipsMutation",
    "operationKind": "mutation",
    "text": "mutation AddResourceRelationshipsMutation(\n  $input: AddResourceRelationshipInput!\n) {\n  addResourceRelationship(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bb85a911d274fdb8e64e9b7bfeddf1c2';

module.exports = node;
