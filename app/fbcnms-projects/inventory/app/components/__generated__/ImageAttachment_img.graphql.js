/**
 * @generated SignedSource<<38ab38297225fc1e5c4cf633847ef1d5>>
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
declare export opaque type ImageAttachment_img$fragmentType: FragmentType;
export type ImageAttachment_img$ref = ImageAttachment_img$fragmentType;
export type ImageAttachment_img$data = {
  +id: string,
  +fileName: string,
  +sizeInBytes: ?number,
  +uploaded: ?any,
  +fileType: ?FileType,
  +storeKey: ?string,
  +category: ?string,
  +$fragmentSpreads: ImageDialog_img$fragmentType,
  ...
};
export type ImageAttachment_img = ImageAttachment_img$data;
export type ImageAttachment_img$key = {
  +$data?: ImageAttachment_img$data,
  +$fragmentSpreads: ImageAttachment_img$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "mask": false
  },
  "name": "ImageAttachment_img",
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

(node/*: any*/).hash = "94d064d47a4a69874394dea293d6bf62";

module.exports = ((node/*: any*/)/*: Fragment<
  ImageAttachment_img$fragmentType,
  ImageAttachment_img$data,
>*/);
