/**
 * @generated SignedSource<<1dd38683c99c12dcc806b91023d9c94f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type HyperlinkTableMenu_hyperlink$fragmentType: FragmentType;
export type HyperlinkTableMenu_hyperlink$ref = HyperlinkTableMenu_hyperlink$fragmentType;
export type HyperlinkTableMenu_hyperlink$data = {|
  +id: string,
  +displayName: ?string,
  +url: string,
  +$fragmentType: HyperlinkTableMenu_hyperlink$fragmentType,
|};
export type HyperlinkTableMenu_hyperlink = HyperlinkTableMenu_hyperlink$data;
export type HyperlinkTableMenu_hyperlink$key = {
  +$data?: HyperlinkTableMenu_hyperlink$data,
  +$fragmentSpreads: HyperlinkTableMenu_hyperlink$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
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
    }
  ],
  "type": "Hyperlink",
  "abstractKey": null
};

(node/*: any*/).hash = "1d16009f99a7a3585100b509e897c1a6";

module.exports = ((node/*: any*/)/*: Fragment<
  HyperlinkTableMenu_hyperlink$fragmentType,
  HyperlinkTableMenu_hyperlink$data,
>*/);
