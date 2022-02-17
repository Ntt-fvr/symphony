/**
 * @generated SignedSource<<1590297f91c9eb70b47a3289c6734d7c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteUsersGroupMutation$variables = {|
  id: string,
|};
export type DeleteUsersGroupMutationVariables = DeleteUsersGroupMutation$variables;
export type DeleteUsersGroupMutation$data = {|
  +deleteUsersGroup: boolean,
|};
export type DeleteUsersGroupMutationResponse = DeleteUsersGroupMutation$data;
export type DeleteUsersGroupMutation = {|
  variables: DeleteUsersGroupMutationVariables,
  response: DeleteUsersGroupMutation$data,
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
    "name": "deleteUsersGroup",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteUsersGroupMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteUsersGroupMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e1bcc1775bd82a9733b673febe0b2e23",
    "id": null,
    "metadata": {},
    "name": "DeleteUsersGroupMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteUsersGroupMutation(\n  $id: ID!\n) {\n  deleteUsersGroup(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "c5029d4e245f8583c35fafee471a4157";

module.exports = ((node/*: any*/)/*: Mutation<
  DeleteUsersGroupMutation$variables,
  DeleteUsersGroupMutation$data,
>*/);
