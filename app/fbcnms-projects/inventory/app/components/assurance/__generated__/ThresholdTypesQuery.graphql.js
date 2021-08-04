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
export type ThresholdTypesQueryVariables = {||};
export type ThresholdTypesQueryResponse = {|
  +thresholds: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +description: string,
        +status: boolean,
        +kpi: ?{|
          +id: string,
          +name: string,
        |},
        +rule: ?$ReadOnlyArray<{|
          +id: string,
          +name: string,
          +ruleType: {|
            +name: string
          |},
          +status: boolean,
        |}>,
      |}
    |}>
  |}
|};
export type ThresholdTypesQuery = {|
  variables: ThresholdTypesQueryVariables,
  response: ThresholdTypesQueryResponse,
|};
*/


/*
query ThresholdTypesQuery {
  thresholds {
    edges {
      node {
        id
        name
        description
        status
        kpi {
          id
          name
        }
        rule {
          id
          name
          ruleType {
            name
            id
          }
          status
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
  "name": "description",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Kpi",
  "kind": "LinkedField",
  "name": "kpi",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ThresholdTypesQuery",
    "selections": [
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Rule",
                    "kind": "LinkedField",
                    "name": "rule",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "RuleType",
                        "kind": "LinkedField",
                        "name": "ruleType",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
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
    "name": "ThresholdTypesQuery",
    "selections": [
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Rule",
                    "kind": "LinkedField",
                    "name": "rule",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "RuleType",
                        "kind": "LinkedField",
                        "name": "ruleType",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
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
    "cacheID": "46f87783caabe2cefc5dc531052dd494",
    "id": null,
    "metadata": {},
    "name": "ThresholdTypesQuery",
    "operationKind": "query",
    "text": "query ThresholdTypesQuery {\n  thresholds {\n    edges {\n      node {\n        id\n        name\n        description\n        status\n        kpi {\n          id\n          name\n        }\n        rule {\n          id\n          name\n          ruleType {\n            name\n            id\n          }\n          status\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b74cb59c532224a8488d114cdc774e1f';

module.exports = node;
