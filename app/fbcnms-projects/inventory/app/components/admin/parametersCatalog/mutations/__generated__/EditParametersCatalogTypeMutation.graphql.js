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
export type EditPropertyCategoryInput = {|
  id?: ?string,
  name: string,
  index: number,
  parameterCatalogId: string,
|};
export type EditParametersCatalogTypeMutationVariables = {|
  propertyCategories: $ReadOnlyArray<EditPropertyCategoryInput>
|};
export type EditParametersCatalogTypeMutationResponse = {|
  +editPropertyCategories: ?$ReadOnlyArray<{|
    +id: string,
    +name: ?string,
    +index: ?number,
  |}>
|};
export type EditParametersCatalogTypeMutation = {|
  variables: EditParametersCatalogTypeMutationVariables,
  response: EditParametersCatalogTypeMutationResponse,
|};
*/


/*
mutation EditParametersCatalogTypeMutation(
  $propertyCategories: [EditPropertyCategoryInput!]!
) {
  editPropertyCategories(propertyCategories: $propertyCategories) {
    id
    name
    index
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "propertyCategories"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "propertyCategories",
        "variableName": "propertyCategories"
      }
    ],
    "concreteType": "PropertyCategory",
    "kind": "LinkedField",
    "name": "editPropertyCategories",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "index",
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
    "name": "EditParametersCatalogTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditParametersCatalogTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "19313a658d8fc889b08b22c982101af8",
    "id": null,
    "metadata": {},
    "name": "EditParametersCatalogTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditParametersCatalogTypeMutation(\n  $propertyCategories: [EditPropertyCategoryInput!]!\n) {\n  editPropertyCategories(propertyCategories: $propertyCategories) {\n    id\n    name\n    index\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e23706e4472fb59e27e02d226891e280';

module.exports = node;
