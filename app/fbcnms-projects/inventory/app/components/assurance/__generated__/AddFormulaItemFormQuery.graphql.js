/**
 * @generated SignedSource<<7623bf8965017eb3f8edd9da3e7d526c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AddFormulaItemFormQuery$variables = {||};
export type AddFormulaItemFormQueryVariables = AddFormulaItemFormQuery$variables;
export type AddFormulaItemFormQuery$data = {|
  +kpis: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
  +vendors: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
  +techs: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
  +networkTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type AddFormulaItemFormQueryResponse = AddFormulaItemFormQuery$data;
export type AddFormulaItemFormQuery = {|
  variables: AddFormulaItemFormQueryVariables,
  response: AddFormulaItemFormQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "NetworkTypeConnection",
    "kind": "LinkedField",
    "name": "networkTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "NetworkTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NetworkType",
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
    "cacheID": "3d280dca4f0396b4fdb97a30b4e817ad",
    "id": null,
    "metadata": {},
    "name": "AddFormulaItemFormQuery",
    "operationKind": "query",
    "text": "query AddFormulaItemFormQuery {\n  kpis {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  vendors {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  techs {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  networkTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "1a271a36b7f64330e684f3f06de4f5b5";

module.exports = ((node/*: any*/)/*: Query<
  AddFormulaItemFormQuery$variables,
  AddFormulaItemFormQuery$data,
>*/);
