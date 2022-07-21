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
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
export type ResourceHasFilter = "actionScheduler" | "available" | "belongsTo" | "changeItems" | "cmVersions" | "composedOf" | "createTime" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDeleted" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLinkInv" | "logicalLinks" | "name" | "numericPools" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "typePlanningSubStatus" | "updateTime" | "usageSubStatus" | "%future added value";
export type VersionStatus = "CURRENT" | "REPLACED" | "%future added value";
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
export type StepperTimeLineQueryVariables = {|
  filter?: ?ResourceFilter
|};
export type StepperTimeLineQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +cmVersions: ?$ReadOnlyArray<?{|
      +id: string,
      +status: VersionStatus,
      +validFrom: ?any,
      +validTo: ?any,
      +parameters: $ReadOnlyArray<{|
        +id: string,
        +stringValue: ?string,
        +floatValue: ?number,
        +intValue: ?number,
        +parameterType: {|
          +id: string,
          +name: string,
          +type: ParameterKind,
        |},
      |}>,
      +createTime: ?any,
      +previous: ?{|
        +id: string,
        +parameters: $ReadOnlyArray<{|
          +id: string,
          +stringValue: ?string,
          +floatValue: ?number,
          +intValue: ?number,
          +parameterType: {|
            +id: string,
            +name: string,
            +type: ParameterKind,
          |},
        |}>,
      |},
    |}>,
  |}>
|};
export type StepperTimeLineQuery = {|
  variables: StepperTimeLineQueryVariables,
  response: StepperTimeLineQueryResponse,
|};
*/


/*
query StepperTimeLineQuery(
  $filter: ResourceFilter
) {
  queryResource(filter: $filter) {
    id
    name
    cmVersions {
      id
      status
      validFrom
      validTo
      parameters {
        id
        stringValue
        floatValue
        intValue
        parameterType {
          id
          name
          type
        }
      }
      createTime
      previous {
        id
        parameters {
          id
          stringValue
          floatValue
          intValue
          parameterType {
            id
            name
            type
          }
        }
      }
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
  "concreteType": "Parameter",
  "kind": "LinkedField",
  "name": "parameters",
  "plural": true,
  "selections": [
    (v1/*: any*/),
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
      "name": "floatValue",
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
      "concreteType": "ConfigurationParameterType",
      "kind": "LinkedField",
      "name": "parameterType",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v2/*: any*/),
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
      {
        "alias": null,
        "args": null,
        "concreteType": "CMVersion",
        "kind": "LinkedField",
        "name": "cmVersions",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "validFrom",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "validTo",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CMVersion",
            "kind": "LinkedField",
            "name": "previous",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v3/*: any*/)
            ],
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
    "name": "StepperTimeLineQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StepperTimeLineQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "d4845b91211ae7199e5d8504e7520fe7",
    "id": null,
    "metadata": {},
    "name": "StepperTimeLineQuery",
    "operationKind": "query",
    "text": "query StepperTimeLineQuery(\n  $filter: ResourceFilter\n) {\n  queryResource(filter: $filter) {\n    id\n    name\n    cmVersions {\n      id\n      status\n      validFrom\n      validTo\n      parameters {\n        id\n        stringValue\n        floatValue\n        intValue\n        parameterType {\n          id\n          name\n          type\n        }\n      }\n      createTime\n      previous {\n        id\n        parameters {\n          id\n          stringValue\n          floatValue\n          intValue\n          parameterType {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '97533b5f3541d8351a1c4bfca2195fe5';

module.exports = node;
