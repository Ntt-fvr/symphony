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
    +id: string,
    +status: FlowInstanceStatus,
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
    status
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
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
    "cacheID": "beee80293751729e818fb0c51a11973e",
    "id": null,
    "metadata": {},
    "name": "UpdateFlowInstanceMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateFlowInstanceMutation(\n  $input: EditFlowInstanceInput\n) {\n  editFlowInstance(input: $input) {\n    id\n    status\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6e22381d1bb2ef3d404c59e5f2cd2122';

module.exports = node;
