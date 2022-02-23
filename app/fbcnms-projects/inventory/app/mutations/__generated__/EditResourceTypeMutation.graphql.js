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
export type EditResourceTypeInput = {|
  id: string,
  name: string,
  resourceTypeBaseType?: ?string,
  resourceTypeClass?: ?string,
|};
export type EditResourceTypeMutationVariables = {|
  input: EditResourceTypeInput
|};
export type EditResourceTypeMutationResponse = {|
  +editResourceType: {|
    +id: string,
    +name: string,
    +resourceTypeBaseType: ?{|
      +id: string,
      +name: string,
    |},
    +resourceTypeClass: ?{|
      +id: string,
      +name: string,
    |},
  |}
|};
export type EditResourceTypeMutation = {|
  variables: EditResourceTypeMutationVariables,
  response: EditResourceTypeMutationResponse,
|};
*/


/*
mutation EditResourceTypeMutation(
  $input: EditResourceTypeInput!
) {
  editResourceType(input: $input) {
    id
    name
    resourceTypeBaseType {
      id
      name
    }
    resourceTypeClass {
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
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ResourceType",
    "kind": "LinkedField",
    "name": "editResourceType",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeBaseType",
        "kind": "LinkedField",
        "name": "resourceTypeBaseType",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeClass",
        "kind": "LinkedField",
        "name": "resourceTypeClass",
        "plural": false,
        "selections": (v3/*: any*/),
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
    "name": "EditResourceTypeMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditResourceTypeMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "5a5e72358df4b690331b5290af184ecd",
    "id": null,
    "metadata": {},
    "name": "EditResourceTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditResourceTypeMutation(\n  $input: EditResourceTypeInput!\n) {\n  editResourceType(input: $input) {\n    id\n    name\n    resourceTypeBaseType {\n      id\n      name\n    }\n    resourceTypeClass {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '67a7cd7cfa081d6d3216c660de66a073';

module.exports = node;
