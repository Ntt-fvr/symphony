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
export type ActionTypeId = "update_inventory" | "update_workforce" | "work_order" | "worker" | "%future added value";
export type AuthType = "Basic" | "ODIC" | "%future added value";
export type EntryPointRole = "DEFAULT" | "%future added value";
export type ExitPointRole = "CHOICE" | "DEFAULT" | "%future added value";
export type GoToType = "DESTINATION" | "ORIGIN" | "%future added value";
export type KafkaMessageType = "EXPRESSION" | "INPUT" | "STATE" | "%future added value";
export type RetryUnit = "HOURS" | "MINUTES" | "SECONDS" | "%future added value";
export type SignalModule = "ASSURANCE" | "CM" | "INVENTORY" | "WFM" | "%future added value";
export type SignalType = "CRCREATED" | "CRUPDATED" | "MOICREATED" | "MOIUPDATED" | "PR_CREATED" | "PR_UPDATED" | "WOCREATED" | "WOUPDATED" | "%future added value";
export type TimerBehavior = "FIXED_INTERVAL" | "SPECIFIC_DATETIME" | "%future added value";
export type TransfStrategy = "MERGE" | "REPLACE" | "%future added value";
export type TriggerTypeId = "work_order" | "%future added value";
export type UrlMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT" | "%future added value";
export type VariableExpressionType = "ChekListItemDefinition" | "DecisionDefinition" | "PropertyTypeDefinition" | "VariableDefinition" | "%future added value";
export type VariableType = "DATE" | "INT" | "LOCATION" | "PROJECT" | "STRING" | "USER" | "WORK_ORDER" | "WORK_ORDER_TYPE" | "%future added value";
export type ImportFlowDraftInput = {|
  actionBlocks?: ?$ReadOnlyArray<ActionBlockInput>,
  choiceBlocks?: ?$ReadOnlyArray<ChoiceBlockInput>,
  connectors?: ?$ReadOnlyArray<ConnectorInput>,
  description?: ?string,
  endBlocks?: ?$ReadOnlyArray<EndBlockInput>,
  endParamDefinitions: $ReadOnlyArray<VariableDefinitionInput>,
  executeFlowBlocks?: ?$ReadOnlyArray<ExecuteFlowBlockInput>,
  gotoBlocks?: ?$ReadOnlyArray<GotoBlockInput>,
  id: string,
  invokeRestAPIBlocks?: ?$ReadOnlyArray<InvokeRestAPIBlockInput>,
  kafkaBlocks?: ?$ReadOnlyArray<KafkaBlockInput>,
  name: string,
  startBlock?: ?StartBlockInput,
  timerBlocks?: ?$ReadOnlyArray<TimerBlockInput>,
  triggerBlocks?: ?$ReadOnlyArray<TriggerBlockInput>,
  waitForSignalBlocks?: ?$ReadOnlyArray<WaitForSignalBlockInput>,
|};
export type ActionBlockInput = {|
  actionType: ActionTypeId,
  cid: string,
  params: $ReadOnlyArray<VariableExpressionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type VariableExpressionInput = {|
  blockVariables?: ?$ReadOnlyArray<BlockVariableInput>,
  expression: string,
  propertyTypeId?: ?number,
  type: VariableExpressionType,
  variableDefinitionKey?: ?string,
|};
export type BlockVariableInput = {|
  blockCid: string,
  checkListItemDefinitionId?: ?number,
  propertyTypeId?: ?number,
  type: VariableExpressionType,
  variableDefinitionKey?: ?string,
|};
export type BlockUIRepresentationInput = {|
  name: string,
  xPosition: number,
  yPosition: number,
|};
export type ChoiceBlockInput = {|
  basicDefinitions: BaseBlockInput,
  cid: string,
  defaultExitPoint?: ?ExitPointInput,
  entryPoint: EntryPointInput,
  routes?: ?$ReadOnlyArray<DecisionRouteInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type BaseBlockInput = {|
  backoffRate?: ?number,
  enableErrorHandling?: ?boolean,
  enableInputStateTransformation: boolean,
  enableInputTransformation: boolean,
  enableOutputStateTransformation: boolean,
  enableOutputTransformation: boolean,
  enableRetryPolicy?: ?boolean,
  inputParamDefinitions?: ?string,
  inputStateParamDefinitions?: ?string,
  inputStateTransfStrategy?: ?TransfStrategy,
  inputTransfStrategy?: ?TransfStrategy,
  maxAttemps?: ?number,
  outputParamDefinitions?: ?string,
  outputStateParamDefinitions?: ?string,
  outputStateTransfStrategy?: ?TransfStrategy,
  outputTransfStrategy?: ?TransfStrategy,
  retryInterval?: ?number,
  units?: ?RetryUnit,
|};
export type ExitPointInput = {|
  cid?: ?string,
  role?: ?ExitPointRole,
|};
export type EntryPointInput = {|
  cid?: ?string,
  role?: ?EntryPointRole,
|};
export type DecisionRouteInput = {|
  cid?: ?string,
  condition: VariableExpressionInput,
  index?: ?number,
|};
export type ConnectorInput = {|
  sourceBlockCid: string,
  sourcePoint?: ?ExitPointInput,
  targetBlockCid: string,
  targetPoint?: ?EntryPointInput,
|};
export type EndBlockInput = {|
  cid: string,
  params: $ReadOnlyArray<VariableExpressionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type VariableDefinitionInput = {|
  choices?: ?$ReadOnlyArray<string>,
  defaultValue?: ?string,
  key: string,
  mandatory?: ?boolean,
  multipleValues?: ?boolean,
  type: VariableType,
|};
export type ExecuteFlowBlockInput = {|
  basicDefinitions: BaseBlockInput,
  cid: string,
  entryPoint: EntryPointInput,
  exitPoint: ExitPointInput,
  flow: string,
  params: $ReadOnlyArray<VariableExpressionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type GotoBlockInput = {|
  cid: string,
  targetBlockCid?: ?string,
  type: GoToType,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type InvokeRestAPIBlockInput = {|
  authType?: ?AuthType,
  basicDefinitions: BaseBlockInput,
  body: string,
  cid: string,
  clientId?: ?string,
  clientSecret?: ?string,
  connectionTimeOut: number,
  entryPoint: EntryPointInput,
  exitPoint: ExitPointInput,
  headers: $ReadOnlyArray<?VariableValueInput>,
  method: UrlMethod,
  oidcUrl?: ?string,
  params: $ReadOnlyArray<VariableExpressionInput>,
  password?: ?string,
  uiRepresentation?: ?BlockUIRepresentationInput,
  url: string,
  user?: ?string,
|};
export type VariableValueInput = {|
  value: string,
  variableDefinitionKey: string,
|};
export type KafkaBlockInput = {|
  basicDefinitions: BaseBlockInput,
  brokers?: ?$ReadOnlyArray<string>,
  cid: string,
  entryPoint: EntryPointInput,
  exitPoint: ExitPointInput,
  message: string,
  topic: string,
  type: KafkaMessageType,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type StartBlockInput = {|
  cid: string,
  paramDefinitions: $ReadOnlyArray<VariableDefinitionInput>,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type TimerBlockInput = {|
  behavior: TimerBehavior,
  cid: string,
  enableExpressionL?: ?boolean,
  entryPoint: EntryPointInput,
  exitPoint: ExitPointInput,
  expression?: ?string,
  params: $ReadOnlyArray<VariableExpressionInput>,
  seconds?: ?number,
  specificDatetime?: ?any,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type TriggerBlockInput = {|
  cid: string,
  params: $ReadOnlyArray<VariableExpressionInput>,
  triggerType: TriggerTypeId,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type WaitForSignalBlockInput = {|
  basicDefinitions: BaseBlockInput,
  blocked: boolean,
  cid: string,
  customFilter?: ?string,
  entryPoint: EntryPointInput,
  exitPoint: ExitPointInput,
  params: $ReadOnlyArray<VariableExpressionInput>,
  signalModule: SignalModule,
  type: SignalType,
  uiRepresentation?: ?BlockUIRepresentationInput,
|};
export type ImportFlowDraftMutationVariables = {|
  input: ImportFlowDraftInput
|};
export type ImportFlowDraftMutationResponse = {|
  +importFlowDraft: {|
    +id: string,
    +name: string,
    +description: ?string,
    +blocks: $ReadOnlyArray<{|
      +cid: string,
      +details: {|
        +__typename: string
      |},
      +uiRepresentation: ?{|
        +name: string,
        +xPosition: number,
        +yPosition: number,
      |},
      +nextBlocks: $ReadOnlyArray<{|
        +cid: string,
        +uiRepresentation: ?{|
          +name: string,
          +xPosition: number,
          +yPosition: number,
        |},
      |}>,
    |}>,
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
    description
    blocks {
      cid
      details {
        __typename
      }
      uiRepresentation {
        name
        xPosition
        yPosition
      }
      nextBlocks {
        cid
        uiRepresentation {
          name
          xPosition
          yPosition
        }
        id
      }
      id
    }
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cid",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "details",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "BlockUIRepresentation",
  "kind": "LinkedField",
  "name": "uiRepresentation",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "xPosition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "yPosition",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ImportFlowDraftMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FlowDraft",
        "kind": "LinkedField",
        "name": "importFlowDraft",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Block",
            "kind": "LinkedField",
            "name": "blocks",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Block",
                "kind": "LinkedField",
                "name": "nextBlocks",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ImportFlowDraftMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FlowDraft",
        "kind": "LinkedField",
        "name": "importFlowDraft",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Block",
            "kind": "LinkedField",
            "name": "blocks",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Block",
                "kind": "LinkedField",
                "name": "nextBlocks",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d28e64343e27ecf670fe4e5086428f20",
    "id": null,
    "metadata": {},
    "name": "ImportFlowDraftMutation",
    "operationKind": "mutation",
    "text": "mutation ImportFlowDraftMutation(\n  $input: ImportFlowDraftInput!\n) {\n  importFlowDraft(input: $input) {\n    id\n    name\n    description\n    blocks {\n      cid\n      details {\n        __typename\n      }\n      uiRepresentation {\n        name\n        xPosition\n        yPosition\n      }\n      nextBlocks {\n        cid\n        uiRepresentation {\n          name\n          xPosition\n          yPosition\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '90f6f56a4c3591dacbc2f112b5a59c34';

module.exports = node;
