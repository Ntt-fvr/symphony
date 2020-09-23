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
    +id?: string,
    +name?: string,
    +blocks?: $ReadOnlyArray<{|
      +cid: string,
      +name: string,
      +details: {|
        +__typename: string
      |},
      +uiRepresentation: ?{|
        +xPosition: number,
        +yPosition: number,
      |},
      +nextBlocks: $ReadOnlyArray<{|
        +cid: string,
        +name: string,
        +uiRepresentation: ?{|
          +xPosition: number,
          +yPosition: number,
        |},
      |}>,
    |}>,
    +$fragmentRefs: DetailsView_flowDraft$ref & BlocksBar_flowDraft$ref,
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
      id
      name
      blocks {
        cid
        name
        details {
          __typename
        }
        uiRepresentation {
          xPosition
          yPosition
        }
        nextBlocks {
          cid
          name
          uiRepresentation {
            xPosition
            yPosition
          }
          id
        }
        id
      }
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
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cid",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "details",
  "plural": false,
  "selections": [
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "BlockUIRepresentation",
  "kind": "LinkedField",
  "name": "uiRepresentation",
  "plural": false,
  "selections": [
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
};
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Block",
                "kind": "LinkedField",
                "name": "blocks",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "nextBlocks",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v3/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
          (v5/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Block",
                "kind": "LinkedField",
                "name": "blocks",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "nextBlocks",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v3/*: any*/),
                      (v7/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
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
    "cacheID": "71cba279e37089ff71080e4740924618",
    "id": null,
    "metadata": {},
    "name": "FlowDataContext_FlowDraftQuery",
    "operationKind": "query",
    "text": "query FlowDataContext_FlowDraftQuery(\n  $flowId: ID!\n) {\n  flowDraft: node(id: $flowId) {\n    __typename\n    ... on FlowDraft {\n      id\n      name\n      blocks {\n        cid\n        name\n        details {\n          __typename\n        }\n        uiRepresentation {\n          xPosition\n          yPosition\n        }\n        nextBlocks {\n          cid\n          name\n          uiRepresentation {\n            xPosition\n            yPosition\n          }\n          id\n        }\n        id\n      }\n      ...DetailsView_flowDraft\n      ...BlocksBar_flowDraft\n    }\n    id\n  }\n}\n\nfragment BlocksBar_flowDraft on FlowDraft {\n  name\n}\n\nfragment DetailsView_flowDraft on FlowDraft {\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '642593effb5f9c1bcd2d73f23450b69f';

module.exports = node;
