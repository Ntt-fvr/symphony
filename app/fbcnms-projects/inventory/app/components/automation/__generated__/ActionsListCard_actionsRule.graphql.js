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
type ActionsAddDialog_triggerData$ref = any;
export type ActionID = "magma_reboot_node" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ActionsListCard_actionsRule$ref: FragmentReference;
declare export opaque type ActionsListCard_actionsRule$fragmentType: ActionsListCard_actionsRule$ref;
export type ActionsListCard_actionsRule = {|
  +id: string,
  +name: string,
  +trigger: {|
    +description: string,
    +$fragmentRefs: ActionsAddDialog_triggerData$ref,
  |},
  +ruleActions: $ReadOnlyArray<?{|
    +actionID: ActionID,
    +data: string,
  |}>,
  +ruleFilters: $ReadOnlyArray<?{|
    +filterID: ?string,
    +operatorID: ?string,
    +data: string,
  |}>,
  +$refType: ActionsListCard_actionsRule$ref,
|};
export type ActionsListCard_actionsRule$data = ActionsListCard_actionsRule;
export type ActionsListCard_actionsRule$key = {
  +$data?: ActionsListCard_actionsRule$data,
  +$fragmentRefs: ActionsListCard_actionsRule$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "data",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActionsListCard_actionsRule",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ActionsTrigger",
      "kind": "LinkedField",
      "name": "trigger",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ActionsAddDialog_triggerData"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ActionsRuleAction",
      "kind": "LinkedField",
      "name": "ruleActions",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "actionID",
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ActionsRuleFilter",
      "kind": "LinkedField",
      "name": "ruleFilters",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "filterID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "operatorID",
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ActionsRule",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '5c259632c00bc3ceaa2d85fde01b1664';

module.exports = node;
