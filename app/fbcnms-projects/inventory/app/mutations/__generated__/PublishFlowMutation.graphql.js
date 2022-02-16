/**
 * @generated SignedSource<<162296c13bfb540faad3507a62e8bc7b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type FlowNewInstancesPolicy = "ENABLED" | "DISABLED" | "%future added value";
export type PublishFlowInput = {|
  flowDraftID: string,
  flowInstancesPolicy: FlowNewInstancesPolicy,
|};
export type PublishFlowMutation$variables = {|
  input: PublishFlowInput,
|};
export type PublishFlowMutationVariables = PublishFlowMutation$variables;
export type PublishFlowMutation$data = {|
  +publishFlow: {|
    +id: string,
    +name: string,
  |},
|};
export type PublishFlowMutationResponse = PublishFlowMutation$data;
export type PublishFlowMutation = {|
  variables: PublishFlowMutationVariables,
  response: PublishFlowMutation$data,
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
    "concreteType": "Flow",
    "kind": "LinkedField",
    "name": "publishFlow",
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
    "name": "PublishFlowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PublishFlowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b48567581247ac15a7c3531caefab684",
    "id": null,
    "metadata": {},
    "name": "PublishFlowMutation",
    "operationKind": "mutation",
    "text": "mutation PublishFlowMutation(\n  $input: PublishFlowInput!\n) {\n  publishFlow(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "531e331e0c960ecf64fbf8c429a9c686";

module.exports = ((node/*: any*/)/*: Mutation<
  PublishFlowMutation$variables,
  PublishFlowMutation$data,
>*/);
