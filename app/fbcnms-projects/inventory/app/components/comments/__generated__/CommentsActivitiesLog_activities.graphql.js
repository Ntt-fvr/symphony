/**
 * @generated SignedSource<<b37b4b11bb9b26068eb1a99ddf0ad907>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type ActivityPost_activity$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type CommentsActivitiesLog_activities$fragmentType: FragmentType;
export type CommentsActivitiesLog_activities$ref = CommentsActivitiesLog_activities$fragmentType;
export type CommentsActivitiesLog_activities$data = $ReadOnlyArray<{|
  +id: string,
  +createTime: any,
  +$fragmentSpreads: ActivityPost_activity$fragmentType,
  +$fragmentType: CommentsActivitiesLog_activities$fragmentType,
|}>;
export type CommentsActivitiesLog_activities = CommentsActivitiesLog_activities$data;
export type CommentsActivitiesLog_activities$key = $ReadOnlyArray<{
  +$data?: CommentsActivitiesLog_activities$data,
  +$fragmentSpreads: CommentsActivitiesLog_activities$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CommentsActivitiesLog_activities",
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
      "name": "ActivityPost_activity"
    }
  ],
  "type": "Activity",
  "abstractKey": null
};

(node/*: any*/).hash = "dd73667e5b82cd9bacd860e1b733531e";

module.exports = ((node/*: any*/)/*: Fragment<
  CommentsActivitiesLog_activities$fragmentType,
  CommentsActivitiesLog_activities$data,
>*/);
