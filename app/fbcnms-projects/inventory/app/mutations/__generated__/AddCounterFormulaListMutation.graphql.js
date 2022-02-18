/**
 * @generated SignedSource<<dd4566dea980ab1b20fe2675a2fee488>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddCounterFormulaListInput = {|
  formulaFk: string,
  counterList: $ReadOnlyArray<?CounterListInput>,
|};
export type CounterListInput = {|
  counterFk: string,
  mandatory: boolean,
|};
export type AddCounterFormulaListMutation$variables = {|
  input: AddCounterFormulaListInput,
|};
export type AddCounterFormulaListMutationVariables = AddCounterFormulaListMutation$variables;
export type AddCounterFormulaListMutation$data = {|
  +addCounterFormulaList: $ReadOnlyArray<{|
    +id: string,
    +mandatory: boolean,
    +counterFk: {|
      +id: string,
      +name: string,
    |},
    +formulaFk: {|
      +id: string,
    |},
  |}>,
|};
export type AddCounterFormulaListMutationResponse = AddCounterFormulaListMutation$data;
export type AddCounterFormulaListMutation = {|
  variables: AddCounterFormulaListMutationVariables,
  response: AddCounterFormulaListMutation$data,
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
    "name": "addCounterFormulaList",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mandatory",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Counter",
        "kind": "LinkedField",
        "name": "counterFk",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Formula",
        "kind": "LinkedField",
        "name": "formulaFk",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
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
    "name": "AddCounterFormulaListMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddCounterFormulaListMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d09203168e6cacdf7cb4cb680afebe6e",
    "id": null,
    "metadata": {},
    "name": "AddCounterFormulaListMutation",
    "operationKind": "mutation",
    "text": "mutation AddCounterFormulaListMutation(\n  $input: AddCounterFormulaListInput!\n) {\n  addCounterFormulaList(input: $input) {\n    id\n    mandatory\n    counterFk {\n      id\n      name\n    }\n    formulaFk {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "fa5ec9f286e32afda939beb7b5c788b5";

module.exports = ((node/*: any*/)/*: Mutation<
  AddCounterFormulaListMutation$variables,
  AddCounterFormulaListMutation$data,
>*/);
