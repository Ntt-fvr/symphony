/**
 * @generated SignedSource<<45ac9dccd0df050469b50004bcc4ed60>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type DynamicPropertiesGrid_properties$fragmentType = any;
type DynamicPropertiesGrid_propertyTypes$fragmentType = any;
type EquipmentBreadcrumbs_equipment$fragmentType = any;
type EquipmentDocumentsCard_equipment$fragmentType = any;
type EquipmentPortsTable_equipment$fragmentType = any;
type EquipmentPositionsGrid_equipment$fragmentType = any;
type PositionDefinitionsTable_positionDefinitions$fragmentType = any;
type PropertyFormField_property$fragmentType = any;
type PropertyTypeFormField_propertyType$fragmentType = any;
export type EquipmentPropertiesCardQuery$variables = {|
  equipmentId: string,
|};
export type EquipmentPropertiesCardQueryVariables = EquipmentPropertiesCardQuery$variables;
export type EquipmentPropertiesCardQuery$data = {|
  +equipment: ?{|
    +id?: string,
    +name?: string,
    +equipmentType?: {|
      +id: string,
      +name: string,
      +propertyTypes: $ReadOnlyArray<?{|
        +$fragmentSpreads: PropertyTypeFormField_propertyType$fragmentType & DynamicPropertiesGrid_propertyTypes$fragmentType,
      |}>,
      +positionDefinitions: $ReadOnlyArray<?{|
        +id: string,
        +$fragmentSpreads: PositionDefinitionsTable_positionDefinitions$fragmentType,
      |}>,
      +portDefinitions: $ReadOnlyArray<?{|
        +id: string,
      |}>,
    |},
    +parentLocation?: ?{|
      +id: string,
      +name: string,
    |},
    +parentPosition?: ?{|
      +parentEquipment: {|
        +parentLocation: ?{|
          +id: string,
        |},
      |},
    |},
    +positions?: $ReadOnlyArray<?{|
      +parentEquipment: {|
        +id: string,
      |},
    |}>,
    +properties?: $ReadOnlyArray<?{|
      +$fragmentSpreads: PropertyFormField_property$fragmentType & DynamicPropertiesGrid_properties$fragmentType,
    |}>,
    +services?: $ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +externalId: ?string,
      +customer: ?{|
        +name: string,
      |},
      +serviceType: {|
        +id: string,
        +name: string,
      |},
    |}>,
    +$fragmentSpreads: EquipmentPortsTable_equipment$fragmentType & EquipmentBreadcrumbs_equipment$fragmentType & EquipmentPositionsGrid_equipment$fragmentType & EquipmentDocumentsCard_equipment$fragmentType,
  |},
|};
export type EquipmentPropertiesCardQueryResponse = EquipmentPropertiesCardQuery$data;
export type EquipmentPropertiesCardQuery = {|
  variables: EquipmentPropertiesCardQueryVariables,
  response: EquipmentPropertiesCardQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "equipmentId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "equipmentId"
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
  (v2/*: any*/)
],
v5 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "parentLocation",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Equipment",
  "kind": "LinkedField",
  "name": "parentEquipment",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "ServiceType",
  "kind": "LinkedField",
  "name": "serviceType",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibleLabel",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v22 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "nodeType",
    "storageKey": null
  },
  (v11/*: any*/),
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
    "kind": "ScalarField",
    "name": "isEditable",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isInstanceProperty",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isMandatory",
    "storageKey": null
  },
  (v21/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isDeleted",
    "storageKey": null
  }
],
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyType",
  "kind": "LinkedField",
  "name": "propertyTypes",
  "plural": true,
  "selections": (v22/*: any*/),
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyType",
  "kind": "LinkedField",
  "name": "linkPropertyTypes",
  "plural": true,
  "selections": (v22/*: any*/),
  "storageKey": null
},
v25 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "EquipmentPortType",
    "kind": "LinkedField",
    "name": "portType",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v23/*: any*/),
      (v24/*: any*/)
    ],
    "storageKey": null
  }
],
v26 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/)
],
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentType",
  "kind": "LinkedField",
  "name": "equipmentType",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "concreteType": "Equipment",
  "kind": "LinkedField",
  "name": "parentEquipment",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v27/*: any*/)
  ],
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "futureState",
  "storageKey": null
},
v30 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "locationHierarchy",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationType",
      "kind": "LinkedField",
      "name": "locationType",
      "plural": false,
      "selections": (v30/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v32 = {
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
        (v3/*: any*/),
        (v12/*: any*/)
      ],
      "storageKey": null
    },
    (v28/*: any*/)
  ],
  "storageKey": null
},
v33 = {
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "role",
          "storageKey": null
        },
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
      "selections": (v30/*: any*/),
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "concreteType": "Property",
  "kind": "LinkedField",
  "name": "properties",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "propertyType",
      "plural": false,
      "selections": (v22/*: any*/),
      "storageKey": null
    },
    (v13/*: any*/),
    (v14/*: any*/),
    (v16/*: any*/),
    (v15/*: any*/),
    (v17/*: any*/),
    (v18/*: any*/),
    (v19/*: any*/),
    (v20/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "nodeValue",
      "plural": false,
      "selections": [
        (v10/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v35 = {
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
      "selections": (v25/*: any*/),
      "storageKey": null
    },
    (v28/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Link",
      "kind": "LinkedField",
      "name": "link",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v29/*: any*/),
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
                (v3/*: any*/),
                (v12/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EquipmentPortType",
                  "kind": "LinkedField",
                  "name": "portType",
                  "plural": false,
                  "selections": [
                    (v24/*: any*/),
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
                (v3/*: any*/),
                (v29/*: any*/),
                (v27/*: any*/),
                (v31/*: any*/),
                (v32/*: any*/)
              ],
              "storageKey": null
            },
            (v33/*: any*/)
          ],
          "storageKey": null
        },
        {
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
        (v34/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Service",
          "kind": "LinkedField",
          "name": "services",
          "plural": true,
          "selections": (v5/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v34/*: any*/),
    (v33/*: any*/)
  ],
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentType",
  "kind": "LinkedField",
  "name": "equipmentType",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPortDefinition",
      "kind": "LinkedField",
      "name": "portDefinitions",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        (v12/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bandwidth",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "concreteType": "DocumentCategory",
  "kind": "LinkedField",
  "name": "documentCategory",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v38 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fileName",
    "storageKey": null
  },
  (v21/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "sizeInBytes",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "uploaded",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fileType",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "storeKey",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "annotation",
    "storageKey": null
  },
  (v37/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EquipmentPropertiesCardQuery",
    "selections": [
      {
        "alias": "equipment",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EquipmentPortsTable_equipment"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentType",
                "kind": "LinkedField",
                "name": "equipmentType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyType",
                    "kind": "LinkedField",
                    "name": "propertyTypes",
                    "plural": true,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "PropertyTypeFormField_propertyType"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "DynamicPropertiesGrid_propertyTypes"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPositionDefinition",
                    "kind": "LinkedField",
                    "name": "positionDefinitions",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "PositionDefinitionsTable_positionDefinitions"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPortDefinition",
                    "kind": "LinkedField",
                    "name": "portDefinitions",
                    "plural": true,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EquipmentBreadcrumbs_equipment"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "parentLocation",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPosition",
                "kind": "LinkedField",
                "name": "parentPosition",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Equipment",
                    "kind": "LinkedField",
                    "name": "parentEquipment",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EquipmentPositionsGrid_equipment"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPosition",
                "kind": "LinkedField",
                "name": "positions",
                "plural": true,
                "selections": [
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Property",
                "kind": "LinkedField",
                "name": "properties",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PropertyFormField_property"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "DynamicPropertiesGrid_properties"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Service",
                "kind": "LinkedField",
                "name": "services",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Customer",
                    "kind": "LinkedField",
                    "name": "customer",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EquipmentDocumentsCard_equipment"
              }
            ],
            "type": "Equipment",
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
    "name": "EquipmentPropertiesCardQuery",
    "selections": [
      {
        "alias": "equipment",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v10/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentType",
                "kind": "LinkedField",
                "name": "equipmentType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPortDefinition",
                    "kind": "LinkedField",
                    "name": "portDefinitions",
                    "plural": true,
                    "selections": (v25/*: any*/),
                    "storageKey": null
                  },
                  (v23/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPositionDefinition",
                    "kind": "LinkedField",
                    "name": "positionDefinitions",
                    "plural": true,
                    "selections": (v26/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v35/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPosition",
                "kind": "LinkedField",
                "name": "positions",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Equipment",
                    "kind": "LinkedField",
                    "name": "attachedEquipment",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v35/*: any*/),
                      (v36/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentPosition",
                        "kind": "LinkedField",
                        "name": "positions",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Equipment",
                            "kind": "LinkedField",
                            "name": "attachedEquipment",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v35/*: any*/),
                              (v36/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EquipmentPosition",
                                "kind": "LinkedField",
                                "name": "positions",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Equipment",
                                    "kind": "LinkedField",
                                    "name": "attachedEquipment",
                                    "plural": false,
                                    "selections": [
                                      (v2/*: any*/),
                                      (v3/*: any*/),
                                      (v35/*: any*/),
                                      (v36/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "EquipmentPosition",
                                        "kind": "LinkedField",
                                        "name": "positions",
                                        "plural": true,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Equipment",
                                            "kind": "LinkedField",
                                            "name": "attachedEquipment",
                                            "plural": false,
                                            "selections": [
                                              (v2/*: any*/),
                                              (v3/*: any*/),
                                              (v35/*: any*/),
                                              (v36/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v2/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v29/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Service",
                        "kind": "LinkedField",
                        "name": "services",
                        "plural": true,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPositionDefinition",
                    "kind": "LinkedField",
                    "name": "definition",
                    "plural": false,
                    "selections": (v26/*: any*/),
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v31/*: any*/),
              (v32/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "parentLocation",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationType",
                    "kind": "LinkedField",
                    "name": "locationType",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DocumentCategory",
                        "kind": "LinkedField",
                        "name": "documentCategories",
                        "plural": true,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
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
                "concreteType": "EquipmentPosition",
                "kind": "LinkedField",
                "name": "parentPosition",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Equipment",
                    "kind": "LinkedField",
                    "name": "parentEquipment",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v34/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Service",
                "kind": "LinkedField",
                "name": "services",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Customer",
                    "kind": "LinkedField",
                    "name": "customer",
                    "plural": false,
                    "selections": (v30/*: any*/),
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "File",
                "kind": "LinkedField",
                "name": "images",
                "plural": true,
                "selections": (v38/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "File",
                "kind": "LinkedField",
                "name": "files",
                "plural": true,
                "selections": (v38/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Hyperlink",
                "kind": "LinkedField",
                "name": "hyperlinks",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v21/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "displayName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createTime",
                    "storageKey": null
                  },
                  (v37/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "Equipment",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "17444d22906933fa0af43f6d08f5cfd2",
    "id": null,
    "metadata": {},
    "name": "EquipmentPropertiesCardQuery",
    "operationKind": "query",
    "text": "query EquipmentPropertiesCardQuery(\n  $equipmentId: ID!\n) {\n  equipment: node(id: $equipmentId) {\n    __typename\n    ... on Equipment {\n      id\n      name\n      ...EquipmentPortsTable_equipment\n      equipmentType {\n        id\n        name\n        propertyTypes {\n          ...PropertyTypeFormField_propertyType\n          ...DynamicPropertiesGrid_propertyTypes\n          id\n        }\n        positionDefinitions {\n          id\n          ...PositionDefinitionsTable_positionDefinitions\n        }\n        portDefinitions {\n          id\n        }\n      }\n      ...EquipmentBreadcrumbs_equipment\n      parentLocation {\n        id\n        name\n      }\n      parentPosition {\n        parentEquipment {\n          parentLocation {\n            id\n          }\n          id\n        }\n        id\n      }\n      ...EquipmentPositionsGrid_equipment\n      positions {\n        parentEquipment {\n          id\n        }\n        id\n      }\n      properties {\n        ...PropertyFormField_property\n        ...DynamicPropertiesGrid_properties\n        id\n      }\n      services {\n        id\n        name\n        externalId\n        customer {\n          name\n          id\n        }\n        serviceType {\n          id\n          name\n        }\n      }\n      ...EquipmentDocumentsCard_equipment\n    }\n    id\n  }\n}\n\nfragment AddToEquipmentDialog_parentEquipment on Equipment {\n  id\n  locationHierarchy {\n    id\n  }\n}\n\nfragment DocumentTable_files on File {\n  id\n  fileName\n  category\n  ...FileAttachment_file\n}\n\nfragment DocumentTable_hyperlinks on Hyperlink {\n  id\n  category\n  url\n  displayName\n  ...HyperlinkTableRow_hyperlink\n}\n\nfragment DynamicPropertiesGrid_properties on Property {\n  ...PropertyFormField_property\n  propertyType {\n    id\n    index\n  }\n}\n\nfragment DynamicPropertiesGrid_propertyTypes on PropertyType {\n  id\n  name\n  index\n  isInstanceProperty\n  type\n  nodeType\n  stringValue\n  intValue\n  booleanValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  floatValue\n}\n\nfragment EntityDocumentsTable_files on File {\n  ...DocumentTable_files\n}\n\nfragment EntityDocumentsTable_hyperlinks on Hyperlink {\n  ...DocumentTable_hyperlinks\n}\n\nfragment EquipmentBreadcrumbs_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n  positionHierarchy {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment EquipmentDocumentsCard_equipment on Equipment {\n  id\n  images {\n    ...EntityDocumentsTable_files\n    id\n  }\n  files {\n    ...EntityDocumentsTable_files\n    id\n  }\n  hyperlinks {\n    ...EntityDocumentsTable_hyperlinks\n    id\n  }\n  parentLocation {\n    locationType {\n      documentCategories {\n        id\n        name\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment EquipmentPortsTable_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n    portDefinitions {\n      id\n      name\n      index\n      visibleLabel\n      portType {\n        id\n        name\n        propertyTypes {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isInstanceProperty\n          isMandatory\n          category\n          isDeleted\n        }\n        linkPropertyTypes {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isInstanceProperty\n          isMandatory\n          category\n          isDeleted\n        }\n      }\n    }\n  }\n  ports {\n    id\n    definition {\n      id\n      name\n      index\n      visibleLabel\n      portType {\n        id\n        name\n        propertyTypes {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isInstanceProperty\n          isMandatory\n          category\n          isDeleted\n        }\n        linkPropertyTypes {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isInstanceProperty\n          isMandatory\n          category\n          isDeleted\n        }\n      }\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n    link {\n      id\n      futureState\n      ports {\n        id\n        definition {\n          id\n          name\n          visibleLabel\n          portType {\n            linkPropertyTypes {\n              id\n              name\n              type\n              nodeType\n              index\n              stringValue\n              intValue\n              booleanValue\n              floatValue\n              latitudeValue\n              longitudeValue\n              rangeFromValue\n              rangeToValue\n              isEditable\n              isInstanceProperty\n              isMandatory\n              category\n              isDeleted\n            }\n            id\n          }\n        }\n        parentEquipment {\n          id\n          name\n          futureState\n          equipmentType {\n            id\n            name\n          }\n          ...EquipmentBreadcrumbs_equipment\n        }\n        serviceEndpoints {\n          definition {\n            role\n            id\n          }\n          service {\n            name\n            id\n          }\n          id\n        }\n      }\n      workOrder {\n        id\n        status\n      }\n      properties {\n        id\n        propertyType {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isInstanceProperty\n          isMandatory\n          category\n          isDeleted\n        }\n        stringValue\n        intValue\n        floatValue\n        booleanValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        nodeValue {\n          __typename\n          id\n          name\n        }\n      }\n      services {\n        id\n        name\n      }\n    }\n    properties {\n      id\n      propertyType {\n        id\n        name\n        type\n        nodeType\n        index\n        stringValue\n        intValue\n        booleanValue\n        floatValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        isEditable\n        isInstanceProperty\n        isMandatory\n        category\n        isDeleted\n      }\n      stringValue\n      intValue\n      floatValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      nodeValue {\n        __typename\n        id\n        name\n      }\n    }\n    serviceEndpoints {\n      definition {\n        role\n        id\n      }\n      service {\n        name\n        id\n      }\n      id\n    }\n  }\n  positions {\n    attachedEquipment {\n      id\n      name\n      ports {\n        id\n        definition {\n          id\n          name\n          index\n          visibleLabel\n          portType {\n            id\n            name\n            propertyTypes {\n              id\n              name\n              type\n              nodeType\n              index\n              stringValue\n              intValue\n              booleanValue\n              floatValue\n              latitudeValue\n              longitudeValue\n              rangeFromValue\n              rangeToValue\n              isEditable\n              isInstanceProperty\n              isMandatory\n              category\n              isDeleted\n            }\n            linkPropertyTypes {\n              id\n              name\n              type\n              nodeType\n              index\n              stringValue\n              intValue\n              booleanValue\n              floatValue\n              latitudeValue\n              longitudeValue\n              rangeFromValue\n              rangeToValue\n              isEditable\n              isInstanceProperty\n              isMandatory\n              category\n              isDeleted\n            }\n          }\n        }\n        parentEquipment {\n          id\n          name\n          equipmentType {\n            id\n            name\n          }\n        }\n        link {\n          id\n          futureState\n          ports {\n            id\n            definition {\n              id\n              name\n              visibleLabel\n              portType {\n                linkPropertyTypes {\n                  id\n                  name\n                  type\n                  nodeType\n                  index\n                  stringValue\n                  intValue\n                  booleanValue\n                  floatValue\n                  latitudeValue\n                  longitudeValue\n                  rangeFromValue\n                  rangeToValue\n                  isEditable\n                  isInstanceProperty\n                  isMandatory\n                  category\n                  isDeleted\n                }\n                id\n              }\n            }\n            parentEquipment {\n              id\n              name\n              futureState\n              equipmentType {\n                id\n                name\n              }\n              ...EquipmentBreadcrumbs_equipment\n            }\n            serviceEndpoints {\n              definition {\n                role\n                id\n              }\n              service {\n                name\n                id\n              }\n              id\n            }\n          }\n          workOrder {\n            id\n            status\n          }\n          properties {\n            id\n            propertyType {\n              id\n              name\n              type\n              nodeType\n              index\n              stringValue\n              intValue\n              booleanValue\n              floatValue\n              latitudeValue\n              longitudeValue\n              rangeFromValue\n              rangeToValue\n              isEditable\n              isInstanceProperty\n              isMandatory\n              category\n              isDeleted\n            }\n            stringValue\n            intValue\n            floatValue\n            booleanValue\n            latitudeValue\n            longitudeValue\n            rangeFromValue\n            rangeToValue\n            nodeValue {\n              __typename\n              id\n              name\n            }\n          }\n          services {\n            id\n            name\n          }\n        }\n        properties {\n          id\n          propertyType {\n            id\n            name\n            type\n            nodeType\n            index\n            stringValue\n            intValue\n            booleanValue\n            floatValue\n            latitudeValue\n            longitudeValue\n            rangeFromValue\n            rangeToValue\n            isEditable\n            isInstanceProperty\n            isMandatory\n            category\n            isDeleted\n          }\n          stringValue\n          intValue\n          floatValue\n          booleanValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          nodeValue {\n            __typename\n            id\n            name\n          }\n        }\n        serviceEndpoints {\n          definition {\n            role\n            id\n          }\n          service {\n            name\n            id\n          }\n          id\n        }\n      }\n      equipmentType {\n        portDefinitions {\n          id\n          name\n          visibleLabel\n          bandwidth\n        }\n        id\n      }\n      positions {\n        attachedEquipment {\n          id\n          name\n          ports {\n            id\n            definition {\n              id\n              name\n              index\n              visibleLabel\n              portType {\n                id\n                name\n                propertyTypes {\n                  id\n                  name\n                  type\n                  nodeType\n                  index\n                  stringValue\n                  intValue\n                  booleanValue\n                  floatValue\n                  latitudeValue\n                  longitudeValue\n                  rangeFromValue\n                  rangeToValue\n                  isEditable\n                  isInstanceProperty\n                  isMandatory\n                  category\n                  isDeleted\n                }\n                linkPropertyTypes {\n                  id\n                  name\n                  type\n                  nodeType\n                  index\n                  stringValue\n                  intValue\n                  booleanValue\n                  floatValue\n                  latitudeValue\n                  longitudeValue\n                  rangeFromValue\n                  rangeToValue\n                  isEditable\n                  isInstanceProperty\n                  isMandatory\n                  category\n                  isDeleted\n                }\n              }\n            }\n            parentEquipment {\n              id\n              name\n              equipmentType {\n                id\n                name\n              }\n            }\n            link {\n              id\n              futureState\n              ports {\n                id\n                definition {\n                  id\n                  name\n                  visibleLabel\n                  portType {\n                    linkPropertyTypes {\n                      id\n                      name\n                      type\n                      nodeType\n                      index\n                      stringValue\n                      intValue\n                      booleanValue\n                      floatValue\n                      latitudeValue\n                      longitudeValue\n                      rangeFromValue\n                      rangeToValue\n                      isEditable\n                      isInstanceProperty\n                      isMandatory\n                      category\n                      isDeleted\n                    }\n                    id\n                  }\n                }\n                parentEquipment {\n                  id\n                  name\n                  futureState\n                  equipmentType {\n                    id\n                    name\n                  }\n                  ...EquipmentBreadcrumbs_equipment\n                }\n                serviceEndpoints {\n                  definition {\n                    role\n                    id\n                  }\n                  service {\n                    name\n                    id\n                  }\n                  id\n                }\n              }\n              workOrder {\n                id\n                status\n              }\n              properties {\n                id\n                propertyType {\n                  id\n                  name\n                  type\n                  nodeType\n                  index\n                  stringValue\n                  intValue\n                  booleanValue\n                  floatValue\n                  latitudeValue\n                  longitudeValue\n                  rangeFromValue\n                  rangeToValue\n                  isEditable\n                  isInstanceProperty\n                  isMandatory\n                  category\n                  isDeleted\n                }\n                stringValue\n                intValue\n                floatValue\n                booleanValue\n                latitudeValue\n                longitudeValue\n                rangeFromValue\n                rangeToValue\n                nodeValue {\n                  __typename\n                  id\n                  name\n                }\n              }\n              services {\n                id\n                name\n              }\n            }\n            properties {\n              id\n              propertyType {\n                id\n                name\n                type\n                nodeType\n                index\n                stringValue\n                intValue\n                booleanValue\n                floatValue\n                latitudeValue\n                longitudeValue\n                rangeFromValue\n                rangeToValue\n                isEditable\n                isInstanceProperty\n                isMandatory\n                category\n                isDeleted\n              }\n              stringValue\n              intValue\n              floatValue\n              booleanValue\n              latitudeValue\n              longitudeValue\n              rangeFromValue\n              rangeToValue\n              nodeValue {\n                __typename\n                id\n                name\n              }\n            }\n            serviceEndpoints {\n              definition {\n                role\n                id\n              }\n              service {\n                name\n                id\n              }\n              id\n            }\n          }\n          equipmentType {\n            portDefinitions {\n              id\n              name\n              visibleLabel\n              bandwidth\n            }\n            id\n          }\n          positions {\n            attachedEquipment {\n              id\n              name\n              ports {\n                id\n                definition {\n                  id\n                  name\n                  index\n                  visibleLabel\n                  portType {\n                    id\n                    name\n                    propertyTypes {\n                      id\n                      name\n                      type\n                      nodeType\n                      index\n                      stringValue\n                      intValue\n                      booleanValue\n                      floatValue\n                      latitudeValue\n                      longitudeValue\n                      rangeFromValue\n                      rangeToValue\n                      isEditable\n                      isInstanceProperty\n                      isMandatory\n                      category\n                      isDeleted\n                    }\n                    linkPropertyTypes {\n                      id\n                      name\n                      type\n                      nodeType\n                      index\n                      stringValue\n                      intValue\n                      booleanValue\n                      floatValue\n                      latitudeValue\n                      longitudeValue\n                      rangeFromValue\n                      rangeToValue\n                      isEditable\n                      isInstanceProperty\n                      isMandatory\n                      category\n                      isDeleted\n                    }\n                  }\n                }\n                parentEquipment {\n                  id\n                  name\n                  equipmentType {\n                    id\n                    name\n                  }\n                }\n                link {\n                  id\n                  futureState\n                  ports {\n                    id\n                    definition {\n                      id\n                      name\n                      visibleLabel\n                      portType {\n                        linkPropertyTypes {\n                          id\n                          name\n                          type\n                          nodeType\n                          index\n                          stringValue\n                          intValue\n                          booleanValue\n                          floatValue\n                          latitudeValue\n                          longitudeValue\n                          rangeFromValue\n                          rangeToValue\n                          isEditable\n                          isInstanceProperty\n                          isMandatory\n                          category\n                          isDeleted\n                        }\n                        id\n                      }\n                    }\n                    parentEquipment {\n                      id\n                      name\n                      futureState\n                      equipmentType {\n                        id\n                        name\n                      }\n                      ...EquipmentBreadcrumbs_equipment\n                    }\n                    serviceEndpoints {\n                      definition {\n                        role\n                        id\n                      }\n                      service {\n                        name\n                        id\n                      }\n                      id\n                    }\n                  }\n                  workOrder {\n                    id\n                    status\n                  }\n                  properties {\n                    id\n                    propertyType {\n                      id\n                      name\n                      type\n                      nodeType\n                      index\n                      stringValue\n                      intValue\n                      booleanValue\n                      floatValue\n                      latitudeValue\n                      longitudeValue\n                      rangeFromValue\n                      rangeToValue\n                      isEditable\n                      isInstanceProperty\n                      isMandatory\n                      category\n                      isDeleted\n                    }\n                    stringValue\n                    intValue\n                    floatValue\n                    booleanValue\n                    latitudeValue\n                    longitudeValue\n                    rangeFromValue\n                    rangeToValue\n                    nodeValue {\n                      __typename\n                      id\n                      name\n                    }\n                  }\n                  services {\n                    id\n                    name\n                  }\n                }\n                properties {\n                  id\n                  propertyType {\n                    id\n                    name\n                    type\n                    nodeType\n                    index\n                    stringValue\n                    intValue\n                    booleanValue\n                    floatValue\n                    latitudeValue\n                    longitudeValue\n                    rangeFromValue\n                    rangeToValue\n                    isEditable\n                    isInstanceProperty\n                    isMandatory\n                    category\n                    isDeleted\n                  }\n                  stringValue\n                  intValue\n                  floatValue\n                  booleanValue\n                  latitudeValue\n                  longitudeValue\n                  rangeFromValue\n                  rangeToValue\n                  nodeValue {\n                    __typename\n                    id\n                    name\n                  }\n                }\n                serviceEndpoints {\n                  definition {\n                    role\n                    id\n                  }\n                  service {\n                    name\n                    id\n                  }\n                  id\n                }\n              }\n              equipmentType {\n                portDefinitions {\n                  id\n                  name\n                  visibleLabel\n                  bandwidth\n                }\n                id\n              }\n              positions {\n                attachedEquipment {\n                  id\n                  name\n                  ports {\n                    id\n                    definition {\n                      id\n                      name\n                      index\n                      visibleLabel\n                      portType {\n                        id\n                        name\n                        propertyTypes {\n                          id\n                          name\n                          type\n                          nodeType\n                          index\n                          stringValue\n                          intValue\n                          booleanValue\n                          floatValue\n                          latitudeValue\n                          longitudeValue\n                          rangeFromValue\n                          rangeToValue\n                          isEditable\n                          isInstanceProperty\n                          isMandatory\n                          category\n                          isDeleted\n                        }\n                        linkPropertyTypes {\n                          id\n                          name\n                          type\n                          nodeType\n                          index\n                          stringValue\n                          intValue\n                          booleanValue\n                          floatValue\n                          latitudeValue\n                          longitudeValue\n                          rangeFromValue\n                          rangeToValue\n                          isEditable\n                          isInstanceProperty\n                          isMandatory\n                          category\n                          isDeleted\n                        }\n                      }\n                    }\n                    parentEquipment {\n                      id\n                      name\n                      equipmentType {\n                        id\n                        name\n                      }\n                    }\n                    link {\n                      id\n                      futureState\n                      ports {\n                        id\n                        definition {\n                          id\n                          name\n                          visibleLabel\n                          portType {\n                            linkPropertyTypes {\n                              id\n                              name\n                              type\n                              nodeType\n                              index\n                              stringValue\n                              intValue\n                              booleanValue\n                              floatValue\n                              latitudeValue\n                              longitudeValue\n                              rangeFromValue\n                              rangeToValue\n                              isEditable\n                              isInstanceProperty\n                              isMandatory\n                              category\n                              isDeleted\n                            }\n                            id\n                          }\n                        }\n                        parentEquipment {\n                          id\n                          name\n                          futureState\n                          equipmentType {\n                            id\n                            name\n                          }\n                          ...EquipmentBreadcrumbs_equipment\n                        }\n                        serviceEndpoints {\n                          definition {\n                            role\n                            id\n                          }\n                          service {\n                            name\n                            id\n                          }\n                          id\n                        }\n                      }\n                      workOrder {\n                        id\n                        status\n                      }\n                      properties {\n                        id\n                        propertyType {\n                          id\n                          name\n                          type\n                          nodeType\n                          index\n                          stringValue\n                          intValue\n                          booleanValue\n                          floatValue\n                          latitudeValue\n                          longitudeValue\n                          rangeFromValue\n                          rangeToValue\n                          isEditable\n                          isInstanceProperty\n                          isMandatory\n                          category\n                          isDeleted\n                        }\n                        stringValue\n                        intValue\n                        floatValue\n                        booleanValue\n                        latitudeValue\n                        longitudeValue\n                        rangeFromValue\n                        rangeToValue\n                        nodeValue {\n                          __typename\n                          id\n                          name\n                        }\n                      }\n                      services {\n                        id\n                        name\n                      }\n                    }\n                    properties {\n                      id\n                      propertyType {\n                        id\n                        name\n                        type\n                        nodeType\n                        index\n                        stringValue\n                        intValue\n                        booleanValue\n                        floatValue\n                        latitudeValue\n                        longitudeValue\n                        rangeFromValue\n                        rangeToValue\n                        isEditable\n                        isInstanceProperty\n                        isMandatory\n                        category\n                        isDeleted\n                      }\n                      stringValue\n                      intValue\n                      floatValue\n                      booleanValue\n                      latitudeValue\n                      longitudeValue\n                      rangeFromValue\n                      rangeToValue\n                      nodeValue {\n                        __typename\n                        id\n                        name\n                      }\n                    }\n                    serviceEndpoints {\n                      definition {\n                        role\n                        id\n                      }\n                      service {\n                        name\n                        id\n                      }\n                      id\n                    }\n                  }\n                  equipmentType {\n                    portDefinitions {\n                      id\n                      name\n                      visibleLabel\n                      bandwidth\n                    }\n                    id\n                  }\n                }\n                id\n              }\n            }\n            id\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment EquipmentPositionsGrid_equipment on Equipment {\n  id\n  ...AddToEquipmentDialog_parentEquipment\n  positions {\n    id\n    definition {\n      id\n      name\n      index\n      visibleLabel\n    }\n    attachedEquipment {\n      id\n      name\n      futureState\n      services {\n        id\n      }\n    }\n    parentEquipment {\n      id\n    }\n  }\n  equipmentType {\n    positionDefinitions {\n      id\n      name\n      index\n      visibleLabel\n    }\n    id\n  }\n}\n\nfragment FileAttachment_file on File {\n  id\n  fileName\n  sizeInBytes\n  uploaded\n  fileType\n  storeKey\n  category\n  annotation\n  documentCategory {\n    id\n    name\n  }\n  ...ImageDialog_img\n}\n\nfragment HyperlinkTableMenu_hyperlink on Hyperlink {\n  id\n  displayName\n  url\n}\n\nfragment HyperlinkTableRow_hyperlink on Hyperlink {\n  id\n  category\n  url\n  displayName\n  createTime\n  documentCategory {\n    id\n    name\n  }\n  ...HyperlinkTableMenu_hyperlink\n}\n\nfragment ImageDialog_img on File {\n  storeKey\n  fileName\n}\n\nfragment PositionDefinitionsTable_positionDefinitions on EquipmentPositionDefinition {\n  id\n  name\n  index\n  visibleLabel\n}\n\nfragment PropertyFormField_property on Property {\n  id\n  propertyType {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    isEditable\n    isInstanceProperty\n    isMandatory\n    category\n    isDeleted\n  }\n  stringValue\n  intValue\n  floatValue\n  booleanValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  nodeValue {\n    __typename\n    id\n    name\n  }\n}\n\nfragment PropertyTypeFormField_propertyType on PropertyType {\n  id\n  name\n  type\n  nodeType\n  index\n  stringValue\n  intValue\n  booleanValue\n  floatValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  isEditable\n  isInstanceProperty\n  isMandatory\n  category\n  isDeleted\n}\n"
  }
};
})();

(node/*: any*/).hash = "45289b80018793a427858ef59546d84c";

module.exports = ((node/*: any*/)/*: Query<
  EquipmentPropertiesCardQuery$variables,
  EquipmentPropertiesCardQuery$data,
>*/);
