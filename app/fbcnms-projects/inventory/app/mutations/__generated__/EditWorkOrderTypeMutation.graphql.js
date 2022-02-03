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
type AddEditWorkOrderTypeCard_workOrderType$ref = any;
export type CheckListItemEnumSelectionMode = "multiple" | "single" | "%future added value";
export type CheckListItemType = "cell_scan" | "enum" | "files" | "simple" | "string" | "wifi_scan" | "yes_no" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type EditWorkOrderTypeInput = {|
  id: string,
  name: string,
  description?: ?string,
  properties?: ?$ReadOnlyArray<?PropertyTypeInput>,
  checkListCategories?: ?$ReadOnlyArray<CheckListCategoryDefinitionInput>,
  assigneeCanCompleteWorkOrder?: ?boolean,
  duration?: ?number,
|};
export type PropertyTypeInput = {|
  id?: ?string,
  externalId?: ?string,
  name: string,
  type: PropertyKind,
  nodeType?: ?string,
  index?: ?number,
  category?: ?string,
  stringValue?: ?string,
  intValue?: ?number,
  booleanValue?: ?boolean,
  floatValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  isMandatory?: ?boolean,
  isDeleted?: ?boolean,
  isListable?: ?boolean,
  propertyTypes?: ?$ReadOnlyArray<?PropertyTypeInput>,
  propertyTypeValues?: ?$ReadOnlyArray<?AddPropertyTypeValueInput>,
|};
export type AddPropertyTypeValueInput = {|
  id?: ?string,
  name: string,
  propertyType?: ?string,
  propertyTypeValue?: ?string,
  propertyTypeValues?: ?$ReadOnlyArray<?AddPropertyTypeValueInput>,
|};
export type CheckListCategoryDefinitionInput = {|
  id?: ?string,
  title: string,
  description?: ?string,
  checkList: $ReadOnlyArray<CheckListDefinitionInput>,
|};
export type CheckListDefinitionInput = {|
  id?: ?string,
  title: string,
  type: CheckListItemType,
  index?: ?number,
  isMandatory?: ?boolean,
  enumValues?: ?string,
  enumSelectionMode?: ?CheckListItemEnumSelectionMode,
  helpText?: ?string,
|};
export type EditWorkOrderTypeMutationVariables = {|
  input: EditWorkOrderTypeInput
|};
export type EditWorkOrderTypeMutationResponse = {|
  +editWorkOrderType: {|
    +id: string,
    +name: string,
    +description: ?string,
    +$fragmentRefs: AddEditWorkOrderTypeCard_workOrderType$ref,
  |}
|};
export type EditWorkOrderTypeMutation = {|
  variables: EditWorkOrderTypeMutationVariables,
  response: EditWorkOrderTypeMutationResponse,
|};
*/


/*
mutation EditWorkOrderTypeMutation(
  $input: EditWorkOrderTypeInput!
) {
  editWorkOrderType(input: $input) {
    id
    name
    description
    ...AddEditWorkOrderTypeCard_workOrderType
  }
}

fragment AddEditWorkOrderTypeCard_workOrderType on WorkOrderType {
  id
  name
  description
  assigneeCanCompleteWorkOrder
  numberOfWorkOrders
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
    propertyType {
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
      propertyTypeValue {
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "name": "type",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeType",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isEditable",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMandatory",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInstanceProperty",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditWorkOrderTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "WorkOrderType",
        "kind": "LinkedField",
        "name": "editWorkOrderType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddEditWorkOrderTypeCard_workOrderType"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditWorkOrderTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "WorkOrderType",
        "kind": "LinkedField",
        "name": "editWorkOrderType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "assigneeCanCompleteWorkOrder",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "numberOfWorkOrders",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PropertyType",
            "kind": "LinkedField",
            "name": "propertyTypes",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v5/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "concreteType": "PropertyType",
                "kind": "LinkedField",
                "name": "propertyType",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyTypeValue",
                    "kind": "LinkedField",
                    "name": "propertyTypeValue",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyTypeValue",
                        "kind": "LinkedField",
                        "name": "propertyTypeValues",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "concreteType": "CheckListCategoryDefinition",
            "kind": "LinkedField",
            "name": "checkListCategoryDefinitions",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v21/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CheckListItemDefinition",
                "kind": "LinkedField",
                "name": "checklistItemDefinitions",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v21/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v17/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "53c7b706e1137eb70225760f059646de",
    "id": null,
    "metadata": {},
    "name": "EditWorkOrderTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditWorkOrderTypeMutation(\n  $input: EditWorkOrderTypeInput!\n) {\n  editWorkOrderType(input: $input) {\n    id\n    name\n    description\n    ...AddEditWorkOrderTypeCard_workOrderType\n  }\n}\n\nfragment AddEditWorkOrderTypeCard_workOrderType on WorkOrderType {\n  id\n  name\n  description\n  assigneeCanCompleteWorkOrder\n  numberOfWorkOrders\n  propertyTypes {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    isEditable\n    isMandatory\n    isInstanceProperty\n    isDeleted\n    category\n    propertyType {\n      id\n      name\n      type\n      nodeType\n      index\n      stringValue\n      intValue\n      booleanValue\n      floatValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      isEditable\n      isMandatory\n      isInstanceProperty\n      isDeleted\n      category\n      propertyTypeValue {\n        id\n        name\n        propertyTypeValues {\n          id\n          name\n        }\n      }\n    }\n  }\n  checkListCategoryDefinitions {\n    id\n    title\n    description\n    checklistItemDefinitions {\n      id\n      title\n      type\n      index\n      isMandatory\n      enumValues\n      enumSelectionMode\n      helpText\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '596f95371ce767dedca8dafd518212b2';

module.exports = node;
