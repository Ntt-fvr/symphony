/**
 * @generated SignedSource<<53b0acfee5ae0d053efe3eeb69db6dcf>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveKpiMutation$variables = {|
  id: string,
|};
export type RemoveKpiMutationVariables = RemoveKpiMutation$variables;
export type RemoveKpiMutation$data = {|
  +removeKpi: string,
|};
export type RemoveKpiMutationResponse = RemoveKpiMutation$data;
export type RemoveKpiMutation = {|
  variables: RemoveKpiMutationVariables,
  response: RemoveKpiMutation$data,
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
    "name": "removeKpi",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveKpiMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveKpiMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7bb47e23d0ba45fbf0a30d5398889d92",
    "id": null,
    "metadata": {},
    "name": "RemoveKpiMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveKpiMutation(\n  $id: ID!\n) {\n  removeKpi(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "cc7d7eb95c2f8f8fb6edd0fc121c7ebb";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveKpiMutation$variables,
  RemoveKpiMutation$data,
>*/);
