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
export type ConfigurationParameterTypeHasFilter = "booleanValue" | "category" | "externalId" | "floatValue" | "index" | "intValue" | "isDeleted" | "isEditable" | "isListable" | "isMandatory" | "isPrioritary" | "latitudeValue" | "longitudeValue" | "mappingIn" | "mappingOut" | "name" | "nodeType" | "parameters" | "rangeFromValue" | "rangeToValue" | "rawValue" | "resourceSpecification" | "stringValue" | "tags" | "type" | "%future added value";
export type ConfigurationParameterTypeFilter = {|
  and?: ?$ReadOnlyArray<?ConfigurationParameterTypeFilter>,
  has?: ?$ReadOnlyArray<?ConfigurationParameterTypeHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  not?: ?ConfigurationParameterTypeFilter,
  or?: ?$ReadOnlyArray<?ConfigurationParameterTypeFilter>,
  resourceSpecification?: ?StringHashFilter,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type RemoveConfigurationParameterTypeMutationVariables = {|
  filter: ConfigurationParameterTypeFilter
|};
export type RemoveConfigurationParameterTypeMutationResponse = {|
  +deleteConfigurationParameterType: ?{|
    +configurationParameterType: ?$ReadOnlyArray<?{|
      +id: string
    |}>
  |}
|};
export type RemoveConfigurationParameterTypeMutation = {|
  variables: RemoveConfigurationParameterTypeMutationVariables,
  response: RemoveConfigurationParameterTypeMutationResponse,
|};
*/


/*
mutation RemoveConfigurationParameterTypeMutation(
  $filter: ConfigurationParameterTypeFilter!
) {
  deleteConfigurationParameterType(filter: $filter) {
    configurationParameterType {
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
    "concreteType": "DeleteConfigurationParameterTypePayload",
    "kind": "LinkedField",
    "name": "deleteConfigurationParameterType",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ConfigurationParameterType",
        "kind": "LinkedField",
        "name": "configurationParameterType",
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
    "name": "RemoveConfigurationParameterTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveConfigurationParameterTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7a3c202279f1e3af25e45cf9fe90f844",
    "id": null,
    "metadata": {},
    "name": "RemoveConfigurationParameterTypeMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveConfigurationParameterTypeMutation(\n  $filter: ConfigurationParameterTypeFilter!\n) {\n  deleteConfigurationParameterType(filter: $filter) {\n    configurationParameterType {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '86474f61090155824552d809344d2a62';

module.exports = node;
