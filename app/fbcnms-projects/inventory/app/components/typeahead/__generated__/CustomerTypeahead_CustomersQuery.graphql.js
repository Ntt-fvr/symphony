/**
 * @generated SignedSource<<f0f9c4fc3b75fdd2cdeb73dbe85f0011>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type CustomerTypeahead_CustomersQuery$variables = {|
  limit?: ?number,
|};
export type CustomerTypeahead_CustomersQueryVariables = CustomerTypeahead_CustomersQuery$variables;
export type CustomerTypeahead_CustomersQuery$data = {|
  +customers: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +externalId: ?string,
      |},
    |}>,
  |},
|};
export type CustomerTypeahead_CustomersQueryResponse = CustomerTypeahead_CustomersQuery$data;
export type CustomerTypeahead_CustomersQuery = {|
  variables: CustomerTypeahead_CustomersQueryVariables,
  response: CustomerTypeahead_CustomersQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "limit"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "limit"
      }
    ],
    "concreteType": "CustomerConnection",
    "kind": "LinkedField",
    "name": "customers",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CustomerEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Customer",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "externalId",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CustomerTypeahead_CustomersQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CustomerTypeahead_CustomersQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "91b991cf7b98760ae4b59c784df7fac4",
    "id": null,
    "metadata": {},
    "name": "CustomerTypeahead_CustomersQuery",
    "operationKind": "query",
    "text": "query CustomerTypeahead_CustomersQuery(\n  $limit: Int\n) {\n  customers(first: $limit) {\n    edges {\n      node {\n        id\n        name\n        externalId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "18df0202c887393e4158102ab7e9ba4c";

module.exports = ((node/*: any*/)/*: Query<
  CustomerTypeahead_CustomersQuery$variables,
  CustomerTypeahead_CustomersQuery$data,
>*/);
