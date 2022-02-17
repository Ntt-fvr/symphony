/**
 * @generated SignedSource<<8bef58613f9885f5ea7d3bb1cd654ad9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddFormulaInput = {|
  textFormula: string,
  status: boolean,
  techFk: string,
  networkTypeFk: string,
  kpiFk: string,
|};
export type AddFormulaMutation$variables = {|
  input: AddFormulaInput,
|};
export type AddFormulaMutationVariables = AddFormulaMutation$variables;
export type AddFormulaMutation$data = {|
  +addFormula: {|
    +id: string,
    +textFormula: string,
  |},
|};
export type AddFormulaMutationResponse = AddFormulaMutation$data;
export type AddFormulaMutation = {|
  variables: AddFormulaMutationVariables,
  response: AddFormulaMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Formula",
    "kind": "LinkedField",
    "name": "addFormula",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "textFormula",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddFormulaMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddFormulaMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "91c1ab9c7908d3a6e77b7364e6b09b7c",
    "id": null,
    "metadata": {},
    "name": "AddFormulaMutation",
    "operationKind": "mutation",
    "text": "mutation AddFormulaMutation(\n  $input: AddFormulaInput!\n) {\n  addFormula(input: $input) {\n    id\n    textFormula\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "3deb7b724ce51f83a4a1d61861a1b5c4";

module.exports = ((node/*: any*/)/*: Mutation<
  AddFormulaMutation$variables,
  AddFormulaMutation$data,
>*/);
