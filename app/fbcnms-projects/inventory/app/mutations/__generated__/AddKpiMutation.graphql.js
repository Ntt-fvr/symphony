/**
 * @generated SignedSource<<25ae08a4401da16af30819a13a7474d1>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddKpiInput = {|
  name: string,
  description: string,
  domainFk: string,
  kpiCategoryFK: string,
  status: boolean,
|};
export type AddKpiMutation$variables = {|
  input: AddKpiInput,
|};
export type AddKpiMutationVariables = AddKpiMutation$variables;
export type AddKpiMutation$data = {|
  +addKpi: {|
    +id: string,
    +name: string,
    +domainFk: {|
      +id: string,
      +name: string,
    |},
  |},
|};
export type AddKpiMutationResponse = AddKpiMutation$data;
export type AddKpiMutation = {|
  variables: AddKpiMutationVariables,
  response: AddKpiMutation$data,
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
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
    "concreteType": "Kpi",
    "kind": "LinkedField",
    "name": "addKpi",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Domain",
        "kind": "LinkedField",
        "name": "domainFk",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
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
    "name": "AddKpiMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddKpiMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "bbcea04f847e724873ac408e956d40e2",
    "id": null,
    "metadata": {},
    "name": "AddKpiMutation",
    "operationKind": "mutation",
    "text": "mutation AddKpiMutation(\n  $input: AddKpiInput!\n) {\n  addKpi(input: $input) {\n    id\n    name\n    domainFk {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "39120ac831cd6ab077113890017970cb";

module.exports = ((node/*: any*/)/*: Mutation<
  AddKpiMutation$variables,
  AddKpiMutation$data,
>*/);
