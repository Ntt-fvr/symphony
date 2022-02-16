/**
 * @generated SignedSource<<435becfc4f313976a093490e6c5aa795>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditKpiInput = {|
  id: string,
  name: string,
  description: string,
  domainFk: string,
  kpiCategoryFK: string,
  status: boolean,
|};
export type EditKpiMutation$variables = {|
  input: EditKpiInput,
|};
export type EditKpiMutationVariables = EditKpiMutation$variables;
export type EditKpiMutation$data = {|
  +editKpi: {|
    +id: string,
    +name: string,
    +domainFk: {|
      +id: string,
      +name: string,
    |},
  |},
|};
export type EditKpiMutationResponse = EditKpiMutation$data;
export type EditKpiMutation = {|
  variables: EditKpiMutationVariables,
  response: EditKpiMutation$data,
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
    "name": "editKpi",
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
    "name": "EditKpiMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditKpiMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "6d4f3204a9ba4fb0413af0b730823d70",
    "id": null,
    "metadata": {},
    "name": "EditKpiMutation",
    "operationKind": "mutation",
    "text": "mutation EditKpiMutation(\n  $input: EditKpiInput!\n) {\n  editKpi(input: $input) {\n    id\n    name\n    domainFk {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "44811a67c1c5dfca81b7e7e4489fc0f7";

module.exports = ((node/*: any*/)/*: Mutation<
  EditKpiMutation$variables,
  EditKpiMutation$data,
>*/);
