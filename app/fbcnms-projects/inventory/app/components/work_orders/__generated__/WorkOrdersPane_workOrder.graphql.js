/**
 * @generated SignedSource<<9650f04029388f41ed90d88b0364c75b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type WorkOrdersPane_workOrder$fragmentType: FragmentType;
export type WorkOrdersPane_workOrder$ref = WorkOrdersPane_workOrder$fragmentType;
export type WorkOrdersPane_workOrder$data = {
  +id: string,
  +name: string,
  ...
};
export type WorkOrdersPane_workOrder = WorkOrdersPane_workOrder$data;
export type WorkOrdersPane_workOrder$key = {
  +$data?: WorkOrdersPane_workOrder$data,
  +$fragmentSpreads: WorkOrdersPane_workOrder$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "mask": false
  },
  "name": "WorkOrdersPane_workOrder",
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
  "type": "WorkOrder",
  "abstractKey": null
};

(node/*: any*/).hash = "944b8648852d096f3bf6f11462155af6";

module.exports = ((node/*: any*/)/*: Fragment<
  WorkOrdersPane_workOrder$fragmentType,
  WorkOrdersPane_workOrder$data,
>*/);
