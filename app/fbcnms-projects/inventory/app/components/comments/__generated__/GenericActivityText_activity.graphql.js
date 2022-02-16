/**
 * @generated SignedSource<<79583738a4a77efc83a871ae501e1df2>>
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
declare export opaque type GenericActivityText_activity$fragmentType: FragmentType;
export type GenericActivityText_activity$ref = GenericActivityText_activity$fragmentType;
export type GenericActivityText_activity$data = {|
  +activityType: ActivityField,
  +newRelatedNode: ?({|
    +__typename: "User",
    +email: string,
  |} | {|
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    +__typename: "%other",
  |}),
  +oldRelatedNode: ?({|
    +__typename: "User",
    +email: string,
  |} | {|
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    +__typename: "%other",
  |}),
  +oldValue: ?string,
  +newValue: ?string,
  +$fragmentType: GenericActivityText_activity$fragmentType,
|};
export type GenericActivityText_activity = GenericActivityText_activity$data;
export type GenericActivityText_activity$key = {
  +$data?: GenericActivityText_activity$data,
  +$fragmentSpreads: GenericActivityText_activity$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  },
  {
    "kind": "InlineFragment",
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      }
    ],
    "type": "User",
    "abstractKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GenericActivityText_activity",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "newRelatedNode",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "oldRelatedNode",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "oldValue",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "newValue",
      "storageKey": null
    }
  ],
  "type": "Activity",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "736c776d7a9e4e936f031f4dd2f373e1";

module.exports = ((node/*: any*/)/*: Fragment<
  GenericActivityText_activity$fragmentType,
  GenericActivityText_activity$data,
>*/);
