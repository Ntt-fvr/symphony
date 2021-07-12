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
export type CountersTypesQueryVariables = {||};
export type CountersTypesQueryResponse = {|
  +counters: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +networkManagerSystem: string,
        +externalID: string,
        +counterFamily: ?{|
          +name: string
        |},
        +countervendorformula: $ReadOnlyArray<?{|
          +vendorFk: {|
            +name: string
          |}
        |}>,
      |}
    |}>
  |}
|};
export type CountersTypesQuery = {|
  variables: CountersTypesQueryVariables,
  response: CountersTypesQueryResponse,
|};
*/


/*
query CountersTypesQuery {
  counters {
    edges {
      node {
        id
        name
        networkManagerSystem
        externalID
        counterFamily {
          name
          id
        }
        countervendorformula {
          vendorFk {
            name
            id
          }
          id
        }
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
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "networkManagerSystem",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalID",
  "storageKey": null
},
v4 = [
  (v1/*: any*/)
],
v5 = [
  (v1/*: any*/),
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CountersTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CounterConnection",
        "kind": "LinkedField",
        "name": "counters",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CounterEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Counter",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CounterFamily",
                    "kind": "LinkedField",
                    "name": "counterFamily",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CounterVendorFormula",
                    "kind": "LinkedField",
                    "name": "countervendorformula",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Vendor",
                        "kind": "LinkedField",
                        "name": "vendorFk",
                        "plural": false,
                        "selections": (v4/*: any*/),
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
    "name": "CountersTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CounterConnection",
        "kind": "LinkedField",
        "name": "counters",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CounterEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Counter",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CounterFamily",
                    "kind": "LinkedField",
                    "name": "counterFamily",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CounterVendorFormula",
                    "kind": "LinkedField",
                    "name": "countervendorformula",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Vendor",
                        "kind": "LinkedField",
                        "name": "vendorFk",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      (v0/*: any*/)
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ca533c1984dcccd8edb95f4d7ebfb853",
    "id": null,
    "metadata": {},
    "name": "CountersTypesQuery",
    "operationKind": "query",
    "text": "query CountersTypesQuery {\n  counters {\n    edges {\n      node {\n        id\n        name\n        networkManagerSystem\n        externalID\n        counterFamily {\n          name\n          id\n        }\n        countervendorformula {\n          vendorFk {\n            name\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4d0807c329857e16bf3b8819ce09922c';

module.exports = node;
