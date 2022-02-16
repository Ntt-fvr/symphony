/**
 * @generated SignedSource<<48a25ab57e3c8cb57737a245faa38448>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
type ProjectsTableView_query$fragmentType = any;
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type ProjectFilterType = "PROJECT_NAME" | "PROJECT_OWNED_BY" | "PROJECT_TYPE" | "LOCATION_INST" | "PROJECT_PRIORITY" | "PROPERTY" | "%future added value";
export type ProjectOrderField = "NAME" | "CREATED_AT" | "UPDATED_AT" | "PRIORITY" | "PROPERTY" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type ProjectFilterInput = {|
  filterType: ProjectFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  stringSet?: ?$ReadOnlyArray<string>,
  propertyValue?: ?PropertyTypeInput,
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
export type ProjectOrder = {|
  direction: OrderDirection,
  field?: ?ProjectOrderField,
|};
export type ProjectsTableViewPaginationQuery$variables = {|
  cursor?: ?any,
  filterBy?: ?$ReadOnlyArray<ProjectFilterInput>,
  first?: ?number,
  orderBy?: ?ProjectOrder,
  propertyOrder?: ?string,
  propertyValue?: ?string,
|};
export type ProjectsTableViewPaginationQueryVariables = ProjectsTableViewPaginationQuery$variables;
export type ProjectsTableViewPaginationQuery$data = {|
  +$fragmentSpreads: ProjectsTableView_query$fragmentType,
|};
export type ProjectsTableViewPaginationQueryResponse = ProjectsTableViewPaginationQuery$data;
export type ProjectsTableViewPaginationQuery = {|
  variables: ProjectsTableViewPaginationQueryVariables,
  response: ProjectsTableViewPaginationQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "propertyOrder"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "propertyValue"
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
v4 = {
  "kind": "Variable",
  "name": "propertyOrder",
  "variableName": "propertyOrder"
},
v5 = {
  "kind": "Variable",
  "name": "propertyValue",
  "variableName": "propertyValue"
},
v6 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v18 = {
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
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
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
        "args": (v6/*: any*/),
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
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createTime",
                    "storageKey": null
                  },
                  (v8/*: any*/),
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
                      (v7/*: any*/)
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
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectType",
                    "kind": "LinkedField",
                    "name": "type",
                    "plural": false,
                    "selections": (v9/*: any*/),
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
                      (v7/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "nodeValue",
                        "plural": false,
                        "selections": [
                          (v18/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/)
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
                          (v7/*: any*/),
                          (v8/*: any*/),
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
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/)
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
                  (v18/*: any*/)
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
        "args": (v6/*: any*/),
        "filters": [
          "orderBy",
          "propertyValue",
          "propertyOrder",
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
    "cacheID": "37f2f05b8d920744f2062971d4be7a5b",
    "id": null,
    "metadata": {},
    "name": "ProjectsTableViewPaginationQuery",
    "operationKind": "query",
    "text": "query ProjectsTableViewPaginationQuery(\n  $cursor: Cursor\n  $filterBy: [ProjectFilterInput!]\n  $first: Int\n  $orderBy: ProjectOrder\n  $propertyOrder: String\n  $propertyValue: String\n) {\n  ...ProjectsTableView_query_dTUb0\n}\n\nfragment ProjectsTableView_query_dTUb0 on Query {\n  projects(after: $cursor, first: $first, orderBy: $orderBy, propertyValue: $propertyValue, propertyOrder: $propertyOrder, filterBy: $filterBy) {\n    totalCount\n    edges {\n      node {\n        id\n        createTime\n        name\n        createdBy {\n          email\n          id\n        }\n        location {\n          id\n          name\n        }\n        type {\n          id\n          name\n        }\n        priority\n        properties {\n          id\n          stringValue\n          intValue\n          floatValue\n          booleanValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          nodeValue {\n            __typename\n            id\n            name\n          }\n          propertyType {\n            id\n            name\n            type\n            nodeType\n            isEditable\n            isMandatory\n            isInstanceProperty\n            stringValue\n            intValue\n            floatValue\n            booleanValue\n            latitudeValue\n            longitudeValue\n            rangeFromValue\n            rangeToValue\n          }\n        }\n        numberOfWorkOrders\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "9af73a2dab4860b72aabdb10cc0f17ad";

module.exports = ((node/*: any*/)/*: Query<
  ProjectsTableViewPaginationQuery$variables,
  ProjectsTableViewPaginationQuery$data,
>*/);
