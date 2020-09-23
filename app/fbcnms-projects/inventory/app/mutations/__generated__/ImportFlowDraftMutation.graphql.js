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
export type ActionTypeId = "work_order" | "%future added value";
export type TriggerTypeId = "work_order" | "%future added value";
export type VariableType = "DATE" | "INT" | "LOCATION" | "PROJECT" | "STRING" | "USER" | "WORK_ORDER" | "WORK_ORDER_TYPE" | "%future added value";
export type ImportFlowDraftInput = {|
  id: string,
  name: string,
  description?: ?string,
  endParamDefinitions: $ReadOnlyArray<VariableDefinitionInput>,
  startBlock?: ?StartBlockInput,
  endBlocks?: ?$ReadOnlyArray<EndBlockInput>,
  gotoBlocks?: ?$ReadOnlyArray<GotoBlockInput>,
  subflowBlocks?: ?$ReadOnlyArray<SubflowBlockInput>,
  triggerBlocks?: ?$ReadOnlyArray<TriggerBlockInput>,
  actionBlocks?: ?$ReadOnlyArray<ActionBlockInput>,
  connectors?: ?$ReadOnlyArray<ConnectorInput>,
|};
export type VariableDefinitionInput = {|
  key: string,
  type: VariableType,
  mandatory?: ?boolean,
  multipleValues?: ?boolean,
  choices?: ?$ReadOnlyArray<string>,
  defaultValue?: ?string,
|};
export type StartBlockInput = {|
  cid: string,
  name: string,
  paramDefinitions: $ReadOnlyArray<VariableDefinitionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type BlockUIRepresentationInput = {|
  xPosition: number,
  yPosition: number,
|};
export type EndBlockInput = {|
  cid: string,
  name: string,
  params: $ReadOnlyArray<VariableExpressionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type VariableExpressionInput = {|
  variableDefinitionKey: string,
  expression: string,
  blockVariables?: ?$ReadOnlyArray<BlockVariableInput>,
|};
export type BlockVariableInput = {|
  blockCid: string,
  variableDefinitionKey: string,
|};
export type GotoBlockInput = {|
  cid: string,
  name: string,
  targetBlockCid: string,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type SubflowBlockInput = {|
  cid: string,
  name: string,
  flowId: string,
  params: $ReadOnlyArray<VariableExpressionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type TriggerBlockInput = {|
  cid: string,
  name: string,
  triggerType: TriggerTypeId,
  params: $ReadOnlyArray<VariableExpressionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type ActionBlockInput = {|
  cid: string,
  name: string,
  actionType: ActionTypeId,
  params: $ReadOnlyArray<VariableExpressionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type ConnectorInput = {|
  sourceBlockCid: string,
  targetBlockCid: string,
|};
export type ImportFlowDraftMutationVariables = {|
  input: ImportFlowDraftInput
|};
export type ImportFlowDraftMutationResponse = {|
  +importFlowDraft: {|
    +id: string,
    +name: string,
  |}
|};
export type ImportFlowDraftMutation = {|
  variables: ImportFlowDraftMutationVariables,
  response: ImportFlowDraftMutationResponse,
|};
*/


/*
mutation ImportFlowDraftMutation(
  $input: ImportFlowDraftInput!
) {
  importFlowDraft(input: $input) {
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
    "concreteType": "FlowDraft",
    "kind": "LinkedField",
    "name": "importFlowDraft",
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
    "name": "ImportFlowDraftMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ImportFlowDraftMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2693717e6b2a310e9bc978c0c5f8aad1",
    "id": null,
    "metadata": {},
    "name": "ImportFlowDraftMutation",
    "operationKind": "mutation",
    "text": "mutation ImportFlowDraftMutation(\n  $input: ImportFlowDraftInput!\n) {\n  importFlowDraft(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a71b691310b2f82410a89a9aa0ee547e';

module.exports = node;
