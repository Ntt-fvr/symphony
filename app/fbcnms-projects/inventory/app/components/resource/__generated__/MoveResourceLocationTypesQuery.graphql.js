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
export type MoveResourceLocationTypesQueryVariables = {||};
export type MoveResourceLocationTypesQueryResponse = {|
  +locationTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +name: string,
        +id: string,
      |}
    |}>
  |}
|};
export type MoveResourceLocationTypesQuery = {|
  variables: MoveResourceLocationTypesQueryVariables,
  response: MoveResourceLocationTypesQueryResponse,
|};
*/


/*
query MoveResourceLocationTypesQuery {
  locationTypes {
    edges {
      node {
        name
        id
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "LocationTypeConnection",
    "kind": "LinkedField",
    "name": "locationTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LocationType",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
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
                "name": "id",
                "storageKey": null
              }
            ],
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
    "name": "MoveResourceLocationTypesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MoveResourceLocationTypesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2a06f67876cbcdccf7ab9513c53ac7fc",
    "id": null,
    "metadata": {},
    "name": "MoveResourceLocationTypesQuery",
    "operationKind": "query",
    "text": "query MoveResourceLocationTypesQuery {\n  locationTypes {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a6f06d004a42a665b20f5c6a476e5630';

module.exports = node;
