/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ActionTemplateType = "AUTOMATION_FLOW" | "CONFIGURATION_PARAMETER" | "%future added value";
export type AddActionTemplateInput = {|
  actionTemplateItem: $ReadOnlyArray<ActionTemplateRef>,
  name: string,
  resourceSpecifications: string,
  type: ActionTemplateType,
|};
export type ActionTemplateRef = {|
  actionTemplateItem?: ?$ReadOnlyArray<ActionTemplateRef>,
  id?: ?string,
  name?: ?string,
  resourceSpecifications?: ?string,
  type?: ?ActionTemplateType,
|};
export type AddActionTemplateMutationVariables = {|
  input: $ReadOnlyArray<AddActionTemplateInput>
|};
export type AddActionTemplateMutationResponse = {|
  +addActionTemplate: ?{|
    +actionTemplate: ?$ReadOnlyArray<?{|
      +id: string
    |}>
  |}
|};
export type AddActionTemplateMutation = {|
  variables: AddActionTemplateMutationVariables,
  response: AddActionTemplateMutationResponse,
|};
*/


/*
mutation AddActionTemplateMutation(
  $input: [AddActionTemplateInput!]!
) {
  addActionTemplate(input: $input) {
    actionTemplate {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
    "concreteType": "AddActionTemplatePayload",
    "kind": "LinkedField",
    "name": "addActionTemplate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionTemplate",
        "kind": "LinkedField",
        "name": "actionTemplate",
        "plural": true,
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddActionTemplateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddActionTemplateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "79c3e72545e38124ec9bd7b1adf67f85",
    "id": null,
    "metadata": {},
    "name": "AddActionTemplateMutation",
    "operationKind": "mutation",
    "text": "mutation AddActionTemplateMutation(\n  $input: [AddActionTemplateInput!]!\n) {\n  addActionTemplate(input: $input) {\n    actionTemplate {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e4d72b22b3d56b04b7029c0b605f5171';

module.exports = node;
