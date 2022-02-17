/**
 * @generated SignedSource<<93b93349ae138caab021464e089d9ea5>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditFormulaInput = {|
  id: string,
  textFormula: string,
  status: boolean,
  techFk: string,
  networkTypeFk: string,
  kpiFk: string,
|};
export type EditFormulaMutation$variables = {|
  input: EditFormulaInput,
|};
export type EditFormulaMutationVariables = EditFormulaMutation$variables;
export type EditFormulaMutation$data = {|
  +editFormula: {|
    +id: string,
    +textFormula: string,
  |},
|};
export type EditFormulaMutationResponse = EditFormulaMutation$data;
export type EditFormulaMutation = {|
  variables: EditFormulaMutationVariables,
  response: EditFormulaMutation$data,
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
    "name": "editFormula",
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
    "name": "EditFormulaMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditFormulaMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fc119245c035f99f98c77473c2b17f52",
    "id": null,
    "metadata": {},
    "name": "EditFormulaMutation",
    "operationKind": "mutation",
    "text": "mutation EditFormulaMutation(\n  $input: EditFormulaInput!\n) {\n  editFormula(input: $input) {\n    id\n    textFormula\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "f3cd9a9abb238ffdeb68bf5aef6a6457";

module.exports = ((node/*: any*/)/*: Mutation<
  EditFormulaMutation$variables,
  EditFormulaMutation$data,
>*/);
