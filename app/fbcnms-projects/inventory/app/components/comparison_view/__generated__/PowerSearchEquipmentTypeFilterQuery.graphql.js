/**
 * @generated SignedSource<<93fff9631dbe983d162944789ed79b53>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type PowerSearchEquipmentTypeFilterQuery$variables = {||};
export type PowerSearchEquipmentTypeFilterQueryVariables = PowerSearchEquipmentTypeFilterQuery$variables;
export type PowerSearchEquipmentTypeFilterQuery$data = {|
  +equipmentTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type PowerSearchEquipmentTypeFilterQueryResponse = PowerSearchEquipmentTypeFilterQuery$data;
export type PowerSearchEquipmentTypeFilterQuery = {|
  variables: PowerSearchEquipmentTypeFilterQueryVariables,
  response: PowerSearchEquipmentTypeFilterQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "EquipmentTypeConnection",
    "kind": "LinkedField",
    "name": "equipmentTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "EquipmentTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentType",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PowerSearchEquipmentTypeFilterQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PowerSearchEquipmentTypeFilterQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "af69207752c9a1803822c6ec10f2966f",
    "id": null,
    "metadata": {},
    "name": "PowerSearchEquipmentTypeFilterQuery",
    "operationKind": "query",
    "text": "query PowerSearchEquipmentTypeFilterQuery {\n  equipmentTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "2123f0ba223961bafad83607daf49a3e";

module.exports = ((node/*: any*/)/*: Query<
  PowerSearchEquipmentTypeFilterQuery$variables,
  PowerSearchEquipmentTypeFilterQuery$data,
>*/);
