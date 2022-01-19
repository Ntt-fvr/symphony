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
export type EditResourceTypeInput = {|
  id: string,
  name: string,
  resourceTypeBaseTypeFk?: ?string,
  resourceTypeClassFk?: ?string,
|};
export type EditResourceTypeMutationVariables = {|
  input: EditResourceTypeInput
|};
export type EditResourceTypeMutationResponse = {|
  +editResourceType: {|
    +id: string,
    +name: string,
    +resourceTypeBaseTypeFk: ?{|
      +id: string,
      +name: string,
    |},
    +resourceTypeClassFk: ?{|
      +id: string,
      +name: string,
    |},
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
    resourceTypeBaseTypeFk {
      id
      name
    }
    resourceTypeClassFk {
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
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
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
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeBaseType",
        "kind": "LinkedField",
        "name": "resourceTypeBaseTypeFk",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeClass",
        "kind": "LinkedField",
        "name": "resourceTypeClassFk",
        "plural": false,
        "selections": (v3/*: any*/),
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
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditResourceTypeMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "a904fe4665bf2f76d121498734e023a9",
    "id": null,
    "metadata": {},
    "name": "EditResourceTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditResourceTypeMutation(\n  $input: EditResourceTypeInput!\n) {\n  editResourceType(input: $input) {\n    id\n    name\n    resourceTypeBaseTypeFk {\n      id\n      name\n    }\n    resourceTypeClassFk {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cdaff5c8e301aa6aa4eb4f158b15c49e';

module.exports = node;
