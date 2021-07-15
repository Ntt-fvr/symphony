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
export type AddTresholdInput = {|
  name: string,
  description: string,
  status: boolean,
  kpi: string,
|};
export type AddTresholdMutationVariables = {|
  input: AddTresholdInput
|};
export type AddTresholdMutationResponse = {|
  +addTreshold: {|
    +id: string,
    +name: string,
    +description: string,
    +status: boolean,
    +kpi: ?{|
      +id: string,
      +name: string,
    |},
  |}
|};
export type AddTresholdMutation = {|
  variables: AddTresholdMutationVariables,
  response: AddTresholdMutationResponse,
|};
*/


/*
mutation AddTresholdMutation(
  $input: AddTresholdInput!
) {
  addTreshold(input: $input) {
    id
    name
    description
    status
    kpi {
      id
      name
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
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Treshold",
    "kind": "LinkedField",
    "name": "addTreshold",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Kpi",
        "kind": "LinkedField",
        "name": "kpi",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
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
    "name": "AddTresholdMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddTresholdMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "624e86fa7aeea7a0a0175bf851bfc505",
    "id": null,
    "metadata": {},
    "name": "AddTresholdMutation",
    "operationKind": "mutation",
    "text": "mutation AddTresholdMutation(\n  $input: AddTresholdInput!\n) {\n  addTreshold(input: $input) {\n    id\n    name\n    description\n    status\n    kpi {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '827ca6a41fa447d5092db4b7b175afe0';

module.exports = node;
