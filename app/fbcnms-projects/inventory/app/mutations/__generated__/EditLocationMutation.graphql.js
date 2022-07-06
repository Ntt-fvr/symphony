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
export type EditLocationInput = {|
  externalID?: ?string,
  id: string,
  latitude: number,
  longitude: number,
  name: string,
  properties?: ?$ReadOnlyArray<PropertyInput>,
|};
export type PropertyInput = {|
  booleanValue?: ?boolean,
  dependenceProperties?: ?$ReadOnlyArray<PropertyInput>,
  floatValue?: ?number,
  id?: ?string,
  intValue?: ?number,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  nodeIDValue?: ?string,
  propertyTypeID: string,
  propertyTypeValueID?: ?string,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  stringValue?: ?string,
|};
export type EditLocationMutationVariables = {|
  input: EditLocationInput
|};
export type EditLocationMutationResponse = {|
  +editLocation: {|
    +id: string,
    +externalId: ?string,
    +name: string,
    +locationType: {|
      +id: string,
      +name: string,
    |},
    +numChildren: number,
    +siteSurveyNeeded: boolean,
  |}
|};
export type EditLocationMutation = {|
  variables: EditLocationMutationVariables,
  response: EditLocationMutationResponse,
|};
*/


/*
mutation EditLocationMutation(
  $input: EditLocationInput!
) {
  editLocation(input: $input) {
    id
    externalId
    name
    locationType {
      id
      name
    }
    numChildren
    siteSurveyNeeded
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
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Location",
    "kind": "LinkedField",
    "name": "editLocation",
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
    "name": "EditLocationMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditLocationMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "01a0edaaa07f73bb81f41dd06f83bdd2",
    "id": null,
    "metadata": {},
    "name": "EditLocationMutation",
    "operationKind": "mutation",
    "text": "mutation EditLocationMutation(\n  $input: EditLocationInput!\n) {\n  editLocation(input: $input) {\n    id\n    externalId\n    name\n    locationType {\n      id\n      name\n    }\n    numChildren\n    siteSurveyNeeded\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '85cc5be722818bbc1fbdbafbaa30f9ca';

module.exports = node;
