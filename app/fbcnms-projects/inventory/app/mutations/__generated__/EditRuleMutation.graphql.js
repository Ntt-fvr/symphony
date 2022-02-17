/**
 * @generated SignedSource<<d80493918b9365f3d39e72a7f2a8f778>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditRuleInput = {|
  id: string,
  name: string,
  gracePeriod?: ?number,
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
export type EditRuleMutation$variables = {|
  input: EditRuleInput,
|};
export type EditRuleMutationVariables = EditRuleMutation$variables;
export type EditRuleMutation$data = {|
  +editRule: {|
    +id: string,
    +name: string,
  |},
|};
export type EditRuleMutationResponse = EditRuleMutation$data;
export type EditRuleMutation = {|
  variables: EditRuleMutationVariables,
  response: EditRuleMutation$data,
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
    "name": "editRule",
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
    "name": "EditRuleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditRuleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d30b48c5db711000cd7ee07ae9f124a9",
    "id": null,
    "metadata": {},
    "name": "EditRuleMutation",
    "operationKind": "mutation",
    "text": "mutation EditRuleMutation(\n  $input: EditRuleInput!\n) {\n  editRule(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "75428291d5582725d5d9afa78d41c456";

module.exports = ((node/*: any*/)/*: Mutation<
  EditRuleMutation$variables,
  EditRuleMutation$data,
>*/);
