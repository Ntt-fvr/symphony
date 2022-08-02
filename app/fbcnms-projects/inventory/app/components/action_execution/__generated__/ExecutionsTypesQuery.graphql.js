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
export type ExecutionsTypesQueryVariables = {||};
export type ExecutionsTypesQueryResponse = {|
  +queryActionExecution: ?$ReadOnlyArray<?{|
    +starTime: any,
    +id: string,
    +template: {|
      +id: string,
      +name: string,
      +resourceSpecifications: string,
    |},
  |}>
|};
export type ExecutionsTypesQuery = {|
  variables: ExecutionsTypesQueryVariables,
  response: ExecutionsTypesQueryResponse,
|};
*/


/*
query ExecutionsTypesQuery {
  queryActionExecution {
    starTime
    id
    template {
      id
      name
      resourceSpecifications
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ActionExecution",
    "kind": "LinkedField",
    "name": "queryActionExecution",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "starTime",
        "storageKey": null
      },
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionTemplate",
        "kind": "LinkedField",
        "name": "template",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
            "name": "resourceSpecifications",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExecutionsTypesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExecutionsTypesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5eb00d81f62d4e36784d144107b60d28",
    "id": null,
    "metadata": {},
    "name": "ExecutionsTypesQuery",
    "operationKind": "query",
    "text": "query ExecutionsTypesQuery {\n  queryActionExecution {\n    starTime\n    id\n    template {\n      id\n      name\n      resourceSpecifications\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '593f7d35cf017bc524226ea4da1efc08';

module.exports = node;
