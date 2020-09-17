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
  +blocks: $ReadOnlyArray<{|
    +id: string,
    +name: string,
  |}>,
  +$refType: AutomationFlowCard_flowDraft$ref,
|};
export type AutomationFlowCard_flowDraft$data = AutomationFlowCard_flowDraft;
export type AutomationFlowCard_flowDraft$key = {
  +$data?: AutomationFlowCard_flowDraft$data,
  +$fragmentRefs: AutomationFlowCard_flowDraft$ref,
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
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AutomationFlowCard_flowDraft",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Block",
      "kind": "LinkedField",
      "name": "blocks",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "FlowDraft",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '75bb99e8838f3144249dc69d76f62754';

module.exports = node;
