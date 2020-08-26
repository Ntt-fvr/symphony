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
type TriggerFilterOperator_data$ref = any;
export type TriggerID = "magma_alert" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type TriggerFilterRow_data$ref: FragmentReference;
declare export opaque type TriggerFilterRow_data$fragmentType: TriggerFilterRow_data$ref;
export type TriggerFilterRow_data = {|
  +triggerID: TriggerID,
  +supportedFilters: $ReadOnlyArray<?{|
    +filterID: string,
    +description: string,
    +supportedOperators: $ReadOnlyArray<?{|
      +operatorID: string
    |}>,
    +$fragmentRefs: TriggerFilterOperator_data$ref,
  |}>,
  +$refType: TriggerFilterRow_data$ref,
|};
export type TriggerFilterRow_data$data = TriggerFilterRow_data;
export type TriggerFilterRow_data$key = {
  +$data?: TriggerFilterRow_data$data,
  +$fragmentRefs: TriggerFilterRow_data$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TriggerFilterRow_data",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "triggerID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ActionsFilter",
      "kind": "LinkedField",
      "name": "supportedFilters",
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
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ActionsOperator",
          "kind": "LinkedField",
          "name": "supportedOperators",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "operatorID",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TriggerFilterOperator_data"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ActionsTrigger",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '47c9db7480b461fd45c11dc90763638e';

module.exports = node;
