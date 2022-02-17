/**
 * @generated SignedSource<<2542e3feff919af853af4d4f984649fc>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteOrganizationMutation$variables = {|
  id: string,
|};
export type DeleteOrganizationMutationVariables = DeleteOrganizationMutation$variables;
export type DeleteOrganizationMutation$data = {|
  +removeOrganization: string,
|};
export type DeleteOrganizationMutationResponse = DeleteOrganizationMutation$data;
export type DeleteOrganizationMutation = {|
  variables: DeleteOrganizationMutationVariables,
  response: DeleteOrganizationMutation$data,
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
    "name": "removeOrganization",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteOrganizationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteOrganizationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9e9664f5e37225de0fd57df08aba9277",
    "id": null,
    "metadata": {},
    "name": "DeleteOrganizationMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteOrganizationMutation(\n  $id: ID!\n) {\n  removeOrganization(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "e4c1b4e26bfce47ab0f6c42f8df402e0";

module.exports = ((node/*: any*/)/*: Mutation<
  DeleteOrganizationMutation$variables,
  DeleteOrganizationMutation$data,
>*/);
