/**
 * @generated SignedSource<<52c57736d82e5bf3eb011f40b20d47e8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type PowerSearchWorkOrderGeneralUserFilterIDsQuery$variables = {|
  id: string,
|};
export type PowerSearchWorkOrderGeneralUserFilterIDsQueryVariables = PowerSearchWorkOrderGeneralUserFilterIDsQuery$variables;
export type PowerSearchWorkOrderGeneralUserFilterIDsQuery$data = {|
  +node: ?{|
    +id?: string,
    +email?: string,
  |},
|};
export type PowerSearchWorkOrderGeneralUserFilterIDsQueryResponse = PowerSearchWorkOrderGeneralUserFilterIDsQuery$data;
export type PowerSearchWorkOrderGeneralUserFilterIDsQuery = {|
  variables: PowerSearchWorkOrderGeneralUserFilterIDsQueryVariables,
  response: PowerSearchWorkOrderGeneralUserFilterIDsQuery$data,
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
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PowerSearchWorkOrderGeneralUserFilterIDsQuery",
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
            "type": "User",
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
    "name": "PowerSearchWorkOrderGeneralUserFilterIDsQuery",
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
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "510964cc5837358c6fa2f1bba5301692",
    "id": null,
    "metadata": {},
    "name": "PowerSearchWorkOrderGeneralUserFilterIDsQuery",
    "operationKind": "query",
    "text": "query PowerSearchWorkOrderGeneralUserFilterIDsQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on User {\n      id\n      email\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "46680cb3247e4632e08a63153e09df71";

module.exports = ((node/*: any*/)/*: Query<
  PowerSearchWorkOrderGeneralUserFilterIDsQuery$variables,
  PowerSearchWorkOrderGeneralUserFilterIDsQuery$data,
>*/);
