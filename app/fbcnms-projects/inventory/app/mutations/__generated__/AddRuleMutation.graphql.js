/**
 * @generated SignedSource<<45a2a900640c67a9de1b809722c98c17>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddRuleInput = {|
  name: string,
  gracePeriod: number,
  startDateTime?: ?any,
  endDateTime?: ?any,
  ruleType: string,
  eventTypeName?: ?string,
  specificProblem?: ?string,
  additionalInfo?: ?string,
  status: boolean,
  eventSeverity: string,
  threshold: string,
|};
export type AddRuleMutation$variables = {|
  input: AddRuleInput,
|};
export type AddRuleMutationVariables = AddRuleMutation$variables;
export type AddRuleMutation$data = {|
  +addRule: {|
    +id: string,
    +name: string,
  |},
|};
export type AddRuleMutationResponse = AddRuleMutation$data;
export type AddRuleMutation = {|
  variables: AddRuleMutationVariables,
  response: AddRuleMutation$data,
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
    "concreteType": "Rule",
    "kind": "LinkedField",
    "name": "addRule",
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
        "name": "name",
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
    "name": "AddRuleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddRuleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "422b602b47014de263124bf7251eea4a",
    "id": null,
    "metadata": {},
    "name": "AddRuleMutation",
    "operationKind": "mutation",
    "text": "mutation AddRuleMutation(\n  $input: AddRuleInput!\n) {\n  addRule(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "1a392ea3806377decd1789a65baa54d6";

module.exports = ((node/*: any*/)/*: Mutation<
  AddRuleMutation$variables,
  AddRuleMutation$data,
>*/);
