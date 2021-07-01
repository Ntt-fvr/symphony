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
export type KpiTypesQueryVariables = {||};
export type KpiTypesQueryResponse = {|
  +kpis: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +name: string,
        +domainFk: {|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |}
|};
export type KpiTypesQuery = {|
  variables: KpiTypesQueryVariables,
  response: KpiTypesQueryResponse,
|};
*/


/*
query KpiTypesQuery {
  kpis {
    edges {
      node {
        name
        domainFk {
          id
          name
        }
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Domain",
  "kind": "LinkedField",
  "name": "domainFk",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v0/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "KpiTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "KpiConnection",
        "kind": "LinkedField",
        "name": "kpis",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "KpiEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Kpi",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "KpiTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "KpiConnection",
        "kind": "LinkedField",
        "name": "kpis",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "KpiEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Kpi",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v2/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "66cd6ba2e73d60232f3353b8d8c45df3",
    "id": null,
    "metadata": {},
    "name": "KpiTypesQuery",
    "operationKind": "query",
    "text": "query KpiTypesQuery {\n  kpis {\n    edges {\n      node {\n        name\n        domainFk {\n          id\n          name\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '846a53f48cfd7f7db1bd9c891a33ec8a';

module.exports = node;
