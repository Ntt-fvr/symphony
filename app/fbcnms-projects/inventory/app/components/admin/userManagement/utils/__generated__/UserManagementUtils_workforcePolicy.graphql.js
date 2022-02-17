/**
 * @generated SignedSource<<a202a52c86996ed2917373b5805a49df>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type PermissionValue = "YES" | "NO" | "BY_CONDITION" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type UserManagementUtils_workforcePolicy$fragmentType: FragmentType;
export type UserManagementUtils_workforcePolicy$ref = UserManagementUtils_workforcePolicy$fragmentType;
export type UserManagementUtils_workforcePolicy$data = {|
  +read: {|
    +isAllowed: PermissionValue,
    +projectTypeIds: ?$ReadOnlyArray<string>,
    +workOrderTypeIds: ?$ReadOnlyArray<string>,
    +organizationIds: ?$ReadOnlyArray<string>,
  |},
  +templates: {|
    +create: {|
      +isAllowed: PermissionValue,
    |},
    +update: {|
      +isAllowed: PermissionValue,
    |},
    +delete: {|
      +isAllowed: PermissionValue,
    |},
  |},
  +data: {|
    +create: {|
      +isAllowed: PermissionValue,
    |},
    +update: {|
      +isAllowed: PermissionValue,
    |},
    +delete: {|
      +isAllowed: PermissionValue,
    |},
    +assign: {|
      +isAllowed: PermissionValue,
    |},
    +transferOwnership: {|
      +isAllowed: PermissionValue,
    |},
  |},
  +$fragmentType: UserManagementUtils_workforcePolicy$fragmentType,
|};
export type UserManagementUtils_workforcePolicy = UserManagementUtils_workforcePolicy$data;
export type UserManagementUtils_workforcePolicy$key = {
  +$data?: UserManagementUtils_workforcePolicy$data,
  +$fragmentSpreads: UserManagementUtils_workforcePolicy$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAllowed",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserManagementUtils_workforcePolicy",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "WorkforcePermissionRule",
      "kind": "LinkedField",
      "name": "read",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "projectTypeIds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "workOrderTypeIds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "organizationIds",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "templates",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "BasicPermissionRule",
          "kind": "LinkedField",
          "name": "create",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "BasicPermissionRule",
          "kind": "LinkedField",
          "name": "update",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "BasicPermissionRule",
          "kind": "LinkedField",
          "name": "delete",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "WorkforceCUD",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "WorkforcePermissionRule",
          "kind": "LinkedField",
          "name": "create",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "WorkforcePermissionRule",
          "kind": "LinkedField",
          "name": "update",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "WorkforcePermissionRule",
          "kind": "LinkedField",
          "name": "delete",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "WorkforcePermissionRule",
          "kind": "LinkedField",
          "name": "assign",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "WorkforcePermissionRule",
          "kind": "LinkedField",
          "name": "transferOwnership",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "WorkforcePolicy",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "6e0ede76cc84c737b1384c598f467940";

module.exports = ((node/*: any*/)/*: Fragment<
  UserManagementUtils_workforcePolicy$fragmentType,
  UserManagementUtils_workforcePolicy$data,
>*/);
