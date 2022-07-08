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
export type ResourceHasFilter = "actionScheduler" | "available" | "belongsTo" | "changeItems" | "cmVersions" | "composedOf" | "createTime" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDeleted" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLinkInv" | "logicalLinks" | "name" | "numericPools" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "typePlanningSubStatus" | "updateTime" | "usageSubStatus" | "%future added value";
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
export type ResourcePowerSearchFilterQueryVariables = {|
  filter?: ?ResourceFilter
|};
export type ResourcePowerSearchFilterQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +locatedIn: ?string,
  |}>
|};
export type ResourcePowerSearchFilterQuery = {|
  variables: ResourcePowerSearchFilterQueryVariables,
  response: ResourcePowerSearchFilterQueryResponse,
|};
*/


/*
query ResourcePowerSearchFilterQuery(
  $filter: ResourceFilter
) {
  queryResource(filter: $filter) {
    id
    name
    locatedIn
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "locatedIn",
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
    "name": "ResourcePowerSearchFilterQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResourcePowerSearchFilterQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "464b4f0b3241e1ada13a4fb7e94fb754",
    "id": null,
    "metadata": {},
    "name": "ResourcePowerSearchFilterQuery",
    "operationKind": "query",
    "text": "query ResourcePowerSearchFilterQuery(\n  $filter: ResourceFilter\n) {\n  queryResource(filter: $filter) {\n    id\n    name\n    locatedIn\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4503afc0f9200883bbe1e4a07a104c0f';

module.exports = node;
