/**
 * @generated SignedSource<<4a2d050575869e242a69a456527e6e5f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type ActivityField = "STATUS" | "PRIORITY" | "ASSIGNEE" | "CREATION_DATE" | "OWNER" | "NAME" | "DESCRIPTION" | "CLOCK_IN" | "CLOCK_OUT" | "%future added value";
export type ClockOutReason = "PAUSE" | "SUBMIT" | "SUBMIT_INCOMPLETE" | "BLOCKED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type WorkOrderCheckOutActivityText_activity$fragmentType: FragmentType;
export type WorkOrderCheckOutActivityText_activity$ref = WorkOrderCheckOutActivityText_activity$fragmentType;
export type WorkOrderCheckOutActivityText_activity$data = {|
  +activityType: ActivityField,
  +clockDetails: ?{|
    +clockOutReason: ?ClockOutReason,
    +distanceMeters: ?number,
    +comment: ?string,
  |},
  +$fragmentType: WorkOrderCheckOutActivityText_activity$fragmentType,
|};
export type WorkOrderCheckOutActivityText_activity = WorkOrderCheckOutActivityText_activity$data;
export type WorkOrderCheckOutActivityText_activity$key = {
  +$data?: WorkOrderCheckOutActivityText_activity$data,
  +$fragmentSpreads: WorkOrderCheckOutActivityText_activity$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkOrderCheckOutActivityText_activity",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "activityType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClockDetails",
      "kind": "LinkedField",
      "name": "clockDetails",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "clockOutReason",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "distanceMeters",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "comment",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Activity",
  "abstractKey": null
};

(node/*: any*/).hash = "ea0c20cd871d4c81310e5154f20e08c6";

module.exports = ((node/*: any*/)/*: Fragment<
  WorkOrderCheckOutActivityText_activity$fragmentType,
  WorkOrderCheckOutActivityText_activity$data,
>*/);
