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
export type RemoveActionsRuleMutationVariables = {|
  id: string
|};
export type RemoveActionsRuleMutationResponse = {|
  +removeActionsRule: boolean
|};
export type RemoveActionsRuleMutation = {|
  variables: RemoveActionsRuleMutationVariables,
  response: RemoveActionsRuleMutationResponse,
|};
*/


/*
mutation RemoveActionsRuleMutation(
  $id: ID!
) {
  removeActionsRule(id: $id)
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
    "name": "removeActionsRule",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveActionsRuleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveActionsRuleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f3b984aff91ec393438781e6c89f3490",
    "id": null,
    "metadata": {},
    "name": "RemoveActionsRuleMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveActionsRuleMutation(\n  $id: ID!\n) {\n  removeActionsRule(id: $id)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bf9c9df600267a517d02f476465e2a8f';

module.exports = node;
