/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type PermissionValue = "BY_CONDITION" | "NO" | "YES" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type UserManagementUtils_inventoryPolicy$ref: FragmentReference;
declare export opaque type UserManagementUtils_inventoryPolicy$fragmentType: UserManagementUtils_inventoryPolicy$ref;
export type UserManagementUtils_inventoryPolicy = {|
  +read: {|
    +isAllowed: PermissionValue
  |},
  +documentCategory: {|
    +locationTypeID: ?number,
    +read: ?{|
      +isAllowed: PermissionValue,
      +documentCategoryIds: ?$ReadOnlyArray<string>,
    |},
    +create: ?{|
      +isAllowed: PermissionValue,
      +documentCategoryIds: ?$ReadOnlyArray<string>,
    |},
    +update: ?{|
      +isAllowed: PermissionValue,
      +documentCategoryIds: ?$ReadOnlyArray<string>,
    |},
    +delete: ?{|
      +isAllowed: PermissionValue,
      +documentCategoryIds: ?$ReadOnlyArray<string>,
    |},
  |},
  +location: {|
    +create: {|
      +isAllowed: PermissionValue
    |},
    +update: {|
      +isAllowed: PermissionValue,
      +locationTypeIds: ?$ReadOnlyArray<string>,
    |},
    +delete: {|
      +isAllowed: PermissionValue
    |},
  |},
  +equipment: {|
    +create: {|
      +isAllowed: PermissionValue
    |},
    +update: {|
      +isAllowed: PermissionValue
    |},
    +delete: {|
      +isAllowed: PermissionValue
    |},
  |},
  +equipmentType: {|
    +create: {|
      +isAllowed: PermissionValue
    |},
    +update: {|
      +isAllowed: PermissionValue
    |},
    +delete: {|
      +isAllowed: PermissionValue
    |},
  |},
  +locationType: {|
    +create: {|
      +isAllowed: PermissionValue
    |},
    +update: {|
      +isAllowed: PermissionValue
    |},
    +delete: {|
      +isAllowed: PermissionValue
    |},
  |},
  +portType: {|
    +create: {|
      +isAllowed: PermissionValue
    |},
    +update: {|
      +isAllowed: PermissionValue
    |},
    +delete: {|
      +isAllowed: PermissionValue
    |},
  |},
  +serviceType: {|
    +create: {|
      +isAllowed: PermissionValue
    |},
    +update: {|
      +isAllowed: PermissionValue
    |},
    +delete: {|
      +isAllowed: PermissionValue
    |},
  |},
  +$refType: UserManagementUtils_inventoryPolicy$ref,
|};
export type UserManagementUtils_inventoryPolicy$data = UserManagementUtils_inventoryPolicy;
export type UserManagementUtils_inventoryPolicy$key = {
  +$data?: UserManagementUtils_inventoryPolicy$data,
  +$fragmentRefs: UserManagementUtils_inventoryPolicy$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAllowed",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
],
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "documentCategoryIds",
    "storageKey": null
  }
],
v3 = [
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserManagementUtils_inventoryPolicy",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "BasicPermissionRule",
      "kind": "LinkedField",
      "name": "read",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DocumentCategoryCUD",
      "kind": "LinkedField",
      "name": "documentCategory",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationTypeID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DocumentCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "read",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DocumentCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "create",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DocumentCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "update",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DocumentCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "delete",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationCUD",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationPermissionRule",
          "kind": "LinkedField",
          "name": "create",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationPermissionRule",
          "kind": "LinkedField",
          "name": "update",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "locationTypeIds",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationPermissionRule",
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
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "equipment",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "equipmentType",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "locationType",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "portType",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "serviceType",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "type": "InventoryPolicy",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '1496aad8ce54552fd5e2a7ddea6c0f72';

module.exports = node;
