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
type BlocksBar_flowDraft$ref = any;
type DetailsView_flowDraft$ref = any;
export type FlowDataContext_FlowDraftQueryVariables = {|
  flowId: string
|};
export type FlowDataContext_FlowDraftQueryResponse = {|
  +flowDraft: ?{|
    +$fragmentRefs: DetailsView_flowDraft$ref & BlocksBar_flowDraft$ref
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
      ...DetailsView_flowDraft
      ...BlocksBar_flowDraft
    }
    id
  }
}

fragment BlocksBar_flowDraft on FlowDraft {
  name
}

fragment DetailsView_flowDraft on FlowDraft {
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
];
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DetailsView_flowDraft"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "BlocksBar_flowDraft"
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
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
    "cacheID": "85d3e31b211a962c36e6c0698a30d060",
    "id": null,
    "metadata": {},
    "name": "FlowDataContext_FlowDraftQuery",
    "operationKind": "query",
    "text": "query FlowDataContext_FlowDraftQuery(\n  $flowId: ID!\n) {\n  flowDraft: node(id: $flowId) {\n    __typename\n    ... on FlowDraft {\n      ...DetailsView_flowDraft\n      ...BlocksBar_flowDraft\n    }\n    id\n  }\n}\n\nfragment BlocksBar_flowDraft on FlowDraft {\n  name\n}\n\nfragment DetailsView_flowDraft on FlowDraft {\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b8c6e3e8810d80ea50ac07607ccb39c0';

module.exports = node;
