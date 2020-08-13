/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ActionID = "magma_reboot_node" | "%future added value";
export type TriggerID = "magma_alert" | "%future added value";
export type AddActionsRuleInput = {|
  name: string,
  triggerID: TriggerID,
  ruleActions: $ReadOnlyArray<?ActionsRuleActionInput>,
  ruleFilters: $ReadOnlyArray<?ActionsRuleFilterInput>,
|};
export type ActionsRuleActionInput = {|
  actionID: ActionID,
  data: string,
|};
export type ActionsRuleFilterInput = {|
  filterID: string,
  operatorID: string,
  data: string,
|};
export type AddActionsRuleMutationVariables = {|
  input: AddActionsRuleInput
|};
export type AddActionsRuleMutationResponse = {|
  +addActionsRule: {|
    +id: string,
    +name: string,
  |}
|};
export type AddActionsRuleMutation = {|
  variables: AddActionsRuleMutationVariables,
  response: AddActionsRuleMutationResponse,
|};
*/


/*
mutation AddActionsRuleMutation(
  $input: AddActionsRuleInput!
) {
  addActionsRule(input: $input) {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
    "concreteType": "ActionsRule",
    "kind": "LinkedField",
    "name": "addActionsRule",
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
    "name": "AddActionsRuleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddActionsRuleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a319e43ff7e154804b4683bb7910ebaf",
    "id": null,
    "metadata": {},
    "name": "AddActionsRuleMutation",
    "operationKind": "mutation",
    "text": "mutation AddActionsRuleMutation(\n  $input: AddActionsRuleInput!\n) {\n  addActionsRule(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ba56c51c8719dde6ebb3357a2f349757';

module.exports = node;
