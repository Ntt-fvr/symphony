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
export type FlowNewInstancesPolicy = "DISABLED" | "ENABLED" | "%future added value";
export type FlowStatus = "ARCHIVED" | "DRAFT" | "ON_HOLD" | "PUBLISHED" | "UNPUBLISHED" | "%future added value";
export type ConfigurationExecuteFlowQueryVariables = {||};
export type ConfigurationExecuteFlowQueryResponse = {|
  +flows: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +description: ?string,
        +status: FlowStatus,
        +newInstancesPolicy: FlowNewInstancesPolicy,
        +draft: ?{|
          +id: string,
          +sameAsFlow: boolean,
        |},
        +creationDate: any,
        +updateTime: any,
        +author: {|
          +id: string,
          +firstName: string,
          +email: string,
        |},
        +runningInstances: number,
        +failedInstances: number,
        +$fragmentRefs: AutomationFlowsList_flows$ref,
      |}
    |}>
  |}
|};
export type ConfigurationExecuteFlowQuery = {|
  variables: ConfigurationExecuteFlowQueryVariables,
  response: ConfigurationExecuteFlowQueryResponse,
|};
*/


/*
query ConfigurationExecuteFlowQuery {
  flows(first: 500) {
    edges {
      node {
        id
        name
        description
        status
        newInstancesPolicy
        draft {
          id
          sameAsFlow
        }
        creationDate
        updateTime
        author {
          id
          firstName
          email
        }
        runningInstances
        failedInstances
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
  "name": "description",
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
  "name": "newInstancesPolicy",
  "storageKey": null
},
v5 = {
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creationDate",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updateTime",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "runningInstances",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "failedInstances",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v13 = {
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
v14 = [
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
    "name": "ConfigurationExecuteFlowQuery",
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AutomationFlowsList_flows"
                  }
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/)
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
    "name": "ConfigurationExecuteFlowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v14/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v13/*: any*/)
        ],
        "storageKey": "flows(first:500)"
      },
      {
        "alias": null,
        "args": (v14/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "AutomationFlowsView_flows",
        "kind": "LinkedHandle",
        "name": "flows"
      }
    ]
  },
  "params": {
    "cacheID": "97225a8857144a7afa4b1911df7d3deb",
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
    "name": "ConfigurationExecuteFlowQuery",
    "operationKind": "query",
    "text": "query ConfigurationExecuteFlowQuery {\n  flows(first: 500) {\n    edges {\n      node {\n        id\n        name\n        description\n        status\n        newInstancesPolicy\n        draft {\n          id\n          sameAsFlow\n        }\n        creationDate\n        updateTime\n        author {\n          id\n          firstName\n          email\n        }\n        runningInstances\n        failedInstances\n        ...AutomationFlowsList_flows\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AutomationFlowCard_flow on Flow {\n  id\n  name\n  description\n  status\n  newInstancesPolicy\n  draft {\n    id\n    sameAsFlow\n  }\n}\n\nfragment AutomationFlowsList_flows on Flow {\n  id\n  ...AutomationFlowCard_flow\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '490925156a321613c22fb79994bafa32';

module.exports = node;
