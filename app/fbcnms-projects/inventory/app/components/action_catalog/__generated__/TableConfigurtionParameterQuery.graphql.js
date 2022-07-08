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
export type ConfigurationParameterTypeHasFilter = "booleanValue" | "category" | "createTime" | "externalId" | "floatValue" | "index" | "intValue" | "isDeleted" | "isEditable" | "isListable" | "isMandatory" | "isPrioritary" | "latitudeValue" | "longitudeValue" | "mappingIn" | "mappingOut" | "name" | "nodeType" | "parameters" | "rangeFromValue" | "rangeToValue" | "rawValue" | "resourceSpecification" | "stringValue" | "tags" | "type" | "updateTime" | "%future added value";
export type ConfigurationParameterTypeFilter = {|
  and?: ?$ReadOnlyArray<?ConfigurationParameterTypeFilter>,
  has?: ?$ReadOnlyArray<?ConfigurationParameterTypeHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  name?: ?StringHashFilter,
  not?: ?ConfigurationParameterTypeFilter,
  or?: ?$ReadOnlyArray<?ConfigurationParameterTypeFilter>,
  resourceSpecification?: ?StringHashFilter,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type TableConfigurtionParameterQueryVariables = {|
  filter?: ?ConfigurationParameterTypeFilter
|};
export type TableConfigurtionParameterQueryResponse = {|
  +queryConfigurationParameterType: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type TableConfigurtionParameterQuery = {|
  variables: TableConfigurtionParameterQueryVariables,
  response: TableConfigurtionParameterQueryResponse,
|};
*/


/*
query TableConfigurtionParameterQuery(
  $filter: ConfigurationParameterTypeFilter
) {
  queryConfigurationParameterType(filter: $filter) {
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
    "concreteType": "ConfigurationParameterType",
    "kind": "LinkedField",
    "name": "queryConfigurationParameterType",
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
    "name": "TableConfigurtionParameterQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TableConfigurtionParameterQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f8e311727d5494ddc086d3716eca1cb5",
    "id": null,
    "metadata": {},
    "name": "TableConfigurtionParameterQuery",
    "operationKind": "query",
    "text": "query TableConfigurtionParameterQuery(\n  $filter: ConfigurationParameterTypeFilter\n) {\n  queryConfigurationParameterType(filter: $filter) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '05a3c1f8405d72feb3daafb82620d466';

module.exports = node;
