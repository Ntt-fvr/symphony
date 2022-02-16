/**
 * @generated SignedSource<<ce13f9273f3946144ec946f18c1aede9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type CommentsActivitiesLog_activities$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type CommentsActivitiesBox_activities$fragmentType: FragmentType;
export type CommentsActivitiesBox_activities$ref = CommentsActivitiesBox_activities$fragmentType;
export type CommentsActivitiesBox_activities$data = $ReadOnlyArray<{|
  +$fragmentSpreads: CommentsActivitiesLog_activities$fragmentType,
  +$fragmentType: CommentsActivitiesBox_activities$fragmentType,
|}>;
export type CommentsActivitiesBox_activities = CommentsActivitiesBox_activities$data;
export type CommentsActivitiesBox_activities$key = $ReadOnlyArray<{
  +$data?: CommentsActivitiesBox_activities$data,
  +$fragmentSpreads: CommentsActivitiesBox_activities$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CommentsActivitiesBox_activities",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CommentsActivitiesLog_activities"
    }
  ],
  "type": "Activity",
  "abstractKey": null
};

(node/*: any*/).hash = "c4d3824e4498526273d2db703b8d85d6";

module.exports = ((node/*: any*/)/*: Fragment<
  CommentsActivitiesBox_activities$fragmentType,
  CommentsActivitiesBox_activities$data,
>*/);
