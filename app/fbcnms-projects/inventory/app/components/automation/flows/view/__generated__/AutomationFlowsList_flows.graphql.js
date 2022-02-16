/**
 * @generated SignedSource<<0d39a3b55dee8df96e0827335fc882b3>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type AutomationFlowCard_flow$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type AutomationFlowsList_flows$fragmentType: FragmentType;
export type AutomationFlowsList_flows$ref = AutomationFlowsList_flows$fragmentType;
export type AutomationFlowsList_flows$data = $ReadOnlyArray<{|
  +id: string,
  +$fragmentSpreads: AutomationFlowCard_flow$fragmentType,
  +$fragmentType: AutomationFlowsList_flows$fragmentType,
|}>;
export type AutomationFlowsList_flows = AutomationFlowsList_flows$data;
export type AutomationFlowsList_flows$key = $ReadOnlyArray<{
  +$data?: AutomationFlowsList_flows$data,
  +$fragmentSpreads: AutomationFlowsList_flows$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
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
      "name": "AutomationFlowCard_flow"
    }
  ],
  "type": "Flow",
  "abstractKey": null
};

(node/*: any*/).hash = "0ada389a273fe87c90f4a231cae2021b";

module.exports = ((node/*: any*/)/*: Fragment<
  AutomationFlowsList_flows$fragmentType,
  AutomationFlowsList_flows$data,
>*/);
