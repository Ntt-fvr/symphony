/**
 * @generated SignedSource<<3bebefe4a57d12ab091c489cf6245303>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
type FileAttachment_file$fragmentType = any;
export type ImageEntity = "LOCATION" | "WORK_ORDER" | "SITE_SURVEY" | "EQUIPMENT" | "USER" | "CHECKLIST_ITEM" | "%future added value";
export type AddImageInput = {|
  entityType: ImageEntity,
  entityId: string,
  imgKey: string,
  fileName: string,
  fileSize: number,
  modified: any,
  contentType: string,
  category?: ?string,
  annotation?: ?string,
  documentCategoryId?: ?string,
|};
export type AddImageMutation$variables = {|
  input: AddImageInput,
|};
export type AddImageMutationVariables = AddImageMutation$variables;
export type AddImageMutation$data = {|
  +addImage: {|
    +$fragmentSpreads: FileAttachment_file$fragmentType,
  |},
|};
export type AddImageMutationResponse = AddImageMutation$data;
export type AddImageMutation = {|
  variables: AddImageMutationVariables,
  response: AddImageMutation$data,
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
    "name": "AddImageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "File",
        "kind": "LinkedField",
        "name": "addImage",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FileAttachment_file"
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
    "name": "AddImageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "File",
        "kind": "LinkedField",
        "name": "addImage",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fileName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sizeInBytes",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "uploaded",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fileType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "storeKey",
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
            "name": "annotation",
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
    "cacheID": "42a6821cef7ee7f30eb42ece0d4d18b1",
    "id": null,
    "metadata": {},
    "name": "AddImageMutation",
    "operationKind": "mutation",
    "text": "mutation AddImageMutation(\n  $input: AddImageInput!\n) {\n  addImage(input: $input) {\n    ...FileAttachment_file\n    id\n  }\n}\n\nfragment FileAttachment_file on File {\n  id\n  fileName\n  sizeInBytes\n  uploaded\n  fileType\n  storeKey\n  category\n  annotation\n  documentCategory {\n    id\n    name\n  }\n  ...ImageDialog_img\n}\n\nfragment ImageDialog_img on File {\n  storeKey\n  fileName\n}\n"
  }
};
})();

(node/*: any*/).hash = "cfb8687a3be6e209c5d3c9a6f94c249e";

module.exports = ((node/*: any*/)/*: Mutation<
  AddImageMutation$variables,
  AddImageMutation$data,
>*/);
