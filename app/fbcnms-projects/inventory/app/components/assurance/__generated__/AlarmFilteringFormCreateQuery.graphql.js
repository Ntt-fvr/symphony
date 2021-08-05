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
export type AlarmFilteringFormCreateQueryVariables = {||};
export type AlarmFilteringFormCreateQueryResponse = {|
  +alarmStatus: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +name: string,
        +id: string,
      |}
    |}>
  |}
|};
export type AlarmFilteringFormCreateQuery = {|
  variables: AlarmFilteringFormCreateQueryVariables,
  response: AlarmFilteringFormCreateQueryResponse,
|};
*/


/*
query AlarmFilteringFormCreateQuery {
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
    "name": "AlarmFilteringFormCreateQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AlarmFilteringFormCreateQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e1283a1544188ae6e521bc85c1e1d743",
    "id": null,
    "metadata": {},
    "name": "AlarmFilteringFormCreateQuery",
    "operationKind": "query",
    "text": "query AlarmFilteringFormCreateQuery {\n  alarmStatus {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cb24176ecd985eb11f6caa7767a282c8';

module.exports = node;
