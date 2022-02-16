/**
 * @generated SignedSource<<8a6ace7558f19bf7069cf1447174d138>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveEquipmentTypeMutation$variables = {|
  id: string,
|};
export type RemoveEquipmentTypeMutationVariables = RemoveEquipmentTypeMutation$variables;
export type RemoveEquipmentTypeMutation$data = {|
  +removeEquipmentType: string,
|};
export type RemoveEquipmentTypeMutationResponse = RemoveEquipmentTypeMutation$data;
export type RemoveEquipmentTypeMutation = {|
  variables: RemoveEquipmentTypeMutationVariables,
  response: RemoveEquipmentTypeMutation$data,
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
    "name": "removeEquipmentType",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveEquipmentTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveEquipmentTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6352e52373e03fae9a28c8bf9d37e0fb",
    "id": null,
    "metadata": {},
    "name": "RemoveEquipmentTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveEquipmentTypeMutation(\n  $id: ID!\n) {\n  removeEquipmentType(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "11b09437ff00a0fb11b78dcc441c853f";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveEquipmentTypeMutation$variables,
  RemoveEquipmentTypeMutation$data,
>*/);
