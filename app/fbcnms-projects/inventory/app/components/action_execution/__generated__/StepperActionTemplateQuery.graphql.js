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
export type ActionTemplateHasFilter = "actionExecutions" | "actionTemplateItems" | "createTime" | "isDeleted" | "name" | "resourceSpecifications" | "type" | "updateTime" | "%future added value";
export type ActionTemplateFilter = {|
  and?: ?$ReadOnlyArray<?ActionTemplateFilter>,
  has?: ?$ReadOnlyArray<?ActionTemplateHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  not?: ?ActionTemplateFilter,
  or?: ?$ReadOnlyArray<?ActionTemplateFilter>,
  resourceSpecifications?: ?StringHashFilter,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type StepperActionTemplateQueryVariables = {|
  filter?: ?ActionTemplateFilter
|};
export type StepperActionTemplateQueryResponse = {|
  +queryActionTemplate: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type StepperActionTemplateQuery = {|
  variables: StepperActionTemplateQueryVariables,
  response: StepperActionTemplateQueryResponse,
|};
*/


/*
query StepperActionTemplateQuery(
  $filter: ActionTemplateFilter
) {
  queryActionTemplate(filter: $filter) {
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
    "concreteType": "ActionTemplate",
    "kind": "LinkedField",
    "name": "queryActionTemplate",
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
    "name": "StepperActionTemplateQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StepperActionTemplateQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cff6061a2d577b784633248f4fb4ce38",
    "id": null,
    "metadata": {},
    "name": "StepperActionTemplateQuery",
    "operationKind": "query",
    "text": "query StepperActionTemplateQuery(\n  $filter: ActionTemplateFilter\n) {\n  queryActionTemplate(filter: $filter) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3f02b1e125ca3e097d68ddd0599b4536';

module.exports = node;
