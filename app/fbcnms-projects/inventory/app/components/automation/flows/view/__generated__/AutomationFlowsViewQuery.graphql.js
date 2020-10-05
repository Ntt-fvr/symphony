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
export type AutomationFlowsViewQueryVariables = {||};
export type AutomationFlowsViewQueryResponse = {|
  +flowDrafts: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?{|
        +$fragmentRefs: AutomationFlowsList_flows$ref
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
  flowDrafts(first: 500) {
    edges {
      node {
        ...AutomationFlowsList_flows
        id
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

fragment AutomationFlowCard_flowDraft on FlowDraft {
  id
  name
}

fragment AutomationFlowsList_flows on FlowDraft {
  id
  ...AutomationFlowCard_flowDraft
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v2 = {
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
v3 = [
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
        "alias": "flowDrafts",
        "args": null,
        "concreteType": "FlowDraftConnection",
        "kind": "LinkedField",
        "name": "__AutomationFlowsView_flowDrafts_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FlowDraftEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FlowDraft",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AutomationFlowsList_flows"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
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
        "args": (v3/*: any*/),
        "concreteType": "FlowDraftConnection",
        "kind": "LinkedField",
        "name": "flowDrafts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FlowDraftEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FlowDraft",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "flowDrafts(first:500)"
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "AutomationFlowsView_flowDrafts",
        "kind": "LinkedHandle",
        "name": "flowDrafts"
      }
    ]
  },
  "params": {
    "cacheID": "2fdb4587f5973a41f183b433f9abff8c",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "flowDrafts"
          ]
        }
      ]
    },
    "name": "AutomationFlowsViewQuery",
    "operationKind": "query",
    "text": "query AutomationFlowsViewQuery {\n  flowDrafts(first: 500) {\n    edges {\n      node {\n        ...AutomationFlowsList_flows\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AutomationFlowCard_flowDraft on FlowDraft {\n  id\n  name\n}\n\nfragment AutomationFlowsList_flows on FlowDraft {\n  id\n  ...AutomationFlowCard_flowDraft\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '82fa48721d6e1c127c375d0ce805e52d';

module.exports = node;
