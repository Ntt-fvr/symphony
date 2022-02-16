/**
 * @generated SignedSource<<8b8c9117a11319df18b9504adca7634f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type ExportStatus = "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "%future added value";
export type CSVFileExportQuery$variables = {|
  taskId: string,
|};
export type CSVFileExportQueryVariables = CSVFileExportQuery$variables;
export type CSVFileExportQuery$data = {|
  +task: ?{|
    +id?: string,
    +status?: ExportStatus,
    +progress?: number,
  |},
|};
export type CSVFileExportQueryResponse = CSVFileExportQuery$data;
export type CSVFileExportQuery = {|
  variables: CSVFileExportQueryVariables,
  response: CSVFileExportQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "taskId"
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
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "progress",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CSVFileExportQuery",
    "selections": [
      {
        "alias": "task",
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
              (v4/*: any*/)
            ],
            "type": "ExportTask",
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
    "name": "CSVFileExportQuery",
    "selections": [
      {
        "alias": "task",
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
              (v4/*: any*/)
            ],
            "type": "ExportTask",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1ff41b814e8e70f0e471318fceece877",
    "id": null,
    "metadata": {},
    "name": "CSVFileExportQuery",
    "operationKind": "query",
    "text": "query CSVFileExportQuery(\n  $taskId: ID!\n) {\n  task: node(id: $taskId) {\n    __typename\n    ... on ExportTask {\n      id\n      status\n      progress\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "0e0cc7aeb35079d37a437ccd497243dc";

module.exports = ((node/*: any*/)/*: Query<
  CSVFileExportQuery$variables,
  CSVFileExportQuery$data,
>*/);
