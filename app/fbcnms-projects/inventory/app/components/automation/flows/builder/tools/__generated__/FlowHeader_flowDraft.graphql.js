/**
 * @generated SignedSource<<fc71e3c8aad4422a72f1a1198b3f47d0>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type FlowHeader_flowDraft$fragmentType: FragmentType;
export type FlowHeader_flowDraft$ref = FlowHeader_flowDraft$fragmentType;
export type FlowHeader_flowDraft$data = {|
  +name: string,
  +$fragmentType: FlowHeader_flowDraft$fragmentType,
|};
export type FlowHeader_flowDraft = FlowHeader_flowDraft$data;
export type FlowHeader_flowDraft$key = {
  +$data?: FlowHeader_flowDraft$data,
  +$fragmentSpreads: FlowHeader_flowDraft$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowHeader_flowDraft",
  "selections": [
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

(node/*: any*/).hash = "8a09a4fba597f491788768174bdc95a6";

module.exports = ((node/*: any*/)/*: Fragment<
  FlowHeader_flowDraft$fragmentType,
  FlowHeader_flowDraft$data,
>*/);
