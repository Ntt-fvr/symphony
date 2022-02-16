/**
 * @generated SignedSource<<b681fc4da8a21a2d5f9bc7351b2c2fec>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type PortDefinitionsAddEditTable__equipmentPortTypesQuery$variables = {||};
export type PortDefinitionsAddEditTable__equipmentPortTypesQueryVariables = PortDefinitionsAddEditTable__equipmentPortTypesQuery$variables;
export type PortDefinitionsAddEditTable__equipmentPortTypesQuery$data = {|
  +equipmentPortTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type PortDefinitionsAddEditTable__equipmentPortTypesQueryResponse = PortDefinitionsAddEditTable__equipmentPortTypesQuery$data;
export type PortDefinitionsAddEditTable__equipmentPortTypesQuery = {|
  variables: PortDefinitionsAddEditTable__equipmentPortTypesQueryVariables,
  response: PortDefinitionsAddEditTable__equipmentPortTypesQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "EquipmentPortTypeEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "EquipmentPortType",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PageInfo",
    "kind": "LinkedField",
    "name": "pageInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PortDefinitionsAddEditTable__equipmentPortTypesQuery",
    "selections": [
      {
        "alias": "equipmentPortTypes",
        "args": null,
        "concreteType": "EquipmentPortTypeConnection",
        "kind": "LinkedField",
        "name": "__PortDefinitionsTable_equipmentPortTypes_connection",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PortDefinitionsAddEditTable__equipmentPortTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentPortTypeConnection",
        "kind": "LinkedField",
        "name": "equipmentPortTypes",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": "equipmentPortTypes(first:500)"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "PortDefinitionsTable_equipmentPortTypes",
        "kind": "LinkedHandle",
        "name": "equipmentPortTypes"
      }
    ]
  },
  "params": {
    "cacheID": "a6272d753d391aead57db567c90a5e5a",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "equipmentPortTypes"
          ]
        }
      ]
    },
    "name": "PortDefinitionsAddEditTable__equipmentPortTypesQuery",
    "operationKind": "query",
    "text": "query PortDefinitionsAddEditTable__equipmentPortTypesQuery {\n  equipmentPortTypes(first: 500) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "8387908919eda242a725beb795eb547a";

module.exports = ((node/*: any*/)/*: Query<
  PortDefinitionsAddEditTable__equipmentPortTypesQuery$variables,
  PortDefinitionsAddEditTable__equipmentPortTypesQuery$data,
>*/);
