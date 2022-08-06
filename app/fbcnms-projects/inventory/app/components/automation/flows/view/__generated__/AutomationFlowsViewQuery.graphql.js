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
export type FlowStatus = "ARCHIVED" | "DELETED" | "DRAFT" | "ON_HOLD" | "PUBLISHED" | "%future added value";
export type AutomationFlowsViewQueryVariables = {||};
export type AutomationFlowsViewQueryResponse = {|
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
  creationDate
  updateTime
  author {
    id
    firstName
    email
  }
  runningInstances
  failedInstances
}

fragment AutomationFlowsList_flows on Flow {
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
    "name": "AutomationFlowsViewQuery",
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
    "cacheID": "01675e0baf78ac385c157be32de99d64",
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
    "text": "query AutomationFlowsViewQuery {\n  flows(first: 500) {\n    edges {\n      node {\n        id\n        name\n        description\n        status\n        newInstancesPolicy\n        draft {\n          id\n          sameAsFlow\n        }\n        creationDate\n        updateTime\n        author {\n          id\n          firstName\n          email\n        }\n        runningInstances\n        failedInstances\n        ...AutomationFlowsList_flows\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AutomationFlowCard_flow on Flow {\n  id\n  name\n  description\n  status\n  newInstancesPolicy\n  draft {\n    id\n    sameAsFlow\n  }\n  creationDate\n  updateTime\n  author {\n    id\n    firstName\n    email\n  }\n  runningInstances\n  failedInstances\n}\n\nfragment AutomationFlowsList_flows on Flow {\n  id\n  name\n  description\n  status\n  newInstancesPolicy\n  draft {\n    id\n    sameAsFlow\n  }\n  creationDate\n  updateTime\n  author {\n    id\n    firstName\n    email\n  }\n  runningInstances\n  failedInstances\n  ...AutomationFlowCard_flow\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f7a6e74f861feb9a60dc86f0eec575ba';

module.exports = node;
