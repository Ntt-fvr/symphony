/**
 * @generated SignedSource<<e2a0e9c1428937eb6202099fb1220af9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type FileAttachment_file$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type DocumentTable_files$fragmentType: FragmentType;
export type DocumentTable_files$ref = DocumentTable_files$fragmentType;
export type DocumentTable_files$data = $ReadOnlyArray<{|
  +id: string,
  +fileName: string,
  +category: ?string,
  +$fragmentSpreads: FileAttachment_file$fragmentType,
  +$fragmentType: DocumentTable_files$fragmentType,
|}>;
export type DocumentTable_files = DocumentTable_files$data;
export type DocumentTable_files$key = $ReadOnlyArray<{
  +$data?: DocumentTable_files$data,
  +$fragmentSpreads: DocumentTable_files$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DocumentTable_files",
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
      "name": "category",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FileAttachment_file"
    }
  ],
  "type": "File",
  "abstractKey": null
};

(node/*: any*/).hash = "171a55fcd66fd996e20dd78e3d3db780";

module.exports = ((node/*: any*/)/*: Fragment<
  DocumentTable_files$fragmentType,
  DocumentTable_files$data,
>*/);
