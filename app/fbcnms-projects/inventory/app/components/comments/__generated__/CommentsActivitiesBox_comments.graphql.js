/**
 * @generated SignedSource<<3caaaa848c8a5ee4a5c3303d2d53a18a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type CommentsActivitiesLog_comments$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type CommentsActivitiesBox_comments$fragmentType: FragmentType;
export type CommentsActivitiesBox_comments$ref = CommentsActivitiesBox_comments$fragmentType;
export type CommentsActivitiesBox_comments$data = $ReadOnlyArray<{|
  +$fragmentSpreads: CommentsActivitiesLog_comments$fragmentType,
  +$fragmentType: CommentsActivitiesBox_comments$fragmentType,
|}>;
export type CommentsActivitiesBox_comments = CommentsActivitiesBox_comments$data;
export type CommentsActivitiesBox_comments$key = $ReadOnlyArray<{
  +$data?: CommentsActivitiesBox_comments$data,
  +$fragmentSpreads: CommentsActivitiesBox_comments$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CommentsActivitiesBox_comments",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CommentsActivitiesLog_comments"
    }
  ],
  "type": "Comment",
  "abstractKey": null
};

(node/*: any*/).hash = "c118bd6378979ed6e9cdf189f1f347c8";

module.exports = ((node/*: any*/)/*: Fragment<
  CommentsActivitiesBox_comments$fragmentType,
  CommentsActivitiesBox_comments$data,
>*/);
