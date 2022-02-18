/**
 * @generated SignedSource<<484a59a5795e6acaff8be2423b1fb5d6>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type TextCommentPost_comment$fragmentType: FragmentType;
export type TextCommentPost_comment$ref = TextCommentPost_comment$fragmentType;
export type TextCommentPost_comment$data = {|
  +id: string,
  +author: {|
    +email: string,
  |},
  +text: string,
  +createTime: any,
  +$fragmentType: TextCommentPost_comment$fragmentType,
|};
export type TextCommentPost_comment = TextCommentPost_comment$data;
export type TextCommentPost_comment$key = {
  +$data?: TextCommentPost_comment$data,
  +$fragmentSpreads: TextCommentPost_comment$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TextCommentPost_comment",
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
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
  "type": "Comment",
  "abstractKey": null
};

(node/*: any*/).hash = "2dc0bd1e406e6fde1cdd0196b9b245eb";

module.exports = ((node/*: any*/)/*: Fragment<
  TextCommentPost_comment$fragmentType,
  TextCommentPost_comment$data,
>*/);
