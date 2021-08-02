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
export type RemoveThresholdMutationVariables = {|
  id: string
|};
export type RemoveThresholdMutationResponse = {|
  +removeTreshold: string
|};
export type RemoveThresholdMutation = {|
  variables: RemoveThresholdMutationVariables,
  response: RemoveThresholdMutationResponse,
|};
*/


/*
mutation RemoveThresholdMutation(
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
    "name": "RemoveThresholdMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveThresholdMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c0dbd4f68a121f61bc54eafb68ccab16",
    "id": null,
    "metadata": {},
    "name": "RemoveThresholdMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveThresholdMutation(\n  $id: ID!\n) {\n  removeTreshold(id: $id)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bc921d03b1a31602b5251edcd665668f';

module.exports = node;
