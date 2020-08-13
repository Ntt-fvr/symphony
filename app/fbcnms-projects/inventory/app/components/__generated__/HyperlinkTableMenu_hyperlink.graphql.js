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
type HyperlinkTableRow_hyperlink$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type HyperlinkTableMenu_hyperlink$ref: FragmentReference;
declare export opaque type HyperlinkTableMenu_hyperlink$fragmentType: HyperlinkTableMenu_hyperlink$ref;
export type HyperlinkTableMenu_hyperlink = {|
  +id: string,
  +displayName: ?string,
  +url: string,
  +$fragmentRefs: HyperlinkTableRow_hyperlink$ref,
  +$refType: HyperlinkTableMenu_hyperlink$ref,
|};
export type HyperlinkTableMenu_hyperlink$data = HyperlinkTableMenu_hyperlink;
export type HyperlinkTableMenu_hyperlink$key = {
  +$data?: HyperlinkTableMenu_hyperlink$data,
  +$fragmentRefs: HyperlinkTableMenu_hyperlink$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HyperlinkTableMenu_hyperlink",
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
      "name": "displayName",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "HyperlinkTableRow_hyperlink"
    }
  ],
  "type": "Hyperlink",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'b53387e8d2b2f550ae139101508f2d9b';

module.exports = node;
