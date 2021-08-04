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
export type AlarmFilteringStatusQueryVariables = {||};
export type AlarmFilteringStatusQueryResponse = {|
  +alarmStatus: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +name: string,
        +id: string,
      |}
    |}>
  |}
|};
export type AlarmFilteringStatusQuery = {|
  variables: AlarmFilteringStatusQueryVariables,
  response: AlarmFilteringStatusQueryResponse,
|};
*/


/*
query AlarmFilteringStatusQuery {
  alarmStatus {
    edges {
      node {
        name
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AlarmStatusConnection",
    "kind": "LinkedField",
    "name": "alarmStatus",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AlarmStatusEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AlarmStatus",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "name": "AlarmFilteringStatusQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AlarmFilteringStatusQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b7a987a42a42395be53d9c7cc2316b09",
    "id": null,
    "metadata": {},
    "name": "AlarmFilteringStatusQuery",
    "operationKind": "query",
    "text": "query AlarmFilteringStatusQuery {\n  alarmStatus {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6083dba65261c08d7397653dcf41cefb';

module.exports = node;
