/**
 * @generated SignedSource<<8b8b6650a5ec7023cb62e816070b4076>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type TextCommentPost_comment$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type CommentsActivitiesLog_comments$fragmentType: FragmentType;
export type CommentsActivitiesLog_comments$ref = CommentsActivitiesLog_comments$fragmentType;
export type CommentsActivitiesLog_comments$data = $ReadOnlyArray<{|
  +id: string,
  +createTime: any,
  +$fragmentSpreads: TextCommentPost_comment$fragmentType,
  +$fragmentType: CommentsActivitiesLog_comments$fragmentType,
|}>;
export type CommentsActivitiesLog_comments = CommentsActivitiesLog_comments$data;
export type CommentsActivitiesLog_comments$key = $ReadOnlyArray<{
  +$data?: CommentsActivitiesLog_comments$data,
  +$fragmentSpreads: CommentsActivitiesLog_comments$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CommentsActivitiesLog_comments",
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
      "name": "createTime",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TextCommentPost_comment"
    }
  ],
  "type": "Comment",
  "abstractKey": null
};

(node/*: any*/).hash = "df495dc20009f04644722a4f796c7db9";

module.exports = ((node/*: any*/)/*: Fragment<
  CommentsActivitiesLog_comments$fragmentType,
  CommentsActivitiesLog_comments$data,
>*/);
