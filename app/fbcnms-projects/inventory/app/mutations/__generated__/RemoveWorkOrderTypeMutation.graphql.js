/**
 * @generated SignedSource<<7e8739527884f66fe9c5d0fbf6f423f3>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveWorkOrderTypeMutation$variables = {|
  id: string,
|};
export type RemoveWorkOrderTypeMutationVariables = RemoveWorkOrderTypeMutation$variables;
export type RemoveWorkOrderTypeMutation$data = {|
  +removeWorkOrderType: string,
|};
export type RemoveWorkOrderTypeMutationResponse = RemoveWorkOrderTypeMutation$data;
export type RemoveWorkOrderTypeMutation = {|
  variables: RemoveWorkOrderTypeMutationVariables,
  response: RemoveWorkOrderTypeMutation$data,
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
    "name": "removeWorkOrderType",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveWorkOrderTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveWorkOrderTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "75877a405e4cebc521c390abe927349d",
    "id": null,
    "metadata": {},
    "name": "RemoveWorkOrderTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveWorkOrderTypeMutation(\n  $id: ID!\n) {\n  removeWorkOrderType(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "6fec7c186557570f206537c12c607614";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveWorkOrderTypeMutation$variables,
  RemoveWorkOrderTypeMutation$data,
>*/);
