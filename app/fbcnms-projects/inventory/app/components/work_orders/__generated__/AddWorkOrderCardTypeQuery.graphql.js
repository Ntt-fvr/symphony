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
import type { ConcreteRequest } from 'relay-runtime';
export type CheckListItemEnumSelectionMode = "multiple" | "single" | "%future added value";
export type CheckListItemType = "cell_scan" | "enum" | "files" | "simple" | "string" | "wifi_scan" | "yes_no" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type AddWorkOrderCardTypeQueryVariables = {|
  workOrderTypeId: string
|};
export type AddWorkOrderCardTypeQueryResponse = {|
  +workOrderType: ?({|
    +__typename: "WorkOrderType",
    +id: string,
    +name: string,
    +description: ?string,
    +propertyTypes: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +type: PropertyKind,
      +nodeType: ?string,
      +index: ?number,
      +stringValue: ?string,
      +intValue: ?number,
      +booleanValue: ?boolean,
      +floatValue: ?number,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +rangeFromValue: ?number,
      +rangeToValue: ?number,
      +isEditable: ?boolean,
      +isMandatory: ?boolean,
      +isInstanceProperty: ?boolean,
      +isDeleted: ?boolean,
      +category: ?string,
      +dependencePropertyTypes: $ReadOnlyArray<?{|
        +id: string,
        +name: string,
        +type: PropertyKind,
        +nodeType: ?string,
        +index: ?number,
        +stringValue: ?string,
        +intValue: ?number,
        +booleanValue: ?boolean,
        +floatValue: ?number,
        +latitudeValue: ?number,
        +longitudeValue: ?number,
        +rangeFromValue: ?number,
        +rangeToValue: ?number,
        +isEditable: ?boolean,
        +isMandatory: ?boolean,
        +isInstanceProperty: ?boolean,
        +isDeleted: ?boolean,
        +category: ?string,
        +propertyTypeValues: ?$ReadOnlyArray<{|
          +id: string,
          +name: string,
          +propertyTypeValues: ?$ReadOnlyArray<?{|
            +id: string,
            +name: string,
          |}>,
        |}>,
      |}>,
    |}>,
    +checkListCategoryDefinitions: $ReadOnlyArray<{|
      +id: string,
      +title: string,
      +description: ?string,
      +checklistItemDefinitions: $ReadOnlyArray<{|
        +id: string,
        +title: string,
        +type: CheckListItemType,
        +index: ?number,
        +isMandatory: ?boolean,
        +enumValues: ?string,
        +enumSelectionMode: ?CheckListItemEnumSelectionMode,
        +helpText: ?string,
      |}>,
    |}>,
  |} | {|
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    +__typename: "%other"
  |})
|};
export type AddWorkOrderCardTypeQuery = {|
  variables: AddWorkOrderCardTypeQueryVariables,
  response: AddWorkOrderCardTypeQueryResponse,
|};
*/


/*
query AddWorkOrderCardTypeQuery(
  $workOrderTypeId: ID!
) {
  workOrderType: node(id: $workOrderTypeId) {
    __typename
    ... on WorkOrderType {
      id
      name
      description
      propertyTypes {
        id
        name
        type
        nodeType
        index
        stringValue
        intValue
        booleanValue
        floatValue
        latitudeValue
        longitudeValue
        rangeFromValue
        rangeToValue
        isEditable
        isMandatory
        isInstanceProperty
        isDeleted
        category
        dependencePropertyTypes {
          id
          name
          type
          nodeType
          index
          stringValue
          intValue
          booleanValue
          floatValue
          latitudeValue
          longitudeValue
          rangeFromValue
          rangeToValue
          isEditable
          isMandatory
          isInstanceProperty
          isDeleted
          category
          propertyTypeValues {
            id
            name
            propertyTypeValues {
              id
              name
            }
          }
        }
      }
      checkListCategoryDefinitions {
        id
        title
        description
        checklistItemDefinitions {
          id
          title
          type
          index
          isMandatory
          enumValues
          enumSelectionMode
          helpText
        }
      }
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "workOrderTypeId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "workOrderTypeId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeType",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isEditable",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMandatory",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInstanceProperty",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyType",
  "kind": "LinkedField",
  "name": "propertyTypes",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/),
    (v14/*: any*/),
    (v15/*: any*/),
    (v16/*: any*/),
    (v17/*: any*/),
    (v18/*: any*/),
    (v19/*: any*/),
    (v20/*: any*/),
    (v21/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "dependencePropertyTypes",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        (v4/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/),
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/),
        (v17/*: any*/),
        (v18/*: any*/),
        (v19/*: any*/),
        (v20/*: any*/),
        (v21/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyTypeValue",
          "kind": "LinkedField",
          "name": "propertyTypeValues",
          "plural": true,
          "selections": [
            (v3/*: any*/),
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "PropertyTypeValue",
              "kind": "LinkedField",
              "name": "propertyTypeValues",
              "plural": true,
              "selections": [
                (v3/*: any*/),
                (v4/*: any*/)
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
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "CheckListCategoryDefinition",
  "kind": "LinkedField",
  "name": "checkListCategoryDefinitions",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v23/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "CheckListItemDefinition",
      "kind": "LinkedField",
      "name": "checklistItemDefinitions",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        (v23/*: any*/),
        (v6/*: any*/),
        (v8/*: any*/),
        (v18/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "enumValues",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "enumSelectionMode",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "helpText",
          "storageKey": null
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
    "name": "AddWorkOrderCardTypeQuery",
    "selections": [
      {
        "alias": "workOrderType",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v22/*: any*/),
              (v24/*: any*/)
            ],
            "type": "WorkOrderType",
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
    "name": "AddWorkOrderCardTypeQuery",
    "selections": [
      {
        "alias": "workOrderType",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v22/*: any*/),
              (v24/*: any*/)
            ],
            "type": "WorkOrderType",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a1665af0c48f0a892ccffd3d6bdb50e8",
    "id": null,
    "metadata": {},
    "name": "AddWorkOrderCardTypeQuery",
    "operationKind": "query",
    "text": "query AddWorkOrderCardTypeQuery(\n  $workOrderTypeId: ID!\n) {\n  workOrderType: node(id: $workOrderTypeId) {\n    __typename\n    ... on WorkOrderType {\n      id\n      name\n      description\n      propertyTypes {\n        id\n        name\n        type\n        nodeType\n        index\n        stringValue\n        intValue\n        booleanValue\n        floatValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        isEditable\n        isMandatory\n        isInstanceProperty\n        isDeleted\n        category\n        dependencePropertyTypes {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isMandatory\n          isInstanceProperty\n          isDeleted\n          category\n          propertyTypeValues {\n            id\n            name\n            propertyTypeValues {\n              id\n              name\n            }\n          }\n        }\n      }\n      checkListCategoryDefinitions {\n        id\n        title\n        description\n        checklistItemDefinitions {\n          id\n          title\n          type\n          index\n          isMandatory\n          enumValues\n          enumSelectionMode\n          helpText\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7b2a5ac4a5b0a5d2e09c5cfd0f4afbd3';

module.exports = node;
