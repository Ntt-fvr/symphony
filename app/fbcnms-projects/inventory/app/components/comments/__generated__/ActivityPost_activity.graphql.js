/**
 * @generated SignedSource<<feac115ed7b2279a1ef0391c3b471640>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type GenericActivityText_activity$fragmentType = any;
type WorkOrderCheckInActivityText_activity$fragmentType = any;
type WorkOrderCheckOutActivityText_activity$fragmentType = any;
export type ActivityField = "STATUS" | "PRIORITY" | "ASSIGNEE" | "CREATION_DATE" | "OWNER" | "NAME" | "DESCRIPTION" | "CLOCK_IN" | "CLOCK_OUT" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ActivityPost_activity$fragmentType: FragmentType;
export type ActivityPost_activity$ref = ActivityPost_activity$fragmentType;
export type ActivityPost_activity$data = {|
  +id: string,
  +author: ?{|
    +email: string,
  |},
  +newValue: ?string,
  +activityType: ActivityField,
  +createTime: any,
  +$fragmentSpreads: GenericActivityText_activity$fragmentType & WorkOrderCheckInActivityText_activity$fragmentType & WorkOrderCheckOutActivityText_activity$fragmentType,
  +$fragmentType: ActivityPost_activity$fragmentType,
|};
export type ActivityPost_activity = ActivityPost_activity$data;
export type ActivityPost_activity$key = {
  +$data?: ActivityPost_activity$data,
  +$fragmentSpreads: ActivityPost_activity$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityPost_activity",
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
      "name": "newValue",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "createTime",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GenericActivityText_activity"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorkOrderCheckInActivityText_activity"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorkOrderCheckOutActivityText_activity"
    }
  ],
  "type": "Activity",
  "abstractKey": null
};

(node/*: any*/).hash = "e905cb523dfbfd117ac5a40644a06bd7";

module.exports = ((node/*: any*/)/*: Fragment<
  ActivityPost_activity$fragmentType,
  ActivityPost_activity$data,
>*/);
