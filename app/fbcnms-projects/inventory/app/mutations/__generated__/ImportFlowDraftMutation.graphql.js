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
  decisionBlocks?: ?$ReadOnlyArray<DecisionBlockInput>,
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
export type DecisionBlockInput = {|
  cid: string,
  name: string,
  uiRepresentation?: ?BlockUIRepresentationInput,
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
    +description: ?string,
    +blocks: $ReadOnlyArray<{|
      +cid: string,
      +name: string,
      +details: {|
        +__typename: string
      |},
      +uiRepresentation: ?{|
        +xPosition: number,
        +yPosition: number,
      |},
      +nextBlocks: $ReadOnlyArray<{|
        +cid: string,
        +name: string,
        +uiRepresentation: ?{|
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
      name
      details {
        __typename
      }
      uiRepresentation {
        xPosition
        yPosition
      }
      nextBlocks {
        cid
        name
        uiRepresentation {
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
              (v3/*: any*/),
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
                  (v3/*: any*/),
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
              (v3/*: any*/),
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
                  (v3/*: any*/),
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
    "cacheID": "6be2253acca410075c9266237dd93284",
    "id": null,
    "metadata": {},
    "name": "ImportFlowDraftMutation",
    "operationKind": "mutation",
    "text": "mutation ImportFlowDraftMutation(\n  $input: ImportFlowDraftInput!\n) {\n  importFlowDraft(input: $input) {\n    id\n    name\n    description\n    blocks {\n      cid\n      name\n      details {\n        __typename\n      }\n      uiRepresentation {\n        xPosition\n        yPosition\n      }\n      nextBlocks {\n        cid\n        name\n        uiRepresentation {\n          xPosition\n          yPosition\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ce9ec5b1f73d8d5efa8fc041386003f4';

module.exports = node;
