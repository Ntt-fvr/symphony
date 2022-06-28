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
export type ChangeRequestHasFilter = "activities" | "aprobator" | "createTime" | "description" | "items" | "requester" | "scheduler" | "source" | "status" | "type" | "updateTime" | "%future added value";
export type ChangeRequestSource = "GUI" | "NON_RT_RIC" | "NSSMF" | "WORKFLOW" | "%future added value";
export type ChangeRequestStatus = "CANCELLED" | "FAILED" | "IN_EXECUTION" | "PENDING_APPROVAL" | "REJECTED" | "SCHEDULED" | "SUBMITTED" | "SUCCESSFUL" | "SUCCESSFUL_WITH_WARNINGS" | "%future added value";
export type ChangeRequestType = "AUTOMATIC" | "MANUAL" | "%future added value";
export type FilterOperator = "CONTAINS" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_GREATER_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "DATE_LESS_THAN" | "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "IS_NOT_ONE_OF" | "IS_ONE_OF" | "%future added value";
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
export type ResourceSpecificationFilterType = "ID" | "NAME" | "RESOURCE_TYPE" | "%future added value";
export type ResourceSpecificationFilterInput = {|
  filterType: ResourceSpecificationFilterType,
  idSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
  operator: FilterOperator,
  stringSet?: ?$ReadOnlyArray<string>,
  stringValue?: ?string,
|};
export type ChangeRequestFilter = {|
  and?: ?$ReadOnlyArray<?ChangeRequestFilter>,
  aprobator?: ?StringHashFilter,
  has?: ?$ReadOnlyArray<?ChangeRequestHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  not?: ?ChangeRequestFilter,
  or?: ?$ReadOnlyArray<?ChangeRequestFilter>,
  requester?: ?StringHashFilter,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type ChangeRequestDetailsQueryVariables = {|
  filterBy?: ?$ReadOnlyArray<ResourceSpecificationFilterInput>,
  filter?: ?ChangeRequestFilter,
|};
export type ChangeRequestDetailsQueryResponse = {|
  +queryChangeRequest: ?$ReadOnlyArray<?{|
    +description: string,
    +id: string,
    +source: ?ChangeRequestSource,
    +status: ChangeRequestStatus,
    +type: ?ChangeRequestType,
    +requester: string,
    +items: $ReadOnlyArray<{|
      +id: string,
      +parameterType: {|
        +id: string,
        +name: string,
        +stringValue: ?string,
        +type: ParameterKind,
        +resourceSpecification: string,
        +parameters: ?$ReadOnlyArray<{|
          +id: string,
          +stringValue: ?string,
          +intValue: ?number,
        |}>,
      |},
      +resource: ?{|
        +id: string,
        +name: string,
        +resourceSpecification: string,
      |},
      +stringValue: ?string,
    |}>,
  |}>,
  +resourceSpecifications: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceType: ?{|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |},
|};
export type ChangeRequestDetailsQuery = {|
  variables: ChangeRequestDetailsQueryVariables,
  response: ChangeRequestDetailsQueryResponse,
|};
*/


/*
query ChangeRequestDetailsQuery(
  $filterBy: [ResourceSpecificationFilterInput!]
  $filter: ChangeRequestFilter
) {
  queryChangeRequest(filter: $filter) {
    description
    id
    source
    status
    type
    requester
    items {
      id
      parameterType {
        id
        name
        stringValue
        type
        resourceSpecification
        parameters {
          id
          stringValue
          intValue
        }
      }
      resource {
        id
        name
        resourceSpecification
      }
      stringValue
    }
  }
  resourceSpecifications(filterBy: $filterBy) {
    edges {
      node {
        id
        name
        resourceType {
          id
          name
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
  "name": "filter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filterBy"
},
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
  "name": "type",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecification",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      }
    ],
    "concreteType": "ChangeRequest",
    "kind": "LinkedField",
    "name": "queryChangeRequest",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "source",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "requester",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ChangeItem",
        "kind": "LinkedField",
        "name": "items",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ConfigurationParameterType",
            "kind": "LinkedField",
            "name": "parameterType",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Parameter",
                "kind": "LinkedField",
                "name": "parameters",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "intValue",
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
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "resource",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filterBy",
        "variableName": "filterBy"
      }
    ],
    "concreteType": "ResourceSpecificationConnection",
    "kind": "LinkedField",
    "name": "resourceSpecifications",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceSpecificationEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceSpecification",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeRequestDetailsQuery",
    "selections": (v7/*: any*/),
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
    "name": "ChangeRequestDetailsQuery",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "548ae6d611a94bf8e1ce2e9e5afc76f1",
    "id": null,
    "metadata": {},
    "name": "ChangeRequestDetailsQuery",
    "operationKind": "query",
    "text": "query ChangeRequestDetailsQuery(\n  $filterBy: [ResourceSpecificationFilterInput!]\n  $filter: ChangeRequestFilter\n) {\n  queryChangeRequest(filter: $filter) {\n    description\n    id\n    source\n    status\n    type\n    requester\n    items {\n      id\n      parameterType {\n        id\n        name\n        stringValue\n        type\n        resourceSpecification\n        parameters {\n          id\n          stringValue\n          intValue\n        }\n      }\n      resource {\n        id\n        name\n        resourceSpecification\n      }\n      stringValue\n    }\n  }\n  resourceSpecifications(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ec99e449514e353a9b5c668126edf0c3';

module.exports = node;
