/**
 * @generated SignedSource<<fa8d8a18aeb0c90ff907d7cc23b984ee>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type ActivityField = "STATUS" | "PRIORITY" | "ASSIGNEE" | "CREATION_DATE" | "OWNER" | "NAME" | "DESCRIPTION" | "CLOCK_IN" | "CLOCK_OUT" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type WorkOrderCheckInActivityText_activity$fragmentType: FragmentType;
export type WorkOrderCheckInActivityText_activity$ref = WorkOrderCheckInActivityText_activity$fragmentType;
export type WorkOrderCheckInActivityText_activity$data = {|
  +activityType: ActivityField,
  +clockDetails: ?{|
    +distanceMeters: ?number,
  |},
  +$fragmentType: WorkOrderCheckInActivityText_activity$fragmentType,
|};
export type WorkOrderCheckInActivityText_activity = WorkOrderCheckInActivityText_activity$data;
export type WorkOrderCheckInActivityText_activity$key = {
  +$data?: WorkOrderCheckInActivityText_activity$data,
  +$fragmentSpreads: WorkOrderCheckInActivityText_activity$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkOrderCheckInActivityText_activity",
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
          "name": "distanceMeters",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Activity",
  "abstractKey": null
};

(node/*: any*/).hash = "513a2d60c4ab7db83b792dcc5c328f75";

module.exports = ((node/*: any*/)/*: Fragment<
  WorkOrderCheckInActivityText_activity$fragmentType,
  WorkOrderCheckInActivityText_activity$data,
>*/);
