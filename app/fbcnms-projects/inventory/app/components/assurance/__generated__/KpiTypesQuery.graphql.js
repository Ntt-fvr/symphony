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
        +id: string,
        +name: string,
        +status: boolean,
        +description: string,
        +domainFk: {|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |},
  +thresholds: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +name: string,
        +kpi: ?{|
          +name: string
        |},
      |}
    |}>
  |},
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
        id
        name
        status
        description
        domainFk {
          id
          name
        }
      }
    }
  }
  thresholds {
    edges {
      node {
        name
        kpi {
          name
          id
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
            (v1/*: any*/),
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
              "name": "description",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Domain",
              "kind": "LinkedField",
              "name": "domainFk",
              "plural": false,
              "selections": [
                (v0/*: any*/),
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
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ThresholdConnection",
        "kind": "LinkedField",
        "name": "thresholds",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ThresholdEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Threshold",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Kpi",
                    "kind": "LinkedField",
                    "name": "kpi",
                    "plural": false,
                    "selections": [
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
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ThresholdConnection",
        "kind": "LinkedField",
        "name": "thresholds",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ThresholdEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Threshold",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Kpi",
                    "kind": "LinkedField",
                    "name": "kpi",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v0/*: any*/)
                    ],
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
    ]
  },
  "params": {
    "cacheID": "963450c9755d0914921eb2632798c3b5",
    "id": null,
    "metadata": {},
    "name": "KpiTypesQuery",
    "operationKind": "query",
    "text": "query KpiTypesQuery {\n  kpis {\n    edges {\n      node {\n        id\n        name\n        status\n        description\n        domainFk {\n          id\n          name\n        }\n      }\n    }\n  }\n  thresholds {\n    edges {\n      node {\n        name\n        kpi {\n          name\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9d1ee7ce2c4d6000395ae042b098a4a6';

module.exports = node;
