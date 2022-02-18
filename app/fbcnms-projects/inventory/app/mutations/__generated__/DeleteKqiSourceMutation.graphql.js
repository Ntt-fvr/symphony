/**
 * @generated SignedSource<<21cc30c701bd13935269da58a4016ff2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteKqiSourceMutation$variables = {|
  id: string,
|};
export type DeleteKqiSourceMutationVariables = DeleteKqiSourceMutation$variables;
export type DeleteKqiSourceMutation$data = {|
  +removeKqiSource: string,
|};
export type DeleteKqiSourceMutationResponse = DeleteKqiSourceMutation$data;
export type DeleteKqiSourceMutation = {|
  variables: DeleteKqiSourceMutationVariables,
  response: DeleteKqiSourceMutation$data,
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
    "name": "removeKqiSource",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteKqiSourceMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteKqiSourceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "869689069a5ccd0d9a67da43232c0a06",
    "id": null,
    "metadata": {},
    "name": "DeleteKqiSourceMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteKqiSourceMutation(\n  $id: ID!\n) {\n  removeKqiSource(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "617601309b2a80d61f7bc7078298a88f";

module.exports = ((node/*: any*/)/*: Mutation<
  DeleteKqiSourceMutation$variables,
  DeleteKqiSourceMutation$data,
>*/);
