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
export type BlockInstanceStatus = "COMPLETED" | "FAILED" | "IN_PROGRESS" | "PENDING" | "WAITING" | "%future added value";
export type FlowInstanceStatus = "CANCELED" | "CLOSED" | "COMPLETED" | "FAILED" | "FAILING" | "PAUSED" | "RUNNING" | "%future added value";
export type FlowDataContext_FlowInstanceQueryVariables = {|
  flowId: string
|};
export type FlowDataContext_FlowInstanceQueryResponse = {|
  +flowDraft: ?{|
    +id?: string,
    +status?: FlowInstanceStatus,
    +startDate?: any,
    +incompletion_reason?: ?string,
    +template?: {|
      +id: string,
      +name: string,
      +description: ?string,
      +blocks: $ReadOnlyArray<{|
        +id: string,
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
          +id: string,
        |}>,
      |}>,
    |},
    +blocks?: $ReadOnlyArray<{|
      +failure_reason: ?string,
      +status: BlockInstanceStatus,
      +id: string,
    |}>,
  |}
|};
export type FlowDataContext_FlowInstanceQuery = {|
  variables: FlowDataContext_FlowInstanceQueryVariables,
  response: FlowDataContext_FlowInstanceQueryResponse,
|};
*/


/*
query FlowDataContext_FlowInstanceQuery(
  $flowId: ID!
) {
  flowDraft: node(id: $flowId) {
    __typename
    ... on FlowInstance {
      id
      status
      startDate
      incompletion_reason
      template {
        id
        name
        description
        blocks {
          id
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
        }
      }
      blocks {
        failure_reason
        status
        id
      }
    }
    id
  }
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
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "incompletion_reason",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cid",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
    (v6/*: any*/),
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
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "FlowExecutionTemplate",
  "kind": "LinkedField",
  "name": "template",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Block",
      "kind": "LinkedField",
      "name": "blocks",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v7/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "details",
          "plural": false,
          "selections": [
            (v8/*: any*/)
          ],
          "storageKey": null
        },
        (v9/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Block",
          "kind": "LinkedField",
          "name": "nextBlocks",
          "plural": true,
          "selections": [
            (v7/*: any*/),
            (v9/*: any*/),
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "BlockInstance",
  "kind": "LinkedField",
  "name": "blocks",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "failure_reason",
      "storageKey": null
    },
    (v3/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FlowDataContext_FlowInstanceQuery",
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
              (v5/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "type": "FlowInstance",
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
    "name": "FlowDataContext_FlowInstanceQuery",
    "selections": [
      {
        "alias": "flowDraft",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "type": "FlowInstance",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "53faeccd4ca601e46ab13a1fc117b86a",
    "id": null,
    "metadata": {},
    "name": "FlowDataContext_FlowInstanceQuery",
    "operationKind": "query",
    "text": "query FlowDataContext_FlowInstanceQuery(\n  $flowId: ID!\n) {\n  flowDraft: node(id: $flowId) {\n    __typename\n    ... on FlowInstance {\n      id\n      status\n      startDate\n      incompletion_reason\n      template {\n        id\n        name\n        description\n        blocks {\n          id\n          cid\n          details {\n            __typename\n          }\n          uiRepresentation {\n            name\n            xPosition\n            yPosition\n          }\n          nextBlocks {\n            cid\n            uiRepresentation {\n              name\n              xPosition\n              yPosition\n            }\n            id\n          }\n        }\n      }\n      blocks {\n        failure_reason\n        status\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6af0fe0edf7b903ccc7a7c5d50b89d74';

module.exports = node;
