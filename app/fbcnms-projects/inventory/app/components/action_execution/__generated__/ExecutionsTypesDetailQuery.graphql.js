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
export type ActionExecutionItemStatus = "FAILED" | "PENDING" | "SUCCESSFULL" | "%future added value";
export type ActionSchedulerType = "MANUAL_EXECUTION" | "ONE_TIME_EXECUTION" | "PERIODICAL_EXECUTION" | "%future added value";
export type ExecutionsTypesDetailQueryVariables = {|
  getActionExecutionId: string
|};
export type ExecutionsTypesDetailQueryResponse = {|
  +getActionExecution: ?{|
    +id: string,
    +endTime: ?any,
    +template: {|
      +name: string,
      +resourceSpecifications: string,
    |},
    +scheduler: ?{|
      +type: ActionSchedulerType
    |},
    +starTime: any,
    +items: ?$ReadOnlyArray<?{|
      +resources: $ReadOnlyArray<?{|
        +resourceSpecification: string,
        +name: string,
      |}>,
      +status: ?ActionExecutionItemStatus,
    |}>,
  |}
|};
export type ExecutionsTypesDetailQuery = {|
  variables: ExecutionsTypesDetailQueryVariables,
  response: ExecutionsTypesDetailQueryResponse,
|};
*/


/*
query ExecutionsTypesDetailQuery(
  $getActionExecutionId: ID!
) {
  getActionExecution(id: $getActionExecutionId) {
    id
    endTime
    template {
      name
      resourceSpecifications
      id
    }
    scheduler {
      type
      id
    }
    starTime
    items {
      resources {
        resourceSpecification
        name
        id
      }
      status
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "getActionExecutionId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "getActionExecutionId"
  }
],
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
  "name": "endTime",
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
  "name": "resourceSpecifications",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "starTime",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecification",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExecutionsTypesDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ActionExecution",
        "kind": "LinkedField",
        "name": "getActionExecution",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionTemplate",
            "kind": "LinkedField",
            "name": "template",
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
            "concreteType": "ActionScheduler",
            "kind": "LinkedField",
            "name": "scheduler",
            "plural": false,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionExecutionItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "resources",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExecutionsTypesDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ActionExecution",
        "kind": "LinkedField",
        "name": "getActionExecution",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionTemplate",
            "kind": "LinkedField",
            "name": "template",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionScheduler",
            "kind": "LinkedField",
            "name": "scheduler",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionExecutionItem",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "resources",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
                  (v4/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f12cb3d76b9e7e845896056b0b85c383",
    "id": null,
    "metadata": {},
    "name": "ExecutionsTypesDetailQuery",
    "operationKind": "query",
    "text": "query ExecutionsTypesDetailQuery(\n  $getActionExecutionId: ID!\n) {\n  getActionExecution(id: $getActionExecutionId) {\n    id\n    endTime\n    template {\n      name\n      resourceSpecifications\n      id\n    }\n    scheduler {\n      type\n      id\n    }\n    starTime\n    items {\n      resources {\n        resourceSpecification\n        name\n        id\n      }\n      status\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '423e2fb819d94bc8f9a6a8fb05234fb3';

module.exports = node;
