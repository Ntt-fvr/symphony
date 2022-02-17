/**
 * @generated SignedSource<<6ca7708d0baff86f7e3beaf681cfa434>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ProjectsMap_projects$fragmentType: FragmentType;
export type ProjectsMap_projects$ref = ProjectsMap_projects$fragmentType;
export type ProjectsMap_projects$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +location: ?{|
    +id: string,
    +name: string,
    +latitude: number,
    +longitude: number,
  |},
  +numberOfWorkOrders: number,
  +$fragmentType: ProjectsMap_projects$fragmentType,
|}>;
export type ProjectsMap_projects = ProjectsMap_projects$data;
export type ProjectsMap_projects$key = $ReadOnlyArray<{
  +$data?: ProjectsMap_projects$data,
  +$fragmentSpreads: ProjectsMap_projects$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = (function(){
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
  "metadata": {
    "plural": true
  },
  "name": "ProjectsMap_projects",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "latitude",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "longitude",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "numberOfWorkOrders",
      "storageKey": null
    }
  ],
  "type": "Project",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "d43c7f541350f23d3936722943b7ca9b";

module.exports = ((node/*: any*/)/*: Fragment<
  ProjectsMap_projects$fragmentType,
  ProjectsMap_projects$data,
>*/);
