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
export type LifecycleStatus = "INSTALLING" | "OPERATING" | "PLANNING" | "RETIRING" | "%future added value";
export type OperationalSubStatus = "NOT_WORKING" | "WORKING" | "%future added value";
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
export type PlanningSubStatus = "ACTIVATED" | "DESACTIVATED" | "%future added value";
export type TypePlanningSubStatus = "DESIGNED" | "FEASIBILITY_CHECKED" | "ORDERED" | "PROPOSED" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
export type VersionStatus = "CURRENT" | "REPLACED" | "%future added value";
export type AddConfigurationParameterTypeInput = {|
  booleanValue?: ?boolean,
  category?: ?string,
  externalId?: ?string,
  floatValue?: ?number,
  index?: ?number,
  intValue?: ?number,
  isDeleted?: ?boolean,
  isEditable?: ?boolean,
  isListable?: ?boolean,
  isMandatory?: ?boolean,
  isPrioritary?: ?boolean,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  mappingIn?: ?string,
  mappingOut?: ?string,
  name: string,
  nodeType?: ?string,
  parameters?: ?$ReadOnlyArray<ParameterRef>,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  rawValue?: ?string,
  resourceSpecification: string,
  stringValue?: ?string,
  tags?: ?$ReadOnlyArray<ConfigParamTagRef>,
  type: ParameterKind,
|};
export type ParameterRef = {|
  booleanValue?: ?boolean,
  floatValue?: ?number,
  id?: ?string,
  intValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  parameterType?: ?ConfigurationParameterTypeRef,
  previous?: ?ParameterRef,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  stringValue?: ?string,
  versionCM?: ?$ReadOnlyArray<?CMVersionRef>,
|};
export type ConfigurationParameterTypeRef = {|
  booleanValue?: ?boolean,
  category?: ?string,
  externalId?: ?string,
  floatValue?: ?number,
  id?: ?string,
  index?: ?number,
  intValue?: ?number,
  isDeleted?: ?boolean,
  isEditable?: ?boolean,
  isListable?: ?boolean,
  isMandatory?: ?boolean,
  isPrioritary?: ?boolean,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  mappingIn?: ?string,
  mappingOut?: ?string,
  name?: ?string,
  nodeType?: ?string,
  parameters?: ?$ReadOnlyArray<ParameterRef>,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  rawValue?: ?string,
  resourceSpecification?: ?string,
  stringValue?: ?string,
  tags?: ?$ReadOnlyArray<ConfigParamTagRef>,
  type?: ?ParameterKind,
|};
export type ConfigParamTagRef = {|
  id?: ?string,
  name?: ?string,
  parameters?: ?$ReadOnlyArray<?ConfigurationParameterTypeRef>,
|};
export type CMVersionRef = {|
  id?: ?string,
  parameters?: ?$ReadOnlyArray<ParameterRef>,
  previous?: ?CMVersionRef,
  resource?: ?ResourceRef,
  status?: ?VersionStatus,
  validFrom?: ?any,
  validTo?: ?any,
|};
export type ResourceRef = {|
  available?: ?boolean,
  belongsTo?: ?ResourceRef,
  composedOf?: ?$ReadOnlyArray<?ResourceRef>,
  crossConnection?: ?ResourceRef,
  crossconnectionInv?: ?$ReadOnlyArray<?ResourceRef>,
  externalId?: ?string,
  id?: ?string,
  isDelete?: ?boolean,
  lifecycleStatus?: ?LifecycleStatus,
  locatedIn?: ?string,
  logicalLink?: ?ResourceRef,
  logicalLinkInv?: ?$ReadOnlyArray<?ResourceRef>,
  name?: ?string,
  numericPool?: ?$ReadOnlyArray<?NumericPoolRef>,
  operationalSubStatus?: ?OperationalSubStatus,
  physicalLink?: ?ResourceRef,
  physicalLinkInv?: ?$ReadOnlyArray<?ResourceRef>,
  planningSubStatus?: ?PlanningSubStatus,
  resourceProperties?: ?$ReadOnlyArray<?ResourcePropertyRef>,
  resourceSpecification?: ?string,
  typePlanningSubStatus?: ?TypePlanningSubStatus,
  usageSubStatus?: ?UsageSubStatus,
|};
export type NumericPoolRef = {|
  customLimit?: ?number,
  description?: ?string,
  id?: ?string,
  isDelete?: ?boolean,
  limit?: ?number,
  resource?: ?$ReadOnlyArray<ResourceRef>,
  statusNumericPools?: ?$ReadOnlyArray<?StatusNumericPoolRef>,
|};
export type StatusNumericPoolRef = {|
  id?: ?string,
  numericPool?: ?NumericPoolRef,
  status?: ?UsageSubStatus,
  value?: ?$ReadOnlyArray<?number>,
|};
export type ResourcePropertyRef = {|
  booleanValue?: ?boolean,
  floatValue?: ?number,
  id?: ?string,
  intValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  rawValue?: ?string,
  resource?: ?ResourceRef,
  resourcePropertyType?: ?string,
  stringValue?: ?string,
|};
export type AddConfigurationParameterTypeMutationVariables = {|
  input: $ReadOnlyArray<AddConfigurationParameterTypeInput>
|};
export type AddConfigurationParameterTypeMutationResponse = {|
  +addConfigurationParameterType: ?{|
    +configurationParameterType: ?$ReadOnlyArray<?{|
      +booleanValue: ?boolean,
      +category: ?string,
      +externalId: ?string,
      +floatValue: ?number,
      +id: string,
      +index: ?number,
      +intValue: ?number,
      +isDeleted: ?boolean,
      +isEditable: ?boolean,
      +isListable: ?boolean,
      +isMandatory: ?boolean,
      +isPrioritary: ?boolean,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +mappingIn: ?string,
      +mappingOut: ?string,
      +name: string,
      +nodeType: ?string,
      +rangeFromValue: ?number,
      +rangeToValue: ?number,
      +rawValue: ?string,
      +resourceSpecification: string,
      +stringValue: ?string,
      +type: ParameterKind,
    |}>
  |}
|};
export type AddConfigurationParameterTypeMutation = {|
  variables: AddConfigurationParameterTypeMutationVariables,
  response: AddConfigurationParameterTypeMutationResponse,
|};
*/


