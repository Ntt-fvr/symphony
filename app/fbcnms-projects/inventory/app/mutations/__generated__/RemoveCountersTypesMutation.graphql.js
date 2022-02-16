/**
 * @generated SignedSource<<b35f4fdb6d050f3aee65707f5ca20a71>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveCountersTypesMutation$variables = {|
  id: string,
|};
export type RemoveCountersTypesMutationVariables = RemoveCountersTypesMutation$variables;
export type RemoveCountersTypesMutation$data = {|
  +removeCounter: string,
|};
export type RemoveCountersTypesMutationResponse = RemoveCountersTypesMutation$data;
export type RemoveCountersTypesMutation = {|
  variables: RemoveCountersTypesMutationVariables,
  response: RemoveCountersTypesMutation$data,
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
    "name": "removeCounter",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveCountersTypesMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveCountersTypesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0456263d723d7e5d5e3b380eb7efce75",
    "id": null,
    "metadata": {},
    "name": "RemoveCountersTypesMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveCountersTypesMutation(\n  $id: ID!\n) {\n  removeCounter(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "eeb5d288ee217375c00bae3f3a834e73";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveCountersTypesMutation$variables,
  RemoveCountersTypesMutation$data,
>*/);
