/**
 * @generated SignedSource<<2ce251bff94f6a58589b031b818c1ef1>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type HyperlinkTableMenu_hyperlink$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type HyperlinkTableRow_hyperlink$fragmentType: FragmentType;
export type HyperlinkTableRow_hyperlink$ref = HyperlinkTableRow_hyperlink$fragmentType;
export type HyperlinkTableRow_hyperlink$data = {|
  +id: string,
  +category: ?string,
  +url: string,
  +displayName: ?string,
  +createTime: any,
  +documentCategory: ?{|
    +id: string,
    +name: ?string,
  |},
  +$fragmentSpreads: HyperlinkTableMenu_hyperlink$fragmentType,
  +$fragmentType: HyperlinkTableRow_hyperlink$fragmentType,
|};
export type HyperlinkTableRow_hyperlink = HyperlinkTableRow_hyperlink$data;
export type HyperlinkTableRow_hyperlink$key = {
  +$data?: HyperlinkTableRow_hyperlink$data,
  +$fragmentSpreads: HyperlinkTableRow_hyperlink$fragmentType,
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
  "name": "HyperlinkTableRow_hyperlink",
  "selections": [
    (v0/*: any*/),
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
      "name": "HyperlinkTableMenu_hyperlink"
    }
  ],
  "type": "Hyperlink",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "ef14736933385473d66c5a8a57f3634b";

module.exports = ((node/*: any*/)/*: Fragment<
  HyperlinkTableRow_hyperlink$fragmentType,
  HyperlinkTableRow_hyperlink$data,
>*/);
