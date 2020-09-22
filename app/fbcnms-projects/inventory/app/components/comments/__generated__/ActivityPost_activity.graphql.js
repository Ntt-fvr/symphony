/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
export type ActivityField = "ASSIGNEE" | "CLOCK_IN" | "CLOCK_OUT" | "CREATION_DATE" | "DESCRIPTION" | "NAME" | "OWNER" | "PRIORITY" | "STATUS" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ActivityPost_activity$ref: FragmentReference;
declare export opaque type ActivityPost_activity$fragmentType: ActivityPost_activity$ref;
export type ActivityPost_activity = {|
  +id: string,
  +author: ?{|
    +email: string
  |},
  +isCreate: boolean,
  +activityType: ActivityField,
  +newRelatedNode: ?({|
    +__typename: "User",
    +id: string,
    +email: string,
  |} | {|
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    +__typename: "%other"
  |}),
  +oldRelatedNode: ?({|
    +__typename: "User",
    +id: string,
    +email: string,
  |} | {|
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    +__typename: "%other"
  |}),
  +oldValue: ?string,
  +newValue: ?string,
  +createTime: any,
  +$refType: ActivityPost_activity$ref,
|};
export type ActivityPost_activity$data = ActivityPost_activity;
export type ActivityPost_activity$key = {
  +$data?: ActivityPost_activity$data,
  +$fragmentRefs: ActivityPost_activity$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v2 = [
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
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "type": "User",
    "abstractKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityPost_activity",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isCreate",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "newRelatedNode",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "oldRelatedNode",
      "plural": false,
      "selections": (v2/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createTime",
      "storageKey": null
    }
  ],
  "type": "Activity",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd17349f40511e4424c6b43f0449af2be';

module.exports = node;
