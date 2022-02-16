/**
 * @generated SignedSource<<f9836d05e936ce231a352144cc3d77e4>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type AvailableLinksAndPortsTable_links$fragmentType = any;
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type LinkFilterType = "LINK_FUTURE_STATUS" | "EQUIPMENT_TYPE" | "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "PROPERTY" | "SERVICE_INST" | "EQUIPMENT_INST" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type LinkFilterInput = {|
  filterType: LinkFilterType,
  operator: FilterOperator,
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
export type AddLinkToServiceDialogQuery$variables = {|
  filters: $ReadOnlyArray<LinkFilterInput>,
|};
export type AddLinkToServiceDialogQueryVariables = AddLinkToServiceDialogQuery$variables;
export type AddLinkToServiceDialogQuery$data = {|
  +links: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +ports: $ReadOnlyArray<?{|
          +parentEquipment: {|
            +id: string,
            +name: string,
          |},
          +definition: {|
            +id: string,
            +name: string,
          |},
        |}>,
        +$fragmentSpreads: AvailableLinksAndPortsTable_links$fragmentType,
      |},
    |}>,
  |},
|};
export type AddLinkToServiceDialogQueryResponse = AddLinkToServiceDialogQuery$data;
export type AddLinkToServiceDialogQuery = {|
  variables: AddLinkToServiceDialogQueryVariables,
  response: AddLinkToServiceDialogQuery$data,
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
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentPortDefinition",
  "kind": "LinkedField",
  "name": "definition",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
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
    "name": "AddLinkToServiceDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LinkConnection",
        "kind": "LinkedField",
        "name": "links",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LinkEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Link",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPort",
                    "kind": "LinkedField",
                    "name": "ports",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Equipment",
                        "kind": "LinkedField",
                        "name": "parentEquipment",
                        "plural": false,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AvailableLinksAndPortsTable_links"
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
    "name": "AddLinkToServiceDialogQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LinkConnection",
        "kind": "LinkedField",
        "name": "links",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LinkEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Link",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EquipmentPort",
                    "kind": "LinkedField",
                    "name": "ports",
                    "plural": true,
                    "selections": [
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EquipmentPosition",
                            "kind": "LinkedField",
                            "name": "positionHierarchy",
                            "plural": true,
                            "selections": [
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
                                  (v6/*: any*/)
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
                                "selections": [
                                  (v2/*: any*/),
                                  (v3/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "visibleLabel",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/),
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
                                "selections": [
                                  (v3/*: any*/),
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v2/*: any*/)
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
    "cacheID": "98080644bca12b00504b699b57cffb6a",
    "id": null,
    "metadata": {},
    "name": "AddLinkToServiceDialogQuery",
    "operationKind": "query",
    "text": "query AddLinkToServiceDialogQuery(\n  $filters: [LinkFilterInput!]!\n) {\n  links(filterBy: $filters, first: 50) {\n    edges {\n      node {\n        id\n        ports {\n          parentEquipment {\n            id\n            name\n          }\n          definition {\n            id\n            name\n          }\n          id\n        }\n        ...AvailableLinksAndPortsTable_links\n      }\n    }\n  }\n}\n\nfragment AvailableLinksAndPortsTable_links on Link {\n  id\n  ports {\n    parentEquipment {\n      id\n      name\n      positionHierarchy {\n        parentEquipment {\n          id\n        }\n        id\n      }\n      ...EquipmentBreadcrumbs_equipment\n    }\n    definition {\n      id\n      name\n    }\n    id\n  }\n}\n\nfragment EquipmentBreadcrumbs_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n  positionHierarchy {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "c56fde153bb9b1125a9e110db5a2fc15";

module.exports = ((node/*: any*/)/*: Query<
  AddLinkToServiceDialogQuery$variables,
  AddLinkToServiceDialogQuery$data,
>*/);
