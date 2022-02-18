/**
 * @generated SignedSource<<7316f226958123ee6c0b367e6ed41e09>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditCounterFormulaInput = {|
  id: string,
  mandatory: boolean,
  counterFk: string,
  formulaFk: string,
|};
export type EditCounterFormulaMutation$variables = {|
  input: EditCounterFormulaInput,
|};
export type EditCounterFormulaMutationVariables = EditCounterFormulaMutation$variables;
export type EditCounterFormulaMutation$data = {|
  +editCounterFormula: {|
    +id: string,
  |},
|};
export type EditCounterFormulaMutationResponse = EditCounterFormulaMutation$data;
export type EditCounterFormulaMutation = {|
  variables: EditCounterFormulaMutationVariables,
  response: EditCounterFormulaMutation$data,
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
    "concreteType": "CounterFormula",
    "kind": "LinkedField",
    "name": "editCounterFormula",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "EditCounterFormulaMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditCounterFormulaMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2a831f49ea1e5fd7b8a8a78a938d2aa0",
    "id": null,
    "metadata": {},
    "name": "EditCounterFormulaMutation",
    "operationKind": "mutation",
    "text": "mutation EditCounterFormulaMutation(\n  $input: EditCounterFormulaInput!\n) {\n  editCounterFormula(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "8ec0346c498b566e7941e870ce13b6fe";

module.exports = ((node/*: any*/)/*: Mutation<
  EditCounterFormulaMutation$variables,
  EditCounterFormulaMutation$data,
>*/);
