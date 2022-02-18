/**
 * @generated SignedSource<<3a4c3174a7e3f16aed177e693761a093>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveKqiComparatorMutation$variables = {|
  id: string,
|};
export type RemoveKqiComparatorMutationVariables = RemoveKqiComparatorMutation$variables;
export type RemoveKqiComparatorMutation$data = {|
  +removeKqiComparator: string,
|};
export type RemoveKqiComparatorMutationResponse = RemoveKqiComparatorMutation$data;
export type RemoveKqiComparatorMutation = {|
  variables: RemoveKqiComparatorMutationVariables,
  response: RemoveKqiComparatorMutation$data,
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
    "name": "removeKqiComparator",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveKqiComparatorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveKqiComparatorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "68a3c457460464496a2858471f92f948",
    "id": null,
    "metadata": {},
    "name": "RemoveKqiComparatorMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveKqiComparatorMutation(\n  $id: ID!\n) {\n  removeKqiComparator(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "aff9fd2fc5d720052653107875dcd11e";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveKqiComparatorMutation$variables,
  RemoveKqiComparatorMutation$data,
>*/);
