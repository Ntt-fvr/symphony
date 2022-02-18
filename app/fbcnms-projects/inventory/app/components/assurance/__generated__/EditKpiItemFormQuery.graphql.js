/**
 * @generated SignedSource<<2bd51858f7b45a7a3cab3fa647120588>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type EditKpiItemFormQuery$variables = {||};
export type EditKpiItemFormQueryVariables = EditKpiItemFormQuery$variables;
export type EditKpiItemFormQuery$data = {|
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
export type EditKpiItemFormQueryResponse = EditKpiItemFormQuery$data;
export type EditKpiItemFormQuery = {|
  variables: EditKpiItemFormQueryVariables,
  response: EditKpiItemFormQuery$data,
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
    "name": "EditKpiItemFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EditKpiItemFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "04aeed5aaf4e00a8fbed9928e6b2414a",
    "id": null,
    "metadata": {},
    "name": "EditKpiItemFormQuery",
    "operationKind": "query",
    "text": "query EditKpiItemFormQuery {\n  domains {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  kpiCategories {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "11eeb6fdb480b15b394e28ea9c3d3820";

module.exports = ((node/*: any*/)/*: Query<
  EditKpiItemFormQuery$variables,
  EditKpiItemFormQuery$data,
>*/);
