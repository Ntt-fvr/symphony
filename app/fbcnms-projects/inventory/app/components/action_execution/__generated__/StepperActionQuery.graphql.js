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
export type ResourceHasFilter = "actionScheduler" | "available" | "belongsTo" | "composedOf" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDelete" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLink" | "logicalLinkInv" | "name" | "numericPool" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "typePlanningSubStatus" | "usageSubStatus" | "%future added value";
export type ResourceFilter = {|
  and?: ?$ReadOnlyArray<?ResourceFilter>,
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
export type StepperActionQueryVariables = {|
  filter?: ?ResourceFilter
|};
export type StepperActionQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +locatedIn: ?string,
    +resourceSpecification: string,
    +name: string,
  |}>
|};
export type StepperActionQuery = {|
  variables: StepperActionQueryVariables,
  response: StepperActionQueryResponse,
|};
*/


/*
query StepperActionQuery(
  $filter: ResourceFilter
) {
  queryResource(filter: $filter) {
    id
    locatedIn
    resourceSpecification
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
        "name": "locatedIn",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "resourceSpecification",
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
    "name": "StepperActionQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StepperActionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "dfcf3ef2b3a358ff56f16ae2a7d98284",
    "id": null,
    "metadata": {},
    "name": "StepperActionQuery",
    "operationKind": "query",
    "text": "query StepperActionQuery(\n  $filter: ResourceFilter\n) {\n  queryResource(filter: $filter) {\n    id\n    locatedIn\n    resourceSpecification\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e8387fb04fdb0c0609672bbe1036a636';

module.exports = node;
