/**
 * @generated SignedSource<<7d41b558f190a43b285ad3fddff1d1e0>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type UserManagementUtils_organization$fragmentType: FragmentType;
export type UserManagementUtils_organization$ref = UserManagementUtils_organization$fragmentType;
export type UserManagementUtils_organization$data = {|
  +id: string,
  +name: string,
  +description: string,
  +$fragmentType: UserManagementUtils_organization$fragmentType,
|};
export type UserManagementUtils_organization = UserManagementUtils_organization$data;
export type UserManagementUtils_organization$key = {
  +$data?: UserManagementUtils_organization$data,
  +$fragmentSpreads: UserManagementUtils_organization$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserManagementUtils_organization",
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
  "type": "Organization",
  "abstractKey": null
};

(node/*: any*/).hash = "26720fc5121cc80da071d9893de50b7f";

module.exports = ((node/*: any*/)/*: Fragment<
  UserManagementUtils_organization$fragmentType,
  UserManagementUtils_organization$data,
>*/);
