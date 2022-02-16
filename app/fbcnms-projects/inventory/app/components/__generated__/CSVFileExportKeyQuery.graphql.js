/**
 * @generated SignedSource<<775019fdfe746b54361327a8ad5e7515>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type CSVFileExportKeyQuery$variables = {|
  taskId: string,
|};
export type CSVFileExportKeyQueryVariables = CSVFileExportKeyQuery$variables;
export type CSVFileExportKeyQuery$data = {|
  +task: ?{|
    +storeKey?: string,
  |},
|};
export type CSVFileExportKeyQueryResponse = CSVFileExportKeyQuery$data;
export type CSVFileExportKeyQuery = {|
  variables: CSVFileExportKeyQueryVariables,
  response: CSVFileExportKeyQuery$data,
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "storeKey",
      "storageKey": null
    }
  ],
  "type": "ExportTask",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CSVFileExportKeyQuery",
    "selections": [
      {
        "alias": "task",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "CSVFileExportKeyQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "94eb1a753a790247febf70b9747df3b6",
    "id": null,
    "metadata": {},
    "name": "CSVFileExportKeyQuery",
    "operationKind": "query",
    "text": "query CSVFileExportKeyQuery(\n  $taskId: ID!\n) {\n  task: node(id: $taskId) {\n    __typename\n    ... on ExportTask {\n      storeKey\n    }\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "791a7ac59b00b79408ba2d34a184914f";

module.exports = ((node/*: any*/)/*: Query<
  CSVFileExportKeyQuery$variables,
  CSVFileExportKeyQuery$data,
>*/);
