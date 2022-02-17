/**
 * @generated SignedSource<<7fdcc9ed729495fd06e24071a3c00da9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AddThresholdItemFormQuery$variables = {||};
export type AddThresholdItemFormQueryVariables = AddThresholdItemFormQuery$variables;
export type AddThresholdItemFormQuery$data = {|
  +kpis: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type AddThresholdItemFormQueryResponse = AddThresholdItemFormQuery$data;
export type AddThresholdItemFormQuery = {|
  variables: AddThresholdItemFormQueryVariables,
  response: AddThresholdItemFormQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddThresholdItemFormQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddThresholdItemFormQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5df6ae5d09808fba3b500e50e3898348",
    "id": null,
    "metadata": {},
    "name": "AddThresholdItemFormQuery",
    "operationKind": "query",
    "text": "query AddThresholdItemFormQuery {\n  kpis {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "ddec98e7f7695cb7526c0b586fe52e17";

module.exports = ((node/*: any*/)/*: Query<
  AddThresholdItemFormQuery$variables,
  AddThresholdItemFormQuery$data,
>*/);
