/**
 * @generated SignedSource<<aebde9c11a6bdda36cab4869cbe8b444>>
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
declare export opaque type UserManagementUtils_inventoryPolicy$fragmentType: FragmentType;
export type UserManagementUtils_inventoryPolicy$ref = UserManagementUtils_inventoryPolicy$fragmentType;
export type UserManagementUtils_inventoryPolicy$data = {|
  +read: {|
    +isAllowed: PermissionValue,
  |},
  +propertyCategory: {|
    +read: ?{|
      +isAllowed: PermissionValue,
      +propertyCategoryIds: ?$ReadOnlyArray<string>,
    |},
    +create: ?{|
      +isAllowed: PermissionValue,
      +propertyCategoryIds: ?$ReadOnlyArray<string>,
    |},
    +update: ?{|
      +isAllowed: PermissionValue,
      +propertyCategoryIds: ?$ReadOnlyArray<string>,
    |},
    +delete: ?{|
      +isAllowed: PermissionValue,
      +propertyCategoryIds: ?$ReadOnlyArray<string>,
    |},
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
      +isAllowed: PermissionValue,
    |},
    +update: {|
      +isAllowed: PermissionValue,
      +locationTypeIds: ?$ReadOnlyArray<string>,
    |},
    +delete: {|
      +isAllowed: PermissionValue,
    |},
  |},
  +equipment: {|
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
  +equipmentType: {|
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
  +locationType: {|
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
  +portType: {|
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
  +serviceType: {|
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
  +$fragmentType: UserManagementUtils_inventoryPolicy$fragmentType,
|};
export type UserManagementUtils_inventoryPolicy = UserManagementUtils_inventoryPolicy$data;
export type UserManagementUtils_inventoryPolicy$key = {
  +$data?: UserManagementUtils_inventoryPolicy$data,
  +$fragmentSpreads: UserManagementUtils_inventoryPolicy$fragmentType,
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
],
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "propertyCategoryIds",
    "storageKey": null
  }
],
v3 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "documentCategoryIds",
    "storageKey": null
  }
],
v4 = [
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
      "concreteType": "PropertyCategoryCUD",
      "kind": "LinkedField",
      "name": "propertyCategory",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "read",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "create",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "update",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyCategoryPermissionRule",
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
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DocumentCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "create",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DocumentCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "update",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DocumentCategoryPermissionRule",
          "kind": "LinkedField",
          "name": "delete",
          "plural": false,
          "selections": (v3/*: any*/),
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
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "equipmentType",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "locationType",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "portType",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CUD",
      "kind": "LinkedField",
      "name": "serviceType",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    }
  ],
  "type": "InventoryPolicy",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "595c79fb3d9ff39b9d572bfc44274a12";

module.exports = ((node/*: any*/)/*: Fragment<
  UserManagementUtils_inventoryPolicy$fragmentType,
  UserManagementUtils_inventoryPolicy$data,
>*/);
