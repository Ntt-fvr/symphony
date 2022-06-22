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
export type ChangeRequestSource = "GUI" | "NON_RT_RIC" | "NSSMF" | "WORKFLOW" | "%future added value";
export type ChangeRequestStatus = "APPROVAL" | "CANCELLED" | "FAILED" | "IN_EXECUTION" | "PENDING" | "REJECTED" | "SCHEDULED" | "SUBMITTED" | "SUCCESSFUL" | "SUCCESSFUL_WITH_WARNINGS" | "%future added value";
export type ChangeRequestType = "AUTOMATIC" | "MANUAL" | "%future added value";
export type ChangeRequestTypesQueryVariables = {||};
export type ChangeRequestTypesQueryResponse = {|
  +queryChangeRequest: ?$ReadOnlyArray<?{|
    +activities: ?$ReadOnlyArray<?{|
      +author: string,
      +id: string,
    |}>,
    +items: $ReadOnlyArray<{|
      +resource: ?{|
        +id: string
      |}
    |}>,
    +description: string,
    +aprobator: ?string,
    +id: string,
    +requester: string,
    +source: ?ChangeRequestSource,
    +status: ChangeRequestStatus,
    +type: ?ChangeRequestType,
  |}>
|};
export type ChangeRequestTypesQuery = {|
  variables: ChangeRequestTypesQueryVariables,
  response: ChangeRequestTypesQueryResponse,
|};
*/


/*
query ChangeRequestTypesQuery {
  queryChangeRequest {
    activities {
      author
      id
    }
    items {
      resource {
        id
      }
      id
    }
    description
    aprobator
    id
    requester
    source
    status
    type
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
  "concreteType": "ChangeRequestActivity",
  "kind": "LinkedField",
  "name": "activities",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "author",
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "resource",
  "plural": false,
  "selections": [
    (v0/*: any*/)
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "aprobator",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requester",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "source",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeRequestTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChangeRequest",
        "kind": "LinkedField",
        "name": "queryChangeRequest",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ChangeItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          (v4/*: any*/),
          (v0/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
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
    "name": "ChangeRequestTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChangeRequest",
        "kind": "LinkedField",
        "name": "queryChangeRequest",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ChangeItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          (v4/*: any*/),
          (v0/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5102c4e89ee2dcfd518539635b47165c",
    "id": null,
    "metadata": {},
    "name": "ChangeRequestTypesQuery",
    "operationKind": "query",
    "text": "query ChangeRequestTypesQuery {\n  queryChangeRequest {\n    activities {\n      author\n      id\n    }\n    items {\n      resource {\n        id\n      }\n      id\n    }\n    description\n    aprobator\n    id\n    requester\n    source\n    status\n    type\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b93dd371880d926f55a059d25b625f5c';

module.exports = node;
