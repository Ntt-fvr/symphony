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
export type EditResourceSpecificationRelationshipInput = {|
  id?: ?string,
  name: string,
  resourceSpecification?: ?string,
  resourceSpecificationList?: ?$ReadOnlyArray<?string>,
|};
export type EditResourceSpecificationRelationshipMutationVariables = {|
  input: $ReadOnlyArray<EditResourceSpecificationRelationshipInput>
|};
export type EditResourceSpecificationRelationshipMutationResponse = {|
  +editResourceSpecificationRelationship: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +resourceSpecification: {|
      +id: string,
      +name: string,
    |},
  |}>
|};
export type EditResourceSpecificationRelationshipMutation = {|
  variables: EditResourceSpecificationRelationshipMutationVariables,
  response: EditResourceSpecificationRelationshipMutationResponse,
|};
*/


/*
mutation EditResourceSpecificationRelationshipMutation(
  $input: [EditResourceSpecificationRelationshipInput!]!
) {
  editResourceSpecificationRelationship(input: $input) {
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
    "name": "editResourceSpecificationRelationship",
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
    "name": "EditResourceSpecificationRelationshipMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditResourceSpecificationRelationshipMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "df0a3f7e2e97164e8b89b862dbf7a193",
    "id": null,
    "metadata": {},
    "name": "EditResourceSpecificationRelationshipMutation",
    "operationKind": "mutation",
    "text": "mutation EditResourceSpecificationRelationshipMutation(\n  $input: [EditResourceSpecificationRelationshipInput!]!\n) {\n  editResourceSpecificationRelationship(input: $input) {\n    id\n    name\n    resourceSpecification {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3a98d51029a41c52d64c5a79521b5c54';

module.exports = node;
