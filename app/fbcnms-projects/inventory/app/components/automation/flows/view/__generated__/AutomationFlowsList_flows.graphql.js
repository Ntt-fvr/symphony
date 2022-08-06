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
type AutomationFlowCard_flow$ref = any;
export type FlowNewInstancesPolicy = "DISABLED" | "ENABLED" | "%future added value";
export type FlowStatus = "ARCHIVED" | "DELETED" | "DRAFT" | "ON_HOLD" | "PUBLISHED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type AutomationFlowsList_flows$ref: FragmentReference;
declare export opaque type AutomationFlowsList_flows$fragmentType: AutomationFlowsList_flows$ref;
export type AutomationFlowsList_flows = $ReadOnlyArray<{|
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
  +$fragmentRefs: AutomationFlowCard_flow$ref,
  +$refType: AutomationFlowsList_flows$ref,
|}>;
export type AutomationFlowsList_flows$data = AutomationFlowsList_flows;
export type AutomationFlowsList_flows$key = $ReadOnlyArray<{
  +$data?: AutomationFlowsList_flows$data,
  +$fragmentRefs: AutomationFlowsList_flows$ref,
  ...
}>;
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
  "metadata": {
    "plural": true
  },
  "name": "AutomationFlowsList_flows",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AutomationFlowCard_flow"
    }
  ],
  "type": "Flow",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b4a337457571da9b2d43b8bce30f96d2';

module.exports = node;
