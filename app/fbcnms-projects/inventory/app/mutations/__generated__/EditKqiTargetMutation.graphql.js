/**
 * @generated SignedSource<<ba8de054d45d006bde9ad943356a0dc5>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditKqiTargetInput = {|
  id: string,
  name: string,
  impact: string,
  period: number,
  allowedVariation: number,
  initTime: any,
  endTime: any,
  status: boolean,
  kqi: string,
|};
export type EditKqiTargetMutation$variables = {|
  input: EditKqiTargetInput,
|};
export type EditKqiTargetMutationVariables = EditKqiTargetMutation$variables;
export type EditKqiTargetMutation$data = {|
  +editKqiTarget: {|
    +id: string,
    +name: string,
    +impact: string,
    +allowedVariation: number,
    +initTime: any,
    +endTime: any,
    +status: boolean,
  |},
|};
export type EditKqiTargetMutationResponse = EditKqiTargetMutation$data;
export type EditKqiTargetMutation = {|
  variables: EditKqiTargetMutationVariables,
  response: EditKqiTargetMutation$data,
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
        "name": "allowedVariation",
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
    "cacheID": "a00f018aa4fbe3f985586179e74e87de",
    "id": null,
    "metadata": {},
    "name": "EditKqiTargetMutation",
    "operationKind": "mutation",
    "text": "mutation EditKqiTargetMutation(\n  $input: EditKqiTargetInput!\n) {\n  editKqiTarget(input: $input) {\n    id\n    name\n    impact\n    allowedVariation\n    initTime\n    endTime\n    status\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "0a12f000a570cffe541dc5e7e2a0d1b1";

module.exports = ((node/*: any*/)/*: Mutation<
  EditKqiTargetMutation$variables,
  EditKqiTargetMutation$data,
>*/);
