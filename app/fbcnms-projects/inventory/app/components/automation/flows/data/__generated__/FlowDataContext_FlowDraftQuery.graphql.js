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
type FlowHeader_flowDraft$ref = any;
export type ActionTypeId = "update_inventory" | "update_workforce" | "work_order" | "worker" | "%future added value";
export type RetryUnit = "HOURS" | "MINUTES" | "SECONDS" | "%future added value";
export type SignalModule = "ASSURANCE" | "CM" | "INVENTORY" | "WFM" | "%future added value";
export type SignalType = "CRCREATED" | "CRUPDATED" | "MOICREATED" | "MOIUPDATED" | "PR_CREATED" | "PR_UPDATED" | "WOCREATED" | "WOUPDATED" | "%future added value";
export type TransfStrategy = "MERGE" | "REPLACE" | "%future added value";
export type TriggerTypeId = "work_order" | "%future added value";
export type UrlMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT" | "%future added value";
export type FlowDataContext_FlowDraftQueryVariables = {|
  flowId: string
|};
export type FlowDataContext_FlowDraftQueryResponse = {|
  +flowDraft: ?{|
    +id?: string,
    +name?: string,
    +description?: ?string,
    +blocks?: $ReadOnlyArray<{|
      +cid: string,
      +details: {|
        +__typename: "ActionBlock",
        +actionType: {|
          +id: ActionTypeId
        |},
      |} | {|
        +__typename: "TriggerBlock",
        +triggerType: {|
          +id: TriggerTypeId
        |},
      |} | {|
        +__typename: "WaitForSignalBlock",
        +signalModule: ?SignalModule,
        +customFilter: ?string,
        +blocked: boolean,
        +signalType: ?SignalType,
      |} | {|
        +__typename: "InvokeRestAPIBlock",
        +method: UrlMethod,
        +url: string,
        +connectionTimeOut: number,
        +body: string,
      |} | {|
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        +__typename: "%other"
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
      +inputParamDefinitions: $ReadOnlyArray<{|
        +defaultValue: ?string
      |}>,
      +outputParamDefinitions: $ReadOnlyArray<{|
        +defaultValue: ?string
      |}>,
      +enableInputTransformation: boolean,
      +inputTransfStrategy: ?TransfStrategy,
      +inputTransformation: ?string,
      +enableOutputTransformation: boolean,
      +outputTransfStrategy: ?TransfStrategy,
      +outputTransformation: ?string,
      +enableInputStateTransformation: boolean,
      +inputStateTransfStrategy: ?TransfStrategy,
      +inputStateTransformation: ?string,
      +enableOutputStateTransformation: boolean,
      +outputStateTransfStrategy: ?TransfStrategy,
      +outputStateTransformation: ?string,
      +enableErrorHandling: ?boolean,
      +enableRetryPolicy: ?boolean,
      +retryInterval: ?number,
      +units: ?RetryUnit,
      +maxAttemps: ?number,
      +backoffRate: ?number,
    |}>,
    +$fragmentRefs: FlowHeader_flowDraft$ref,
  |}
|};
export type FlowDataContext_FlowDraftQuery = {|
  variables: FlowDataContext_FlowDraftQueryVariables,
  response: FlowDataContext_FlowDraftQueryResponse,
|};
*/


/*
query FlowDataContext_FlowDraftQuery(
  $flowId: ID!
) {
  flowDraft: node(id: $flowId) {
    __typename
    ... on FlowDraft {
      id
      name
      description
      blocks {
        cid
        details {
          __typename
          ... on ActionBlock {
            actionType {
              id
            }
          }
          ... on TriggerBlock {
            triggerType {
              id
            }
          }
          ... on WaitForSignalBlock {
            signalModule
            customFilter
            blocked
            signalType: type
          }
          ... on InvokeRestAPIBlock {
            method
            url
            connectionTimeOut
            body
          }
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
        inputParamDefinitions {
          defaultValue
        }
        outputParamDefinitions {
          defaultValue
        }
        enableInputTransformation
        inputTransfStrategy
        inputTransformation
        enableOutputTransformation
        outputTransfStrategy
        outputTransformation
        enableInputStateTransformation
        inputStateTransfStrategy
        inputStateTransformation
        enableOutputStateTransformation
        outputStateTransfStrategy
        outputStateTransformation
        enableErrorHandling
        enableRetryPolicy
        retryInterval
        units
        maxAttemps
        backoffRate
        id
      }
      ...FlowHeader_flowDraft
    }
    id
  }
}

fragment FlowHeader_flowDraft on FlowDraft {
  name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "flowId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "flowId"
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
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = [
  (v2/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "details",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ActionType",
          "kind": "LinkedField",
          "name": "actionType",
          "plural": false,
          "selections": (v7/*: any*/),
          "storageKey": null
        }
      ],
      "type": "ActionBlock",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TriggerType",
          "kind": "LinkedField",
          "name": "triggerType",
          "plural": false,
          "selections": (v7/*: any*/),
          "storageKey": null
        }
      ],
      "type": "TriggerBlock",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "signalModule",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "customFilter",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "blocked",
          "storageKey": null
        },
        {
          "alias": "signalType",
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        }
      ],
      "type": "WaitForSignalBlock",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "method",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "connectionTimeOut",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "body",
          "storageKey": null
        }
      ],
      "type": "InvokeRestAPIBlock",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v9 = {
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
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "defaultValue",
    "storageKey": null
  }
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "VariableDefinition",
  "kind": "LinkedField",
  "name": "inputParamDefinitions",
  "plural": true,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "VariableDefinition",
  "kind": "LinkedField",
  "name": "outputParamDefinitions",
  "plural": true,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enableInputTransformation",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "inputTransfStrategy",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "inputTransformation",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enableOutputTransformation",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outputTransfStrategy",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outputTransformation",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enableInputStateTransformation",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "inputStateTransfStrategy",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "inputStateTransformation",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enableOutputStateTransformation",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outputStateTransfStrategy",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "outputStateTransformation",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enableErrorHandling",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enableRetryPolicy",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "retryInterval",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "units",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxAttemps",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "backoffRate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FlowDataContext_FlowDraftQuery",
    "selections": [
      {
        "alias": "flowDraft",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
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
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "nextBlocks",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/),
                  (v24/*: any*/),
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v27/*: any*/),
                  (v28/*: any*/),
                  (v29/*: any*/),
                  (v30/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "FlowHeader_flowDraft"
              }
            ],
            "type": "FlowDraft",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FlowDataContext_FlowDraftQuery",
    "selections": [
      {
        "alias": "flowDraft",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
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
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "nextBlocks",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v9/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/),
                  (v24/*: any*/),
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v27/*: any*/),
                  (v28/*: any*/),
                  (v29/*: any*/),
                  (v30/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "FlowDraft",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "90412350b20731f27e2d6e1c69f07cd4",
    "id": null,
    "metadata": {},
    "name": "FlowDataContext_FlowDraftQuery",
    "operationKind": "query",
    "text": "query FlowDataContext_FlowDraftQuery(\n  $flowId: ID!\n) {\n  flowDraft: node(id: $flowId) {\n    __typename\n    ... on FlowDraft {\n      id\n      name\n      description\n      blocks {\n        cid\n        details {\n          __typename\n          ... on ActionBlock {\n            actionType {\n              id\n            }\n          }\n          ... on TriggerBlock {\n            triggerType {\n              id\n            }\n          }\n          ... on WaitForSignalBlock {\n            signalModule\n            customFilter\n            blocked\n            signalType: type\n          }\n          ... on InvokeRestAPIBlock {\n            method\n            url\n            connectionTimeOut\n            body\n          }\n        }\n        uiRepresentation {\n          name\n          xPosition\n          yPosition\n        }\n        nextBlocks {\n          cid\n          uiRepresentation {\n            name\n            xPosition\n            yPosition\n          }\n          id\n        }\n        inputParamDefinitions {\n          defaultValue\n        }\n        outputParamDefinitions {\n          defaultValue\n        }\n        enableInputTransformation\n        inputTransfStrategy\n        inputTransformation\n        enableOutputTransformation\n        outputTransfStrategy\n        outputTransformation\n        enableInputStateTransformation\n        inputStateTransfStrategy\n        inputStateTransformation\n        enableOutputStateTransformation\n        outputStateTransfStrategy\n        outputStateTransformation\n        enableErrorHandling\n        enableRetryPolicy\n        retryInterval\n        units\n        maxAttemps\n        backoffRate\n        id\n      }\n      ...FlowHeader_flowDraft\n    }\n    id\n  }\n}\n\nfragment FlowHeader_flowDraft on FlowDraft {\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '73c3233482e8f0cbad6b1353cb494fd0';

module.exports = node;
