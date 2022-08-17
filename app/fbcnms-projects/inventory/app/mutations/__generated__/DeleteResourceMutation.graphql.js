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
export type ResourceHasFilter = "actionScheduler" | "administrativeSubStatus" | "available" | "belongsTo" | "changeItems" | "cmVersions" | "composedOf" | "createTime" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDeleted" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLinkInv" | "logicalLinks" | "name" | "numericPools" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "updateTime" | "usageSubStatus" | "%future added value";
export type ResourceFilter = {|
  and?: ?$ReadOnlyArray<?ResourceFilter>,
  externalId?: ?StringHashFilter_StringRegExpFilter,
  has?: ?$ReadOnlyArray<?ResourceHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  locatedIn?: ?StringHashFilter,
  name?: ?StringHashFilter_StringRegExpFilter,
  not?: ?ResourceFilter,
  or?: ?$ReadOnlyArray<?ResourceFilter>,
  resourceSpecification?: ?StringHashFilter,
|};
export type StringHashFilter_StringRegExpFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
  regexp?: ?string,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type DeleteResourceMutationVariables = {|
  filter: ResourceFilter
|};
export type DeleteResourceMutationResponse = {|
  +deleteResource: ?{|
    +resource: ?$ReadOnlyArray<?{|
      +id: string
    |}>
  |}
|};
export type DeleteResourceMutation = {|
  variables: DeleteResourceMutationVariables,
  response: DeleteResourceMutationResponse,
|};
*/


/*
mutation DeleteResourceMutation(
  $filter: ResourceFilter!
) {
  deleteResource(filter: $filter) {
    resource {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filter"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filter"
      }
    ],
    "concreteType": "DeleteResourcePayload",
    "kind": "LinkedField",
    "name": "deleteResource",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Resource",
        "kind": "LinkedField",
        "name": "resource",
        "plural": true,
        "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteResourceMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteResourceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ebf8e397b05b9ddb85f233a3c4c7b5d0",
    "id": null,
    "metadata": {},
    "name": "DeleteResourceMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteResourceMutation(\n  $filter: ResourceFilter!\n) {\n  deleteResource(filter: $filter) {\n    resource {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b33da4389413586a6c134a660400d226';

module.exports = node;
