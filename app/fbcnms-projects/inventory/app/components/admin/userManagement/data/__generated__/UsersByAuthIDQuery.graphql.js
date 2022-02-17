/**
 * @generated SignedSource<<9ea8a8321abe54cff4211ae9731780a8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type UsersByAuthIDQuery$variables = {|
  authID: string,
|};
export type UsersByAuthIDQueryVariables = UsersByAuthIDQuery$variables;
export type UsersByAuthIDQuery$data = {|
  +user: ?{|
    +id: string,
  |},
|};
export type UsersByAuthIDQueryResponse = UsersByAuthIDQuery$data;
export type UsersByAuthIDQuery = {|
  variables: UsersByAuthIDQueryVariables,
  response: UsersByAuthIDQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "authID"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "authID",
        "variableName": "authID"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "UsersByAuthIDQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersByAuthIDQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b290fe9119bb1d17416d9065d8be0b6d",
    "id": null,
    "metadata": {},
    "name": "UsersByAuthIDQuery",
    "operationKind": "query",
    "text": "query UsersByAuthIDQuery(\n  $authID: String!\n) {\n  user(authID: $authID) {\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "a242fdd9ce8fb33496aab66755ad0186";

module.exports = ((node/*: any*/)/*: Query<
  UsersByAuthIDQuery$variables,
  UsersByAuthIDQuery$data,
>*/);
