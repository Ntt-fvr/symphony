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
type PowerSearchLocationsResultsTable_locations$ref = any;
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type LocationFilterType = "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "LOCATION_INST_HAS_EQUIPMENT" | "LOCATION_INST_NAME" | "LOCATION_TYPE" | "PROPERTY" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type LocationFilterInput = {|
  boolValue?: ?boolean,
  filterType: LocationFilterType,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  operator: FilterOperator,
  propertyValue?: ?PropertyTypeInput,
  stringSet?: ?$ReadOnlyArray<string>,
  stringValue?: ?string,
|};
export type PropertyTypeInput = {|
  booleanValue?: ?boolean,
  category?: ?string,
  dependencePropertyTypes?: ?$ReadOnlyArray<?PropertyTypeInput>,
  externalId?: ?string,
  floatValue?: ?number,
  id?: ?string,
  index?: ?number,
  intValue?: ?number,
  isDeleted?: ?boolean,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  isListable?: ?boolean,
  isMandatory?: ?boolean,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  name: string,
  nodeType?: ?string,
  propertyCategoryID?: ?string,
  propertyTypeValues?: ?$ReadOnlyArray<?AddPropertyTypeValueInput>,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  stringValue?: ?string,
  type: PropertyKind,
|};
export type AddPropertyTypeValueInput = {|
  id?: ?string,
  isDeleted?: ?boolean,
  name: string,
  parentPropertyType?: ?$ReadOnlyArray<?ParentPropertyTypeValueInput>,
  parentPropertyTypeValue?: ?$ReadOnlyArray<?string>,
  propertyType?: ?string,
|};
export type ParentPropertyTypeValueInput = {|
  parentPropertyType?: ?string,
  parentPropertyTypeValue?: ?string,
|};
export type LocationViewQueryRendererSearchQueryVariables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<LocationFilterInput>,
|};
export type LocationViewQueryRendererSearchQueryResponse = {|
  +locations: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentRefs: PowerSearchLocationsResultsTable_locations$ref
      |}
    |}>,
    +totalCount: number,
  |}
|};
export type LocationViewQueryRendererSearchQuery = {|
  variables: LocationViewQueryRendererSearchQueryVariables,
  response: LocationViewQueryRendererSearchQueryResponse,
|};
*/


/*
query LocationViewQueryRendererSearchQuery(
  $limit: Int
  $filters: [LocationFilterInput!]!
) {
  locations(first: $limit, filterBy: $filters) {
    edges {
      node {
        ...PowerSearchLocationsResultsTable_locations
        id
      }
    }
    totalCount
  }
}

fragment PowerSearchLocationsResultsTable_locations on Location {
  id
  name
  externalId
  locationType {
    id
    name
    propertyTypes {
      id
      stringValue
      intValue
      floatValue
      booleanValue
      latitudeValue
      longitudeValue
      rangeFromValue
      rangeToValue
    }
  }
  properties {
    id
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
    propertyType {
      id
      name
      type
      nodeType
      isEditable
      isInstanceProperty
      stringValue
      intValue
      floatValue
      booleanValue
      latitudeValue
      longitudeValue
      rangeFromValue
      rangeToValue
    }
  }
  locationHierarchy {
    id
    name
    locationType {
      name
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
  "name": "floatValue",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "LocationConnection",
        "kind": "LinkedField",
        "name": "locations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PowerSearchLocationsResultsTable_locations"
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
    "name": "LocationViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "LocationConnection",
        "kind": "LinkedField",
        "name": "locations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
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
                    "concreteType": "LocationType",
                    "kind": "LinkedField",
                    "name": "locationType",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyType",
                        "kind": "LinkedField",
                        "name": "propertyTypes",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/)
                        ],
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
                      },
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
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
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
    "cacheID": "90406b55db385b78d43959ed0fed9a8c",
    "id": null,
    "metadata": {},
    "name": "LocationViewQueryRendererSearchQuery",
    "operationKind": "query",
    "text": "query LocationViewQueryRendererSearchQuery(\n  $limit: Int\n  $filters: [LocationFilterInput!]!\n) {\n  locations(first: $limit, filterBy: $filters) {\n    edges {\n      node {\n        ...PowerSearchLocationsResultsTable_locations\n        id\n      }\n    }\n    totalCount\n  }\n}\n\nfragment PowerSearchLocationsResultsTable_locations on Location {\n  id\n  name\n  externalId\n  locationType {\n    id\n    name\n    propertyTypes {\n      id\n      stringValue\n      intValue\n      floatValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n    }\n  }\n  properties {\n    id\n    stringValue\n    intValue\n    floatValue\n    booleanValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    nodeValue {\n      __typename\n      id\n      name\n    }\n    propertyType {\n      id\n      name\n      type\n      nodeType\n      isEditable\n      isInstanceProperty\n      stringValue\n      intValue\n      floatValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n    }\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4b7e7b9307ab17820f4baafcaba9edc8';

module.exports = node;
