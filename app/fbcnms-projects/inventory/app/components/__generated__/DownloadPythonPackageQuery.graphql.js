/**
 * @generated SignedSource<<85ed25a0070fbe442fbd855502f1563c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type DownloadPythonPackageQuery$variables = {||};
export type DownloadPythonPackageQueryVariables = DownloadPythonPackageQuery$variables;
export type DownloadPythonPackageQuery$data = {|
  +pythonPackages: $ReadOnlyArray<{|
    +version: string,
    +whlFileKey: string,
    +uploadTime: any,
  |}>,
|};
export type DownloadPythonPackageQueryResponse = DownloadPythonPackageQuery$data;
export type DownloadPythonPackageQuery = {|
  variables: DownloadPythonPackageQueryVariables,
  response: DownloadPythonPackageQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PythonPackage",
    "kind": "LinkedField",
    "name": "pythonPackages",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "version",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "whlFileKey",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "uploadTime",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DownloadPythonPackageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DownloadPythonPackageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a23c977651b7d654345475cab562dd19",
    "id": null,
    "metadata": {},
    "name": "DownloadPythonPackageQuery",
    "operationKind": "query",
    "text": "query DownloadPythonPackageQuery {\n  pythonPackages {\n    version\n    whlFileKey\n    uploadTime\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "c2ffc17589d8cfa0daad1826bd83f69c";

module.exports = ((node/*: any*/)/*: Query<
  DownloadPythonPackageQuery$variables,
  DownloadPythonPackageQuery$data,
>*/);
