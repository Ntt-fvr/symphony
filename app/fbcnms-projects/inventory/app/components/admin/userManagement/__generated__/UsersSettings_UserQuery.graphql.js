/**
 * @generated SignedSource<<4e7ce112f3ed82c95b2930ecbc7e59c4>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type UsersSettings_UserQuery$variables = {|
  authID: string,
|};
export type UsersSettings_UserQueryVariables = UsersSettings_UserQuery$variables;
export type UsersSettings_UserQuery$data = {|
  +user: ?{|
    +id: string,
  |},
|};
export type UsersSettings_UserQueryResponse = UsersSettings_UserQuery$data;
export type UsersSettings_UserQuery = {|
  variables: UsersSettings_UserQueryVariables,
  response: UsersSettings_UserQuery$data,
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
    "name": "UsersSettings_UserQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersSettings_UserQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c482acfcb83a03f3eefe2d11406b7f2c",
    "id": null,
    "metadata": {},
    "name": "UsersSettings_UserQuery",
    "operationKind": "query",
    "text": "query UsersSettings_UserQuery(\n  $authID: String!\n) {\n  user(authID: $authID) {\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "8bb8a3865034e4ca2fdbf08976b0f1ca";

module.exports = ((node/*: any*/)/*: Query<
  UsersSettings_UserQuery$variables,
  UsersSettings_UserQuery$data,
>*/);
