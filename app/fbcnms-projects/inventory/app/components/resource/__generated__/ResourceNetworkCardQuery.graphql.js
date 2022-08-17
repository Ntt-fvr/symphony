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
export type ResourceNetworkCardQueryVariables = {|
  filter?: ?ResourceFilter
|};
export type ResourceNetworkCardQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +resourceSpecification: string,
    +logicalLinks: ?$ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +resourceSpecification: string,
    |}>,
  |}>
|};
export type ResourceNetworkCardQuery = {|
  variables: ResourceNetworkCardQueryVariables,
  response: ResourceNetworkCardQueryResponse,
|};
*/


/*
query ResourceNetworkCardQuery(
  $filter: ResourceFilter
) {
  queryResource(filter: $filter) {
    id
    name
    resourceSpecification
    logicalLinks {
      id
      name
      resourceSpecification
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecification",
  "storageKey": null
},
v4 = [
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Resource",
        "kind": "LinkedField",
        "name": "logicalLinks",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
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
    "name": "ResourceNetworkCardQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResourceNetworkCardQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "835e70ed1d1664d69bf0d75176be13e4",
    "id": null,
    "metadata": {},
    "name": "ResourceNetworkCardQuery",
    "operationKind": "query",
    "text": "query ResourceNetworkCardQuery(\n  $filter: ResourceFilter\n) {\n  queryResource(filter: $filter) {\n    id\n    name\n    resourceSpecification\n    logicalLinks {\n      id\n      name\n      resourceSpecification\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5c3eb68dfd53e7ee5df8931267e54148';

module.exports = node;
