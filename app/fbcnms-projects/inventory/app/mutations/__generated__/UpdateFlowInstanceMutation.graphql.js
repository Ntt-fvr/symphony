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
export type FlowInstanceStatus = "CANCELED" | "CLOSED" | "COMPLETED" | "FAILED" | "FAILING" | "PAUSED" | "RUNNING" | "%future added value";
export type EditFlowInstanceInput = {|
  bssCode?: ?string,
  endDate?: ?any,
  id: string,
  serviceInstanceCode?: ?string,
  startParams?: ?$ReadOnlyArray<?VariableValueInput>,
  status?: ?FlowInstanceStatus,
|};
export type VariableValueInput = {|
  value: string,
  variableDefinitionKey: string,
|};
export type UpdateFlowInstanceMutationVariables = {|
  input?: ?EditFlowInstanceInput
|};
export type UpdateFlowInstanceMutationResponse = {|
  +editFlowInstance: {|
    +id: string
  |}
|};
export type UpdateFlowInstanceMutation = {|
  variables: UpdateFlowInstanceMutationVariables,
  response: UpdateFlowInstanceMutationResponse,
|};
*/


/*
mutation UpdateFlowInstanceMutation(
  $input: EditFlowInstanceInput
) {
  editFlowInstance(input: $input) {
    id
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
    "concreteType": "FlowInstance",
    "kind": "LinkedField",
    "name": "editFlowInstance",
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
    "name": "UpdateFlowInstanceMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateFlowInstanceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3f04fa5844b8c6f378080e0becfec269",
    "id": null,
    "metadata": {},
    "name": "UpdateFlowInstanceMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateFlowInstanceMutation(\n  $input: EditFlowInstanceInput\n) {\n  editFlowInstance(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a3331eba42bcffa996d6db85422be646';

module.exports = node;
