/**
 * @generated SignedSource<<36c6db448a4750d3cf66190d3707a092>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type PermissionValue = "YES" | "NO" | "BY_CONDITION" | "%future added value";
export type UserRole = "USER" | "ADMIN" | "OWNER" | "%future added value";
export type UserStatus = "ACTIVE" | "DEACTIVATED" | "%future added value";
export type UsersGroupStatus = "ACTIVE" | "DEACTIVATED" | "%future added value";
export type UpdateUserGroupsInput = {|
  id: string,
  addGroupIds: $ReadOnlyArray<string>,
  removeGroupIds: $ReadOnlyArray<string>,
|};
export type UpdateUserGroupsMutation$variables = {|
  input: UpdateUserGroupsInput,
|};
export type UpdateUserGroupsMutationVariables = UpdateUserGroupsMutation$variables;
export type UpdateUserGroupsMutation$data = {|
  +updateUserGroups: {|
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
    +groups: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +description: ?string,
      +status: UsersGroupStatus,
      +members: $ReadOnlyArray<{|
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
      +policies: $ReadOnlyArray<{|
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
    |}>,
  |},
|};
export type UpdateUserGroupsMutationResponse = UpdateUserGroupsMutation$data;
export type UpdateUserGroupsMutation = {|
  variables: UpdateUserGroupsMutationVariables,
  response: UpdateUserGroupsMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "authID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Organization",
  "kind": "LinkedField",
  "name": "organizationFk",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/)
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAllowed",
  "storageKey": null
},
v12 = [
  (v11/*: any*/)
],
v13 = [
  (v11/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "propertyCategoryIds",
    "storageKey": null
  }
],
v14 = [
  (v11/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "documentCategoryIds",
    "storageKey": null
  }
],
v15 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "BasicPermissionRule",
    "kind": "LinkedField",
    "name": "create",
    "plural": false,
    "selections": (v12/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "BasicPermissionRule",
    "kind": "LinkedField",
    "name": "update",
    "plural": false,
    "selections": (v12/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "BasicPermissionRule",
    "kind": "LinkedField",
    "name": "delete",
    "plural": false,
    "selections": (v12/*: any*/),
    "storageKey": null
  }
],
v16 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "updateUserGroups",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v10/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UsersGroup",
        "kind": "LinkedField",
        "name": "groups",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "members",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PermissionsPolicy",
            "kind": "LinkedField",
            "name": "policies",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
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
                        "selections": (v12/*: any*/),
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
                            "selections": (v13/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PropertyCategoryPermissionRule",
                            "kind": "LinkedField",
                            "name": "create",
                            "plural": false,
                            "selections": (v13/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PropertyCategoryPermissionRule",
                            "kind": "LinkedField",
                            "name": "update",
                            "plural": false,
                            "selections": (v13/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PropertyCategoryPermissionRule",
                            "kind": "LinkedField",
                            "name": "delete",
                            "plural": false,
                            "selections": (v13/*: any*/),
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
                            "selections": (v14/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DocumentCategoryPermissionRule",
                            "kind": "LinkedField",
                            "name": "create",
                            "plural": false,
                            "selections": (v14/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DocumentCategoryPermissionRule",
                            "kind": "LinkedField",
                            "name": "update",
                            "plural": false,
                            "selections": (v14/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DocumentCategoryPermissionRule",
                            "kind": "LinkedField",
                            "name": "delete",
                            "plural": false,
                            "selections": (v14/*: any*/),
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
                            "selections": (v12/*: any*/),
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
                              (v11/*: any*/),
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
                            "selections": (v12/*: any*/),
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
                        "selections": (v15/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CUD",
                        "kind": "LinkedField",
                        "name": "equipmentType",
                        "plural": false,
                        "selections": (v15/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CUD",
                        "kind": "LinkedField",
                        "name": "locationType",
                        "plural": false,
                        "selections": (v15/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CUD",
                        "kind": "LinkedField",
                        "name": "portType",
                        "plural": false,
                        "selections": (v15/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CUD",
                        "kind": "LinkedField",
                        "name": "serviceType",
                        "plural": false,
                        "selections": (v15/*: any*/),
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
                          (v11/*: any*/),
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
                        "selections": (v15/*: any*/),
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
                            "selections": (v12/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "WorkforcePermissionRule",
                            "kind": "LinkedField",
                            "name": "update",
                            "plural": false,
                            "selections": (v12/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "WorkforcePermissionRule",
                            "kind": "LinkedField",
                            "name": "delete",
                            "plural": false,
                            "selections": (v12/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "WorkforcePermissionRule",
                            "kind": "LinkedField",
                            "name": "assign",
                            "plural": false,
                            "selections": (v12/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "WorkforcePermissionRule",
                            "kind": "LinkedField",
                            "name": "transferOwnership",
                            "plural": false,
                            "selections": (v12/*: any*/),
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
          }
        ],
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
    "name": "UpdateUserGroupsMutation",
    "selections": (v16/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateUserGroupsMutation",
    "selections": (v16/*: any*/)
  },
  "params": {
    "cacheID": "622780a9bc1b61365abff7822e8ffa6c",
    "id": null,
    "metadata": {},
    "name": "UpdateUserGroupsMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateUserGroupsMutation(\n  $input: UpdateUserGroupsInput!\n) {\n  updateUserGroups(input: $input) {\n    id\n    authID\n    firstName\n    lastName\n    email\n    status\n    role\n    organizationFk {\n      id\n      name\n      description\n    }\n    groups {\n      id\n      name\n      description\n      status\n      members {\n        id\n        authID\n        firstName\n        lastName\n        email\n        status\n        role\n        organizationFk {\n          id\n          name\n          description\n        }\n      }\n      policies {\n        id\n        name\n        description\n        isGlobal\n        policy {\n          __typename\n          ... on InventoryPolicy {\n            read {\n              isAllowed\n            }\n            propertyCategory {\n              read {\n                isAllowed\n                propertyCategoryIds\n              }\n              create {\n                isAllowed\n                propertyCategoryIds\n              }\n              update {\n                isAllowed\n                propertyCategoryIds\n              }\n              delete {\n                isAllowed\n                propertyCategoryIds\n              }\n            }\n            documentCategory {\n              locationTypeID\n              read {\n                isAllowed\n                documentCategoryIds\n              }\n              create {\n                isAllowed\n                documentCategoryIds\n              }\n              update {\n                isAllowed\n                documentCategoryIds\n              }\n              delete {\n                isAllowed\n                documentCategoryIds\n              }\n            }\n            location {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n                locationTypeIds\n              }\n              delete {\n                isAllowed\n              }\n            }\n            equipment {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            equipmentType {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            locationType {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            portType {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            serviceType {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n          }\n          ... on WorkforcePolicy {\n            read {\n              isAllowed\n              projectTypeIds\n              workOrderTypeIds\n              organizationIds\n            }\n            templates {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n            }\n            data {\n              create {\n                isAllowed\n              }\n              update {\n                isAllowed\n              }\n              delete {\n                isAllowed\n              }\n              assign {\n                isAllowed\n              }\n              transferOwnership {\n                isAllowed\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "d962a2af28a5a6e685cd654d513fbc80";

module.exports = ((node/*: any*/)/*: Mutation<
  UpdateUserGroupsMutation$variables,
  UpdateUserGroupsMutation$data,
>*/);
