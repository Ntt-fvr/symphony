/**
 * @generated SignedSource<<9b227bdaa8642af67b969358eac74308>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type VariableType = "STRING" | "INT" | "DATE" | "WORK_ORDER" | "WORK_ORDER_TYPE" | "LOCATION" | "PROJECT" | "USER" | "%future added value";
export type AddFlowDraftInput = {|
  name: string,
  description?: ?string,
  flowID?: ?string,
  endParamDefinitions: $ReadOnlyArray<VariableDefinitionInput>,
|};
export type VariableDefinitionInput = {|
  key: string,
  type: VariableType,
  mandatory?: ?boolean,
  multipleValues?: ?boolean,
  choices?: ?$ReadOnlyArray<string>,
  defaultValue?: ?string,
|};
export type AddFlowDraftMutation$variables = {|
  input: AddFlowDraftInput,
|};
export type AddFlowDraftMutationVariables = AddFlowDraftMutation$variables;
export type AddFlowDraftMutation$data = {|
  +addFlowDraft: {|
    +id: string,
  |},
|};
export type AddFlowDraftMutationResponse = AddFlowDraftMutation$data;
export type AddFlowDraftMutation = {|
  variables: AddFlowDraftMutationVariables,
  response: AddFlowDraftMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FlowDraft",
    "kind": "LinkedField",
    "name": "addFlowDraft",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddFlowDraftMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddFlowDraftMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f67968a869497751c53e42fb2cab3128",
    "id": null,
    "metadata": {},
    "name": "AddFlowDraftMutation",
    "operationKind": "mutation",
    "text": "mutation AddFlowDraftMutation(\n  $input: AddFlowDraftInput!\n) {\n  addFlowDraft(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "2a03ddebdf4f40d66801512eda972102";

module.exports = ((node/*: any*/)/*: Mutation<
  AddFlowDraftMutation$variables,
  AddFlowDraftMutation$data,
>*/);
