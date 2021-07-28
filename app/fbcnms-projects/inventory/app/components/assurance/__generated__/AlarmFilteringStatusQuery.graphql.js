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
  +alarmStatuss: {|
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
  alarmStatuss {
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
    "name": "alarmStatuss",
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
    "cacheID": "ec4ef88f56858f87383b7244b4531f95",
    "id": null,
    "metadata": {},
    "name": "AlarmFilteringStatusQuery",
    "operationKind": "query",
    "text": "query AlarmFilteringStatusQuery {\n  alarmStatuss {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7a74b83306e71aa291698ec3c2a64cd1';

module.exports = node;
