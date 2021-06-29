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
export type AddCounterFamilyInput = {|
  name: string,
  counter?: ?$ReadOnlyArray<AddCounterInput>,
|};
export type AddCounterInput = {|
  name: string,
  externalID: string,
  networkManagerSystem: string,
  countervendorformula?: ?$ReadOnlyArray<EditCounterVendorFormulaInput>,
|};
export type EditCounterVendorFormulaInput = {|
  id: string,
  mandatory: boolean,
  vendorFk: string,
  counterFk: string,
  formulaFk: string,
|};
export type AddCounterMutationVariables = {|
  input: AddCounterFamilyInput
|};
export type AddCounterMutationResponse = {|
  +addCounterFamily: {|
    +name: string,
    +counter: $ReadOnlyArray<?{|
      +name: string,
      +externalID: string,
      +networkManagerSystem: string,
    |}>,
  |}
|};
export type AddCounterMutation = {|
  variables: AddCounterMutationVariables,
  response: AddCounterMutationResponse,
|};
*/


/*
mutation AddCounterMutation(
  $input: AddCounterFamilyInput!
) {
  addCounterFamily(input: $input) {
    name
    counter {
      name
      externalID
      networkManagerSystem
      id
    }
    id
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "networkManagerSystem",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddCounterMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CounterFamily",
        "kind": "LinkedField",
        "name": "addCounterFamily",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Counter",
            "kind": "LinkedField",
            "name": "counter",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
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
    "name": "AddCounterMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CounterFamily",
        "kind": "LinkedField",
        "name": "addCounterFamily",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Counter",
            "kind": "LinkedField",
            "name": "counter",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8865730b5d1f599340ebf44046df36d0",
    "id": null,
    "metadata": {},
    "name": "AddCounterMutation",
    "operationKind": "mutation",
    "text": "mutation AddCounterMutation(\n  $input: AddCounterFamilyInput!\n) {\n  addCounterFamily(input: $input) {\n    name\n    counter {\n      name\n      externalID\n      networkManagerSystem\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '32fdd2add12a71ef54c87ad5f905424d';

module.exports = node;
