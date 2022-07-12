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
export type ActionSchedulerStatus = "ACTIVED" | "DEACTIVATED" | "%future added value";
export type ActionSchedulerType = "MANUAL_EXECUTION" | "ONE_TIME_EXECUTION" | "PERIODICAL_EXECUTION" | "%future added value";
export type ScheduledActionsTypesQueryVariables = {||};
export type ScheduledActionsTypesQueryResponse = {|
  +queryActionScheduler: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +actions: ?$ReadOnlyArray<{|
      +starTime: any
    |}>,
    +status: ActionSchedulerStatus,
    +actionTemplate: {|
      +resourceSpecifications: string,
      +name: string,
    |},
    +type: ActionSchedulerType,
    +actionsAggregate: ?{|
      +count: ?number
    |},
  |}>
|};
export type ScheduledActionsTypesQuery = {|
  variables: ScheduledActionsTypesQueryVariables,
  response: ScheduledActionsTypesQueryResponse,
|};
*/


/*
query ScheduledActionsTypesQuery {
  queryActionScheduler {
    id
    name
    actions {
      starTime
      id
    }
    status
    actionTemplate {
      resourceSpecifications
      name
      id
    }
    type
    actionsAggregate {
      count
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "starTime",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecifications",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "ActionExecutionAggregateResult",
  "kind": "LinkedField",
  "name": "actionsAggregate",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "count",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ScheduledActionsTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionScheduler",
        "kind": "LinkedField",
        "name": "queryActionScheduler",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionExecution",
            "kind": "LinkedField",
            "name": "actions",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionTemplate",
            "kind": "LinkedField",
            "name": "actionTemplate",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ScheduledActionsTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionScheduler",
        "kind": "LinkedField",
        "name": "queryActionScheduler",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionExecution",
            "kind": "LinkedField",
            "name": "actions",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionTemplate",
            "kind": "LinkedField",
            "name": "actionTemplate",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v1/*: any*/),
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d848ac3347e76a4273c05ad3dd3d2dbd",
    "id": null,
    "metadata": {},
    "name": "ScheduledActionsTypesQuery",
    "operationKind": "query",
    "text": "query ScheduledActionsTypesQuery {\n  queryActionScheduler {\n    id\n    name\n    actions {\n      starTime\n      id\n    }\n    status\n    actionTemplate {\n      resourceSpecifications\n      name\n      id\n    }\n    type\n    actionsAggregate {\n      count\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ba6475ceb2cbacb48b099e7c1b44d9c3';

module.exports = node;
