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
export type RemoveTresholdMutationVariables = {|
  id: string
|};
export type RemoveTresholdMutationResponse = {|
  +removeTreshold: string
|};
export type RemoveTresholdMutation = {|
  variables: RemoveTresholdMutationVariables,
  response: RemoveTresholdMutationResponse,
|};
*/


/*
mutation RemoveTresholdMutation(
  $id: ID!
) {
  removeTreshold(id: $id)
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
    "name": "removeTreshold",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveTresholdMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveTresholdMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "34a3e530f4c890008e74ffb9fd7e6911",
    "id": null,
    "metadata": {},
    "name": "RemoveTresholdMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveTresholdMutation(\n  $id: ID!\n) {\n  removeTreshold(id: $id)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '37ae0a079b013f564fa89222b55cc6a8';

module.exports = node;
