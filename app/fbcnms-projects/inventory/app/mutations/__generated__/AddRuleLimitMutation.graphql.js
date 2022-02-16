/**
 * @generated SignedSource<<47d3d3fe90cee7f4b09d1df740742108>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddRuleLimitInput = {|
  number: number,
  limitType: string,
  comparator: string,
  rule: string,
|};
export type AddRuleLimitMutation$variables = {|
  input: AddRuleLimitInput,
|};
export type AddRuleLimitMutationVariables = AddRuleLimitMutation$variables;
export type AddRuleLimitMutation$data = {|
  +addRuleLimit: {|
    +id: string,
    +number: number,
  |},
|};
export type AddRuleLimitMutationResponse = AddRuleLimitMutation$data;
export type AddRuleLimitMutation = {|
  variables: AddRuleLimitMutationVariables,
  response: AddRuleLimitMutation$data,
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
    "concreteType": "RuleLimit",
    "kind": "LinkedField",
    "name": "addRuleLimit",
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
        "name": "number",
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
    "name": "AddRuleLimitMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddRuleLimitMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a2f34e6b1cc70a06b652f3bb908b17ea",
    "id": null,
    "metadata": {},
    "name": "AddRuleLimitMutation",
    "operationKind": "mutation",
    "text": "mutation AddRuleLimitMutation(\n  $input: AddRuleLimitInput!\n) {\n  addRuleLimit(input: $input) {\n    id\n    number\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "5a9b1f468709be5c2eb18ed461498d5e";

module.exports = ((node/*: any*/)/*: Mutation<
  AddRuleLimitMutation$variables,
  AddRuleLimitMutation$data,
>*/);
