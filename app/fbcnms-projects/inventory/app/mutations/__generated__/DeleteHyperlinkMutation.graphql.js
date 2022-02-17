/**
 * @generated SignedSource<<6fc1041e99b7c41ebe5917c4d058ec47>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
type HyperlinkTableRow_hyperlink$fragmentType = any;
export type DeleteHyperlinkMutation$variables = {|
  id: string,
|};
export type DeleteHyperlinkMutationVariables = DeleteHyperlinkMutation$variables;
export type DeleteHyperlinkMutation$data = {|
  +deleteHyperlink: {|
    +$fragmentSpreads: HyperlinkTableRow_hyperlink$fragmentType,
  |},
|};
export type DeleteHyperlinkMutationResponse = DeleteHyperlinkMutation$data;
export type DeleteHyperlinkMutation = {|
  variables: DeleteHyperlinkMutationVariables,
  response: DeleteHyperlinkMutation$data,
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteHyperlinkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Hyperlink",
        "kind": "LinkedField",
        "name": "deleteHyperlink",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HyperlinkTableRow_hyperlink"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteHyperlinkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Hyperlink",
        "kind": "LinkedField",
        "name": "deleteHyperlink",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "DocumentCategory",
            "kind": "LinkedField",
            "name": "documentCategory",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "3caa1d8fe7eabbbaeca1f2462ace2997",
    "id": null,
    "metadata": {},
    "name": "DeleteHyperlinkMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteHyperlinkMutation(\n  $id: ID!\n) {\n  deleteHyperlink(id: $id) {\n    ...HyperlinkTableRow_hyperlink\n    id\n  }\n}\n\nfragment HyperlinkTableMenu_hyperlink on Hyperlink {\n  id\n  displayName\n  url\n}\n\nfragment HyperlinkTableRow_hyperlink on Hyperlink {\n  id\n  category\n  url\n  displayName\n  createTime\n  documentCategory {\n    id\n    name\n  }\n  ...HyperlinkTableMenu_hyperlink\n}\n"
  }
};
})();

(node/*: any*/).hash = "eea56538c03c8ce55b62e4e48331a303";

module.exports = ((node/*: any*/)/*: Mutation<
  DeleteHyperlinkMutation$variables,
  DeleteHyperlinkMutation$data,
>*/);
