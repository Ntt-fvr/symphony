/**
 * @generated SignedSource<<8f7728eba608ccb6949c65973f20f3b2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteReportFilterMutation$variables = {|
  id: string,
|};
export type DeleteReportFilterMutationVariables = DeleteReportFilterMutation$variables;
export type DeleteReportFilterMutation$data = {|
  +deleteReportFilter: boolean,
|};
export type DeleteReportFilterMutationResponse = DeleteReportFilterMutation$data;
export type DeleteReportFilterMutation = {|
  variables: DeleteReportFilterMutationVariables,
  response: DeleteReportFilterMutation$data,
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
    "name": "deleteReportFilter",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteReportFilterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteReportFilterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4ed13f38fa4d8ec48c83c8919984606f",
    "id": null,
    "metadata": {},
    "name": "DeleteReportFilterMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteReportFilterMutation(\n  $id: ID!\n) {\n  deleteReportFilter(id: $id)\n}\n"
  }
};
})();

(node/*: any*/).hash = "7963d86165414f401b01981da338f8de";

module.exports = ((node/*: any*/)/*: Mutation<
  DeleteReportFilterMutation$variables,
  DeleteReportFilterMutation$data,
>*/);
