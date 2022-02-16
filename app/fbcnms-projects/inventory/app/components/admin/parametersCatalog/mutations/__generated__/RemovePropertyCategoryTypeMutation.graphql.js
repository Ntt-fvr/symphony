/**
 * @generated SignedSource<<9f4f5394711b6fe10fcd4ec025fb723d>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemovePropertyCategoryTypeMutation$variables = {|
  id: string,
|};
export type RemovePropertyCategoryTypeMutationVariables = RemovePropertyCategoryTypeMutation$variables;
export type RemovePropertyCategoryTypeMutation$data = {|
  +removePropertyCategory: string,
|};
export type RemovePropertyCategoryTypeMutationResponse = RemovePropertyCategoryTypeMutation$data;
export type RemovePropertyCategoryTypeMutation = {|
  variables: RemovePropertyCategoryTypeMutationVariables,
  response: RemovePropertyCategoryTypeMutation$data,
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
    "name": "removePropertyCategory",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemovePropertyCategoryTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemovePropertyCategoryTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fe06879ed1d000a4217908062b414c72",
    "id": null,
    "metadata": {},
    "name": "RemovePropertyCategoryTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemovePropertyCategoryTypeMutation(\n  $id: ID!\n) {\n  removePropertyCategory(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "ec4aeac576c00627f01cf128ea07cc26";

module.exports = ((node/*: any*/)/*: Mutation<
  RemovePropertyCategoryTypeMutation$variables,
  RemovePropertyCategoryTypeMutation$data,
>*/);
