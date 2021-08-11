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
  {
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
  {
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
  {
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "KqiTypesQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "KqiTypesQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5b7171277d8dfa09877be6fd105f5b78",
    "id": null,
    "metadata": {},
    "name": "KqiTypesQuery",
    "operationKind": "query",
    "text": "query KqiTypesQuery {\n  kqis {\n    edges {\n      node {\n        id\n        name\n        description\n        formula\n        startDateTime\n        endDateTime\n        kqiCategory {\n          id\n          name\n        }\n        kqiPerspective {\n          id\n          name\n        }\n        kqiSource {\n          id\n          name\n        }\n        kqiTemporalFrequency {\n          id\n          name\n        }\n      }\n    }\n  }\n  kqiPerspectives {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kqiSources {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kqiCategories {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kqiTemporalFrequencies {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '801dc98109648faf298f0e4a99b82ecc';

module.exports = node;
