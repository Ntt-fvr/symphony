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
type AutomationFlowsList_flows$ref = any;
export type FlowStatus = "ARCHIVED" | "DRAFT" | "ON_HOLD" | "PUBLISHED" | "UNPUBLISHED" | "%future added value";
export type AutomationFlowsViewQueryVariables = {||};
export type AutomationFlowsViewQueryResponse = {|
  +flows: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +status: FlowStatus,
        +$fragmentRefs: AutomationFlowsList_flows$ref,
      |}
    |}>
  |}
|};
export type AutomationFlowsViewQuery = {|
  variables: AutomationFlowsViewQueryVariables,
  response: AutomationFlowsViewQueryResponse,
|};
*/


/*
query AutomationFlowsViewQuery {
  flows(first: 500) {
    edges {
      node {
        id
        name
        status
        ...AutomationFlowsList_flows
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment AutomationFlowCard_flow on Flow {
  id
  name
  description
  status
  newInstancesPolicy
  draft {
    id
    sameAsFlow
  }
}

fragment AutomationFlowsList_flows on Flow {
  id
  ...AutomationFlowCard_flow
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
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AutomationFlowsViewQuery",
    "selections": [
      {
        "alias": "flows",
        "args": null,
        "concreteType": "FlowConnection",
        "kind": "LinkedField",
        "name": "__AutomationFlowsView_flows_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FlowEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Flow",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AutomationFlowsList_flows"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
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
    "name": "AutomationFlowsViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "FlowConnection",
        "kind": "LinkedField",
        "name": "flows",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FlowEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Flow",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "newInstancesPolicy",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FlowDraft",
                    "kind": "LinkedField",
                    "name": "draft",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "sameAsFlow",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "flows(first:500)"
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "AutomationFlowsView_flows",
        "kind": "LinkedHandle",
        "name": "flows"
      }
    ]
  },
  "params": {
    "cacheID": "8e4cae9fa29aabe3157c709325d7b911",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "flows"
          ]
        }
      ]
    },
    "name": "AutomationFlowsViewQuery",
    "operationKind": "query",
    "text": "query AutomationFlowsViewQuery {\n  flows(first: 500) {\n    edges {\n      node {\n        id\n        name\n        status\n        ...AutomationFlowsList_flows\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AutomationFlowCard_flow on Flow {\n  id\n  name\n  description\n  status\n  newInstancesPolicy\n  draft {\n    id\n    sameAsFlow\n  }\n}\n\nfragment AutomationFlowsList_flows on Flow {\n  id\n  ...AutomationFlowCard_flow\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5a7c63a016b5eef8d418ab8a362625b5';

module.exports = node;
