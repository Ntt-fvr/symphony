/**
 * @generated SignedSource<<6d7c5f47651bc6014a29c71b1552994b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type PowerSearchPortsResultsTable_ports$fragmentType = any;
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type PortFilterType = "PORT_DEF" | "PORT_INST_HAS_LINK" | "PORT_INST_EQUIPMENT" | "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "PROPERTY" | "SERVICE_INST" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type PortFilterInput = {|
  filterType: PortFilterType,
  operator: FilterOperator,
  boolValue?: ?boolean,
  stringValue?: ?string,
  propertyValue?: ?PropertyTypeInput,
  idSet?: ?$ReadOnlyArray<string>,
  stringSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
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
|};
export type PortViewQueryRendererSearchQuery$variables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<PortFilterInput>,
|};
export type PortViewQueryRendererSearchQueryVariables = PortViewQueryRendererSearchQuery$variables;
export type PortViewQueryRendererSearchQuery$data = {|
  +equipmentPorts: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentSpreads: PowerSearchPortsResultsTable_ports$fragmentType,
      |},
    |}>,
    +totalCount: number,
  |},
|};
export type PortViewQueryRendererSearchQueryResponse = PortViewQueryRendererSearchQuery$data;
export type PortViewQueryRendererSearchQuery = {|
  variables: PortViewQueryRendererSearchQueryVariables,
  response: PortViewQueryRendererSearchQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filters"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "limit"
},
v2 = [
  {
    "kind": "Variable",
    "name": "filterBy",
    "variableName": "filters"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "limit"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentPortDefinition",
  "kind": "LinkedField",
  "name": "definition",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "locationHierarchy",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationType",
      "kind": "LinkedField",
      "name": "locationType",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentType",
  "kind": "LinkedField",
  "name": "equipmentType",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentPosition",
  "kind": "LinkedField",
  "name": "positionHierarchy",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPositionDefinition",
      "kind": "LinkedField",
      "name": "definition",
      "plural": false,
      "selections": [
        (v4/*: any*/),
        (v5/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "visibleLabel",
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
        (v4/*: any*/),
        (v5/*: any*/),
        (v9/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Property",
  "kind": "LinkedField",
  "name": "properties",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/),
    (v14/*: any*/),
    (v15/*: any*/),
    (v16/*: any*/),
    (v17/*: any*/),
    (v18/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "propertyType",
      "plural": false,
      "selections": [
        (v4/*: any*/),
        (v5/*: any*/),
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
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/),
        (v16/*: any*/),
        (v17/*: any*/),
        (v18/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PortViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EquipmentPortConnection",
        "kind": "LinkedField",
        "name": "equipmentPorts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPortEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPort",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PowerSearchPortsResultsTable_ports"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PortViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EquipmentPortConnection",
        "kind": "LinkedField",
        "name": "equipmentPorts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPortEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPort",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Link",
                    "kind": "LinkedField",
                    "name": "link",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentPort",
                        "kind": "LinkedField",
                        "name": "ports",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Equipment",
                            "kind": "LinkedField",
                            "name": "parentEquipment",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EquipmentType",
                                "kind": "LinkedField",
                                "name": "equipmentType",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/),
                                  (v5/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "EquipmentPortDefinition",
                                    "kind": "LinkedField",
                                    "name": "portDefinitions",
                                    "plural": true,
                                    "selections": (v6/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              (v10/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v19/*: any*/)
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
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v9/*: any*/),
                      (v8/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v19/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "71b19d81e599d2ae669968b93f1d87ac",
    "id": null,
    "metadata": {},
    "name": "PortViewQueryRendererSearchQuery",
    "operationKind": "query",
    "text": "query PortViewQueryRendererSearchQuery(\n  $limit: Int\n  $filters: [PortFilterInput!]!\n) {\n  equipmentPorts(first: $limit, filterBy: $filters) {\n    edges {\n      node {\n        ...PowerSearchPortsResultsTable_ports\n        id\n      }\n    }\n    totalCount\n  }\n}\n\nfragment EquipmentBreadcrumbs_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n  positionHierarchy {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment PowerSearchPortsResultsTable_ports on EquipmentPort {\n  id\n  definition {\n    id\n    name\n  }\n  link {\n    id\n    ports {\n      id\n      definition {\n        id\n        name\n      }\n      parentEquipment {\n        id\n        name\n        equipmentType {\n          id\n          name\n          portDefinitions {\n            id\n            name\n          }\n        }\n        ...EquipmentBreadcrumbs_equipment\n      }\n    }\n    properties {\n      id\n      stringValue\n      intValue\n      floatValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      propertyType {\n        id\n        name\n        type\n        nodeType\n        isEditable\n        isInstanceProperty\n        stringValue\n        intValue\n        floatValue\n        booleanValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n      }\n    }\n  }\n  parentEquipment {\n    id\n    name\n    equipmentType {\n      id\n      name\n    }\n    ...EquipmentBreadcrumbs_equipment\n  }\n  properties {\n    id\n    stringValue\n    intValue\n    floatValue\n    booleanValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    propertyType {\n      id\n      name\n      type\n      nodeType\n      isEditable\n      isInstanceProperty\n      stringValue\n      intValue\n      floatValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "e9baf3a77ad1bd13495551c3233e0668";

module.exports = ((node/*: any*/)/*: Query<
  PortViewQueryRendererSearchQuery$variables,
  PortViewQueryRendererSearchQuery$data,
>*/);
