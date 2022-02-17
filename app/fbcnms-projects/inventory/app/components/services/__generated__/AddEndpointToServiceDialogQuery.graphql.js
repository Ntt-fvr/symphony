/**
 * @generated SignedSource<<300aecfebbac8b4b379a81d9f1ce1504>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type AvailablePortsTable_ports$fragmentType = any;
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
export type AddEndpointToServiceDialogQuery$variables = {|
  filters: $ReadOnlyArray<PortFilterInput>,
|};
export type AddEndpointToServiceDialogQueryVariables = AddEndpointToServiceDialogQuery$variables;
export type AddEndpointToServiceDialogQuery$data = {|
  +equipmentPorts: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +definition: {|
          +id: string,
          +name: string,
        |},
        +$fragmentSpreads: AvailablePortsTable_ports$fragmentType,
      |},
    |}>,
  |},
|};
export type AddEndpointToServiceDialogQueryResponse = AddEndpointToServiceDialogQuery$data;
export type AddEndpointToServiceDialogQuery = {|
  variables: AddEndpointToServiceDialogQueryVariables,
  response: AddEndpointToServiceDialogQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "filterBy",
    "variableName": "filters"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
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
v5 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibleLabel",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentType",
  "kind": "LinkedField",
  "name": "equipmentType",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddEndpointToServiceDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPortDefinition",
                    "kind": "LinkedField",
                    "name": "definition",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AvailablePortsTable_ports"
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddEndpointToServiceDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentPortType",
                        "kind": "LinkedField",
                        "name": "portType",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      (v6/*: any*/)
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
                      (v7/*: any*/),
                      {
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
                            "selections": (v5/*: any*/),
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
                              (v3/*: any*/),
                              (v6/*: any*/)
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
                              (v7/*: any*/)
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dc18e2ceb64c227926c9101e27c3a50d",
    "id": null,
    "metadata": {},
    "name": "AddEndpointToServiceDialogQuery",
    "operationKind": "query",
    "text": "query AddEndpointToServiceDialogQuery(\n  $filters: [PortFilterInput!]!\n) {\n  equipmentPorts(filterBy: $filters, first: 50) {\n    edges {\n      node {\n        id\n        definition {\n          id\n          name\n        }\n        ...AvailablePortsTable_ports\n      }\n    }\n  }\n}\n\nfragment AvailablePortsTable_ports on EquipmentPort {\n  id\n  parentEquipment {\n    id\n    name\n    ...EquipmentBreadcrumbs_equipment\n  }\n  definition {\n    id\n    name\n    portType {\n      name\n      id\n    }\n    visibleLabel\n  }\n}\n\nfragment EquipmentBreadcrumbs_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n  positionHierarchy {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "eacafc370d24cc7d5fef93f4c2aa8f6b";

module.exports = ((node/*: any*/)/*: Query<
  AddEndpointToServiceDialogQuery$variables,
  AddEndpointToServiceDialogQuery$data,
>*/);
