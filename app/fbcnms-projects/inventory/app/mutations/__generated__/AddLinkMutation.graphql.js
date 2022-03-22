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
type EquipmentBreadcrumbs_equipment$ref = any;
export type FutureState = "INSTALL" | "REMOVE" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type WorkOrderStatus = "BLOCKED" | "CANCELED" | "CLOSED" | "DONE" | "IN_PROGRESS" | "PENDING" | "PLANNED" | "SUBMITTED" | "SUSPENDED" | "%future added value";
export type AddLinkInput = {|
  sides: $ReadOnlyArray<LinkSide>,
  workOrder?: ?string,
  properties?: ?$ReadOnlyArray<PropertyInput>,
  serviceIds?: ?$ReadOnlyArray<string>,
|};
export type LinkSide = {|
  equipment: string,
  port: string,
|};
export type PropertyInput = {|
  id?: ?string,
  propertyTypeID: string,
  stringValue?: ?string,
  intValue?: ?number,
  booleanValue?: ?boolean,
  floatValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  nodeIDValue?: ?string,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  dependenceProperties?: ?$ReadOnlyArray<PropertyInput>,
  propertyTypeValueID?: ?string,
|};
export type AddLinkMutationVariables = {|
  input: AddLinkInput
|};
export type AddLinkMutationResponse = {|
  +addLink: {|
    +id: string,
    +futureState: ?FutureState,
    +ports: $ReadOnlyArray<?{|
      +id: string,
      +definition: {|
        +id: string,
        +name: string,
        +visibleLabel: ?string,
        +portType: ?{|
          +linkPropertyTypes: $ReadOnlyArray<?{|
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
            +isInstanceProperty: ?boolean,
            +isMandatory: ?boolean,
            +category: ?string,
            +isDeleted: ?boolean,
          |}>
        |},
      |},
      +parentEquipment: {|
        +id: string,
        +name: string,
        +futureState: ?FutureState,
        +equipmentType: {|
          +id: string,
          +name: string,
        |},
        +$fragmentRefs: EquipmentBreadcrumbs_equipment$ref,
      |},
      +serviceEndpoints: $ReadOnlyArray<{|
        +definition: {|
          +role: ?string
        |},
        +service: {|
          +name: string
        |},
      |}>,
    |}>,
    +workOrder: ?{|
      +id: string,
      +status: WorkOrderStatus,
    |},
    +properties: $ReadOnlyArray<?{|
      +id: string,
      +propertyTypeValue: ?{|
        +id: string,
        +name: string,
      |},
      +propertyType: {|
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
        +isInstanceProperty: ?boolean,
        +isMandatory: ?boolean,
        +category: ?string,
        +isDeleted: ?boolean,
        +parentPropertyType: ?{|
          +id: string,
          +name: string,
        |},
        +propertyTypeValues: ?$ReadOnlyArray<{|
          +id: string,
          +isDeleted: ?boolean,
          +name: string,
        |}>,
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
            +isDeleted: ?boolean,
            +name: string,
            +parentPropertyTypeValue: ?$ReadOnlyArray<?{|
              +id: string,
              +isDeleted: ?boolean,
              +name: string,
            |}>,
          |}>,
        |}>,
      |},
      +stringValue: ?string,
      +intValue: ?number,
      +floatValue: ?number,
      +booleanValue: ?boolean,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +rangeFromValue: ?number,
      +rangeToValue: ?number,
      +nodeValue: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
    +services: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
    |}>,
  |}
|};
export type AddLinkMutation = {|
  variables: AddLinkMutationVariables,
  response: AddLinkMutationResponse,
|};
*/


