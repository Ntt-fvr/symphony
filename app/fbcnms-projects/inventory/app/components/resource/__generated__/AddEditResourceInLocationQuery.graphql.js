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
export type AddEditResourceInLocationQueryVariables = {|
  filter?: ?ConfigurationParameterTypeFilter
|};
export type AddEditResourceInLocationQueryResponse = {|
  +queryConfigurationParameterType: ?$ReadOnlyArray<?{|
    +stringValue: ?string,
    +intValue: ?number,
    +booleanValue: ?boolean,
    +floatValue: ?number,
    +latitudeValue: ?number,
    +longitudeValue: ?number,
    +rangeFromValue: ?number,
    +rangeToValue: ?number,
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
    stringValue
    intValue
    booleanValue
    floatValue
    latitudeValue
    longitudeValue
    rangeFromValue
    rangeToValue
    id
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
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddEditResourceInLocationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConfigurationParameterType",
        "kind": "LinkedField",
        "name": "queryConfigurationParameterType",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddEditResourceInLocationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConfigurationParameterType",
        "kind": "LinkedField",
        "name": "queryConfigurationParameterType",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "e70f6c547b04f5d3347e69192bcb78fd",
    "id": null,
    "metadata": {},
    "name": "AddEditResourceInLocationQuery",
    "operationKind": "query",
    "text": "query AddEditResourceInLocationQuery(\n  $filter: ConfigurationParameterTypeFilter\n) {\n  queryConfigurationParameterType(filter: $filter) {\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'eb9166f2e7d5cb040b685a239cbcba4f';

module.exports = node;
