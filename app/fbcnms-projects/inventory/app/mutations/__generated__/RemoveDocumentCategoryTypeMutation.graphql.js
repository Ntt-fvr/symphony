/**
 * @generated SignedSource<<fbe69072f43f57b6430589d4137485f0>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveDocumentCategoryTypeMutation$variables = {|
  id: string,
|};
export type RemoveDocumentCategoryTypeMutationVariables = RemoveDocumentCategoryTypeMutation$variables;
export type RemoveDocumentCategoryTypeMutation$data = {|
  +removeDocumentCategory: string,
|};
export type RemoveDocumentCategoryTypeMutationResponse = RemoveDocumentCategoryTypeMutation$data;
export type RemoveDocumentCategoryTypeMutation = {|
  variables: RemoveDocumentCategoryTypeMutationVariables,
  response: RemoveDocumentCategoryTypeMutation$data,
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
    "name": "removeDocumentCategory",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveDocumentCategoryTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveDocumentCategoryTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "316e1c5689a597d70304bd1b654023ae",
    "id": null,
    "metadata": {},
    "name": "RemoveDocumentCategoryTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveDocumentCategoryTypeMutation(\n  $id: ID!\n) {\n  removeDocumentCategory(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "d75e236eab9202630c47d269fb69a9b5";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveDocumentCategoryTypeMutation$variables,
  RemoveDocumentCategoryTypeMutation$data,
>*/);
