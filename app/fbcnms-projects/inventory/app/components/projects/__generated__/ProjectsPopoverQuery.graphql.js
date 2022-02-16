/**
 * @generated SignedSource<<c9665711b45fb1cda3914f11631cc56b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type WorkOrderPriority = "URGENT" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | "%future added value";
export type WorkOrderStatus = "PLANNED" | "IN_PROGRESS" | "PENDING" | "SUBMITTED" | "CLOSED" | "DONE" | "BLOCKED" | "CANCELED" | "SUSPENDED" | "%future added value";
export type ProjectsPopoverQuery$variables = {|
  projectId: string,
|};
export type ProjectsPopoverQueryVariables = ProjectsPopoverQuery$variables;
export type ProjectsPopoverQuery$data = {|
  +project: ?{|
    +id?: string,
    +name?: string,
    +location?: ?{|
      +id: string,
      +name: string,
      +latitude: number,
      +longitude: number,
    |},
    +workOrders?: $ReadOnlyArray<{|
      +id: string,
      +name: string,
      +description: ?string,
      +owner: {|
        +id: string,
        +email: string,
      |},
      +status: WorkOrderStatus,
      +priority: WorkOrderPriority,
      +assignedTo: ?{|
        +id: string,
        +email: string,
      |},
      +installDate: ?any,
      +location: ?{|
        +id: string,
        +name: string,
        +latitude: number,
        +longitude: number,
      |},
    |}>,
  |},
|};
export type ProjectsPopoverQueryResponse = ProjectsPopoverQuery$data;
export type ProjectsPopoverQuery = {|
  variables: ProjectsPopoverQueryVariables,
  response: ProjectsPopoverQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "projectId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "projectId"
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
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "location",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
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
v5 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "WorkOrder",
  "kind": "LinkedField",
  "name": "workOrders",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "assignedTo",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "installDate",
      "storageKey": null
    },
    (v4/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectsPopoverQuery",
    "selections": [
      {
        "alias": "project",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/)
            ],
            "type": "Project",
            "abstractKey": null
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
    "name": "ProjectsPopoverQuery",
    "selections": [
      {
        "alias": "project",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/)
            ],
            "type": "Project",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a3f089b89cc13f8ba98b09563f1d5d15",
    "id": null,
    "metadata": {},
    "name": "ProjectsPopoverQuery",
    "operationKind": "query",
    "text": "query ProjectsPopoverQuery(\n  $projectId: ID!\n) {\n  project: node(id: $projectId) {\n    __typename\n    ... on Project {\n      id\n      name\n      location {\n        id\n        name\n        latitude\n        longitude\n      }\n      workOrders {\n        id\n        name\n        description\n        owner {\n          id\n          email\n        }\n        status\n        priority\n        assignedTo {\n          id\n          email\n        }\n        installDate\n        location {\n          id\n          name\n          latitude\n          longitude\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "94e8e66d8e2608553c3a5bb7e742468e";

module.exports = ((node/*: any*/)/*: Query<
  ProjectsPopoverQuery$variables,
  ProjectsPopoverQuery$data,
>*/);
