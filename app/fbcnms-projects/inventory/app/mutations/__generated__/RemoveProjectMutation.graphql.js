/**
 * @generated SignedSource<<4f7e9804c72a06102b25ea74a8b31f31>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveProjectMutation$variables = {|
  id: string,
|};
export type RemoveProjectMutationVariables = RemoveProjectMutation$variables;
export type RemoveProjectMutation$data = {|
  +deleteProject: boolean,
|};
export type RemoveProjectMutationResponse = RemoveProjectMutation$data;
export type RemoveProjectMutation = {|
  variables: RemoveProjectMutationVariables,
  response: RemoveProjectMutation$data,
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
    "name": "deleteProject",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveProjectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveProjectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c843a2d8671a62e56fe15c9435d570b7",
    "id": null,
    "metadata": {},
    "name": "RemoveProjectMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveProjectMutation(\n  $id: ID!\n) {\n  deleteProject(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "7424ca24008e15a923f89b3fbc822395";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveProjectMutation$variables,
  RemoveProjectMutation$data,
>*/);
