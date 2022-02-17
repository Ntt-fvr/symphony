/**
 * @generated SignedSource<<2a75c45cf7597fbd9cacc4c10b79e42a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveWorkOrderMutation$variables = {|
  id: string,
|};
export type RemoveWorkOrderMutationVariables = RemoveWorkOrderMutation$variables;
export type RemoveWorkOrderMutation$data = {|
  +removeWorkOrder: string,
|};
export type RemoveWorkOrderMutationResponse = RemoveWorkOrderMutation$data;
export type RemoveWorkOrderMutation = {|
  variables: RemoveWorkOrderMutationVariables,
  response: RemoveWorkOrderMutation$data,
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
    "name": "removeWorkOrder",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveWorkOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveWorkOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9275f281fe4faed77067df0bc4400140",
    "id": null,
    "metadata": {},
    "name": "RemoveWorkOrderMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveWorkOrderMutation(\n  $id: ID!\n) {\n  removeWorkOrder(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "48a499f7eec8a47bc7b909821951fe45";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveWorkOrderMutation$variables,
  RemoveWorkOrderMutation$data,
>*/);
