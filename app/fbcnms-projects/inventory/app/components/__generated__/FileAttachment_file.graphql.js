/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ImageDialog_img$ref = any;
export type FileType = "FILE" | "IMAGE" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type FileAttachment_file$ref: FragmentReference;
declare export opaque type FileAttachment_file$fragmentType: FileAttachment_file$ref;
export type FileAttachment_file = {|
  +id: string,
  +fileName: string,
  +sizeInBytes: ?number,
  +uploaded: ?any,
  +fileType: ?FileType,
  +storeKey: ?string,
  +category: ?string,
  +$fragmentRefs: ImageDialog_img$ref,
  +$refType: FileAttachment_file$ref,
|};
export type FileAttachment_file$data = FileAttachment_file;
export type FileAttachment_file$key = {
  +$data?: FileAttachment_file$data,
  +$fragmentRefs: FileAttachment_file$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FileAttachment_file",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageDialog_img"
    }
  ],
  "type": "File",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '281b6befd7d441674861d38032feb4e5';

module.exports = node;
