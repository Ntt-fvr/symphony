/**
 * @generated SignedSource<<61ae72e93f2976a105a0b3662e76ff83>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AddCounterItemFormQuery$variables = {||};
export type AddCounterItemFormQueryVariables = AddCounterItemFormQuery$variables;
export type AddCounterItemFormQuery$data = {|
  +counterFamilies: {|
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
|};
export type AddCounterItemFormQueryResponse = AddCounterItemFormQuery$data;
export type AddCounterItemFormQuery = {|
  variables: AddCounterItemFormQueryVariables,
  response: AddCounterItemFormQuery$data,
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
    "concreteType": "CounterFamilyConnection",
    "kind": "LinkedField",
    "name": "counterFamilies",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CounterFamilyEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CounterFamily",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddCounterItemFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddCounterItemFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3a093187b9eebd13e28df55ff06bc84b",
    "id": null,
    "metadata": {},
    "name": "AddCounterItemFormQuery",
    "operationKind": "query",
    "text": "query AddCounterItemFormQuery {\n  counterFamilies {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  vendors {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "604a6fea0a9c6a72f33a8301c60b3fb4";

module.exports = ((node/*: any*/)/*: Query<
  AddCounterItemFormQuery$variables,
  AddCounterItemFormQuery$data,
>*/);
