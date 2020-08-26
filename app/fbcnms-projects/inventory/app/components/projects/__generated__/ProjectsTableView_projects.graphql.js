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
export type ProjectPriority = "HIGH" | "LOW" | "MEDIUM" | "NONE" | "URGENT" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProjectsTableView_projects$ref: FragmentReference;
declare export opaque type ProjectsTableView_projects$fragmentType: ProjectsTableView_projects$ref;
export type ProjectsTableView_projects = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +createdBy: ?{|
    +email: string
  |},
  +location: ?{|
    +id: string,
    +name: string,
  |},
  +type: {|
    +id: string,
    +name: string,
  |},
  +priority: ProjectPriority,
  +numberOfWorkOrders: number,
  +$refType: ProjectsTableView_projects$ref,
|}>;
export type ProjectsTableView_projects$data = ProjectsTableView_projects;
export type ProjectsTableView_projects$key = $ReadOnlyArray<{
  +$data?: ProjectsTableView_projects$data,
  +$fragmentRefs: ProjectsTableView_projects$ref,
  ...
}>;
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
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ProjectsTableView_projects",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ProjectType",
      "kind": "LinkedField",
      "name": "type",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priority",
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
// prettier-ignore
(node/*: any*/).hash = '3c5cdac7da5dcdb9c638764e19361524';

module.exports = node;
