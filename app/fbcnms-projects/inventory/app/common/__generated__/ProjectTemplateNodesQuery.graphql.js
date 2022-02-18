/**
 * @generated SignedSource<<556ac621bf1bcdd0f04f811007ace4d4>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type ProjectTemplateNodesQuery$variables = {||};
export type ProjectTemplateNodesQueryVariables = ProjectTemplateNodesQuery$variables;
export type ProjectTemplateNodesQuery$data = {|
  +projectTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type ProjectTemplateNodesQueryResponse = ProjectTemplateNodesQuery$data;
export type ProjectTemplateNodesQuery = {|
  variables: ProjectTemplateNodesQueryVariables,
  response: ProjectTemplateNodesQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ProjectTypeConnection",
    "kind": "LinkedField",
    "name": "projectTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ProjectTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectType",
            "kind": "LinkedField",
            "name": "node",
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
                "name": "name",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectTemplateNodesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProjectTemplateNodesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ada81ec80d832e5c13e37bcdffa4e565",
    "id": null,
    "metadata": {},
    "name": "ProjectTemplateNodesQuery",
    "operationKind": "query",
    "text": "query ProjectTemplateNodesQuery {\n  projectTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "1557fbf5ef8503ec41726b5e089eb2f5";

module.exports = ((node/*: any*/)/*: Query<
  ProjectTemplateNodesQuery$variables,
  ProjectTemplateNodesQuery$data,
>*/);
