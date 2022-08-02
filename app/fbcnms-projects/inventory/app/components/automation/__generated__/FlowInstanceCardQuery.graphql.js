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
export type BlockInstanceStatus = "COMPLETED" | "FAILED" | "IN_PROGRESS" | "PENDING" | "WAITING" | "%future added value";
export type FlowInstanceStatus = "CANCELED" | "CANCELING" | "CLOSED" | "COMPLETED" | "FAILED" | "FAILING" | "PAUSED" | "PAUSING" | "RESUMING" | "RUNNING" | "%future added value";
export type FlowInstanceCardQueryVariables = {|
  flowInstanceId: string
|};
export type FlowInstanceCardQueryResponse = {|
  +flowInstance: ?{|
    +id?: string,
    +status?: FlowInstanceStatus,
    +startDate?: any,
    +endDate?: ?any,
    +serviceInstanceCode?: ?string,
    +template?: {|
      +id: string,
      +name: string,
    |},
    +blocks?: $ReadOnlyArray<{|
      +id: string,
      +status: BlockInstanceStatus,
      +startDate: any,
      +endDate: ?any,
      +block: {|
        +id: string,
        +cid: string,
        +uiRepresentation: ?{|
          +name: string
        |},
        +details: {|
          +__typename: "ActionBlock",
          +actionType: {|
            +id: ActionTypeId
          |},
          +workerType: ?{|
            +name: string
          |},
          +workOrderType: ?{|
            +name: string
          |},
        |} | {|
          // This will never be '%other', but we need some
          // value in case none of the concrete values match.
          +__typename: "%other"
        |},
      |},
    |}>,
  |}
|};
export type FlowInstanceCardQuery = {|
  variables: FlowInstanceCardQueryVariables,
  response: FlowInstanceCardQueryResponse,
|};
*/


/*
query FlowInstanceCardQuery(
  $flowInstanceId: ID!
) {
  flowInstance: node(id: $flowInstanceId) {
    __typename
    ... on FlowInstance {
      id
      status
      startDate
      endDate
      serviceInstanceCode
      template {
        id
        name
      }
      blocks {
        id
        status
        startDate
        endDate
        block {
          id
          cid
          uiRepresentation {
            name
          }
          details {
            __typename
            ... on ActionBlock {
              actionType {
                id
              }
              workerType {
                name
                id
              }
              workOrderType {
                name
                id
              }
            }
          }
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
    "name": "flowInstanceId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "flowInstanceId"
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
  "name": "endDate",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serviceInstanceCode",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "FlowExecutionTemplate",
  "kind": "LinkedField",
  "name": "template",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v7/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cid",
  "storageKey": null
},
v10 = [
  (v7/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "BlockUIRepresentation",
  "kind": "LinkedField",
  "name": "uiRepresentation",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "ActionType",
  "kind": "LinkedField",
  "name": "actionType",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v14 = [
  (v7/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FlowInstanceCardQuery",
    "selections": [
      {
        "alias": "flowInstance",
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
              (v6/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "BlockInstance",
                "kind": "LinkedField",
                "name": "blocks",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "block",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v9/*: any*/),
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "details",
                        "plural": false,
                        "selections": [
                          (v12/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "WorkerType",
                                "kind": "LinkedField",
                                "name": "workerType",
                                "plural": false,
                                "selections": (v10/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "WorkOrderType",
                                "kind": "LinkedField",
                                "name": "workOrderType",
                                "plural": false,
                                "selections": (v10/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "type": "ActionBlock",
                            "abstractKey": null
                          }
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
    "name": "FlowInstanceCardQuery",
    "selections": [
      {
        "alias": "flowInstance",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v12/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "BlockInstance",
                "kind": "LinkedField",
                "name": "blocks",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "block",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v9/*: any*/),
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "details",
                        "plural": false,
                        "selections": [
                          (v12/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "WorkerType",
                                "kind": "LinkedField",
                                "name": "workerType",
                                "plural": false,
                                "selections": (v14/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "WorkOrderType",
                                "kind": "LinkedField",
                                "name": "workOrderType",
                                "plural": false,
                                "selections": (v14/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "type": "ActionBlock",
                            "abstractKey": null
                          }
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
            "type": "FlowInstance",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5e841a723db9bba0a186c22b9baa480b",
    "id": null,
    "metadata": {},
    "name": "FlowInstanceCardQuery",
    "operationKind": "query",
    "text": "query FlowInstanceCardQuery(\n  $flowInstanceId: ID!\n) {\n  flowInstance: node(id: $flowInstanceId) {\n    __typename\n    ... on FlowInstance {\n      id\n      status\n      startDate\n      endDate\n      serviceInstanceCode\n      template {\n        id\n        name\n      }\n      blocks {\n        id\n        status\n        startDate\n        endDate\n        block {\n          id\n          cid\n          uiRepresentation {\n            name\n          }\n          details {\n            __typename\n            ... on ActionBlock {\n              actionType {\n                id\n              }\n              workerType {\n                name\n                id\n              }\n              workOrderType {\n                name\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a5f91b28b05773d64a3274a29329ad56';

module.exports = node;
