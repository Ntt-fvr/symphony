/**
 * @generated SignedSource<<de91fbbc53ad39f4eefac79a98224c2f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type HyperlinkTableRow_hyperlink$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type DocumentTable_hyperlinks$fragmentType: FragmentType;
export type DocumentTable_hyperlinks$ref = DocumentTable_hyperlinks$fragmentType;
export type DocumentTable_hyperlinks$data = $ReadOnlyArray<{|
  +id: string,
  +category: ?string,
  +url: string,
  +displayName: ?string,
  +$fragmentSpreads: HyperlinkTableRow_hyperlink$fragmentType,
  +$fragmentType: DocumentTable_hyperlinks$fragmentType,
|}>;
export type DocumentTable_hyperlinks = DocumentTable_hyperlinks$data;
export type DocumentTable_hyperlinks$key = $ReadOnlyArray<{
  +$data?: DocumentTable_hyperlinks$data,
  +$fragmentSpreads: DocumentTable_hyperlinks$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DocumentTable_hyperlinks",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "HyperlinkTableRow_hyperlink"
    }
  ],
  "type": "Hyperlink",
  "abstractKey": null
};

(node/*: any*/).hash = "c9ea5f1896114cd428384654f0979a5e";

module.exports = ((node/*: any*/)/*: Fragment<
  DocumentTable_hyperlinks$fragmentType,
  DocumentTable_hyperlinks$data,
>*/);
