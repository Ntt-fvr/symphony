/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 * @relayHash 53eaf8bef87b9c71bd26ffbb84620a53
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ExportStatus = "FAILED" | "IN_PROGRESS" | "PENDING" | "SUCCEEDED" | "%future added value";
export type CSVFileExportQueryVariables = {|
  taskId: string
|};
export type CSVFileExportQueryResponse = {|
  +task: ?{|
    +id?: string,
    +status?: ExportStatus,
    +progress?: number,
  |}
|};
export type CSVFileExportQuery = {|
  variables: CSVFileExportQueryVariables,
  response: CSVFileExportQueryResponse,
|};
*/


/*
query CSVFileExportQuery(
  $taskId: ID!
) {
  task: node(id: $taskId) {
    __typename
    ... on ExportTask {
      id
      status
      progress
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "taskId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "taskId"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "status",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "progress",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CSVFileExportQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "task",
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "type": "ExportTask",
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CSVFileExportQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "task",
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "ExportTask",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CSVFileExportQuery",
    "id": null,
    "text": "query CSVFileExportQuery(\n  $taskId: ID!\n) {\n  task: node(id: $taskId) {\n    __typename\n    ... on ExportTask {\n      id\n      status\n      progress\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0e0cc7aeb35079d37a437ccd497243dc';
module.exports = node;
