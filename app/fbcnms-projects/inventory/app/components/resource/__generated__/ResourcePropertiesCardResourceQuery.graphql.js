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
export type ResourcePropertiesCardResourceQueryVariables = {|
  getResourceId?: ?string
|};
export type ResourcePropertiesCardResourceQueryResponse = {|
  +getResource: ?{|
    +id: string,
    +name: string,
    +resourceSpecification: string,
    +locatedIn: ?string,
    +isDelete: boolean,
  |}
|};
export type ResourcePropertiesCardResourceQuery = {|
  variables: ResourcePropertiesCardResourceQueryVariables,
  response: ResourcePropertiesCardResourceQueryResponse,
|};
*/


/*
query ResourcePropertiesCardResourceQuery(
  $getResourceId: ID
) {
  getResource(id: $getResourceId) {
    id
    name
    resourceSpecification
    locatedIn
    isDelete
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "getResourceId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "getResourceId"
      }
    ],
    "concreteType": "Resource",
    "kind": "LinkedField",
    "name": "getResource",
    "plural": false,
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
        "name": "resourceSpecification",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "locatedIn",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isDelete",
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
    "name": "ResourcePropertiesCardResourceQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResourcePropertiesCardResourceQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ff67c7c26bc4bb73bad77f827c5820b1",
    "id": null,
    "metadata": {},
    "name": "ResourcePropertiesCardResourceQuery",
    "operationKind": "query",
    "text": "query ResourcePropertiesCardResourceQuery(\n  $getResourceId: ID\n) {\n  getResource(id: $getResourceId) {\n    id\n    name\n    resourceSpecification\n    locatedIn\n    isDelete\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0386852f0a3801301199ae0867bc8a2e';

module.exports = node;
