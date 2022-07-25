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
export type FlowNewInstancesPolicy = "DISABLED" | "ENABLED" | "%future added value";
export type FlowStatus = "ARCHIVED" | "PUBLISHED" | "UNPUBLISHED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type AutomationFlowCard_flow$ref: FragmentReference;
declare export opaque type AutomationFlowCard_flow$fragmentType: AutomationFlowCard_flow$ref;
export type AutomationFlowCard_flow = {|
  +id: string,
  +name: string,
  +description: ?string,
  +status: FlowStatus,
  +newInstancesPolicy: FlowNewInstancesPolicy,
  +draft: ?{|
    +id: string,
    +sameAsFlow: boolean,
  |},
  +creationDate: any,
  +updateTime: any,
  +author: {|
    +id: string,
    +firstName: string,
    +email: string,
  |},
  +runningInstances: number,
  +failedInstances: number,
  +$refType: AutomationFlowCard_flow$ref,
|};
export type AutomationFlowCard_flow$data = AutomationFlowCard_flow;
export type AutomationFlowCard_flow$key = {
  +$data?: AutomationFlowCard_flow$data,
  +$fragmentRefs: AutomationFlowCard_flow$ref,
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutomationFlowCard_flow",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "newInstancesPolicy",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "FlowDraft",
      "kind": "LinkedField",
      "name": "draft",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "sameAsFlow",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "creationDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updateTime",
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
          "storageKey": null
        },
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
      "name": "runningInstances",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "failedInstances",
      "storageKey": null
    }
  ],
  "type": "Flow",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '1c27d65db003865aa3a864e8c528f3a6';

module.exports = node;
