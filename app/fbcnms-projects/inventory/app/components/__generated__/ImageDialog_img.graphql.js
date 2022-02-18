/**
 * @generated SignedSource<<9d64dc1c57ff0455ba0e35d619a899d9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ImageDialog_img$fragmentType: FragmentType;
export type ImageDialog_img$ref = ImageDialog_img$fragmentType;
export type ImageDialog_img$data = {|
  +storeKey: ?string,
  +fileName: string,
  +$fragmentType: ImageDialog_img$fragmentType,
|};
export type ImageDialog_img = ImageDialog_img$data;
export type ImageDialog_img$key = {
  +$data?: ImageDialog_img$data,
  +$fragmentSpreads: ImageDialog_img$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ImageDialog_img",
  "selections": [
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
      "name": "fileName",
      "storageKey": null
    }
  ],
  "type": "File",
  "abstractKey": null
};

(node/*: any*/).hash = "9df3ae53271a85ffc0bd704420104cc5";

module.exports = ((node/*: any*/)/*: Fragment<
  ImageDialog_img$fragmentType,
  ImageDialog_img$data,
>*/);
