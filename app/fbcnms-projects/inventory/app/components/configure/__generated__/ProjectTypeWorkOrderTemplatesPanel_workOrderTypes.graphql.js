/**
 * @generated SignedSource<<69e6088bad17fedbdfbc88e40e9cfb9c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$fragmentType: FragmentType;
export type ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$ref = ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$fragmentType;
export type ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +$fragmentType: ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$fragmentType,
|}>;
export type ProjectTypeWorkOrderTemplatesPanel_workOrderTypes = ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$data;
export type ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$key = $ReadOnlyArray<{
  +$data?: ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$data,
  +$fragmentSpreads: ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ProjectTypeWorkOrderTemplatesPanel_workOrderTypes",
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
  "type": "WorkOrderType",
  "abstractKey": null
};

(node/*: any*/).hash = "b8387d4894b17459891a362d8757d82f";

module.exports = ((node/*: any*/)/*: Fragment<
  ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$fragmentType,
  ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$data,
>*/);
