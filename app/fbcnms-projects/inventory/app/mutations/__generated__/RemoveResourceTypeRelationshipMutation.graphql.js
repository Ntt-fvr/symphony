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
export type RemoveResourceTypeRelationshipMutationVariables = {|
  id: string
|};
export type RemoveResourceTypeRelationshipMutationResponse = {|
  +removeResourceTypeRelationship: string
|};
export type RemoveResourceTypeRelationshipMutation = {|
  variables: RemoveResourceTypeRelationshipMutationVariables,
  response: RemoveResourceTypeRelationshipMutationResponse,
|};
*/


/*
mutation RemoveResourceTypeRelationshipMutation(
  $id: ID!
) {
  removeResourceTypeRelationship(id: $id)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "removeResourceTypeRelationship",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveResourceTypeRelationshipMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveResourceTypeRelationshipMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8490e3c0bbfcc4579b4b48a00e87e5a8",
    "id": null,
    "metadata": {},
    "name": "RemoveResourceTypeRelationshipMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveResourceTypeRelationshipMutation(\n  $id: ID!\n) {\n  removeResourceTypeRelationship(id: $id)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '076c206f6fba81fb56f89b0de7b3272c';

module.exports = node;
