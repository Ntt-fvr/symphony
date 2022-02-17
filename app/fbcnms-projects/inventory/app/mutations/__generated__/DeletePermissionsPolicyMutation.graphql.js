/**
 * @generated SignedSource<<aac68e2c2febfe3d5d77dd079cad38da>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeletePermissionsPolicyMutation$variables = {|
  id: string,
|};
export type DeletePermissionsPolicyMutationVariables = DeletePermissionsPolicyMutation$variables;
export type DeletePermissionsPolicyMutation$data = {|
  +deletePermissionsPolicy: boolean,
|};
export type DeletePermissionsPolicyMutationResponse = DeletePermissionsPolicyMutation$data;
export type DeletePermissionsPolicyMutation = {|
  variables: DeletePermissionsPolicyMutationVariables,
  response: DeletePermissionsPolicyMutation$data,
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
    "name": "deletePermissionsPolicy",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeletePermissionsPolicyMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeletePermissionsPolicyMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "86d74c4ec8af552134ed5cdedcdaf8f1",
    "id": null,
    "metadata": {},
    "name": "DeletePermissionsPolicyMutation",
    "operationKind": "mutation",
    "text": "mutation DeletePermissionsPolicyMutation(\n  $id: ID!\n) {\n  deletePermissionsPolicy(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "14f797ed5eccde6161e1583e51596f09";

module.exports = ((node/*: any*/)/*: Mutation<
  DeletePermissionsPolicyMutation$variables,
  DeletePermissionsPolicyMutation$data,
>*/);
