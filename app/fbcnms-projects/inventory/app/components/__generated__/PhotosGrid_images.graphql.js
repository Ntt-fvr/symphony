/**
 * @generated SignedSource<<1d09f62fed295386b6bd5a07ecf49b2b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ImageAttachment_img$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type PhotosGrid_images$fragmentType: FragmentType;
export type PhotosGrid_images$ref = PhotosGrid_images$fragmentType;
export type PhotosGrid_images$data = $ReadOnlyArray<{|
  +id: string,
  +$fragmentSpreads: ImageAttachment_img$fragmentType,
  +$fragmentType: PhotosGrid_images$fragmentType,
|}>;
export type PhotosGrid_images = PhotosGrid_images$data;
export type PhotosGrid_images$key = $ReadOnlyArray<{
  +$data?: PhotosGrid_images$data,
  +$fragmentSpreads: PhotosGrid_images$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PhotosGrid_images",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageAttachment_img"
    }
  ],
  "type": "File",
  "abstractKey": null
};

(node/*: any*/).hash = "80a98a9a4d57a8e83e65f977e4b203bb";

module.exports = ((node/*: any*/)/*: Fragment<
  PhotosGrid_images$fragmentType,
  PhotosGrid_images$data,
>*/);
