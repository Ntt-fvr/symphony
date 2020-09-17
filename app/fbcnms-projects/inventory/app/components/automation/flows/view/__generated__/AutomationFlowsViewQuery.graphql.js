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
type AutomationFlowCard_flowDraft$ref = any;
export type AutomationFlowsViewQueryVariables = {||};
export type AutomationFlowsViewQueryResponse = {|
  +flowDrafts: {|
    +edges: ?$ReadOnlyArray<{|
      +node: ?{|
        +$fragmentRefs: AutomationFlowCard_flowDraft$ref
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
        ...AutomationFlowCard_flowDraft
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
  blocks {
    id
    name
  }
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
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
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
                    "name": "AutomationFlowCard_flowDraft"
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "blocks",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
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
    "cacheID": "f10527880625312932f5f979f955ab0c",
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
    "text": "query AutomationFlowsViewQuery {\n  flowDrafts(first: 500) {\n    edges {\n      node {\n        ...AutomationFlowCard_flowDraft\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AutomationFlowCard_flowDraft on FlowDraft {\n  id\n  name\n  blocks {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'efaf0284c8fabad1925b348aa4eb04cd';

module.exports = node;
