/**
 * @generated SignedSource<<8e417fd6eb03430caf588bb48cfb455e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type UserRole = "USER" | "ADMIN" | "OWNER" | "%future added value";
export type UserStatus = "ACTIVE" | "DEACTIVATED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type UserManagementUtils_user_base$fragmentType: FragmentType;
export type UserManagementUtils_user_base$ref = UserManagementUtils_user_base$fragmentType;
export type UserManagementUtils_user_base$data = {|
  +id: string,
  +authID: string,
  +firstName: string,
  +lastName: string,
  +email: string,
  +status: UserStatus,
  +role: UserRole,
  +organizationFk: ?{|
    +id: string,
    +name: string,
    +description: string,
  |},
  +$fragmentType: UserManagementUtils_user_base$fragmentType,
|};
export type UserManagementUtils_user_base = UserManagementUtils_user_base$data;
export type UserManagementUtils_user_base$key = {
  +$data?: UserManagementUtils_user_base$data,
  +$fragmentSpreads: UserManagementUtils_user_base$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserManagementUtils_user_base",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "authID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "role",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Organization",
      "kind": "LinkedField",
      "name": "organizationFk",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
  "type": "User",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "20143f6c92b471235fe14ed3582d51ed";

module.exports = ((node/*: any*/)/*: Fragment<
  UserManagementUtils_user_base$fragmentType,
  UserManagementUtils_user_base$data,
>*/);
