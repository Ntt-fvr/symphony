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
import type { FragmentReference } from "relay-runtime";
declare export opaque type AutomationFlowCard_flowDraft$ref: FragmentReference;
declare export opaque type AutomationFlowCard_flowDraft$fragmentType: AutomationFlowCard_flowDraft$ref;
export type AutomationFlowCard_flowDraft = {|
  +id: string,
  +name: string,
  +$refType: AutomationFlowCard_flowDraft$ref,
|};
export type AutomationFlowCard_flowDraft$data = AutomationFlowCard_flowDraft;
export type AutomationFlowCard_flowDraft$key = {
  +$data?: AutomationFlowCard_flowDraft$data,
  +$fragmentRefs: AutomationFlowCard_flowDraft$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutomationFlowCard_flowDraft",
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "FlowDraft",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '5aa63c690f5b97dd1881c3d8631cd7df';

module.exports = node;
