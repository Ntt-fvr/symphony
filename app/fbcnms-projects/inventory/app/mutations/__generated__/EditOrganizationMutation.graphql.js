/**
 * @generated SignedSource<<36f5f4a72a1275be35e98dbb41a27c31>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditOrganizationInput = {|
  id: string,
  name: string,
  description: string,
|};
export type EditOrganizationMutation$variables = {|
  input: EditOrganizationInput,
|};
export type EditOrganizationMutationVariables = EditOrganizationMutation$variables;
export type EditOrganizationMutation$data = {|
  +editOrganization: {|
    +id: string,
    +name: string,
    +description: string,
  |},
|};
export type EditOrganizationMutationResponse = EditOrganizationMutation$data;
export type EditOrganizationMutation = {|
  variables: EditOrganizationMutationVariables,
  response: EditOrganizationMutation$data,
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
    "concreteType": "Organization",
    "kind": "LinkedField",
    "name": "editOrganization",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "name": "EditOrganizationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditOrganizationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d626e3ed5161d42f3a62c7bceba47202",
    "id": null,
    "metadata": {},
    "name": "EditOrganizationMutation",
    "operationKind": "mutation",
    "text": "mutation EditOrganizationMutation(\n  $input: EditOrganizationInput!\n) {\n  editOrganization(input: $input) {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "ff2301a17cd9f7fc484b800f5869201e";

module.exports = ((node/*: any*/)/*: Mutation<
  EditOrganizationMutation$variables,
  EditOrganizationMutation$data,
>*/);
