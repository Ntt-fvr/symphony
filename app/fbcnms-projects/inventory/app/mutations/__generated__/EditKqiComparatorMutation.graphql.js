/**
 * @generated SignedSource<<f04706fb1c59c6a5c48db32d4beac7f3>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditKqiComparatorInput = {|
  id: string,
  kqiTargetFk: string,
  comparatorFk: string,
  number: number,
  comparatorType: string,
|};
export type EditKqiComparatorMutation$variables = {|
  input: EditKqiComparatorInput,
|};
export type EditKqiComparatorMutationVariables = EditKqiComparatorMutation$variables;
export type EditKqiComparatorMutation$data = {|
  +editKqiComparator: {|
    +id: string,
    +number: number,
    +comparatorType: string,
    +kqiTargetFk: {|
      +id: string,
      +name: string,
    |},
    +comparatorFk: {|
      +id: string,
      +name: string,
    |},
  |},
|};
export type EditKqiComparatorMutationResponse = EditKqiComparatorMutation$data;
export type EditKqiComparatorMutation = {|
  variables: EditKqiComparatorMutationVariables,
  response: EditKqiComparatorMutation$data,
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "KqiComparator",
    "kind": "LinkedField",
    "name": "editKqiComparator",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "number",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "comparatorType",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "KqiTarget",
        "kind": "LinkedField",
        "name": "kqiTargetFk",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Comparator",
        "kind": "LinkedField",
        "name": "comparatorFk",
        "plural": false,
        "selections": (v2/*: any*/),
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
    "name": "EditKqiComparatorMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditKqiComparatorMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "db63fba38a1cfd0369bdd3310ffd6f20",
    "id": null,
    "metadata": {},
    "name": "EditKqiComparatorMutation",
    "operationKind": "mutation",
    "text": "mutation EditKqiComparatorMutation(\n  $input: EditKqiComparatorInput!\n) {\n  editKqiComparator(input: $input) {\n    id\n    number\n    comparatorType\n    kqiTargetFk {\n      id\n      name\n    }\n    comparatorFk {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "affbcb89127c8475543a82845c17da89";

module.exports = ((node/*: any*/)/*: Mutation<
  EditKqiComparatorMutation$variables,
  EditKqiComparatorMutation$data,
>*/);
