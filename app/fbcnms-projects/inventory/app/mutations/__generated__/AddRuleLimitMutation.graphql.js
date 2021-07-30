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
export type AddRuleLimitInput = {|
  name: string,
  limitType: string,
  comparator: string,
  rule: string,
|};
export type AddRuleLimitMutationVariables = {|
  input: AddRuleLimitInput
|};
export type AddRuleLimitMutationResponse = {|
  +addRuleLimit: {|
    +id: string,
    +name: string,
  |}
|};
export type AddRuleLimitMutation = {|
  variables: AddRuleLimitMutationVariables,
  response: AddRuleLimitMutationResponse,
|};
*/


/*
mutation AddRuleLimitMutation(
  $input: AddRuleLimitInput!
) {
  addRuleLimit(input: $input) {
    id
    name
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
    "concreteType": "RuleLimit",
    "kind": "LinkedField",
    "name": "addRuleLimit",
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
    "name": "AddRuleLimitMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddRuleLimitMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4b66713bb7e00db349e7203ce7c9de22",
    "id": null,
    "metadata": {},
    "name": "AddRuleLimitMutation",
    "operationKind": "mutation",
    "text": "mutation AddRuleLimitMutation(\n  $input: AddRuleLimitInput!\n) {\n  addRuleLimit(input: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c89595014cc04c3063c34cb3861ddae8';

module.exports = node;
