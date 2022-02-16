/**
 * @generated SignedSource<<2f1547346c96accaac1a20c439daa2f5>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type PermissionValue = "YES" | "NO" | "BY_CONDITION" | "%future added value";
export type UserRole = "USER" | "ADMIN" | "OWNER" | "%future added value";
export type UserStatus = "ACTIVE" | "DEACTIVATED" | "%future added value";
export type UsersGroupStatus = "ACTIVE" | "DEACTIVATED" | "%future added value";
export type UsersGroupsSearchQuery$variables = {|
  groupId: string,
|};
export type UsersGroupsSearchQueryVariables = UsersGroupsSearchQuery$variables;
export type UsersGroupsSearchQuery$data = {|
  +group: ?{|
    +id?: string,
    +name?: string,
    +description?: ?string,
    +status?: UsersGroupStatus,
    +members?: $ReadOnlyArray<{|
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
    |}>,
    +policies?: $ReadOnlyArray<{|
      +id: string,
      +name: string,
      +description: ?string,
      +isGlobal: boolean,
      +policy: {|
        +__typename: "InventoryPolicy",
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
      |} | {|
        +__typename: "WorkforcePolicy",
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
      |} | {|
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        +__typename: "%other",
      |},
    |}>,
  |},
|};
export type UsersGroupsSearchQueryResponse = UsersGroupsSearchQuery$data;
export type UsersGroupsSearchQuery = {|
  variables: UsersGroupsSearchQueryVariables,
  response: UsersGroupsSearchQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "groupId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "groupId"
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "members",
  "plural": true,
  "selections": [
    (v2/*: any*/),
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
    (v5/*: any*/),
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
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAllowed",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = [
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "propertyCategoryIds",
    "storageKey": null
  }
],
v11 = [
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "documentCategoryIds",
    "storageKey": null
  }
],
v12 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "BasicPermissionRule",
    "kind": "LinkedField",
    "name": "create",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "BasicPermissionRule",
    "kind": "LinkedField",
    "name": "update",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "BasicPermissionRule",
    "kind": "LinkedField",
    "name": "delete",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  }
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "PermissionsPolicy",
  "kind": "LinkedField",
  "name": "policies",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isGlobal",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "policy",
      "plural": false,
      "selections": [
        (v7/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "BasicPermissionRule",
              "kind": "LinkedField",
              "name": "read",
              "plural": false,
              "selections": (v9/*: any*/),
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
                  "selections": (v10/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PropertyCategoryPermissionRule",
                  "kind": "LinkedField",
                  "name": "create",
                  "plural": false,
                  "selections": (v10/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PropertyCategoryPermissionRule",
                  "kind": "LinkedField",
                  "name": "update",
                  "plural": false,
                  "selections": (v10/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PropertyCategoryPermissionRule",
                  "kind": "LinkedField",
                  "name": "delete",
                  "plural": false,
                  "selections": (v10/*: any*/),
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
                  "selections": (v11/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "DocumentCategoryPermissionRule",
                  "kind": "LinkedField",
                  "name": "create",
                  "plural": false,
                  "selections": (v11/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "DocumentCategoryPermissionRule",
                  "kind": "LinkedField",
                  "name": "update",
                  "plural": false,
                  "selections": (v11/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "DocumentCategoryPermissionRule",
                  "kind": "LinkedField",
                  "name": "delete",
                  "plural": false,
                  "selections": (v11/*: any*/),
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
                  "selections": (v9/*: any*/),
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
                    (v8/*: any*/),
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
                  "selections": (v9/*: any*/),
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
              "selections": (v12/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CUD",
              "kind": "LinkedField",
              "name": "equipmentType",
              "plural": false,
              "selections": (v12/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CUD",
              "kind": "LinkedField",
              "name": "locationType",
              "plural": false,
              "selections": (v12/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CUD",
              "kind": "LinkedField",
              "name": "portType",
              "plural": false,
              "selections": (v12/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CUD",
              "kind": "LinkedField",
              "name": "serviceType",
              "plural": false,
              "selections": (v12/*: any*/),
              "storageKey": null
            }
          ],
          "type": "InventoryPolicy",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "WorkforcePermissionRule",
              "kind": "LinkedField",
              "name": "read",
              "plural": false,
              "selections": [
                (v8/*: any*/),
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
              "selections": (v12/*: any*/),
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
                  "selections": (v9/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "WorkforcePermissionRule",
                  "kind": "LinkedField",
                  "name": "update",
                  "plural": false,
                  "selections": (v9/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "WorkforcePermissionRule",
                  "kind": "LinkedField",
                  "name": "delete",
                  "plural": false,
                  "selections": (v9/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "WorkforcePermissionRule",
                  "kind": "LinkedField",
                  "name": "assign",
                  "plural": false,
                  "selections": (v9/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "WorkforcePermissionRule",
                  "kind": "LinkedField",
                  "name": "transferOwnership",
                  "plural": false,
                  "selections": (v9/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "type": "WorkforcePolicy",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersGroupsSearchQuery",
    "selections": [
      {
        "alias": "group",
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v13/*: any*/)
            ],
            "type": "UsersGroup",
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
    "name": "UsersGroupsSearchQuery",
    "selections": [
      {
        "alias": "group",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v13/*: any*/)
            ],
            "type": "UsersGroup",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d1b017cfdaccb0772c1d505138539159",
    "id": null,
    "metadata": {},
    "name": "UsersGroupsSearchQuery",
    "operationKind": "query",
    "text": "query UsersGroupsSearchQuery(\n  $groupId: ID!\n) {\n  group: node(id: $groupId) {\n    __typename\n    ... on UsersGroup {\n      id\n      name\n      description\n      status\n      members {\n        id\n        authID\n        firstName\n        lastName\n        email\n        status\n        role\n        organizationFk {\n          id\n          name\n          description\n        }\n      }\n      policies {\n        id\n        name\n        description\n        isGlobal\n        policy {\n          __typename\n          ... on InventoryPolicy {\n            read {\n              isAllowed\n            }\n            propertyCategory {\n              read {\n                isAllowed\n                propertyCategoryIds\n              }\n              create {\n                isAllowed\n                propertyCategoryIds\n              }\n              update {\n                isAllowed\n                propertyCategoryIds\n              }\n              delete {\n                isAllowed\n                propertyCategoryIds\n              }\n            }\n            documentCategory {\n              locationTypeID\n              read {\n                isAllowed\n                documentCategoryIds\n              }\n              create {\n                isAllowed\n                documentCategoryIds\n              }\n              update {\n                isAllowed\n                documentCategoryIds\n              }\n              delete {\n                isAllowed\n                documentCategoryIds\n              }\n            }\n            location {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n                locationTypeIds\n              }\n              delete {\n                isAllowed\n              }\n            }\n            equipment {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            equipmentType {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            locationType {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            portType {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            serviceType {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n          }\n          ... on WorkforcePolicy {\n            read {\n              isAllowed\n              projectTypeIds\n              workOrderTypeIds\n              organizationIds\n            }\n            templates {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            data {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n              assign {\n                isAllowed\n              }\n              transferOwnership {\n                isAllowed\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "6b76f64da893c0909e6055019aa7399f";

module.exports = ((node/*: any*/)/*: Query<
  UsersGroupsSearchQuery$variables,
  UsersGroupsSearchQuery$data,
>*/);
