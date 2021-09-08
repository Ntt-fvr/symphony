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
export type EditKqiTargetInput = {|
  id: string,
  name: string,
  impact: string,
  frame: number,
  alowedValidation: number,
  initTime: any,
  endTime: any,
  status: boolean,
  kqi: string,
|};
export type EditKqiTargetMutationVariables = {|
  input: EditKqiTargetInput
|};
export type EditKqiTargetMutationResponse = {|
  +editKqiTarget: {|
    +id: string,
    +name: string,
    +impact: string,
    +frame: number,
    +alowedValidation: number,
    +initTime: any,
    +endTime: any,
    +status: boolean,
  |}
|};
export type EditKqiTargetMutation = {|
  variables: EditKqiTargetMutationVariables,
  response: EditKqiTargetMutationResponse,
|};
*/


/*
mutation EditKqiTargetMutation(
  $input: EditKqiTargetInput!
) {
  editKqiTarget(input: $input) {
    id
    name
    impact
    frame
    alowedValidation
    initTime
    endTime
    status
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "KqiTarget",
    "kind": "LinkedField",
    "name": "editKqiTarget",
    "plural": false,
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
        "kind": "ScalarField",
        "name": "impact",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "frame",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "alowedValidation",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "initTime",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endTime",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditKqiTargetMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditKqiTargetMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "00f5100e9926d3ed606498d4fc66c172",
    "id": null,
    "metadata": {},
    "name": "EditKqiTargetMutation",
    "operationKind": "mutation",
    "text": "mutation EditKqiTargetMutation(\n  $input: EditKqiTargetInput!\n) {\n  editKqiTarget(input: $input) {\n    id\n    name\n    impact\n    frame\n    alowedValidation\n    initTime\n    endTime\n    status\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bc512a0211e450efba21b3b17fb770ce';

module.exports = node;
