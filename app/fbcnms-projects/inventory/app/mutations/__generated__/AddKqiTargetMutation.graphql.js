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
export type AddKqiTargetInput = {|
  name: string,
  impact: string,
  frame: number,
  alowedValidation: number,
  initTime: any,
  endTime: any,
  status: boolean,
  kqi: string,
|};
export type AddKqiTargetMutationVariables = {|
  input: AddKqiTargetInput
|};
export type AddKqiTargetMutationResponse = {|
  +addKqiTarget: {|
    +id: string,
    +name: string,
    +impact: string,
    +frame: number,
    +alowedValidation: number,
    +initTime: any,
    +endTime: any,
    +status: boolean,
    +kqiComparator: $ReadOnlyArray<?{|
      +id: string,
      +number: number,
      +comparatorType: string,
      +kqiTargetFk: {|
        +id: string,
        +name: string,
      |},
      +comparatorFk: {|
        +id: string,
        +name: string,
      |},
    |}>,
  |}
|};
export type AddKqiTargetMutation = {|
  variables: AddKqiTargetMutationVariables,
  response: AddKqiTargetMutationResponse,
|};
*/


/*
mutation AddKqiTargetMutation(
  $input: AddKqiTargetInput!
) {
  addKqiTarget(input: $input) {
    id
    name
    impact
    frame
    alowedValidation
    initTime
    endTime
    status
    kqiComparator {
      id
      number
      comparatorType
      kqiTargetFk {
        id
        name
      }
      comparatorFk {
        id
        name
      }
    }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
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
    "name": "addKqiTarget",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "KqiComparator",
        "kind": "LinkedField",
        "name": "kqiComparator",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "number",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "comparatorType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "KqiTarget",
            "kind": "LinkedField",
            "name": "kqiTargetFk",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Comparator",
            "kind": "LinkedField",
            "name": "comparatorFk",
            "plural": false,
            "selections": (v3/*: any*/),
            "storageKey": null
          }
        ],
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
    "name": "AddKqiTargetMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddKqiTargetMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "22a3370eef2d7429938d14941f418672",
    "id": null,
    "metadata": {},
    "name": "AddKqiTargetMutation",
    "operationKind": "mutation",
    "text": "mutation AddKqiTargetMutation(\n  $input: AddKqiTargetInput!\n) {\n  addKqiTarget(input: $input) {\n    id\n    name\n    impact\n    frame\n    alowedValidation\n    initTime\n    endTime\n    status\n    kqiComparator {\n      id\n      number\n      comparatorType\n      kqiTargetFk {\n        id\n        name\n      }\n      comparatorFk {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c5ded0fc594e649036c584cf86a799d7';

module.exports = node;
