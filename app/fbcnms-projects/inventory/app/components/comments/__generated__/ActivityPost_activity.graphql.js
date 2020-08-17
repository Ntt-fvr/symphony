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
export type ActivityField = "ASSIGNEE" | "CLOCK_IN" | "CREATION_DATE" | "DESCRIPTION" | "NAME" | "OWNER" | "PRIORITY" | "STATUS" | "%future added value";
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "__typename",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "InlineFragment",
    "type": "User",
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/)
    ]
  }
];
return {
  "kind": "Fragment",
  "name": "ActivityPost_activity",
  "type": "Activity",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "author",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "isCreate",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "activityType",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "newRelatedNode",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": (v2/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "oldRelatedNode",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": (v2/*: any*/)
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "oldValue",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "newValue",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "createTime",
      "args": null,
      "storageKey": null
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd17349f40511e4424c6b43f0449af2be';
module.exports = node;
