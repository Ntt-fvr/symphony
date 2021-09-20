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
export type KqiFormEditQueryVariables = {||};
export type KqiFormEditQueryResponse = {|
  +kqiTargets: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +impact: string,
        +allowedVariation: number,
        +initTime: any,
        +endTime: any,
        +status: boolean,
        +period: number,
        +kqi: {|
          +id: string,
          +name: string,
        |},
        +kqiComparator: $ReadOnlyArray<?{|
          +kqiTargetFk: {|
            +id: string,
            +name: string,
          |},
          +comparatorFk: {|
            +id: string,
            +name: string,
          |},
          +id: string,
          +number: number,
          +comparatorType: string,
        |}>,
      |}
    |}>
  |},
  +comparators: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
|};
export type KqiFormEditQuery = {|
  variables: KqiFormEditQueryVariables,
  response: KqiFormEditQueryResponse,
|};
*/


/*
query KqiFormEditQuery {
  kqiTargets {
    edges {
      node {
        id
        name
        impact
        allowedVariation
        initTime
        endTime
        status
        period
        kqi {
          id
          name
        }
        kqiComparator {
          kqiTargetFk {
            id
            name
          }
          comparatorFk {
            id
            name
          }
          id
          number
          comparatorType
        }
      }
    }
  }
  comparators {
    edges {
      node {
        id
        name
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
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "KqiTargetConnection",
    "kind": "LinkedField",
    "name": "kqiTargets",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "KqiTargetEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "KqiTarget",
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
                "name": "impact",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowedVariation",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "initTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endTime",
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
                "name": "period",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Kqi",
                "kind": "LinkedField",
                "name": "kqi",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "KqiComparator",
                "kind": "LinkedField",
                "name": "kqiComparator",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "KqiTarget",
                    "kind": "LinkedField",
                    "name": "kqiTargetFk",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Comparator",
                    "kind": "LinkedField",
                    "name": "comparatorFk",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "number",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "comparatorType",
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
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ComparatorConnection",
    "kind": "LinkedField",
    "name": "comparators",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ComparatorEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Comparator",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v2/*: any*/),
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
    "name": "KqiFormEditQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "KqiFormEditQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "4a77828b77c550566c50e28d8b41a6be",
    "id": null,
    "metadata": {},
    "name": "KqiFormEditQuery",
    "operationKind": "query",
    "text": "query KqiFormEditQuery {\n  kqiTargets {\n    edges {\n      node {\n        id\n        name\n        impact\n        allowedVariation\n        initTime\n        endTime\n        status\n        period\n        kqi {\n          id\n          name\n        }\n        kqiComparator {\n          kqiTargetFk {\n            id\n            name\n          }\n          comparatorFk {\n            id\n            name\n          }\n          id\n          number\n          comparatorType\n        }\n      }\n    }\n  }\n  comparators {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '86b2ef663668cb9ccc2e70113b379c1a';

module.exports = node;
