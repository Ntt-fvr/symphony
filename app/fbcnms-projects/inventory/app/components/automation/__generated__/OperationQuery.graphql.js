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
export type OperationQueryVariables = {||};
export type OperationQueryResponse = {|
  +flowInstances: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +status: FlowInstanceStatus,
        +startDate: any,
        +incompletion_reason: ?string,
        +template: {|
          +name: string
        |},
        +bssCode: ?string,
        +serviceInstanceCode: ?string,
      |}
    |}>
  |}
|};
export type OperationQuery = {|
  variables: OperationQueryVariables,
  response: OperationQueryResponse,
|};
*/


/*
query OperationQuery {
  flowInstances {
    edges {
      node {
        id
        status
        startDate
        incompletion_reason
        template {
          name
          id
        }
        bssCode
        serviceInstanceCode
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "incompletion_reason",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bssCode",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serviceInstanceCode",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OperationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FlowInstanceConnection",
        "kind": "LinkedField",
        "name": "flowInstances",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FlowInstanceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FlowInstance",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FlowExecutionTemplate",
                    "kind": "LinkedField",
                    "name": "template",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  (v6/*: any*/)
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OperationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FlowInstanceConnection",
        "kind": "LinkedField",
        "name": "flowInstances",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FlowInstanceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FlowInstance",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FlowExecutionTemplate",
                    "kind": "LinkedField",
                    "name": "template",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ce69d80739b93d3c8a890c223796d2c1",
    "id": null,
    "metadata": {},
    "name": "OperationQuery",
    "operationKind": "query",
    "text": "query OperationQuery {\n  flowInstances {\n    edges {\n      node {\n        id\n        status\n        startDate\n        incompletion_reason\n        template {\n          name\n          id\n        }\n        bssCode\n        serviceInstanceCode\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4cd223cca6dba11743a5b247df9b7df6';

module.exports = node;
