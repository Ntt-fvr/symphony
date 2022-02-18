/**
 * @generated SignedSource<<ab68182ef516de6d1c4a3e222853e978>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveEquipmentMutation$variables = {|
  id: string,
  work_order_id?: ?string,
|};
export type RemoveEquipmentMutationVariables = RemoveEquipmentMutation$variables;
export type RemoveEquipmentMutation$data = {|
  +removeEquipment: string,
|};
export type RemoveEquipmentMutationResponse = RemoveEquipmentMutation$data;
export type RemoveEquipmentMutation = {|
  variables: RemoveEquipmentMutationVariables,
  response: RemoveEquipmentMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "work_order_id"
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
      },
      {
        "kind": "Variable",
        "name": "workOrderId",
        "variableName": "work_order_id"
      }
    ],
    "kind": "ScalarField",
    "name": "removeEquipment",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveEquipmentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveEquipmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8bf1ddec1794286614ed1ed1f6be6b61",
    "id": null,
    "metadata": {},
    "name": "RemoveEquipmentMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveEquipmentMutation(\n  $id: ID!\n  $work_order_id: ID\n) {\n  removeEquipment(id: $id, workOrderId: $work_order_id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "81fe5c2632e64bde78a3342c28d9258d";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveEquipmentMutation$variables,
  RemoveEquipmentMutation$data,
>*/);
