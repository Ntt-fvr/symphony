/**
 * @generated SignedSource<<043bbb6f92c02aed44da69528ef528db>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type AddEditServiceTypeCard_editingServiceType$fragmentType = any;
type ServiceTypeItem_serviceType$fragmentType = any;
export type ServiceTypesQuery$variables = {||};
export type ServiceTypesQueryVariables = ServiceTypesQuery$variables;
export type ServiceTypesQuery$data = {|
  +serviceTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +isDeleted: boolean,
        +$fragmentSpreads: ServiceTypeItem_serviceType$fragmentType & AddEditServiceTypeCard_editingServiceType$fragmentType,
      |},
    |}>,
  |},
|};
export type ServiceTypesQueryResponse = ServiceTypesQuery$data;
export type ServiceTypesQuery = {|
  variables: ServiceTypesQueryVariables,
  response: ServiceTypesQuery$data,
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
  "name": "isDeleted",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
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
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ServiceTypesQuery",
    "selections": [
      {
        "alias": "serviceTypes",
        "args": null,
        "concreteType": "ServiceTypeConnection",
        "kind": "LinkedField",
        "name": "__ServiceTypes_serviceTypes_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ServiceType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ServiceTypeItem_serviceType"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AddEditServiceTypeCard_editingServiceType"
                  },
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
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
    "name": "ServiceTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "ServiceTypeConnection",
        "kind": "LinkedField",
        "name": "serviceTypes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ServiceType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "discoveryMethod",
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
                      (v7/*: any*/),
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ServiceEndpointDefinition",
                    "kind": "LinkedField",
                    "name": "endpointDefinitions",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "role",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EquipmentType",
                        "kind": "LinkedField",
                        "name": "equipmentType",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "numberOfServices",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "serviceTypes(first:500)"
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "ServiceTypes_serviceTypes",
        "kind": "LinkedHandle",
        "name": "serviceTypes"
      }
    ]
  },
  "params": {
    "cacheID": "d83397bb8fbb488da3bfb5ea51083ed9",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "serviceTypes"
          ]
        }
      ]
    },
    "name": "ServiceTypesQuery",
    "operationKind": "query",
    "text": "query ServiceTypesQuery {\n  serviceTypes(first: 500) {\n    edges {\n      node {\n        ...ServiceTypeItem_serviceType\n        ...AddEditServiceTypeCard_editingServiceType\n        id\n        name\n        isDeleted\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment AddEditServiceTypeCard_editingServiceType on ServiceType {\n  id\n  name\n  numberOfServices\n  discoveryMethod\n  propertyTypes {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    isEditable\n    isMandatory\n    isInstanceProperty\n  }\n  endpointDefinitions {\n    id\n    index\n    role\n    name\n    equipmentType {\n      name\n      id\n    }\n  }\n}\n\nfragment PropertyTypeFormField_propertyType on PropertyType {\n  id\n  name\n  type\n  nodeType\n  index\n  stringValue\n  intValue\n  booleanValue\n  floatValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  isEditable\n  isInstanceProperty\n  isMandatory\n  category\n  isDeleted\n}\n\nfragment ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions on ServiceEndpointDefinition {\n  id\n  name\n  role\n  index\n  equipmentType {\n    id\n    name\n  }\n}\n\nfragment ServiceTypeItem_serviceType on ServiceType {\n  id\n  name\n  discoveryMethod\n  propertyTypes {\n    ...PropertyTypeFormField_propertyType\n    id\n  }\n  endpointDefinitions {\n    ...ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions\n    id\n  }\n  numberOfServices\n}\n"
  }
};
})();

(node/*: any*/).hash = "27909e6e8675e10f68f441661a634c35";

module.exports = ((node/*: any*/)/*: Query<
  ServiceTypesQuery$variables,
  ServiceTypesQuery$data,
>*/);
