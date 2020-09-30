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
type AutomationFlowCard_flowDraft$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type AutomationFlowsList_flows$ref: FragmentReference;
declare export opaque type AutomationFlowsList_flows$fragmentType: AutomationFlowsList_flows$ref;
export type AutomationFlowsList_flows = $ReadOnlyArray<{|
  +id: string,
  +$fragmentRefs: AutomationFlowCard_flowDraft$ref,
  +$refType: AutomationFlowsList_flows$ref,
|}>;
export type AutomationFlowsList_flows$data = AutomationFlowsList_flows;
export type AutomationFlowsList_flows$key = $ReadOnlyArray<{
  +$data?: AutomationFlowsList_flows$data,
  +$fragmentRefs: AutomationFlowsList_flows$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "AutomationFlowsList_flows",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AutomationFlowCard_flowDraft"
    }
  ],
  "type": "FlowDraft",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'c1db8c90fd27afff4e2b2c3288d29ad4';

module.exports = node;
