/**
 * @generated SignedSource<<6916b64031329034e18db5428dd299fb>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveWorkerTypeMutation$variables = {|
  id: string,
|};
export type RemoveWorkerTypeMutationVariables = RemoveWorkerTypeMutation$variables;
export type RemoveWorkerTypeMutation$data = {|
  +removeWorkerType: string,
|};
export type RemoveWorkerTypeMutationResponse = RemoveWorkerTypeMutation$data;
export type RemoveWorkerTypeMutation = {|
  variables: RemoveWorkerTypeMutationVariables,
  response: RemoveWorkerTypeMutation$data,
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
    "name": "removeWorkerType",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveWorkerTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveWorkerTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "76ade44fec152ef87a9182d9d9471b65",
    "id": null,
    "metadata": {},
    "name": "RemoveWorkerTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveWorkerTypeMutation(\n  $id: ID!\n) {\n  removeWorkerType(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "aec91383edb554d49a755214d5f78e19";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveWorkerTypeMutation$variables,
  RemoveWorkerTypeMutation$data,
>*/);
