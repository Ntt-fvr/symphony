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
export type ChangeRequestStatus = "CANCELLED" | "FAILED" | "IN_EXECUTION" | "PENDING_APPROVAL" | "REJECTED" | "SCHEDULED" | "SUBMITTED" | "SUCCESSFUL" | "SUCCESSFUL_WITH_WARNINGS" | "%future added value";
export type ChangeRequestType = "AUTOMATIC" | "MANUAL" | "%future added value";
export type ChangeRequestTypesQueryVariables = {||};
export type ChangeRequestTypesQueryResponse = {|
  +queryChangeRequest: ?$ReadOnlyArray<?{|
    +activities: ?$ReadOnlyArray<?{|
      +author: string,
      +id: string,
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
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ChangeRequest",
    "kind": "LinkedField",
    "name": "queryChangeRequest",
    "plural": true,
    "selections": [
      {
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
        "name": "aprobator",
        "storageKey": null
      },
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "requester",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "source",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeRequestTypesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ChangeRequestTypesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2d5ff9acfa4058f87b05653f5c3ecf48",
    "id": null,
    "metadata": {},
    "name": "ChangeRequestTypesQuery",
    "operationKind": "query",
    "text": "query ChangeRequestTypesQuery {\n  queryChangeRequest {\n    activities {\n      author\n      id\n    }\n    description\n    aprobator\n    id\n    requester\n    source\n    status\n    type\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '04d1018db12f98b2a483ca0adfd09de6';

module.exports = node;
