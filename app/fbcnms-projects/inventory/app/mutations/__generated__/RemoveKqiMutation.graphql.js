/**
 * @generated SignedSource<<66d9bed1db308147453fd624ef4ed360>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveKqiMutation$variables = {|
  id: string,
|};
export type RemoveKqiMutationVariables = RemoveKqiMutation$variables;
export type RemoveKqiMutation$data = {|
  +removeKqi: string,
|};
export type RemoveKqiMutationResponse = RemoveKqiMutation$data;
export type RemoveKqiMutation = {|
  variables: RemoveKqiMutationVariables,
  response: RemoveKqiMutation$data,
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
    "name": "removeKqi",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveKqiMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveKqiMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8c964acd26e90c320a7bbff3ff4dd6da",
    "id": null,
    "metadata": {},
    "name": "RemoveKqiMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveKqiMutation(\n  $id: ID!\n) {\n  removeKqi(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "acaa13888bfb2dddec36a5d3742f9e78";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveKqiMutation$variables,
  RemoveKqiMutation$data,
>*/);
