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
export type RemoveResourceTypeMutationVariables = {|
  id: string
|};
export type RemoveResourceTypeMutationResponse = {|
  +removeResourceType: string
|};
export type RemoveResourceTypeMutation = {|
  variables: RemoveResourceTypeMutationVariables,
  response: RemoveResourceTypeMutationResponse,
|};
*/


/*
mutation RemoveResourceTypeMutation(
  $id: ID!
) {
  removeResourceType(id: $id)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "removeResourceType",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveResourceTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveResourceTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7f8b45b76c69c1de92db27e954bd8942",
    "id": null,
    "metadata": {},
    "name": "RemoveResourceTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveResourceTypeMutation(\n  $id: ID!\n) {\n  removeResourceType(id: $id)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ea6ccad7ab178862c432e49090b5f9ea';

module.exports = node;
