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
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type ProjectFilterType = "LOCATION_INST" | "PROJECT_CREATION_DATE" | "PROJECT_NAME" | "PROJECT_OWNED_BY" | "PROJECT_PRIORITY" | "PROJECT_TYPE" | "PROPERTY" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type ProjectFilterInput = {|
  filterType: ProjectFilterType,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  operator: FilterOperator,
  propertyValue?: ?PropertyTypeInput,
  stringSet?: ?$ReadOnlyArray<string>,
  stringValue?: ?string,
  timeValue?: ?any,
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
export type ProjectTypeahead_ProjectsQueryVariables = {|
  limit?: ?number,
  filters: $ReadOnlyArray<ProjectFilterInput>,
|};
export type ProjectTypeahead_ProjectsQueryResponse = {|
  +projects: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +type: {|
          +name: string
        |},
      |}
    |}>
  |}
|};
export type ProjectTypeahead_ProjectsQuery = {|
  variables: ProjectTypeahead_ProjectsQueryVariables,
  response: ProjectTypeahead_ProjectsQueryResponse,
|};
*/


/*
query ProjectTypeahead_ProjectsQuery(
  $limit: Int
  $filters: [ProjectFilterInput!]!
) {
  projects(first: $limit, filterBy: $filters) {
    edges {
      node {
        id
        name
        type {
          name
          id
        }
      }
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
    "name": "ProjectTypeahead_ProjectsQuery",
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectType",
                    "kind": "LinkedField",
                    "name": "type",
                    "plural": false,
                    "selections": [
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
    "name": "ProjectTypeahead_ProjectsQuery",
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectType",
                    "kind": "LinkedField",
                    "name": "type",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v3/*: any*/)
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
    "cacheID": "e939ce500a070082d6a0fbb53bbcde0a",
    "id": null,
    "metadata": {},
    "name": "ProjectTypeahead_ProjectsQuery",
    "operationKind": "query",
    "text": "query ProjectTypeahead_ProjectsQuery(\n  $limit: Int\n  $filters: [ProjectFilterInput!]!\n) {\n  projects(first: $limit, filterBy: $filters) {\n    edges {\n      node {\n        id\n        name\n        type {\n          name\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4f9669091bda026ea27aab7f07fd1b0b';

module.exports = node;
