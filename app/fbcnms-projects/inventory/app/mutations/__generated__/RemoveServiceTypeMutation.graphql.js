/**
 * @generated SignedSource<<4dc83ea26134ef14e6f55b904fa8203d>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveServiceTypeMutation$variables = {|
  id: string,
|};
export type RemoveServiceTypeMutationVariables = RemoveServiceTypeMutation$variables;
export type RemoveServiceTypeMutation$data = {|
  +removeServiceType: string,
|};
export type RemoveServiceTypeMutationResponse = RemoveServiceTypeMutation$data;
export type RemoveServiceTypeMutation = {|
  variables: RemoveServiceTypeMutationVariables,
  response: RemoveServiceTypeMutation$data,
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
    "name": "removeServiceType",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveServiceTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveServiceTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "715f3d875852571a9c025a7059e8aedb",
    "id": null,
    "metadata": {},
    "name": "RemoveServiceTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveServiceTypeMutation(\n  $id: ID!\n) {\n  removeServiceType(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "499330f58e6161c5f94f25863abdd098";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveServiceTypeMutation$variables,
  RemoveServiceTypeMutation$data,
>*/);
