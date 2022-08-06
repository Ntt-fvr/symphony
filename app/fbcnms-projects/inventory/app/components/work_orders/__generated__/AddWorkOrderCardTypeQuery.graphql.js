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
      +parentPropertyType: ?{|
        +id: string,
        +name: string,
      |},
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
        +parentPropertyType: ?{|
          +id: string,
          +name: string,
        |},
        +propertyTypeValues: ?$ReadOnlyArray<{|
          +id: string,
          +isDeleted: ?boolean,
          +name: string,
          +parentPropertyTypeValue: ?$ReadOnlyArray<?{|
            +id: string,
            +isDeleted: ?boolean,
            +name: string,
          |}>,
        |}>,
      |}>,
      +propertyTypeValues: ?$ReadOnlyArray<{|
        +id: string,
        +isDeleted: ?boolean,
        +name: string,
        +parentPropertyTypeValue: ?$ReadOnlyArray<?{|
          +id: string,
          +isDeleted: ?boolean,
          +name: string,
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
        parentPropertyType {
          id
          name
        }
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
          parentPropertyType {
            id
            name
          }
          propertyTypeValues {
            id
            isDeleted
            name
            parentPropertyTypeValue {
              id
              isDeleted
              name
            }
          }
        }
        propertyTypeValues {
          id
          isDeleted
          name
          parentPropertyTypeValue {
            id
            isDeleted
            name
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
  "name": "parentPropertyType",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyTypeValue",
  "kind": "LinkedField",
  "name": "propertyTypeValues",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v20/*: any*/),
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyTypeValue",
      "kind": "LinkedField",
      "name": "parentPropertyTypeValue",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        (v20/*: any*/),
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v24 = {
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
    (v22/*: any*/),
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
        (v22/*: any*/),
        (v23/*: any*/)
      ],
      "storageKey": null
    },
    (v23/*: any*/)
  ],
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "concreteType": "CheckListCategoryDefinition",
  "kind": "LinkedField",
  "name": "checkListCategoryDefinitions",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v25/*: any*/),
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
        (v25/*: any*/),
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
              (v24/*: any*/),
              (v26/*: any*/)
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
              (v24/*: any*/),
              (v26/*: any*/)
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
    "cacheID": "519a0a00d5e59966edf534afc9e11ae9",
    "id": null,
    "metadata": {},
    "name": "AddWorkOrderCardTypeQuery",
    "operationKind": "query",
    "text": "query AddWorkOrderCardTypeQuery(\n  $workOrderTypeId: ID!\n) {\n  workOrderType: node(id: $workOrderTypeId) {\n    __typename\n    ... on WorkOrderType {\n      id\n      name\n      description\n      propertyTypes {\n        id\n        name\n        type\n        nodeType\n        index\n        stringValue\n        intValue\n        booleanValue\n        floatValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        isEditable\n        isMandatory\n        isInstanceProperty\n        isDeleted\n        category\n        parentPropertyType {\n          id\n          name\n        }\n        dependencePropertyTypes {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isMandatory\n          isInstanceProperty\n          isDeleted\n          category\n          parentPropertyType {\n            id\n            name\n          }\n          propertyTypeValues {\n            id\n            isDeleted\n            name\n            parentPropertyTypeValue {\n              id\n              isDeleted\n              name\n            }\n          }\n        }\n        propertyTypeValues {\n          id\n          isDeleted\n          name\n          parentPropertyTypeValue {\n            id\n            isDeleted\n            name\n          }\n        }\n      }\n      checkListCategoryDefinitions {\n        id\n        title\n        description\n        checklistItemDefinitions {\n          id\n          title\n          type\n          index\n          isMandatory\n          enumValues\n          enumSelectionMode\n          helpText\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '67734988768c1593f79eb3d3296172b7';

module.exports = node;
