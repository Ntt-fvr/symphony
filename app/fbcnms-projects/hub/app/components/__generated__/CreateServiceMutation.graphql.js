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
export type NetworkServiceInput = {|
  ExternalID?: ?number,
  Customer: string,
  Name: string,
  Model: NetworkServiceModelInput,
  DeviceSites: $ReadOnlyArray<SiteInput>,
  AdditionalParams?: ?any,
|};
export type NetworkServiceModelInput = {|
  Name: string
|};
export type SiteInput = {|
  siteNumber: number,
  siteModelName: string,
  deviceName: string,
  deviceId: number,
  parameters: any,
  userPort: UserPortInput,
  accessMethod: string,
|};
export type UserPortInput = {|
  id: number,
  name: string,
|};
export type CreateServiceMutationVariables = {|
  nsi: NetworkServiceInput
|};
export type CreateServiceMutationResponse = {|
  +createService: string
|};
export type CreateServiceMutation = {|
  variables: CreateServiceMutationVariables,
  response: CreateServiceMutationResponse,
|};
*/


/*
mutation CreateServiceMutation(
  $nsi: NetworkServiceInput!
) {
  createService(input: $nsi)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nsi"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "nsi"
      }
    ],
    "kind": "ScalarField",
    "name": "createService",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateServiceMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateServiceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ed11e68b1cbe41caeba422fe122f6692",
    "id": null,
    "metadata": {},
    "name": "CreateServiceMutation",
    "operationKind": "mutation",
    "text": "mutation CreateServiceMutation(\n  $nsi: NetworkServiceInput!\n) {\n  createService(input: $nsi)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e2ad8acf01814141fa4911f024690c1a';

module.exports = node;
