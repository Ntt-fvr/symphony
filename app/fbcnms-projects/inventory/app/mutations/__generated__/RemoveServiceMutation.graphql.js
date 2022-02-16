/**
 * @generated SignedSource<<ec608fc6a235a8930d47e03f87cecf4a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveServiceMutation$variables = {|
  id: string,
|};
export type RemoveServiceMutationVariables = RemoveServiceMutation$variables;
export type RemoveServiceMutation$data = {|
  +removeService: string,
|};
export type RemoveServiceMutationResponse = RemoveServiceMutation$data;
export type RemoveServiceMutation = {|
  variables: RemoveServiceMutationVariables,
  response: RemoveServiceMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "removeService",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveServiceMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveServiceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f0ccb340d8c08e67a78932389d50f269",
    "id": null,
    "metadata": {},
    "name": "RemoveServiceMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveServiceMutation(\n  $id: ID!\n) {\n  removeService(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "0e33b688caed9845743fa09141151ba7";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveServiceMutation$variables,
  RemoveServiceMutation$data,
>*/);
