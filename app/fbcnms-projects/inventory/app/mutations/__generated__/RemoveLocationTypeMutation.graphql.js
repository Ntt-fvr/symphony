/**
 * @generated SignedSource<<40c1d746849a412d8eda12efe370ca59>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveLocationTypeMutation$variables = {|
  id: string,
|};
export type RemoveLocationTypeMutationVariables = RemoveLocationTypeMutation$variables;
export type RemoveLocationTypeMutation$data = {|
  +removeLocationType: string,
|};
export type RemoveLocationTypeMutationResponse = RemoveLocationTypeMutation$data;
export type RemoveLocationTypeMutation = {|
  variables: RemoveLocationTypeMutationVariables,
  response: RemoveLocationTypeMutation$data,
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
    "name": "removeLocationType",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveLocationTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveLocationTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a0cc305fa83ab3fa0e6a38e8ef8d6bf7",
    "id": null,
    "metadata": {},
    "name": "RemoveLocationTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveLocationTypeMutation(\n  $id: ID!\n) {\n  removeLocationType(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "9df4715e9aebae6d3f5b3e7975c33de5";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveLocationTypeMutation$variables,
  RemoveLocationTypeMutation$data,
>*/);
