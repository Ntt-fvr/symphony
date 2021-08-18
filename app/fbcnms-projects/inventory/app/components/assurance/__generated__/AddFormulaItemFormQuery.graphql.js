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
export type AddFormulaItemFormQueryVariables = {||};
export type AddFormulaItemFormQueryResponse = {|
  +kpis: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +vendors: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
  +techs: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |},
|};
export type AddFormulaItemFormQuery = {|
  variables: AddFormulaItemFormQueryVariables,
  response: AddFormulaItemFormQueryResponse,
|};
*/


/*
query AddFormulaItemFormQuery {
  kpis {
    edges {
      node {
        id
        name
      }
    }
  }
  vendors {
    edges {
      node {
        id
        name
      }
    }
  }
  techs {
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
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v1 = [
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
            "selections": (v0/*: any*/),
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
    "concreteType": "VendorConnection",
    "kind": "LinkedField",
    "name": "vendors",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "VendorEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Vendor",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
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
    "concreteType": "TechConnection",
    "kind": "LinkedField",
    "name": "techs",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TechEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Tech",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
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
    "name": "AddFormulaItemFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddFormulaItemFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f9929192c6cec2612095aa19cba4b6bc",
    "id": null,
    "metadata": {},
    "name": "AddFormulaItemFormQuery",
    "operationKind": "query",
    "text": "query AddFormulaItemFormQuery {\n  kpis {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  vendors {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  techs {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0d901e1711014704d0c2e85d9ba09379';

module.exports = node;
