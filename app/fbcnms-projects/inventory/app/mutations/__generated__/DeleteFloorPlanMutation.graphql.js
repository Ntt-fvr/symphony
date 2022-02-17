/**
 * @generated SignedSource<<414854dbbe686968ba8d61393e5c6f7b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteFloorPlanMutation$variables = {|
  id: string,
|};
export type DeleteFloorPlanMutationVariables = DeleteFloorPlanMutation$variables;
export type DeleteFloorPlanMutation$data = {|
  +deleteFloorPlan: boolean,
|};
export type DeleteFloorPlanMutationResponse = DeleteFloorPlanMutation$data;
export type DeleteFloorPlanMutation = {|
  variables: DeleteFloorPlanMutationVariables,
  response: DeleteFloorPlanMutation$data,
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
    "name": "deleteFloorPlan",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteFloorPlanMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteFloorPlanMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ce127dc69d554c46c04e244adc40c341",
    "id": null,
    "metadata": {},
    "name": "DeleteFloorPlanMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteFloorPlanMutation(\n  $id: ID!\n) {\n  deleteFloorPlan(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "398cf21649438ad9454a4cdcb7c81c89";

module.exports = ((node/*: any*/)/*: Mutation<
  DeleteFloorPlanMutation$variables,
  DeleteFloorPlanMutation$data,
>*/);
