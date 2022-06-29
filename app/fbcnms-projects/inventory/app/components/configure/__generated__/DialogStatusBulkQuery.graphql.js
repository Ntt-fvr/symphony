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
export type ResourceHasFilter = "actionScheduler" | "available" | "belongsTo" | "changeItems" | "composedOf" | "createTime" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDeleted" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLinkInv" | "logicalLinks" | "name" | "numericPools" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "typePlanningSubStatus" | "updateTime" | "usageSubStatus" | "%future added value";
export type ResourceFilter = {|
  and?: ?$ReadOnlyArray<?ResourceFilter>,
  externalId?: ?StringHashFilter,
  has?: ?$ReadOnlyArray<?ResourceHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  locatedIn?: ?StringHashFilter,
  name?: ?StringHashFilter,
  not?: ?ResourceFilter,
  or?: ?$ReadOnlyArray<?ResourceFilter>,
  resourceSpecification?: ?StringHashFilter,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type DialogStatusBulkQueryVariables = {|
  filter?: ?ResourceFilter
|};
export type DialogStatusBulkQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type DialogStatusBulkQuery = {|
  variables: DialogStatusBulkQueryVariables,
  response: DialogStatusBulkQueryResponse,
|};
*/


/*
query DialogStatusBulkQuery(
  $filter: ResourceFilter
) {
  queryResource(filter: $filter) {
    id
    name
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
    "concreteType": "Resource",
    "kind": "LinkedField",
    "name": "queryResource",
    "plural": true,
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DialogStatusBulkQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DialogStatusBulkQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d4cdfc2e5cf7a40304536f5aedde6674",
    "id": null,
    "metadata": {},
    "name": "DialogStatusBulkQuery",
    "operationKind": "query",
    "text": "query DialogStatusBulkQuery(\n  $filter: ResourceFilter\n) {\n  queryResource(filter: $filter) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'dbb7711db27be40eb16d565d62f6f226';

module.exports = node;
