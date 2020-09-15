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
type ProjectsTableView_projects$ref = any;
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type ProjectFilterType = "LOCATION_INST" | "PROJECT_NAME" | "PROJECT_OWNED_BY" | "PROJECT_PRIORITY" | "PROJECT_TYPE" | "%future added value";
export type ProjectFilterInput = {|
  filterType: ProjectFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  stringSet?: ?$ReadOnlyArray<string>,
|};
export type ProjectComparisonViewQueryRendererSearchQueryVariables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<ProjectFilterInput>,
|};
export type ProjectComparisonViewQueryRendererSearchQueryResponse = {|
  +projects: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentRefs: ProjectsTableView_projects$ref & ProjectsMap_projects$ref
      |}
    |}>
  |}
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
) {
  projects(first: $limit, orderBy: {direction: DESC, field: UPDATED_AT}, filterBy: $filters) {
    edges {
      node {
        ...ProjectsTableView_projects
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

fragment ProjectsTableView_projects on Project {
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
  numberOfWorkOrders
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
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "UPDATED_AT"
    }
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
    "name": "ProjectComparisonViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ProjectConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
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
                    "name": "ProjectsTableView_projects"
                  },
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
    "name": "ProjectComparisonViewQueryRendererSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ProjectConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createTime",
                    "storageKey": null
                  },
                  (v4/*: any*/),
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
                      (v3/*: any*/)
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
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectType",
                    "kind": "LinkedField",
                    "name": "type",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
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
                    "kind": "ScalarField",
                    "name": "numberOfWorkOrders",
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
    "cacheID": "486efbc12cfa8744ca8bc919c633dbad",
    "id": null,
    "metadata": {},
    "name": "ProjectComparisonViewQueryRendererSearchQuery",
    "operationKind": "query",
    "text": "query ProjectComparisonViewQueryRendererSearchQuery(\n  $limit: Int\n  $filters: [ProjectFilterInput!]!\n) {\n  projects(first: $limit, orderBy: {direction: DESC, field: UPDATED_AT}, filterBy: $filters) {\n    edges {\n      node {\n        ...ProjectsTableView_projects\n        ...ProjectsMap_projects\n        id\n      }\n    }\n  }\n}\n\nfragment ProjectsMap_projects on Project {\n  id\n  name\n  location {\n    id\n    name\n    latitude\n    longitude\n  }\n  numberOfWorkOrders\n}\n\nfragment ProjectsTableView_projects on Project {\n  id\n  createTime\n  name\n  createdBy {\n    email\n    id\n  }\n  location {\n    id\n    name\n  }\n  type {\n    id\n    name\n  }\n  priority\n  numberOfWorkOrders\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a1f6b1f4e71ebad6a27dac6b7beea9b9';

module.exports = node;
