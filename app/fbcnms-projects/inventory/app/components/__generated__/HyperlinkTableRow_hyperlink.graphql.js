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
import type { FragmentReference } from "relay-runtime";
declare export opaque type HyperlinkTableRow_hyperlink$ref: FragmentReference;
declare export opaque type HyperlinkTableRow_hyperlink$fragmentType: HyperlinkTableRow_hyperlink$ref;
export type HyperlinkTableRow_hyperlink = {|
  +id: string,
  +category: ?string,
  +url: string,
  +displayName: ?string,
  +createTime: any,
  +$refType: HyperlinkTableRow_hyperlink$ref,
|};
export type HyperlinkTableRow_hyperlink$data = HyperlinkTableRow_hyperlink;
export type HyperlinkTableRow_hyperlink$key = {
  +$data?: HyperlinkTableRow_hyperlink$data,
  +$fragmentRefs: HyperlinkTableRow_hyperlink$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HyperlinkTableRow_hyperlink",
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
    }
  ],
  "type": "Hyperlink",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '2d5c354e88fc77b9dda1bf10b0d518fa';

module.exports = node;
