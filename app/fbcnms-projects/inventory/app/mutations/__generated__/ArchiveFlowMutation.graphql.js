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
export type ArchiveFlowInput = {|
  flowID: string
|};
export type ArchiveFlowMutationVariables = {|
  input: ArchiveFlowInput
|};
export type ArchiveFlowMutationResponse = {|
  +archiveFlow: {|
    +id: string
  |}
|};
export type ArchiveFlowMutation = {|
  variables: ArchiveFlowMutationVariables,
  response: ArchiveFlowMutationResponse,
|};
*/


/*
mutation ArchiveFlowMutation(
  $input: ArchiveFlowInput!
) {
  archiveFlow(input: $input) {
    id
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
    "concreteType": "Flow",
    "kind": "LinkedField",
    "name": "archiveFlow",
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
    "name": "ArchiveFlowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArchiveFlowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "23bd75b7b9957d6af29275b442280722",
    "id": null,
    "metadata": {},
    "name": "ArchiveFlowMutation",
    "operationKind": "mutation",
    "text": "mutation ArchiveFlowMutation(\n  $input: ArchiveFlowInput!\n) {\n  archiveFlow(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e2360b517225a7a5583a20d24e2e0e16';

module.exports = node;
