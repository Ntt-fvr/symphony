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
export type KqiTypesQueryVariables = {||};
export type KqiTypesQueryResponse = {|
  +kqis: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +description: string,
        +formula: string,
        +startDateTime: any,
        +endDateTime: any,
        +kqiCategory: {|
          +id: string,
          +name: string,
        |},
        +kqiPerspective: {|
          +id: string,
          +name: string,
        |},
        +kqiSource: {|
          +id: string,
          +name: string,
        |},
        +kqiTemporalFrequency: {|
          +id: string,
          +name: string,
        |},
        +kqiTarget: ?$ReadOnlyArray<{|
          +id: string
        |}>,
      |}
    |}>
  |},
  +kqiPerspectives: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +kqiSources: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +kqiCategories: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +kqiTemporalFrequencies: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +kqiTargets: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +impact: string,
        +frame: number,
        +alowedValidation: number,
        +initTime: any,
        +endTime: any,
        +status: boolean,
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
          +number: number,
          +comparatorType: string,
        |}>,
      |}
    |}>
  |},
|};
export type KqiTypesQuery = {|
  variables: KqiTypesQueryVariables,
  response: KqiTypesQueryResponse,
|};
*/


/*
query KqiTypesQuery {
  kqis {
    edges {
      node {
        id
        name
        description
        formula
        startDateTime
        endDateTime
        kqiCategory {
          id
          name
        }
        kqiPerspective {
          id
          name
        }
        kqiSource {
          id
          name
        }
        kqiTemporalFrequency {
          id
          name
        }
        kqiTarget {
          id
        }
      }
    }
  }
  kqiPerspectives {
    edges {
      node {
        id
        name
      }
    }
  }
  kqiSources {
    edges {
      node {
        id
        name
      }
    }
  }
  kqiCategories {
    edges {
      node {
        id
        name
      }
    }
  }
  kqiTemporalFrequencies {
    edges {
      node {
        id
        name
      }
    }
  }
  kqiTargets {
    edges {
      node {
        id
        name
        impact
        frame
        alowedValidation
        initTime
        endTime
        status
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
          number
          comparatorType
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
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "KqiConnection",
  "kind": "LinkedField",
  "name": "kqis",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "KqiEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Kqi",
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
              "name": "description",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "formula",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startDateTime",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endDateTime",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "KqiCategory",
              "kind": "LinkedField",
              "name": "kqiCategory",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "KqiPerspective",
              "kind": "LinkedField",
              "name": "kqiPerspective",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "KqiSource",
              "kind": "LinkedField",
              "name": "kqiSource",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "KqiTemporalFrequency",
              "kind": "LinkedField",
              "name": "kqiTemporalFrequency",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "KqiTarget",
              "kind": "LinkedField",
              "name": "kqiTarget",
              "plural": true,
              "selections": [
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
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "KqiPerspectiveConnection",
  "kind": "LinkedField",
  "name": "kqiPerspectives",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "KqiPerspectiveEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "KqiPerspective",
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
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "KqiSourceConnection",
  "kind": "LinkedField",
  "name": "kqiSources",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "KqiSourceEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "KqiSource",
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
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "KqiCategoryConnection",
  "kind": "LinkedField",
  "name": "kqiCategories",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "KqiCategoryEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "KqiCategory",
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
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "KqiTemporalFrequencyConnection",
  "kind": "LinkedField",
  "name": "kqiTemporalFrequencies",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "KqiTemporalFrequencyEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "KqiTemporalFrequency",
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
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "impact",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "frame",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "alowedValidation",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "initTime",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endTime",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Kqi",
  "kind": "LinkedField",
  "name": "kqi",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "KqiTarget",
  "kind": "LinkedField",
  "name": "kqiTargetFk",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "Comparator",
  "kind": "LinkedField",
  "name": "comparatorFk",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "number",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "comparatorType",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "KqiTypesQuery",
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
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
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "KqiComparator",
                    "kind": "LinkedField",
                    "name": "kqiComparator",
                    "plural": true,
                    "selections": [
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/)
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
    "name": "KqiTypesQuery",
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
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
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "KqiComparator",
                    "kind": "LinkedField",
                    "name": "kqiComparator",
                    "plural": true,
                    "selections": [
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
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
    "cacheID": "cccc5bda7c56942b4a5cb4635163ca91",
    "id": null,
    "metadata": {},
    "name": "KqiTypesQuery",
    "operationKind": "query",
    "text": "query KqiTypesQuery {\n  kqis {\n    edges {\n      node {\n        id\n        name\n        description\n        formula\n        startDateTime\n        endDateTime\n        kqiCategory {\n          id\n          name\n        }\n        kqiPerspective {\n          id\n          name\n        }\n        kqiSource {\n          id\n          name\n        }\n        kqiTemporalFrequency {\n          id\n          name\n        }\n        kqiTarget {\n          id\n        }\n      }\n    }\n  }\n  kqiPerspectives {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kqiSources {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kqiCategories {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kqiTemporalFrequencies {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kqiTargets {\n    edges {\n      node {\n        id\n        name\n        impact\n        frame\n        alowedValidation\n        initTime\n        endTime\n        status\n        kqi {\n          id\n          name\n        }\n        kqiComparator {\n          kqiTargetFk {\n            id\n            name\n          }\n          comparatorFk {\n            id\n            name\n          }\n          number\n          comparatorType\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7f0c3eea027834744b924a37f4f571a0';

module.exports = node;
