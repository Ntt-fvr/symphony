/**
 * @generated SignedSource<<d0b47879786b62040fe5c677d483ac2b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type PowerSearchServiceTypeFilterQuery$variables = {||};
export type PowerSearchServiceTypeFilterQueryVariables = PowerSearchServiceTypeFilterQuery$variables;
export type PowerSearchServiceTypeFilterQuery$data = {|
  +serviceTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type PowerSearchServiceTypeFilterQueryResponse = PowerSearchServiceTypeFilterQuery$data;
export type PowerSearchServiceTypeFilterQuery = {|
  variables: PowerSearchServiceTypeFilterQueryVariables,
  response: PowerSearchServiceTypeFilterQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ServiceTypeConnection",
    "kind": "LinkedField",
    "name": "serviceTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ServiceTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceType",
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
    "name": "PowerSearchServiceTypeFilterQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PowerSearchServiceTypeFilterQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1553972375b04675b518584533a9f34b",
    "id": null,
    "metadata": {},
    "name": "PowerSearchServiceTypeFilterQuery",
    "operationKind": "query",
    "text": "query PowerSearchServiceTypeFilterQuery {\n  serviceTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "ebdb1c8cdda43f146996b652ad2e046c";

module.exports = ((node/*: any*/)/*: Query<
  PowerSearchServiceTypeFilterQuery$variables,
  PowerSearchServiceTypeFilterQuery$data,
>*/);
