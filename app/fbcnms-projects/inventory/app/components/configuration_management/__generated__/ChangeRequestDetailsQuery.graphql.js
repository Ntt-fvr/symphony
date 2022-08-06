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
export type TypeSchedulerConfig = "AS_SOON_AS_APPROVED" | "NOT_APPROVAL_REQUIRED" | "SCHEDULED_CHANGE" | "%future added value";
export type WeekDay = "FRIDAY" | "MONDAY" | "SATURDAY" | "SUNDAY" | "THURSDAY" | "TUESDAY" | "WEDNESDAY" | "%future added value";
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
    +scheduler: ?{|
      +time: ?any,
      +type: TypeSchedulerConfig,
      +weekDay: ?WeekDay,
    |},
    +items: $ReadOnlyArray<{|
      +id: string,
      +stringValue: ?string,
      +intValue: ?number,
      +floatValue: ?number,
      +parameterType: {|
        +id: string,
        +name: string,
        +stringValue: ?string,
        +intValue: ?number,
        +floatValue: ?number,
        +type: ParameterKind,
        +resourceSpecification: string,
        +parameters: ?$ReadOnlyArray<{|
          +id: string,
          +stringValue: ?string,
          +intValue: ?number,
          +floatValue: ?number,
        |}>,
      |},
      +resource: ?{|
        +id: string,
        +name: string,
        +resourceSpecification: string,
      |},
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
    scheduler {
      time
      type
      weekDay
      id
    }
    items {
      id
      stringValue
      intValue
      floatValue
      parameterType {
        id
        name
        stringValue
        intValue
        floatValue
        type
        resourceSpecification
        parameters {
          id
          stringValue
          intValue
          floatValue
        }
      }
      resource {
        id
        name
        resourceSpecification
      }
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
v2 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
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
  "name": "source",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "requester",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "time",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "weekDay",
  "storageKey": null
},
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
  "name": "name",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecification",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "ChangeItem",
  "kind": "LinkedField",
  "name": "items",
  "plural": true,
  "selections": [
    (v4/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ConfigurationParameterType",
      "kind": "LinkedField",
      "name": "parameterType",
      "plural": false,
      "selections": [
        (v4/*: any*/),
        (v14/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        (v7/*: any*/),
        (v15/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Parameter",
          "kind": "LinkedField",
          "name": "parameters",
          "plural": true,
          "selections": [
            (v4/*: any*/),
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "resource",
      "plural": false,
      "selections": [
        (v4/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v17 = {
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
            (v4/*: any*/),
            (v14/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "ResourceType",
              "kind": "LinkedField",
              "name": "resourceType",
              "plural": false,
              "selections": [
                (v4/*: any*/),
                (v14/*: any*/)
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeRequestDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChangeRequest",
        "kind": "LinkedField",
        "name": "queryChangeRequest",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "SchedulerConfig",
            "kind": "LinkedField",
            "name": "scheduler",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v7/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          (v16/*: any*/)
        ],
        "storageKey": null
      },
      (v17/*: any*/)
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
    "name": "ChangeRequestDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ChangeRequest",
        "kind": "LinkedField",
        "name": "queryChangeRequest",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "SchedulerConfig",
            "kind": "LinkedField",
            "name": "scheduler",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              (v7/*: any*/),
              (v10/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v16/*: any*/)
        ],
        "storageKey": null
      },
      (v17/*: any*/)
    ]
  },
  "params": {
    "cacheID": "57be6640734767a709d5bea56ce39051",
    "id": null,
    "metadata": {},
    "name": "ChangeRequestDetailsQuery",
    "operationKind": "query",
    "text": "query ChangeRequestDetailsQuery(\n  $filterBy: [ResourceSpecificationFilterInput!]\n  $filter: ChangeRequestFilter\n) {\n  queryChangeRequest(filter: $filter) {\n    description\n    id\n    source\n    status\n    type\n    requester\n    scheduler {\n      time\n      type\n      weekDay\n      id\n    }\n    items {\n      id\n      stringValue\n      intValue\n      floatValue\n      parameterType {\n        id\n        name\n        stringValue\n        intValue\n        floatValue\n        type\n        resourceSpecification\n        parameters {\n          id\n          stringValue\n          intValue\n          floatValue\n        }\n      }\n      resource {\n        id\n        name\n        resourceSpecification\n      }\n    }\n  }\n  resourceSpecifications(filterBy: $filterBy) {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '12a665a350ab946c521cdd887659174d';

module.exports = node;
