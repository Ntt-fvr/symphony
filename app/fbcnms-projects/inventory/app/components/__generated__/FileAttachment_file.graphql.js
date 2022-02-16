/**
 * @generated SignedSource<<c34b3a5db7f16efd479c7ec5c59f5c8a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ImageDialog_img$fragmentType = any;
export type FileType = "IMAGE" | "FILE" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type FileAttachment_file$fragmentType: FragmentType;
export type FileAttachment_file$ref = FileAttachment_file$fragmentType;
export type FileAttachment_file$data = {|
  +id: string,
  +fileName: string,
  +sizeInBytes: ?number,
  +uploaded: ?any,
  +fileType: ?FileType,
  +storeKey: ?string,
  +category: ?string,
  +annotation: ?string,
  +documentCategory: ?{|
    +id: string,
    +name: ?string,
  |},
  +$fragmentSpreads: ImageDialog_img$fragmentType,
  +$fragmentType: FileAttachment_file$fragmentType,
|};
export type FileAttachment_file = FileAttachment_file$data;
export type FileAttachment_file$key = {
  +$data?: FileAttachment_file$data,
  +$fragmentSpreads: FileAttachment_file$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FileAttachment_file",
  "selections": [
    (v0/*: any*/),
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageDialog_img"
    }
  ],
  "type": "File",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "b37826afc3b4851ca9d92ea51ff93c0e";

module.exports = ((node/*: any*/)/*: Fragment<
  FileAttachment_file$fragmentType,
  FileAttachment_file$data,
>*/);
