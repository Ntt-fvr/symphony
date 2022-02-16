/**
 * @generated SignedSource<<ed343c155ef2ef6845e14ab687be40f0>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveLocationMutation$variables = {|
  id: string,
|};
export type RemoveLocationMutationVariables = RemoveLocationMutation$variables;
export type RemoveLocationMutation$data = {|
  +removeLocation: string,
|};
export type RemoveLocationMutationResponse = RemoveLocationMutation$data;
export type RemoveLocationMutation = {|
  variables: RemoveLocationMutationVariables,
  response: RemoveLocationMutation$data,
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
    "name": "removeLocation",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveLocationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveLocationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f93ee7fde96fc1bcf62cc14a57cb416a",
    "id": null,
    "metadata": {},
    "name": "RemoveLocationMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveLocationMutation(\n  $id: ID!\n) {\n  removeLocation(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "020ce82a52db80ee9ae4e4b370e756a7";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveLocationMutation$variables,
  RemoveLocationMutation$data,
>*/);
