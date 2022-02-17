/**
 * @generated SignedSource<<8aaefc39dedff3212560c3c3da0e601f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveAlarmFilterMutation$variables = {|
  id: string,
|};
export type RemoveAlarmFilterMutationVariables = RemoveAlarmFilterMutation$variables;
export type RemoveAlarmFilterMutation$data = {|
  +removeAlarmFilter: string,
|};
export type RemoveAlarmFilterMutationResponse = RemoveAlarmFilterMutation$data;
export type RemoveAlarmFilterMutation = {|
  variables: RemoveAlarmFilterMutationVariables,
  response: RemoveAlarmFilterMutation$data,
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
    "name": "removeAlarmFilter",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveAlarmFilterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveAlarmFilterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a63bb57ca246f0b31d38f82b154f41b3",
    "id": null,
    "metadata": {},
    "name": "RemoveAlarmFilterMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveAlarmFilterMutation(\n  $id: ID!\n) {\n  removeAlarmFilter(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "e8a235cbfd33583725253244ec9ddd94";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveAlarmFilterMutation$variables,
  RemoveAlarmFilterMutation$data,
>*/);
