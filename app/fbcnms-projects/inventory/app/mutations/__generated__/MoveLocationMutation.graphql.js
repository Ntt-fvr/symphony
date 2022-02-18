/**
 * @generated SignedSource<<5f2ed84224d1ad20dc3b3547cf6f1c67>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type MoveLocationMutation$variables = {|
  locationID: string,
  parentLocationID?: ?string,
|};
export type MoveLocationMutationVariables = MoveLocationMutation$variables;
export type MoveLocationMutation$data = {|
  +moveLocation: {|
    +id: string,
    +externalId: ?string,
    +name: string,
    +locationType: {|
      +id: string,
      +name: string,
    |},
    +numChildren: number,
    +siteSurveyNeeded: boolean,
  |},
|};
export type MoveLocationMutationResponse = MoveLocationMutation$data;
export type MoveLocationMutation = {|
  variables: MoveLocationMutationVariables,
  response: MoveLocationMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "locationID"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "parentLocationID"
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
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "locationID",
        "variableName": "locationID"
      },
      {
        "kind": "Variable",
        "name": "parentLocationID",
        "variableName": "parentLocationID"
      }
    ],
    "concreteType": "Location",
    "kind": "LinkedField",
    "name": "moveLocation",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "externalId",
        "storageKey": null
      },
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationType",
        "kind": "LinkedField",
        "name": "locationType",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "numChildren",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "siteSurveyNeeded",
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
    "name": "MoveLocationMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MoveLocationMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "399e9c7b3bc5283bdc0d9e8b9e78b401",
    "id": null,
    "metadata": {},
    "name": "MoveLocationMutation",
    "operationKind": "mutation",
    "text": "mutation MoveLocationMutation(\n  $locationID: ID!\n  $parentLocationID: ID\n) {\n  moveLocation(locationID: $locationID, parentLocationID: $parentLocationID) {\n    id\n    externalId\n    name\n    locationType {\n      id\n      name\n    }\n    numChildren\n    siteSurveyNeeded\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "98502526513b758cda745d28f8b0f7ee";

module.exports = ((node/*: any*/)/*: Mutation<
  MoveLocationMutation$variables,
  MoveLocationMutation$data,
>*/);
