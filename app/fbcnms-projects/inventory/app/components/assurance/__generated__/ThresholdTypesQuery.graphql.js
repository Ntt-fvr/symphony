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
          +status: boolean,
          +gracePeriod: ?number,
          +additionalInfo: ?string,
          +specificProblem: ?string,
          +eventTypeName: ?string,
          +startDateTime: ?any,
          +endDateTime: ?any,
          +ruleType: {|
            +id: string,
            +name: string,
          |},
          +ruleLimit: ?$ReadOnlyArray<{|
            +number: number,
            +limitType: string,
          |}>,
          +eventSeverity: {|
            +id: string,
            +name: string,
          |},
          +threshold: {|
            +name: string
          |},
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
          status
          gracePeriod
          additionalInfo
          specificProblem
          eventTypeName
          startDateTime
          endDateTime
          ruleType {
            id
            name
          }
          ruleLimit {
            number
            limitType
            id
          }
          eventSeverity {
            id
            name
          }
          threshold {
            name
            id
          }
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
v4 = [
  (v0/*: any*/),
  (v1/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Kpi",
  "kind": "LinkedField",
  "name": "kpi",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gracePeriod",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "additionalInfo",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "specificProblem",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "eventTypeName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDateTime",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDateTime",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "RuleType",
  "kind": "LinkedField",
  "name": "ruleType",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "limitType",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "EventSeverity",
  "kind": "LinkedField",
  "name": "eventSeverity",
  "plural": false,
  "selections": (v4/*: any*/),
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
                  (v5/*: any*/),
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
                      (v3/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "RuleLimit",
                        "kind": "LinkedField",
                        "name": "ruleLimit",
                        "plural": true,
                        "selections": [
                          (v13/*: any*/),
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Threshold",
                        "kind": "LinkedField",
                        "name": "threshold",
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
                  (v5/*: any*/),
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
                      (v3/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "RuleLimit",
                        "kind": "LinkedField",
                        "name": "ruleLimit",
                        "plural": true,
                        "selections": [
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Threshold",
                        "kind": "LinkedField",
                        "name": "threshold",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "caaf451e24bb491b0dafd4dfb88ee98c",
    "id": null,
    "metadata": {},
    "name": "ThresholdTypesQuery",
    "operationKind": "query",
    "text": "query ThresholdTypesQuery {\n  thresholds {\n    edges {\n      node {\n        id\n        name\n        description\n        status\n        kpi {\n          id\n          name\n        }\n        rule {\n          id\n          name\n          status\n          gracePeriod\n          additionalInfo\n          specificProblem\n          eventTypeName\n          startDateTime\n          endDateTime\n          ruleType {\n            id\n            name\n          }\n          ruleLimit {\n            number\n            limitType\n            id\n          }\n          eventSeverity {\n            id\n            name\n          }\n          threshold {\n            name\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8abdb64cfc10b471d9366a36c8180c0b';

module.exports = node;
