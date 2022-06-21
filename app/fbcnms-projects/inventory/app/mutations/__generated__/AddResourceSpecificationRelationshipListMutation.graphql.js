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
export type AddResourceSpecificationRelationshipInput = {|
  name: string,
  resourceSpecification: string,
  resourceSpecificationList?: ?$ReadOnlyArray<?string>,
|};
export type AddResourceSpecificationRelationshipListMutationVariables = {|
  input: $ReadOnlyArray<AddResourceSpecificationRelationshipInput>
|};
export type AddResourceSpecificationRelationshipListMutationResponse = {|
  +addResourceSpecificationRelationshipList: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +resourceSpecification: {|
      +id: string,
      +name: string,
    |},
  |}>
|};
export type AddResourceSpecificationRelationshipListMutation = {|
  variables: AddResourceSpecificationRelationshipListMutationVariables,
  response: AddResourceSpecificationRelationshipListMutationResponse,
|};
*/


/*
mutation AddResourceSpecificationRelationshipListMutation(
  $input: [AddResourceSpecificationRelationshipInput!]!
) {
  addResourceSpecificationRelationshipList(input: $input) {
    id
    name
    resourceSpecification {
      id
      name
    }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ResourceSpecificationRelationship",
    "kind": "LinkedField",
    "name": "addResourceSpecificationRelationshipList",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceSpecification",
        "kind": "LinkedField",
        "name": "resourceSpecification",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
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
    "name": "AddResourceSpecificationRelationshipListMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddResourceSpecificationRelationshipListMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "d54c9e0d8f2c37352461f12f89ec0d56",
    "id": null,
    "metadata": {},
    "name": "AddResourceSpecificationRelationshipListMutation",
    "operationKind": "mutation",
    "text": "mutation AddResourceSpecificationRelationshipListMutation(\n  $input: [AddResourceSpecificationRelationshipInput!]!\n) {\n  addResourceSpecificationRelationshipList(input: $input) {\n    id\n    name\n    resourceSpecification {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3663f5e649791865800caa25116515ff';

module.exports = node;
