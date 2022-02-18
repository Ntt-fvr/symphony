/**
 * @generated SignedSource<<c751eb32d0871e56e69d7be65ec88cef>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditThresholdInput = {|
  id: string,
  name: string,
  description: string,
  status: boolean,
|};
export type EditThresholdMutation$variables = {|
  input: EditThresholdInput,
|};
export type EditThresholdMutationVariables = EditThresholdMutation$variables;
export type EditThresholdMutation$data = {|
  +editThreshold: {|
    +id: string,
    +name: string,
    +description: string,
    +status: boolean,
    +kpi: ?{|
      +id: string,
      +name: string,
    |},
  |},
|};
export type EditThresholdMutationResponse = EditThresholdMutation$data;
export type EditThresholdMutation = {|
  variables: EditThresholdMutationVariables,
  response: EditThresholdMutation$data,
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
    "concreteType": "Threshold",
    "kind": "LinkedField",
    "name": "editThreshold",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Kpi",
        "kind": "LinkedField",
        "name": "kpi",
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
    "name": "EditThresholdMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditThresholdMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "5349774be317eb7e50ac03cd49a801b3",
    "id": null,
    "metadata": {},
    "name": "EditThresholdMutation",
    "operationKind": "mutation",
    "text": "mutation EditThresholdMutation(\n  $input: EditThresholdInput!\n) {\n  editThreshold(input: $input) {\n    id\n    name\n    description\n    status\n    kpi {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "183dcd24d2f824d040b92b5a51f55222";

module.exports = ((node/*: any*/)/*: Mutation<
  EditThresholdMutation$variables,
  EditThresholdMutation$data,
>*/);
