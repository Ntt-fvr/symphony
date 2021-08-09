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
export type EditAlarmFilteringItemFormQueryVariables = {||};
export type EditAlarmFilteringItemFormQueryResponse = {|
  +alarmStatus: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +name: string,
        +id: string,
      |}
    |}>
  |}
|};
export type EditAlarmFilteringItemFormQuery = {|
  variables: EditAlarmFilteringItemFormQueryVariables,
  response: EditAlarmFilteringItemFormQueryResponse,
|};
*/


/*
query EditAlarmFilteringItemFormQuery {
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
    "name": "EditAlarmFilteringItemFormQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EditAlarmFilteringItemFormQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fc8534040ab4e638e82c3b2e2ca81d0d",
    "id": null,
    "metadata": {},
    "name": "EditAlarmFilteringItemFormQuery",
    "operationKind": "query",
    "text": "query EditAlarmFilteringItemFormQuery {\n  alarmStatus {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '47f9a2d63d2a4b196c945f68c1dee49c';

module.exports = node;
