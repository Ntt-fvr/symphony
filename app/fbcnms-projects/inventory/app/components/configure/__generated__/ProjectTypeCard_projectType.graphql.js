/**
 * @generated SignedSource<<8fcb4652a78fbd128f8051de2ea95b8c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ProjectTypeCard_projectType$fragmentType: FragmentType;
export type ProjectTypeCard_projectType$ref = ProjectTypeCard_projectType$fragmentType;
export type ProjectTypeCard_projectType$data = {|
  +id: string,
  +name: string,
  +description: ?string,
  +numberOfProjects: number,
  +workOrders: $ReadOnlyArray<?{|
    +id: string,
  |}>,
  +$fragmentType: ProjectTypeCard_projectType$fragmentType,
|};
export type ProjectTypeCard_projectType = ProjectTypeCard_projectType$data;
export type ProjectTypeCard_projectType$key = {
  +$data?: ProjectTypeCard_projectType$data,
  +$fragmentSpreads: ProjectTypeCard_projectType$fragmentType,
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
  "name": "ProjectTypeCard_projectType",
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
      "name": "numberOfProjects",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "WorkOrderDefinition",
      "kind": "LinkedField",
      "name": "workOrders",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ProjectType",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "a0ed06d279a9e96ad0fbb45c505ad5e8";

module.exports = ((node/*: any*/)/*: Fragment<
  ProjectTypeCard_projectType$fragmentType,
  ProjectTypeCard_projectType$data,
>*/);
