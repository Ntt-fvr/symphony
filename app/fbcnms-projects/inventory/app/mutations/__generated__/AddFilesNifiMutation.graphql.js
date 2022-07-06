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
export type AddFilesInput = {|
  annotation?: ?string,
  category?: ?string,
  contentType: string,
  documentCategoryId?: ?string,
  fileName: string,
  fileSize: number,
  imgKey: string,
  modified: any,
|};
export type AddFilesNifiMutationVariables = {|
  input: AddFilesInput
|};
export type AddFilesNifiMutationResponse = {|
  +addFiles: {|
    +id: string
  |}
|};
export type AddFilesNifiMutation = {|
  variables: AddFilesNifiMutationVariables,
  response: AddFilesNifiMutationResponse,
|};
*/


/*
mutation AddFilesNifiMutation(
  $input: AddFilesInput!
) {
  addFiles(input: $input) {
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
    "concreteType": "File",
    "kind": "LinkedField",
    "name": "addFiles",
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
    "name": "AddFilesNifiMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddFilesNifiMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2b1723aed238048b1ef68ca93e72d44b",
    "id": null,
    "metadata": {},
    "name": "AddFilesNifiMutation",
    "operationKind": "mutation",
    "text": "mutation AddFilesNifiMutation(\n  $input: AddFilesInput!\n) {\n  addFiles(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '97f4479dacffb1cc7dc45245438ec4b9';

module.exports = node;
