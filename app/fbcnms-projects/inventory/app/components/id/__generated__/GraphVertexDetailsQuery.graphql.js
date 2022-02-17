/**
 * @generated SignedSource<<758656ed0ae4957039c334c93b96e3de>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type GraphVertexDetailsQuery$variables = {|
  id: string,
|};
export type GraphVertexDetailsQueryVariables = GraphVertexDetailsQuery$variables;
export type GraphVertexDetailsQuery$data = {|
  +vertex: ?{|
    +id: string,
    +type: string,
    +fields: $ReadOnlyArray<{|
      +name: string,
      +value: string,
    |}>,
  |},
|};
export type GraphVertexDetailsQueryResponse = GraphVertexDetailsQuery$data;
export type GraphVertexDetailsQuery = {|
  variables: GraphVertexDetailsQueryVariables,
  response: GraphVertexDetailsQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Vertex",
    "kind": "LinkedField",
    "name": "vertex",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Field",
        "kind": "LinkedField",
        "name": "fields",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GraphVertexDetailsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GraphVertexDetailsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3ab5c4ce13ed255d1183d7fab15a5feb",
    "id": null,
    "metadata": {},
    "name": "GraphVertexDetailsQuery",
    "operationKind": "query",
    "text": "query GraphVertexDetailsQuery(\n  $id: ID!\n) {\n  vertex(id: $id) {\n    id\n    type\n    fields {\n      name\n      value\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "b810a4963a64c2695e2cb81fbd02be9e";

module.exports = ((node/*: any*/)/*: Query<
  GraphVertexDetailsQuery$variables,
  GraphVertexDetailsQuery$data,
>*/);
