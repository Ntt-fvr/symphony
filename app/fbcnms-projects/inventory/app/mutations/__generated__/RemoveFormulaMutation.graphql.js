/**
 * @generated SignedSource<<075c1553b157da7475faf961be8f7024>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveFormulaMutation$variables = {|
  id: string,
|};
export type RemoveFormulaMutationVariables = RemoveFormulaMutation$variables;
export type RemoveFormulaMutation$data = {|
  +removeFormula: string,
|};
export type RemoveFormulaMutationResponse = RemoveFormulaMutation$data;
export type RemoveFormulaMutation = {|
  variables: RemoveFormulaMutationVariables,
  response: RemoveFormulaMutation$data,
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
    "name": "removeFormula",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveFormulaMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveFormulaMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c2625b9684a9f1bd12cbf6ce5908084f",
    "id": null,
    "metadata": {},
    "name": "RemoveFormulaMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveFormulaMutation(\n  $id: ID!\n) {\n  removeFormula(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "0024f272906cac77325e078110daad7b";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveFormulaMutation$variables,
  RemoveFormulaMutation$data,
>*/);
