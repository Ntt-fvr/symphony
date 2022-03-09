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
export type RemoveResourceRelationshipMutationVariables = {|
  id: string
|};
export type RemoveResourceRelationshipMutationResponse = {|
  +removeResourceRelationship: string
|};
export type RemoveResourceRelationshipMutation = {|
  variables: RemoveResourceRelationshipMutationVariables,
  response: RemoveResourceRelationshipMutationResponse,
|};
*/


/*
mutation RemoveResourceRelationshipMutation(
  $id: ID!
) {
  removeResourceRelationship(id: $id)
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
    "name": "removeResourceRelationship",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveResourceRelationshipMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveResourceRelationshipMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a2a5fad03fca13e3a752c8c1637a54d2",
    "id": null,
    "metadata": {},
    "name": "RemoveResourceRelationshipMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveResourceRelationshipMutation(\n  $id: ID!\n) {\n  removeResourceRelationship(id: $id)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fe9056aec6940d02cd186a2997358e0d';

module.exports = node;
