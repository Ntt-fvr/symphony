/**
 * @generated SignedSource<<98970d92e323bf7e552aca205ba53d96>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type UsersGroupStatus = "ACTIVE" | "DEACTIVATED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type UserManagementUtils_group_base$fragmentType: FragmentType;
export type UserManagementUtils_group_base$ref = UserManagementUtils_group_base$fragmentType;
export type UserManagementUtils_group_base$data = {|
  +id: string,
  +name: string,
  +description: ?string,
  +status: UsersGroupStatus,
  +$fragmentType: UserManagementUtils_group_base$fragmentType,
|};
export type UserManagementUtils_group_base = UserManagementUtils_group_base$data;
export type UserManagementUtils_group_base$key = {
  +$data?: UserManagementUtils_group_base$data,
  +$fragmentSpreads: UserManagementUtils_group_base$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserManagementUtils_group_base",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "UsersGroup",
  "abstractKey": null
};

(node/*: any*/).hash = "f8f72157e01583f91e7d865430b1f224";

module.exports = ((node/*: any*/)/*: Fragment<
  UserManagementUtils_group_base$fragmentType,
  UserManagementUtils_group_base$data,
>*/);