/*
mutation AddLinkMutation(
  $input: AddLinkInput!
) {
  addLink(input: $input) {
    id
    futureState
    ports {
      id
      definition {
        id
        name
        visibleLabel
        portType {
          linkPropertyTypes {
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
            isInstanceProperty
            isMandatory
            category
            isDeleted
          }
          id
        }
      }
      parentEquipment {
        id
        name
        futureState
        equipmentType {
          id
          name
        }
        ...EquipmentBreadcrumbs_equipment
      }
      serviceEndpoints {
        definition {
          role
          id
        }
        service {
          name
          id
        }
        id
      }
    }
    workOrder {
      id
      status
    }
    properties {
      id
      propertyTypeValue {
        id
        name
      }
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
        isInstanceProperty
        isMandatory
        category
        isDeleted
        parentPropertyType {
          id
          name
        }
        propertyTypeValues {
          id
          isDeleted
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
      }
      stringValue
      intValue
      floatValue
      booleanValue
      latitudeValue
      longitudeValue
      rangeFromValue
      rangeToValue
      nodeValue {
        __typename
        id
        name
      }
    }
    services {
      id
      name
    }
  }
}

fragment EquipmentBreadcrumbs_equipment on Equipment {
  id
  name
  equipmentType {
    id
    name
  }
  locationHierarchy {
    id
    name
    locationType {
      name
      id
    }
  }
  positionHierarchy {
    id
    definition {
      id
      name
      visibleLabel
    }
    parentEquipment {
      id
      name
      equipmentType {
        id
        name
      }
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
  "name": "futureState",
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
  "name": "visibleLabel",
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
  "name": "isInstanceProperty",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMandatory",
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
  "name": "isDeleted",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyType",
  "kind": "LinkedField",
  "name": "linkPropertyTypes",
  "plural": true,
  "selections": [
    (v2/*: any*/),
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
    (v21/*: any*/)
  ],
  "storageKey": null
},
v23 = [
  (v2/*: any*/),
  (v4/*: any*/)
],
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentType",
  "kind": "LinkedField",
  "name": "equipmentType",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "concreteType": "WorkOrder",
  "kind": "LinkedField",
  "name": "workOrder",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyTypeValue",
  "kind": "LinkedField",
  "name": "propertyTypeValue",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v28 = [
  (v2/*: any*/),
  (v21/*: any*/),
  (v4/*: any*/)
],
v29 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyType",
  "kind": "LinkedField",
  "name": "propertyType",
  "plural": false,
  "selections": [
    (v2/*: any*/),
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
      "name": "parentPropertyType",
      "plural": false,
      "selections": (v23/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyTypeValue",
      "kind": "LinkedField",
      "name": "propertyTypeValues",
      "plural": true,
      "selections": (v28/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "dependencePropertyTypes",
      "plural": true,
      "selections": [
        (v2/*: any*/),
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
        (v19/*: any*/),
        (v18/*: any*/),
        (v21/*: any*/),
        (v20/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyTypeValue",
          "kind": "LinkedField",
          "name": "propertyTypeValues",
          "plural": true,
          "selections": [
            (v2/*: any*/),
            (v21/*: any*/),
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "PropertyTypeValue",
              "kind": "LinkedField",
              "name": "parentPropertyTypeValue",
              "plural": true,
              "selections": (v28/*: any*/),
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
v30 = {
  "alias": null,
  "args": null,
  "concreteType": "Service",
  "kind": "LinkedField",
  "name": "services",
  "plural": true,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v31 = [
  (v4/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddLinkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Link",
        "kind": "LinkedField",
        "name": "addLink",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPort",
            "kind": "LinkedField",
            "name": "ports",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPortDefinition",
                "kind": "LinkedField",
                "name": "definition",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPortType",
                    "kind": "LinkedField",
                    "name": "portType",
                    "plural": false,
                    "selections": [
                      (v22/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Equipment",
                "kind": "LinkedField",
                "name": "parentEquipment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v3/*: any*/),
                  (v24/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "EquipmentBreadcrumbs_equipment"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ServiceEndpoint",
                "kind": "LinkedField",
                "name": "serviceEndpoints",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ServiceEndpointDefinition",
                    "kind": "LinkedField",
                    "name": "definition",
                    "plural": false,
                    "selections": [
                      (v25/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Service",
                    "kind": "LinkedField",
                    "name": "service",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v26/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Property",
            "kind": "LinkedField",
            "name": "properties",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v27/*: any*/),
              (v29/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v12/*: any*/),
              (v11/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "nodeValue",
                "plural": false,
                "selections": (v23/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v30/*: any*/)
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
    "name": "AddLinkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Link",
        "kind": "LinkedField",
        "name": "addLink",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPort",
            "kind": "LinkedField",
            "name": "ports",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPortDefinition",
                "kind": "LinkedField",
                "name": "definition",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPortType",
                    "kind": "LinkedField",
                    "name": "portType",
                    "plural": false,
                    "selections": [
                      (v22/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Equipment",
                "kind": "LinkedField",
                "name": "parentEquipment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v3/*: any*/),
                  (v24/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "locationHierarchy",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LocationType",
                        "kind": "LinkedField",
                        "name": "locationType",
                        "plural": false,
                        "selections": (v31/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPosition",
                    "kind": "LinkedField",
                    "name": "positionHierarchy",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentPositionDefinition",
                        "kind": "LinkedField",
                        "name": "definition",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Equipment",
                        "kind": "LinkedField",
                        "name": "parentEquipment",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/),
                          (v24/*: any*/)
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
                "concreteType": "ServiceEndpoint",
                "kind": "LinkedField",
                "name": "serviceEndpoints",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ServiceEndpointDefinition",
                    "kind": "LinkedField",
                    "name": "definition",
                    "plural": false,
                    "selections": [
                      (v25/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Service",
                    "kind": "LinkedField",
                    "name": "service",
                    "plural": false,
                    "selections": (v31/*: any*/),
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v26/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Property",
            "kind": "LinkedField",
            "name": "properties",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v27/*: any*/),
              (v29/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v12/*: any*/),
              (v11/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "nodeValue",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v30/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6ce68b37bf41a87944328575cda5e1fc",
    "id": null,
    "metadata": {},
    "name": "AddLinkMutation",
    "operationKind": "mutation",
    "text": "mutation AddLinkMutation(\n  $input: AddLinkInput!\n) {\n  addLink(input: $input) {\n    id\n    futureState\n    ports {\n      id\n      definition {\n        id\n        name\n        visibleLabel\n        portType {\n          linkPropertyTypes {\n            id\n            name\n            type\n            nodeType\n            index\n            stringValue\n            intValue\n            booleanValue\n            floatValue\n            latitudeValue\n            longitudeValue\n            rangeFromValue\n            rangeToValue\n            isEditable\n            isInstanceProperty\n            isMandatory\n            category\n            isDeleted\n          }\n          id\n        }\n      }\n      parentEquipment {\n        id\n        name\n        futureState\n        equipmentType {\n          id\n          name\n        }\n        ...EquipmentBreadcrumbs_equipment\n      }\n      serviceEndpoints {\n        definition {\n          role\n          id\n        }\n        service {\n          name\n          id\n        }\n        id\n      }\n    }\n    workOrder {\n      id\n      status\n    }\n    properties {\n      id\n      propertyTypeValue {\n        id\n        name\n      }\n      propertyType {\n        id\n        name\n        type\n        nodeType\n        index\n        stringValue\n        intValue\n        booleanValue\n        floatValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        isEditable\n        isInstanceProperty\n        isMandatory\n        category\n        isDeleted\n        parentPropertyType {\n          id\n          name\n        }\n        propertyTypeValues {\n          id\n          isDeleted\n          name\n        }\n        dependencePropertyTypes {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isMandatory\n          isInstanceProperty\n          isDeleted\n          category\n          propertyTypeValues {\n            id\n            isDeleted\n            name\n            parentPropertyTypeValue {\n              id\n              isDeleted\n              name\n            }\n          }\n        }\n      }\n      stringValue\n      intValue\n      floatValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      nodeValue {\n        __typename\n        id\n        name\n      }\n    }\n    services {\n      id\n      name\n    }\n  }\n}\n\nfragment EquipmentBreadcrumbs_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n  positionHierarchy {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e08640b022f726ee358ac578bf517bc8';

module.exports = node;
