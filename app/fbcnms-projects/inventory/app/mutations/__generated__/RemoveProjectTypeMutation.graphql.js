/**
 * @generated SignedSource<<3185c169c9a6cd317de3057a5d378e8c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveProjectTypeMutation$variables = {|
  id: string,
|};
export type RemoveProjectTypeMutationVariables = RemoveProjectTypeMutation$variables;
export type RemoveProjectTypeMutation$data = {|
  +deleteProjectType: boolean,
|};
export type RemoveProjectTypeMutationResponse = RemoveProjectTypeMutation$data;
export type RemoveProjectTypeMutation = {|
  variables: RemoveProjectTypeMutationVariables,
  response: RemoveProjectTypeMutation$data,
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
    "name": "deleteProjectType",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveProjectTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveProjectTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "07de65e94f933fc5d83aa32e8d83e6f2",
    "id": null,
    "metadata": {},
    "name": "RemoveProjectTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveProjectTypeMutation(\n  $id: ID!\n) {\n  deleteProjectType(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "9ef2120c80fef6893e62a26dce1feb23";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveProjectTypeMutation$variables,
  RemoveProjectTypeMutation$data,
>*/);
