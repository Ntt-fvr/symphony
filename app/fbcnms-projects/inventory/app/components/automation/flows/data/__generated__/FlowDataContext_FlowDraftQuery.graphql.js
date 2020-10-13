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
export type FlowDataContext_FlowDraftQueryVariables = {|
  flowId: string
|};
export type FlowDataContext_FlowDraftQueryResponse = {|
  +flowDraft: ?{|
    +id?: string,
    +name?: string,
    +description?: ?string,
    +blocks?: $ReadOnlyArray<{|
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
      |}>,
    |}>,
    +$fragmentRefs: BlocksBar_flowDraft$ref,
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
      ...BlocksBar_flowDraft
    }
    id
  }
}

fragment BlocksBar_flowDraft on FlowDraft {
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
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cid",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "details",
  "plural": false,
  "selections": [
    (v6/*: any*/)
  ],
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
    (v3/*: any*/),
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Block",
                "kind": "LinkedField",
                "name": "blocks",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "nextBlocks",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
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
          (v6/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Block",
                "kind": "LinkedField",
                "name": "blocks",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Block",
                    "kind": "LinkedField",
                    "name": "nextBlocks",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
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
            "type": "FlowDraft",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8486abba78477e85937f028cb3240d57",
    "id": null,
    "metadata": {},
    "name": "FlowDataContext_FlowDraftQuery",
    "operationKind": "query",
    "text": "query FlowDataContext_FlowDraftQuery(\n  $flowId: ID!\n) {\n  flowDraft: node(id: $flowId) {\n    __typename\n    ... on FlowDraft {\n      id\n      name\n      description\n      blocks {\n        cid\n        details {\n          __typename\n        }\n        uiRepresentation {\n          name\n          xPosition\n          yPosition\n        }\n        nextBlocks {\n          cid\n          uiRepresentation {\n            name\n            xPosition\n            yPosition\n          }\n          id\n        }\n        id\n      }\n      ...BlocksBar_flowDraft\n    }\n    id\n  }\n}\n\nfragment BlocksBar_flowDraft on FlowDraft {\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bd843a58a5d1c6e673f2250838be6b10';

module.exports = node;
