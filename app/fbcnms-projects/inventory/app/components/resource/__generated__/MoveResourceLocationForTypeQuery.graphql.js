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
export type MoveResourceLocationForTypeQueryVariables = {|
  types?: ?$ReadOnlyArray<string>
|};
export type MoveResourceLocationForTypeQueryResponse = {|
  +locations: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |}
    |}>
  |}
|};
export type MoveResourceLocationForTypeQuery = {|
  variables: MoveResourceLocationForTypeQueryVariables,
  response: MoveResourceLocationForTypeQueryResponse,
|};
*/


/*
query MoveResourceLocationForTypeQuery(
  $types: [ID!]
) {
  locations(types: $types) {
    edges {
      node {
        id
        name
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "types"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "types",
        "variableName": "types"
      }
    ],
    "concreteType": "LocationConnection",
    "kind": "LinkedField",
    "name": "locations",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "node",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MoveResourceLocationForTypeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MoveResourceLocationForTypeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e17e06567a5a10a38ce5119ce6aa579c",
    "id": null,
    "metadata": {},
    "name": "MoveResourceLocationForTypeQuery",
    "operationKind": "query",
    "text": "query MoveResourceLocationForTypeQuery(\n  $types: [ID!]\n) {\n  locations(types: $types) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c28252f4e387e1213326ff7e48cd2ba0';

module.exports = node;
