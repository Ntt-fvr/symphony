/**
 * @generated SignedSource<<75552c6ef11b47b8fb97ed90945d138f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type FlowNewInstancesPolicy = "ENABLED" | "DISABLED" | "%future added value";
export type FlowStatus = "PUBLISHED" | "UNPUBLISHED" | "ARCHIVED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type AutomationFlowCard_flow$fragmentType: FragmentType;
export type AutomationFlowCard_flow$ref = AutomationFlowCard_flow$fragmentType;
export type AutomationFlowCard_flow$data = {|
  +id: string,
  +name: string,
  +description: ?string,
  +status: FlowStatus,
  +newInstancesPolicy: FlowNewInstancesPolicy,
  +draft: ?{|
    +id: string,
    +sameAsFlow: boolean,
  |},
  +$fragmentType: AutomationFlowCard_flow$fragmentType,
|};
export type AutomationFlowCard_flow = AutomationFlowCard_flow$data;
export type AutomationFlowCard_flow$key = {
  +$data?: AutomationFlowCard_flow$data,
  +$fragmentSpreads: AutomationFlowCard_flow$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
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
    }
  ],
  "type": "Flow",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "0195fe5bd257450ba0ebfd27dcd0abe3";

module.exports = ((node/*: any*/)/*: Fragment<
  AutomationFlowCard_flow$fragmentType,
  AutomationFlowCard_flow$data,
>*/);
