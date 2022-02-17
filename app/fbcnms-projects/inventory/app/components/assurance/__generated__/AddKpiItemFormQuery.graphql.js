/**
 * @generated SignedSource<<41131ccd328f9b30c8be7f15782d44c8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AddKpiItemFormQuery$variables = {||};
export type AddKpiItemFormQueryVariables = AddKpiItemFormQuery$variables;
export type AddKpiItemFormQuery$data = {|
  +domains: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
  +kpiCategories: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type AddKpiItemFormQueryResponse = AddKpiItemFormQuery$data;
export type AddKpiItemFormQuery = {|
  variables: AddKpiItemFormQueryVariables,
  response: AddKpiItemFormQuery$data,
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
    "concreteType": "DomainConnection",
    "kind": "LinkedField",
    "name": "domains",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "DomainEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Domain",
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
    "concreteType": "KpiCategoryConnection",
    "kind": "LinkedField",
    "name": "kpiCategories",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "KpiCategoryEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "KpiCategory",
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
    "name": "AddKpiItemFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddKpiItemFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d4ba49dcb54af221bbc02e7eedf3446a",
    "id": null,
    "metadata": {},
    "name": "AddKpiItemFormQuery",
    "operationKind": "query",
    "text": "query AddKpiItemFormQuery {\n  domains {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kpiCategories {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "d2a79148942321c79becab0350370027";

module.exports = ((node/*: any*/)/*: Query<
  AddKpiItemFormQuery$variables,
  AddKpiItemFormQuery$data,
>*/);
