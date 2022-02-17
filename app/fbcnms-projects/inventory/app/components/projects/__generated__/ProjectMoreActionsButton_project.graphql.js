/**
 * @generated SignedSource<<4fe55daa2503da36a6dc8d1d27c9c042>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ProjectMoreActionsButton_project$fragmentType: FragmentType;
export type ProjectMoreActionsButton_project$ref = ProjectMoreActionsButton_project$fragmentType;
export type ProjectMoreActionsButton_project$data = {|
  +id: string,
  +name: string,
  +numberOfWorkOrders: number,
  +type: {|
    +id: string,
  |},
  +$fragmentType: ProjectMoreActionsButton_project$fragmentType,
|};
export type ProjectMoreActionsButton_project = ProjectMoreActionsButton_project$data;
export type ProjectMoreActionsButton_project$key = {
  +$data?: ProjectMoreActionsButton_project$data,
  +$fragmentSpreads: ProjectMoreActionsButton_project$fragmentType,
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
  "name": "ProjectMoreActionsButton_project",
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
      "name": "numberOfWorkOrders",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ProjectType",
      "kind": "LinkedField",
      "name": "type",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Project",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "fab778d2924d1e0b30c094cc7dfa5572";

module.exports = ((node/*: any*/)/*: Fragment<
  ProjectMoreActionsButton_project$fragmentType,
  ProjectMoreActionsButton_project$data,
>*/);
