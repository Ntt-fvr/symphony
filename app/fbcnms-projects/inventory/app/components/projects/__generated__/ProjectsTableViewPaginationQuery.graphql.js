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
type ProjectsTableView_query$ref = any;
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type ProjectFilterType = "LOCATION_INST" | "PROJECT_NAME" | "PROJECT_OWNED_BY" | "PROJECT_PRIORITY" | "PROJECT_TYPE" | "%future added value";
export type ProjectOrderField = "NAME" | "NUMBER_OF_WORKORDERS" | "PRIORITY" | "PROJECT_LOCATION" | "PROJECT_OWNER" | "PROJECT_TEMPLATE" | "UPDATED_AT" | "%future added value";
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
export type ProjectsTableViewPaginationQueryVariables = {|
  cursor?: ?any,
  filterBy?: ?$ReadOnlyArray<ProjectFilterInput>,
  first?: ?number,
  orderBy?: ?ProjectOrder,
|};
export type ProjectsTableViewPaginationQueryResponse = {|
  +$fragmentRefs: ProjectsTableView_query$ref
|};
export type ProjectsTableViewPaginationQuery = {|
  variables: ProjectsTableViewPaginationQueryVariables,
  response: ProjectsTableViewPaginationQueryResponse,
|};
*/


/*
query ProjectsTableViewPaginationQuery(
  $cursor: Cursor
  $filterBy: [ProjectFilterInput!]
  $first: Int
  $orderBy: ProjectOrder
) {
  ...ProjectsTableView_query_1O5gLD
}

fragment ProjectsTableView_query_1O5gLD on Query {
  projects(after: $cursor, first: $first, orderBy: $orderBy, filterBy: $filterBy) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterBy"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderBy"
  }
],
v1 = {
  "kind": "Variable",
  "name": "filterBy",
  "variableName": "filterBy"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
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
  "name": "latitudeValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectsTableViewPaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ProjectsTableView_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProjectsTableViewPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "ProjectConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
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
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createTime",
                    "storageKey": null
                  },
                  (v6/*: any*/),
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
                      (v5/*: any*/)
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
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectType",
                    "kind": "LinkedField",
                    "name": "type",
                    "plural": false,
                    "selections": (v7/*: any*/),
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
                      (v5/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "nodeValue",
                        "plural": false,
                        "selections": [
                          (v16/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/)
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
                          (v5/*: any*/),
                          (v6/*: any*/),
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
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/)
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
                    "name": "numberOfWorkOrders",
                    "storageKey": null
                  },
                  (v16/*: any*/)
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
        "args": (v4/*: any*/),
        "filters": [
          "orderBy",
          "filterBy"
        ],
        "handle": "connection",
        "key": "ProjectsTableView_projects",
        "kind": "LinkedHandle",
        "name": "projects"
      }
    ]
  },
  "params": {
    "cacheID": "a935a89c5917a0c14d80fbd4bb0bc819",
    "id": null,
    "metadata": {},
    "name": "ProjectsTableViewPaginationQuery",
    "operationKind": "query",
    "text": "query ProjectsTableViewPaginationQuery(\n  $cursor: Cursor\n  $filterBy: [ProjectFilterInput!]\n  $first: Int\n  $orderBy: ProjectOrder\n) {\n  ...ProjectsTableView_query_1O5gLD\n}\n\nfragment ProjectsTableView_query_1O5gLD on Query {\n  projects(after: $cursor, first: $first, orderBy: $orderBy, filterBy: $filterBy) {\n    totalCount\n    edges {\n      node {\n        id\n        createTime\n        name\n        createdBy {\n          email\n          id\n        }\n        location {\n          id\n          name\n        }\n        type {\n          id\n          name\n        }\n        priority\n        properties {\n          id\n          stringValue\n          intValue\n          floatValue\n          booleanValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          nodeValue {\n            __typename\n            id\n            name\n          }\n          propertyType {\n            id\n            name\n            type\n            nodeType\n            isEditable\n            isMandatory\n            isInstanceProperty\n            stringValue\n            intValue\n            floatValue\n            booleanValue\n            latitudeValue\n            longitudeValue\n            rangeFromValue\n            rangeToValue\n          }\n        }\n        numberOfWorkOrders\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e8c11af9de7c51b252233eb2281c1530';

module.exports = node;
