/**
 * @generated SignedSource<<40c4e6d5592f770858e95df5990b3351>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type PowerSearchLocationFilterIDsQuery$variables = {|
  id: string,
|};
export type PowerSearchLocationFilterIDsQueryVariables = PowerSearchLocationFilterIDsQuery$variables;
export type PowerSearchLocationFilterIDsQuery$data = {|
  +node: ?{|
    +id?: string,
    +name?: string,
  |},
|};
export type PowerSearchLocationFilterIDsQueryResponse = PowerSearchLocationFilterIDsQuery$data;
export type PowerSearchLocationFilterIDsQuery = {|
  variables: PowerSearchLocationFilterIDsQueryVariables,
  response: PowerSearchLocationFilterIDsQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PowerSearchLocationFilterIDsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "type": "Location",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PowerSearchLocationFilterIDsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "Location",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "99ff31a437c3b6762bd2da72fb4519cb",
    "id": null,
    "metadata": {},
    "name": "PowerSearchLocationFilterIDsQuery",
    "operationKind": "query",
    "text": "query PowerSearchLocationFilterIDsQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Location {\n      id\n      name\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "bdfe75d0e508f3482de572d6b8948576";

module.exports = ((node/*: any*/)/*: Query<
  PowerSearchLocationFilterIDsQuery$variables,
  PowerSearchLocationFilterIDsQuery$data,
>*/);
