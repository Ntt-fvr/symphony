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
type AddEditProjectTypeCard_editingProjectType$ref = any;
type ProjectTypeCard_projectType$ref = any;
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type EditProjectTypeInput = {|
  id: string,
  name: string,
  description?: ?string,
  properties?: ?$ReadOnlyArray<PropertyTypeInput>,
  workOrders?: ?$ReadOnlyArray<WorkOrderDefinitionInput>,
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
  propertyCategoryID?: ?string,
  isListable?: ?boolean,
  dependencePropertyTypes?: ?$ReadOnlyArray<?PropertyTypeInput>,
  propertyTypeValues?: ?$ReadOnlyArray<?AddPropertyTypeValueInput>,
|};
export type AddPropertyTypeValueInput = {|
  id?: ?string,
  name: string,
  isDeleted?: ?boolean,
  propertyType?: ?string,
  parentPropertyTypeValue?: ?$ReadOnlyArray<?string>,
  parentPropertyType?: ?$ReadOnlyArray<?ParentPropertyTypeValueInput>,
|};
export type ParentPropertyTypeValueInput = {|
  parentPropertyTypeValue?: ?string,
  parentPropertyType?: ?string,
|};
export type WorkOrderDefinitionInput = {|
  id?: ?string,
  index?: ?number,
  type: string,
|};
export type EditProjectTypeMutationVariables = {|
  input: EditProjectTypeInput
|};
export type EditProjectTypeMutationResponse = {|
  +editProjectType: {|
    +$fragmentRefs: ProjectTypeCard_projectType$ref & AddEditProjectTypeCard_editingProjectType$ref
  |}
|};
export type EditProjectTypeMutation = {|
  variables: EditProjectTypeMutationVariables,
  response: EditProjectTypeMutationResponse,
|};
*/


/*
mutation EditProjectTypeMutation(
  $input: EditProjectTypeInput!
) {
  editProjectType(input: $input) {
    ...ProjectTypeCard_projectType
    ...AddEditProjectTypeCard_editingProjectType
    id
  }
}

fragment AddEditProjectTypeCard_editingProjectType on ProjectType {
  id
  name
  description
  workOrders {
    id
    type {
      id
      name
      ...ProjectTypeWorkOrderTemplatesPanel_workOrderTypes
    }
  }
  properties {
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
    parentPropertyType {
      id
      name
    }
  }
}

fragment ProjectTypeCard_projectType on ProjectType {
  id
  name
  description
  numberOfProjects
  workOrders {
    id
  }
}

fragment ProjectTypeWorkOrderTemplatesPanel_workOrderTypes on WorkOrderType {
  id
  name
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
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
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
  "concreteType": "PropertyTypeValue",
  "kind": "LinkedField",
  "name": "propertyTypeValues",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v19/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyTypeValue",
      "kind": "LinkedField",
      "name": "parentPropertyTypeValue",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v19/*: any*/),
        (v3/*: any*/)
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
    "name": "EditProjectTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProjectType",
        "kind": "LinkedField",
        "name": "editProjectType",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProjectTypeCard_projectType"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddEditProjectTypeCard_editingProjectType"
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
    "name": "EditProjectTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ProjectType",
        "kind": "LinkedField",
        "name": "editProjectType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
            "name": "numberOfProjects",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkOrderDefinition",
            "kind": "LinkedField",
            "name": "workOrders",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkOrderType",
                "kind": "LinkedField",
                "name": "type",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PropertyType",
            "kind": "LinkedField",
            "name": "properties",
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
                "name": "dependencePropertyTypes",
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
                  (v21/*: any*/)
                ],
                "storageKey": null
              },
              (v21/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PropertyType",
                "kind": "LinkedField",
                "name": "parentPropertyType",
                "plural": false,
                "selections": (v4/*: any*/),
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
    "cacheID": "25b5906eea098b601983f0aac5c65bf0",
    "id": null,
    "metadata": {},
    "name": "EditProjectTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditProjectTypeMutation(\n  $input: EditProjectTypeInput!\n) {\n  editProjectType(input: $input) {\n    ...ProjectTypeCard_projectType\n    ...AddEditProjectTypeCard_editingProjectType\n    id\n  }\n}\n\nfragment AddEditProjectTypeCard_editingProjectType on ProjectType {\n  id\n  name\n  description\n  workOrders {\n    id\n    type {\n      id\n      name\n      ...ProjectTypeWorkOrderTemplatesPanel_workOrderTypes\n    }\n  }\n  properties {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    isEditable\n    isMandatory\n    isInstanceProperty\n    isDeleted\n    category\n    dependencePropertyTypes {\n      id\n      name\n      type\n      nodeType\n      index\n      stringValue\n      intValue\n      booleanValue\n      floatValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      isEditable\n      isMandatory\n      isInstanceProperty\n      isDeleted\n      category\n      propertyTypeValues {\n        id\n        isDeleted\n        name\n        parentPropertyTypeValue {\n          id\n          isDeleted\n          name\n        }\n      }\n    }\n    propertyTypeValues {\n      id\n      isDeleted\n      name\n      parentPropertyTypeValue {\n        id\n        isDeleted\n        name\n      }\n    }\n    parentPropertyType {\n      id\n      name\n    }\n  }\n}\n\nfragment ProjectTypeCard_projectType on ProjectType {\n  id\n  name\n  description\n  numberOfProjects\n  workOrders {\n    id\n  }\n}\n\nfragment ProjectTypeWorkOrderTemplatesPanel_workOrderTypes on WorkOrderType {\n  id\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'daec04ab717918a0f3359b70b60a4dd9';

module.exports = node;
