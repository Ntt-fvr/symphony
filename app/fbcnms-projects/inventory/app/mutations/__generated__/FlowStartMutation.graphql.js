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
export type StartFlowInput = {|
  bssCode?: ?string,
  flowID: string,
  params: $ReadOnlyArray<?VariableValueInput>,
  startDate: any,
|};
export type VariableValueInput = {|
  value: string,
  variableDefinitionKey: string,
|};
export type FlowStartMutationVariables = {|
  input: StartFlowInput
|};
export type FlowStartMutationResponse = {|
  +startFlow: {|
    +id: string
  |}
|};
export type FlowStartMutation = {|
  variables: FlowStartMutationVariables,
  response: FlowStartMutationResponse,
|};
*/


/*
mutation FlowStartMutation(
  $input: StartFlowInput!
) {
  startFlow(input: $input) {
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
    "name": "startFlow",
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
    "name": "FlowStartMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FlowStartMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8a9dfe1b31fcdd68a0ac6b3d09e9841c",
    "id": null,
    "metadata": {},
    "name": "FlowStartMutation",
    "operationKind": "mutation",
    "text": "mutation FlowStartMutation(\n  $input: StartFlowInput!\n) {\n  startFlow(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '27fe9af3615e4923a86d1e4d8d599a80';

module.exports = node;
