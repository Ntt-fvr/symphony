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
export type FlowDataContext_FlowInstanceQueryVariables = {|
  flowId: string
|};
export type FlowDataContext_FlowInstanceQueryResponse = {|
  +flowDraft: ?{|
    +id?: string,
    +status?: FlowInstanceStatus,
    +startDate?: any,
    +template?: {|
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
          +id: string,
        |}>,
        +id: string,
      |}>,
    |},
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
      template {
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
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cid",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "BlockUIRepresentation",
  "kind": "LinkedField",
  "name": "uiRepresentation",
  "plural": false,
  "selections": [
    (v5/*: any*/),
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
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "FlowExecutionTemplate",
  "kind": "LinkedField",
  "name": "template",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v5/*: any*/),
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
        (v6/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "details",
          "plural": false,
          "selections": [
            (v7/*: any*/)
          ],
          "storageKey": null
        },
        (v8/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Block",
          "kind": "LinkedField",
          "name": "nextBlocks",
          "plural": true,
          "selections": [
            (v6/*: any*/),
            (v8/*: any*/),
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
              (v9/*: any*/)
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
          (v7/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v9/*: any*/)
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
    "cacheID": "70b9dd639c075e40f61093233d94867f",
    "id": null,
    "metadata": {},
    "name": "FlowDataContext_FlowInstanceQuery",
    "operationKind": "query",
    "text": "query FlowDataContext_FlowInstanceQuery(\n  $flowId: ID!\n) {\n  flowDraft: node(id: $flowId) {\n    __typename\n    ... on FlowInstance {\n      id\n      status\n      startDate\n      template {\n        id\n        name\n        description\n        blocks {\n          cid\n          details {\n            __typename\n          }\n          uiRepresentation {\n            name\n            xPosition\n            yPosition\n          }\n          nextBlocks {\n            cid\n            uiRepresentation {\n              name\n              xPosition\n              yPosition\n            }\n            id\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3b3a3df20665d4442ab31837f7f05c37';

module.exports = node;
