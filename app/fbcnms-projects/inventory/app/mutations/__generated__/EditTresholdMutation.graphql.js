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
export type EditTresholdInput = {|
  id: string,
  name: string,
  description: string,
  status: boolean,
|};
export type EditTresholdMutationVariables = {|
  input: EditTresholdInput
|};
export type EditTresholdMutationResponse = {|
  +editTreshold: {|
    +id: string,
    +name: string,
    +description: string,
    +status: boolean,
    +kpi: ?{|
      +id: string,
      +name: string,
    |},
  |}
|};
export type EditTresholdMutation = {|
  variables: EditTresholdMutationVariables,
  response: EditTresholdMutationResponse,
|};
*/


/*
mutation EditTresholdMutation(
  $input: EditTresholdInput!
) {
  editTreshold(input: $input) {
    id
    name
    description
    status
    kpi {
      id
      name
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
    "concreteType": "Treshold",
    "kind": "LinkedField",
    "name": "editTreshold",
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
    "name": "EditTresholdMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditTresholdMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "4a462a6e5c539f76e023738d3bb841fc",
    "id": null,
    "metadata": {},
    "name": "EditTresholdMutation",
    "operationKind": "mutation",
    "text": "mutation EditTresholdMutation(\n  $input: EditTresholdInput!\n) {\n  editTreshold(input: $input) {\n    id\n    name\n    description\n    status\n    kpi {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '02ffcbd2fa07d8ac01c6b54db801963a';

module.exports = node;
