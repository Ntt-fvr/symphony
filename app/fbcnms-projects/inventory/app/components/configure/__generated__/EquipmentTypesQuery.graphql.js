/**
 * @generated SignedSource<<24a630a9ecf3491186014e411a881892>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type AddEditEquipmentTypeCard_editingEquipmentType$fragmentType = any;
type EquipmentTypeItem_equipmentType$fragmentType = any;
export type EquipmentTypesQuery$variables = {||};
export type EquipmentTypesQueryVariables = EquipmentTypesQuery$variables;
export type EquipmentTypesQuery$data = {|
  +equipmentTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +$fragmentSpreads: EquipmentTypeItem_equipmentType$fragmentType & AddEditEquipmentTypeCard_editingEquipmentType$fragmentType,
      |},
    |}>,
  |},
|};
export type EquipmentTypesQueryResponse = EquipmentTypesQuery$data;
export type EquipmentTypesQuery = {|
  variables: EquipmentTypesQueryVariables,
  response: EquipmentTypesQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
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
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibleLabel",
  "storageKey": null
},
v8 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EquipmentTypesQuery",
    "selections": [
      {
        "alias": "equipmentTypes",
        "args": null,
        "concreteType": "EquipmentTypeConnection",
        "kind": "LinkedField",
        "name": "__EquipmentTypes_equipmentTypes_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "EquipmentTypeItem_equipmentType"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AddEditEquipmentTypeCard_editingEquipmentType"
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EquipmentTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "EquipmentTypeConnection",
        "kind": "LinkedField",
        "name": "equipmentTypes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyType",
                    "kind": "LinkedField",
                    "name": "propertyTypes",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stringValue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "intValue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "booleanValue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "floatValue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "latitudeValue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "longitudeValue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "rangeFromValue",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "rangeToValue",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isMandatory",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "category",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isDeleted",
                        "storageKey": null
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
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
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
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentPortType",
                        "kind": "LinkedField",
                        "name": "portType",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentPortDefinition",
                        "kind": "LinkedField",
                        "name": "connectedPorts",
                        "plural": true,
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "numberOfEquipment",
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": "equipmentTypes(first:500)"
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "EquipmentTypes_equipmentTypes",
        "kind": "LinkedHandle",
        "name": "equipmentTypes"
      }
    ]
  },
  "params": {
    "cacheID": "e2113eef7b1e71b0255650518e91f281",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "equipmentTypes"
          ]
        }
      ]
    },
    "name": "EquipmentTypesQuery",
    "operationKind": "query",
    "text": "query EquipmentTypesQuery {\n  equipmentTypes(first: 500) {\n    edges {\n      node {\n        id\n        name\n        ...EquipmentTypeItem_equipmentType\n        ...AddEditEquipmentTypeCard_editingEquipmentType\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AddEditEquipmentTypeCard_editingEquipmentType on EquipmentType {\n  id\n  name\n  propertyTypes {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    isEditable\n    isInstanceProperty\n    isMandatory\n  }\n  positionDefinitions {\n    id\n    name\n    index\n    visibleLabel\n  }\n  portDefinitions {\n    id\n    name\n    index\n    visibleLabel\n    portType {\n      id\n      name\n    }\n    connectedPorts {\n      id\n      name\n    }\n  }\n  numberOfEquipment\n}\n\nfragment DynamicPropertyTypesGrid_propertyTypes on PropertyType {\n  ...PropertyTypeFormField_propertyType\n  id\n  index\n}\n\nfragment EquipmentTypeItem_equipmentType on EquipmentType {\n  id\n  name\n  propertyTypes {\n    ...DynamicPropertyTypesGrid_propertyTypes\n    id\n  }\n  positionDefinitions {\n    ...PositionDefinitionsTable_positionDefinitions\n    id\n  }\n  portDefinitions {\n    ...PortDefinitionsTable_portDefinitions\n    id\n  }\n  numberOfEquipment\n}\n\nfragment PortDefinitionsTable_portDefinitions on EquipmentPortDefinition {\n  id\n  name\n  index\n  visibleLabel\n  portType {\n    id\n    name\n  }\n  connectedPorts {\n    id\n    name\n  }\n}\n\nfragment PositionDefinitionsTable_positionDefinitions on EquipmentPositionDefinition {\n  id\n  name\n  index\n  visibleLabel\n}\n\nfragment PropertyTypeFormField_propertyType on PropertyType {\n  id\n  name\n  type\n  nodeType\n  index\n  stringValue\n  intValue\n  booleanValue\n  floatValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  isEditable\n  isInstanceProperty\n  isMandatory\n  category\n  isDeleted\n}\n"
  }
};
})();

(node/*: any*/).hash = "dce6a1e94bb8c2b2a9c536813b9d4488";

module.exports = ((node/*: any*/)/*: Query<
  EquipmentTypesQuery$variables,
  EquipmentTypesQuery$data,
>*/);
