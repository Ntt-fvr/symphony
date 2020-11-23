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
type ProjectsMap_projects$ref = any;
type ProjectsTableView_query$ref = any;
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type ProjectFilterType = "LOCATION_INST" | "PROJECT_NAME" | "PROJECT_OWNED_BY" | "PROJECT_PRIORITY" | "PROJECT_TYPE" | "%future added value";
export type ProjectOrderField = "NAME" | "UPDATED_AT" | "%future added value";
export type ProjectFilterInput = {|
  filterType: ProjectFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  stringSet?: ?$ReadOnlyArray<string>,
|};
export type ProjectOrder = {|
  direction: OrderDirection,
  field?: ?ProjectOrderField,
|};
export type ProjectComparisonViewQueryRendererSearchQueryVariables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<ProjectFilterInput>,
  orderBy?: ?ProjectOrder,
|};
export type ProjectComparisonViewQueryRendererSearchQueryResponse = {|
  +projectsMap: {|
    +totalCount: number,
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentRefs: ProjectsMap_projects$ref
      |}
    |}>,
  |},
  +$fragmentRefs: ProjectsTableView_query$ref,
|};
export type ProjectComparisonViewQueryRendererSearchQuery = {|
  variables: ProjectComparisonViewQueryRendererSearchQueryVariables,
  response: ProjectComparisonViewQueryRendererSearchQueryResponse,
|};
*/


/*
query ProjectComparisonViewQueryRendererSearchQuery(
  $limit: Int
  $filters: [ProjectFilterInput!]!
  $orderBy: ProjectOrder
) {
  ...ProjectsTableView_query_10glCF
  projectsMap: projects(first: 100, orderBy: $orderBy, filterBy: $filters) {
    totalCount
    edges {
      node {
        ...ProjectsMap_projects
        id
      }
    }
  }
}

fragment ProjectsMap_projects on Project {
  id
  name
  location {
    id
    name
    latitude
    longitude
  }
  numberOfWorkOrders
}

fragment ProjectsTableView_query_10glCF on Query {
  projects(first: $limit, orderBy: $orderBy, filterBy: $filters) {
    totalCount
    edges {
      node {
        id
        createTime
        name
        createdBy {
          email
          id
        }
        location {
          id
          name
        }
        type {
          id
          name
        }
        priority
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
            isMandatory
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
        numberOfWorkOrders
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
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
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v3 = {
  "kind": "Variable",
  "name": "filterBy",
  "variableName": "filters"
},
v4 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v5 = [
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  },
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v7 = [
  (v3/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "limit"
  },
  (v4/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = [
  (v8/*: any*/),
  (v9/*: any*/)
],
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
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numberOfWorkOrders",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectComparisonViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": "projectsMap",
        "args": (v5/*: any*/),
        "concreteType": "ProjectConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ProjectsMap_projects"
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
      {
        "args": (v7/*: any*/),
        "kind": "FragmentSpread",
        "name": "ProjectsTableView_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProjectComparisonViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "ProjectConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createTime",
                    "storageKey": null
                  },
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "email",
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "location",
                    "plural": false,
                    "selections": (v10/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectType",
                    "kind": "LinkedField",
                    "name": "type",
                    "plural": false,
                    "selections": (v10/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "priority",
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
                      (v8/*: any*/),
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
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "nodeValue",
                        "plural": false,
                        "selections": [
                          (v19/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/)
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
                          (v8/*: any*/),
                          (v9/*: any*/),
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
                            "name": "isMandatory",
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
                  },
                  (v20/*: any*/),
                  (v19/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
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
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
        "filters": [
          "orderBy",
          "filterBy"
        ],
        "handle": "connection",
        "key": "ProjectsTableView_projects",
        "kind": "LinkedHandle",
        "name": "projects"
      },
      {
        "alias": "projectsMap",
        "args": (v5/*: any*/),
        "concreteType": "ProjectConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "location",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "latitude",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "longitude",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v20/*: any*/)
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
    "cacheID": "df21af41964d5e9efc5d4e878cfab0a5",
    "id": null,
    "metadata": {},
    "name": "ProjectComparisonViewQueryRendererSearchQuery",
    "operationKind": "query",
    "text": "query ProjectComparisonViewQueryRendererSearchQuery(\n  $limit: Int\n  $filters: [ProjectFilterInput!]!\n  $orderBy: ProjectOrder\n) {\n  ...ProjectsTableView_query_10glCF\n  projectsMap: projects(first: 100, orderBy: $orderBy, filterBy: $filters) {\n    totalCount\n    edges {\n      node {\n        ...ProjectsMap_projects\n        id\n      }\n    }\n  }\n}\n\nfragment ProjectsMap_projects on Project {\n  id\n  name\n  location {\n    id\n    name\n    latitude\n    longitude\n  }\n  numberOfWorkOrders\n}\n\nfragment ProjectsTableView_query_10glCF on Query {\n  projects(first: $limit, orderBy: $orderBy, filterBy: $filters) {\n    totalCount\n    edges {\n      node {\n        id\n        createTime\n        name\n        createdBy {\n          email\n          id\n        }\n        location {\n          id\n          name\n        }\n        type {\n          id\n          name\n        }\n        priority\n        properties {\n          id\n          stringValue\n          intValue\n          floatValue\n          booleanValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          nodeValue {\n            __typename\n            id\n            name\n          }\n          propertyType {\n            id\n            name\n            type\n            nodeType\n            isEditable\n            isMandatory\n            isInstanceProperty\n            stringValue\n            intValue\n            floatValue\n            booleanValue\n            latitudeValue\n            longitudeValue\n            rangeFromValue\n            rangeToValue\n          }\n        }\n        numberOfWorkOrders\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '34c396b61465961fa27d84fa6e96fe1b';

module.exports = node;
