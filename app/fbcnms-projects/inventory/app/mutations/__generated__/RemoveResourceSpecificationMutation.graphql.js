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
export type RemoveResourceSpecificationMutationVariables = {|
  id: string
|};
export type RemoveResourceSpecificationMutationResponse = {|
  +removeResourceSpecification: string
|};
export type RemoveResourceSpecificationMutation = {|
  variables: RemoveResourceSpecificationMutationVariables,
  response: RemoveResourceSpecificationMutationResponse,
|};
*/


/*
mutation RemoveResourceSpecificationMutation(
  $id: ID!
) {
  removeResourceSpecification(id: $id)
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
    "name": "removeResourceSpecification",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveResourceSpecificationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveResourceSpecificationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "41d57874d9b720f237bf49ce451e7183",
    "id": null,
    "metadata": {},
    "name": "RemoveResourceSpecificationMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveResourceSpecificationMutation(\n  $id: ID!\n) {\n  removeResourceSpecification(id: $id)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b5155daed74280105e2722d6cfc0cf58';

module.exports = node;
