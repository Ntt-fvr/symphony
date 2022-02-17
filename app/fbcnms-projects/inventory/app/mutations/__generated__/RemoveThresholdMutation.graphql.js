/**
 * @generated SignedSource<<abdbfdf87c8b45b3bf2e2a61a2dbe06a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveThresholdMutation$variables = {|
  id: string,
|};
export type RemoveThresholdMutationVariables = RemoveThresholdMutation$variables;
export type RemoveThresholdMutation$data = {|
  +removeThreshold: string,
|};
export type RemoveThresholdMutationResponse = RemoveThresholdMutation$data;
export type RemoveThresholdMutation = {|
  variables: RemoveThresholdMutationVariables,
  response: RemoveThresholdMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
    "name": "removeThreshold",
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
    "cacheID": "10f4a4b50ef0bdb46e2444dc6675f5a2",
    "id": null,
    "metadata": {},
    "name": "RemoveThresholdMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveThresholdMutation(\n  $id: ID!\n) {\n  removeThreshold(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "787d8391415d17458e8d80f404f57bab";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveThresholdMutation$variables,
  RemoveThresholdMutation$data,
>*/);
