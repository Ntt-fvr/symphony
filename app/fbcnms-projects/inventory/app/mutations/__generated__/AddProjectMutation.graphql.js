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
import type { ConcreteRequest } from 'relay-runtime';
type ProjectsTableView_projects$ref = any;
export type ProjectPriority = "HIGH" | "LOW" | "MEDIUM" | "NONE" | "URGENT" | "%future added value";
export type AddProjectInput = {|
  name: string,
  description?: ?string,
  priority?: ?ProjectPriority,
  creatorId?: ?string,
  type: string,
  location?: ?string,
  properties?: ?$ReadOnlyArray<PropertyInput>,
|};
export type PropertyInput = {|
  id?: ?string,
  propertyTypeID: string,
  stringValue?: ?string,
  intValue?: ?number,
  booleanValue?: ?boolean,
  floatValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  nodeIDValue?: ?string,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
|};
export type AddProjectMutationVariables = {|
  input: AddProjectInput
|};
export type AddProjectMutationResponse = {|
  +createProject: {|
    +$fragmentRefs: ProjectsTableView_projects$ref
  |}
|};
export type AddProjectMutation = {|
  variables: AddProjectMutationVariables,
  response: AddProjectMutationResponse,
|};
*/


/*
mutation AddProjectMutation(
  $input: AddProjectInput!
) {
  createProject(input: $input) {
    ...ProjectsTableView_projects
    id
  }
}

fragment ProjectsTableView_projects on Project {
  id
  createTime
  name
  createdBy {
    email
    id
  }
  location {
    id
    name
  }
  type {
    id
    name
  }
  priority
  numberOfWorkOrders
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddProjectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "createProject",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProjectsTableView_projects"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddProjectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "createProject",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createTime",
            "storageKey": null
          },
          (v3/*: any*/),
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
              },
              (v2/*: any*/)
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
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectType",
            "kind": "LinkedField",
            "name": "type",
            "plural": false,
            "selections": (v4/*: any*/),
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5cff189f19ce9ed3b92603462979a851",
    "id": null,
    "metadata": {},
    "name": "AddProjectMutation",
    "operationKind": "mutation",
    "text": "mutation AddProjectMutation(\n  $input: AddProjectInput!\n) {\n  createProject(input: $input) {\n    ...ProjectsTableView_projects\n    id\n  }\n}\n\nfragment ProjectsTableView_projects on Project {\n  id\n  createTime\n  name\n  createdBy {\n    email\n    id\n  }\n  location {\n    id\n    name\n  }\n  type {\n    id\n    name\n  }\n  priority\n  numberOfWorkOrders\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4b62a168191f8fdb0ee345d1fd1212fc';

module.exports = node;
