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
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
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
export type AddEditResourceInLocationQueryVariables = {|
  filter?: ?ConfigurationParameterTypeFilter
|};
export type AddEditResourceInLocationQueryResponse = {|
  +queryConfigurationParameterType: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +type: ParameterKind,
    +intValue: ?number,
    +floatValue: ?number,
    +stringValue: ?string,
    +booleanValue: ?boolean,
    +resourceSpecification: string,
  |}>
|};
export type AddEditResourceInLocationQuery = {|
  variables: AddEditResourceInLocationQueryVariables,
  response: AddEditResourceInLocationQueryResponse,
|};
*/


/*
query AddEditResourceInLocationQuery(
  $filter: ConfigurationParameterTypeFilter
) {
  queryConfigurationParameterType(filter: $filter) {
    id
    name
    type
    intValue
    floatValue
    stringValue
    booleanValue
    resourceSpecification
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "intValue",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "floatValue",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "stringValue",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "booleanValue",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "resourceSpecification",
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
    "name": "AddEditResourceInLocationQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddEditResourceInLocationQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6cedb02f69e90dd21fdf09f3759846d1",
    "id": null,
    "metadata": {},
    "name": "AddEditResourceInLocationQuery",
    "operationKind": "query",
    "text": "query AddEditResourceInLocationQuery(\n  $filter: ConfigurationParameterTypeFilter\n) {\n  queryConfigurationParameterType(filter: $filter) {\n    id\n    name\n    type\n    intValue\n    floatValue\n    stringValue\n    booleanValue\n    resourceSpecification\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8c39e20bff781c193b461e96c9217692';

module.exports = node;
