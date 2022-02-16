/**
 * @generated SignedSource<<b25e9d60bd179839e3ac666fb02fe48b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveKqiTargetMutation$variables = {|
  id: string,
|};
export type RemoveKqiTargetMutationVariables = RemoveKqiTargetMutation$variables;
export type RemoveKqiTargetMutation$data = {|
  +removeKqiTarget: string,
|};
export type RemoveKqiTargetMutationResponse = RemoveKqiTargetMutation$data;
export type RemoveKqiTargetMutation = {|
  variables: RemoveKqiTargetMutationVariables,
  response: RemoveKqiTargetMutation$data,
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
    "name": "removeKqiTarget",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveKqiTargetMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveKqiTargetMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e04565b1a452a564a266b85834ca24fd",
    "id": null,
    "metadata": {},
    "name": "RemoveKqiTargetMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveKqiTargetMutation(\n  $id: ID!\n) {\n  removeKqiTarget(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "66f9f44d196df97a44c34d93ff833cd1";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveKqiTargetMutation$variables,
  RemoveKqiTargetMutation$data,
>*/);
