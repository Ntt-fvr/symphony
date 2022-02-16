/**
 * @generated SignedSource<<93681d2ff29ad8d17c204fe2669d22c9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
type ServicesView_service$fragmentType = any;
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type ServiceFilterType = "SERVICE_INST_NAME" | "SERVICE_STATUS" | "SERVICE_DISCOVERY_METHOD" | "SERVICE_TYPE" | "SERVICE_INST_EXTERNAL_ID" | "SERVICE_INST_CUSTOMER_NAME" | "PROPERTY" | "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "EQUIPMENT_IN_SERVICE" | "%future added value";
export type ServiceFilterInput = {|
  filterType: ServiceFilterType,
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
export type ServiceComparisonViewQueryRendererSearchQuery$variables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<ServiceFilterInput>,
|};
export type ServiceComparisonViewQueryRendererSearchQueryVariables = ServiceComparisonViewQueryRendererSearchQuery$variables;
export type ServiceComparisonViewQueryRendererSearchQuery$data = {|
  +services: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentSpreads: ServicesView_service$fragmentType,
      |},
    |}>,
    +totalCount: number,
  |},
|};
export type ServiceComparisonViewQueryRendererSearchQueryResponse = ServiceComparisonViewQueryRendererSearchQuery$data;
export type ServiceComparisonViewQueryRendererSearchQuery = {|
  variables: ServiceComparisonViewQueryRendererSearchQueryVariables,
  response: ServiceComparisonViewQueryRendererSearchQuery$data,
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v14 = [
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
    "name": "index",
    "storageKey": null
  },
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ServiceComparisonViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ServiceConnection",
        "kind": "LinkedField",
        "name": "services",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Service",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ServicesView_service"
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
    "name": "ServiceComparisonViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ServiceConnection",
        "kind": "LinkedField",
        "name": "services",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Service",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "externalId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Customer",
                    "kind": "LinkedField",
                    "name": "customer",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ServiceType",
                    "kind": "LinkedField",
                    "name": "serviceType",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
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
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      }
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
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyType",
                        "kind": "LinkedField",
                        "name": "propertyType",
                        "plural": false,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v8/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
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
                          (v4/*: any*/),
                          (v5/*: any*/)
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d8dab2a76d89caffc3764d4ca55bf610",
    "id": null,
    "metadata": {},
    "name": "ServiceComparisonViewQueryRendererSearchQuery",
    "operationKind": "query",
    "text": "query ServiceComparisonViewQueryRendererSearchQuery(\n  $limit: Int\n  $filters: [ServiceFilterInput!]!\n) {\n  services(first: $limit, filterBy: $filters) {\n    edges {\n      node {\n        ...ServicesView_service\n        id\n      }\n    }\n    totalCount\n  }\n}\n\nfragment DynamicPropertiesGrid_properties on Property {\n  ...PropertyFormField_property\n  propertyType {\n    id\n    index\n  }\n}\n\nfragment DynamicPropertiesGrid_propertyTypes on PropertyType {\n  id\n  name\n  index\n  isInstanceProperty\n  type\n  nodeType\n  stringValue\n  intValue\n  booleanValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  floatValue\n}\n\nfragment PropertyFormField_property on Property {\n  id\n  propertyType {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    isEditable\n    isInstanceProperty\n    isMandatory\n    category\n    isDeleted\n  }\n  stringValue\n  intValue\n  floatValue\n  booleanValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  nodeValue {\n    __typename\n    id\n    name\n  }\n}\n\nfragment PropertyTypeFormField_propertyType on PropertyType {\n  id\n  name\n  type\n  nodeType\n  index\n  stringValue\n  intValue\n  booleanValue\n  floatValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  isEditable\n  isInstanceProperty\n  isMandatory\n  category\n  isDeleted\n}\n\nfragment ServicesView_service on Service {\n  id\n  name\n  externalId\n  status\n  customer {\n    id\n    name\n  }\n  serviceType {\n    id\n    name\n    discoveryMethod\n    propertyTypes {\n      ...PropertyTypeFormField_propertyType\n      ...DynamicPropertiesGrid_propertyTypes\n      id\n    }\n  }\n  properties {\n    ...PropertyFormField_property\n    ...DynamicPropertiesGrid_properties\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "8045c18bb9bb4d07d66151a829bde59b";

module.exports = ((node/*: any*/)/*: Query<
  ServiceComparisonViewQueryRendererSearchQuery$variables,
  ServiceComparisonViewQueryRendererSearchQuery$data,
>*/);