/*
mutation AddConfigurationParameterTypeMutation(
  $input: [AddConfigurationParameterTypeInput!]!
) {
  addConfigurationParameterType(input: $input) {
    configurationParameterType {
      booleanValue
      category
      externalId
      floatValue
      id
      index
      intValue
      isDeleted
      isEditable
      isListable
      isMandatory
      isPrioritary
      latitudeValue
      longitudeValue
      mappingIn
      mappingOut
      name
      nodeType
      rangeFromValue
      rangeToValue
      rawValue
      resourceSpecification
      stringValue
      type
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddConfigurationParameterTypePayload",
    "kind": "LinkedField",
    "name": "addConfigurationParameterType",
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
            "name": "booleanValue",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "externalId",
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "index",
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
            "name": "isDeleted",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEditable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isListable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isMandatory",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPrioritary",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "latitudeValue",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "longitudeValue",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mappingIn",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mappingOut",
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
            "name": "nodeType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "rangeFromValue",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "rangeToValue",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "rawValue",
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
            "name": "stringValue",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
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
    "name": "AddConfigurationParameterTypeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddConfigurationParameterTypeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b97bdafd3772ee901023c9cfa66db264",
    "id": null,
    "metadata": {},
    "name": "AddConfigurationParameterTypeMutation",
    "operationKind": "mutation",
    "text": "mutation AddConfigurationParameterTypeMutation(\n  $input: [AddConfigurationParameterTypeInput!]!\n) {\n  addConfigurationParameterType(input: $input) {\n    configurationParameterType {\n      booleanValue\n      category\n      externalId\n      floatValue\n      id\n      index\n      intValue\n      isDeleted\n      isEditable\n      isListable\n      isMandatory\n      isPrioritary\n      latitudeValue\n      longitudeValue\n      mappingIn\n      mappingOut\n      name\n      nodeType\n      rangeFromValue\n      rangeToValue\n      rawValue\n      resourceSpecification\n      stringValue\n      type\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '93151441d1c6d51be21e0a8219f6c1a2';

module.exports = node;
