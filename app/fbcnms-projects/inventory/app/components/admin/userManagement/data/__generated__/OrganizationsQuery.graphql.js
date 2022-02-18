/**
 * @generated SignedSource<<5d801786840fdbcd97efc5c142ce906e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type OrganizationsQuery$variables = {||};
export type OrganizationsQueryVariables = OrganizationsQuery$variables;
export type OrganizationsQuery$data = {|
  +organizations: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +description: string,
      |},
    |}>,
  |},
|};
export type OrganizationsQueryResponse = OrganizationsQuery$data;
export type OrganizationsQuery = {|
  variables: OrganizationsQueryVariables,
  response: OrganizationsQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "OrganizationConnection",
    "kind": "LinkedField",
    "name": "organizations",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "OrganizationEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Organization",
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
                "name": "description",
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
    "name": "OrganizationsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OrganizationsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a96ee3cf9dd412f691502666cbfde2e5",
    "id": null,
    "metadata": {},
    "name": "OrganizationsQuery",
    "operationKind": "query",
    "text": "query OrganizationsQuery {\n  organizations {\n    edges {\n      node {\n        id\n        name\n        description\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "4a1c59ed34170b2d33a06a610a3966e6";

module.exports = ((node/*: any*/)/*: Query<
  OrganizationsQuery$variables,
  OrganizationsQuery$data,
>*/);
