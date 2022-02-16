/**
 * @generated SignedSource<<0a5530d195293787fd3b654579a67061>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditCounterInput = {|
  id: string,
  name: string,
  externalID: string,
  networkManagerSystem: string,
  vendorFk: string,
|};
export type EditCounterMutation$variables = {|
  input: EditCounterInput,
|};
export type EditCounterMutationVariables = EditCounterMutation$variables;
export type EditCounterMutation$data = {|
  +editCounter: {|
    +id: string,
    +name: string,
    +externalID: string,
    +networkManagerSystem: string,
  |},
|};
export type EditCounterMutationResponse = EditCounterMutation$data;
export type EditCounterMutation = {|
  variables: EditCounterMutationVariables,
  response: EditCounterMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
    "concreteType": "Counter",
    "kind": "LinkedField",
    "name": "editCounter",
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
        "name": "externalID",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "networkManagerSystem",
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
    "name": "EditCounterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditCounterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "efa814d23159e3002981b27e366f03b6",
    "id": null,
    "metadata": {},
    "name": "EditCounterMutation",
    "operationKind": "mutation",
    "text": "mutation EditCounterMutation(\n  $input: EditCounterInput!\n) {\n  editCounter(input: $input) {\n    id\n    name\n    externalID\n    networkManagerSystem\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "d9bd655fa7f6480955a97850e6a7246f";

module.exports = ((node/*: any*/)/*: Mutation<
  EditCounterMutation$variables,
  EditCounterMutation$data,
>*/);
