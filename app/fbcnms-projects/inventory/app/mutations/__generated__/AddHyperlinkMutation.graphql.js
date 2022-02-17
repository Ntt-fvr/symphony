/**
 * @generated SignedSource<<9de5609f60040af98b112ac25c9a15e6>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type ImageEntity = "LOCATION" | "WORK_ORDER" | "SITE_SURVEY" | "EQUIPMENT" | "USER" | "CHECKLIST_ITEM" | "%future added value";
export type AddHyperlinkInput = {|
  entityType: ImageEntity,
  entityId: string,
  url: string,
  displayName?: ?string,
  category?: ?string,
  documentCategoryId?: ?string,
|};
export type AddHyperlinkMutation$variables = {|
  input: AddHyperlinkInput,
|};
export type AddHyperlinkMutationVariables = AddHyperlinkMutation$variables;
export type AddHyperlinkMutation$data = {|
  +addHyperlink: {|
    +id: string,
    +url: string,
    +displayName: ?string,
    +category: ?string,
    +createTime: any,
  |},
|};
export type AddHyperlinkMutationResponse = AddHyperlinkMutation$data;
export type AddHyperlinkMutation = {|
  variables: AddHyperlinkMutationVariables,
  response: AddHyperlinkMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Hyperlink",
    "kind": "LinkedField",
    "name": "addHyperlink",
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
        "name": "category",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createTime",
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
    "name": "AddHyperlinkMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddHyperlinkMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9091ac8be2be52dfc9b8855bc5caaf1a",
    "id": null,
    "metadata": {},
    "name": "AddHyperlinkMutation",
    "operationKind": "mutation",
    "text": "mutation AddHyperlinkMutation(\n  $input: AddHyperlinkInput!\n) {\n  addHyperlink(input: $input) {\n    id\n    url\n    displayName\n    category\n    createTime\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "8aeb4cde118c6a2a5365fe50a82c419e";

module.exports = ((node/*: any*/)/*: Mutation<
  AddHyperlinkMutation$variables,
  AddHyperlinkMutation$data,
>*/);
