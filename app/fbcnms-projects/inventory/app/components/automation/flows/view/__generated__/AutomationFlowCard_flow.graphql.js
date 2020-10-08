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
    +id: string
  |},
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Flow",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e6384236f9cd5572d8f2c1f3deb2218c';

module.exports = node;
