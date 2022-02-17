/**
 * @generated SignedSource<<b614c421cd53d69907e38d44bbb90e1d>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
type EquipmentPropertiesCard_position$fragmentType = any;
export type RemoveEquipmentFromPositionMutation$variables = {|
  position_id: string,
  work_order_id?: ?string,
|};
export type RemoveEquipmentFromPositionMutationVariables = RemoveEquipmentFromPositionMutation$variables;
export type RemoveEquipmentFromPositionMutation$data = {|
  +removeEquipmentFromPosition: {|
    +$fragmentSpreads: EquipmentPropertiesCard_position$fragmentType,
  |},
|};
export type RemoveEquipmentFromPositionMutationResponse = RemoveEquipmentFromPositionMutation$data;
export type RemoveEquipmentFromPositionMutation = {|
  variables: RemoveEquipmentFromPositionMutationVariables,
  response: RemoveEquipmentFromPositionMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "position_id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "work_order_id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "positionId",
    "variableName": "position_id"
  },
  {
    "kind": "Variable",
    "name": "workOrderId",
    "variableName": "work_order_id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveEquipmentFromPositionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentPosition",
        "kind": "LinkedField",
        "name": "removeEquipmentFromPosition",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EquipmentPropertiesCard_position"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveEquipmentFromPositionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentPosition",
        "kind": "LinkedField",
        "name": "removeEquipmentFromPosition",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPositionDefinition",
            "kind": "LinkedField",
            "name": "definition",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "index",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "visibleLabel",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Equipment",
            "kind": "LinkedField",
            "name": "attachedEquipment",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "futureState",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkOrder",
                "kind": "LinkedField",
                "name": "workOrder",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
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
    ]
  },
  "params": {
    "cacheID": "381d939307cf8bd437332eaa104f83bf",
    "id": null,
    "metadata": {},
    "name": "RemoveEquipmentFromPositionMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveEquipmentFromPositionMutation(\n  $position_id: ID!\n  $work_order_id: ID\n) {\n  removeEquipmentFromPosition(positionId: $position_id, workOrderId: $work_order_id) {\n    ...EquipmentPropertiesCard_position\n    id\n  }\n}\n\nfragment EquipmentPropertiesCard_position on EquipmentPosition {\n  id\n  definition {\n    id\n    name\n    index\n    visibleLabel\n  }\n  attachedEquipment {\n    id\n    name\n    futureState\n    workOrder {\n      id\n      status\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "d186a2a7a210e4281b5091e52bc5138b";

module.exports = ((node/*: any*/)/*: Mutation<
  RemoveEquipmentFromPositionMutation$variables,
  RemoveEquipmentFromPositionMutation$data,
>*/);
