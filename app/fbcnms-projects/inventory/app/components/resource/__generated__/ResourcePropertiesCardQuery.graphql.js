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
export type ResourceHasFilter = "actionScheduler" | "available" | "belongsTo" | "changeItems" | "composedOf" | "createTime" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDeleted" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLinkInv" | "logicalLinks" | "name" | "numericPools" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "typePlanningSubStatus" | "updateTime" | "usageSubStatus" | "%future added value";
export type TypePlanningSubStatus = "DESIGNED" | "FEASIBILITY_CHECKED" | "ORDERED" | "PROPOSED" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
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
export type ResourcePropertiesCardQueryVariables = {|
  filterResource?: ?ResourceFilter
|};
export type ResourcePropertiesCardQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +locatedIn: ?string,
    +resourceSpecification: string,
    +isDeleted: boolean,
    +lifecycleStatus: ?LifecycleStatus,
    +typePlanningSubStatus: ?TypePlanningSubStatus,
    +planningSubStatus: ?PlanningSubStatus,
    +usageSubStatus: ?UsageSubStatus,
    +operationalSubStatus: ?OperationalSubStatus,
  |}>,
  +resourceSpecifications: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceType: ?{|
          +id: string,
          +name: string,
        |},
      |}
    |}>
  |},
  +queryCMVersion: ?$ReadOnlyArray<?{|
    +id: string,
    +parameters: $ReadOnlyArray<{|
      +id: string,
      +stringValue: ?string,
      +rangeToValue: ?number,
      +rangeFromValue: ?number,
      +floatValue: ?number,
      +intValue: ?number,
      +booleanValue: ?boolean,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +parameterType: {|
        +id: string,
        +name: string,
        +resourceSpecification: string,
        +stringValue: ?string,
        +floatValue: ?number,
        +intValue: ?number,
        +type: ParameterKind,
      |},
    |}>,
    +status: VersionStatus,
    +resource: {|
      +id: string,
      +name: string,
      +resourceProperties: ?$ReadOnlyArray<?{|
        +id: string,
        +resourcePropertyType: string,
      |}>,
      +locatedIn: ?string,
    |},
  |}>,
|};
export type ResourcePropertiesCardQuery = {|
  variables: ResourcePropertiesCardQueryVariables,
  response: ResourcePropertiesCardQueryResponse,
|};
*/


/*
query ResourcePropertiesCardQuery(
  $filterResource: ResourceFilter
) {
  queryResource(filter: $filterResource) {
    id
    name
    locatedIn
    resourceSpecification
    isDeleted
    lifecycleStatus
    typePlanningSubStatus
    planningSubStatus
    usageSubStatus
    operationalSubStatus
  }
  resourceSpecifications {
    edges {
      node {
        id
        name
        resourceType {
          id
          name
        }
      }
    }
  }
  queryCMVersion {
    id
    parameters {
      id
      stringValue
      rangeToValue
      rangeFromValue
      floatValue
      intValue
      booleanValue
      latitudeValue
      longitudeValue
      parameterType {
        id
        name
        resourceSpecification
        stringValue
        floatValue
        intValue
        type
      }
    }
    status
    resource {
      id
      name
      resourceProperties {
        id
        resourcePropertyType
      }
      locatedIn
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterResource"
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
  "name": "locatedIn",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecification",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filter",
        "variableName": "filterResource"
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
      (v4/*: any*/),
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
        "name": "lifecycleStatus",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "typePlanningSubStatus",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "planningSubStatus",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "usageSubStatus",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "operationalSubStatus",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceSpecificationConnection",
    "kind": "LinkedField",
    "name": "resourceSpecifications",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceSpecificationEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceSpecification",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceType",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "CMVersion",
    "kind": "LinkedField",
    "name": "queryCMVersion",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Parameter",
        "kind": "LinkedField",
        "name": "parameters",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v5/*: any*/),
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
            "name": "rangeFromValue",
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/),
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
            "concreteType": "ConfigurationParameterType",
            "kind": "LinkedField",
            "name": "parameterType",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
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
        "concreteType": "Resource",
        "kind": "LinkedField",
        "name": "resource",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceProperty",
            "kind": "LinkedField",
            "name": "resourceProperties",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "resourcePropertyType",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    "name": "ResourcePropertiesCardQuery",
    "selections": (v8/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResourcePropertiesCardQuery",
    "selections": (v8/*: any*/)
  },
  "params": {
    "cacheID": "28a68365ae5c8abfb24b5c01a81fe544",
    "id": null,
    "metadata": {},
    "name": "ResourcePropertiesCardQuery",
    "operationKind": "query",
    "text": "query ResourcePropertiesCardQuery(\n  $filterResource: ResourceFilter\n) {\n  queryResource(filter: $filterResource) {\n    id\n    name\n    locatedIn\n    resourceSpecification\n    isDeleted\n    lifecycleStatus\n    typePlanningSubStatus\n    planningSubStatus\n    usageSubStatus\n    operationalSubStatus\n  }\n  resourceSpecifications {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n        }\n      }\n    }\n  }\n  queryCMVersion {\n    id\n    parameters {\n      id\n      stringValue\n      rangeToValue\n      rangeFromValue\n      floatValue\n      intValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      parameterType {\n        id\n        name\n        resourceSpecification\n        stringValue\n        floatValue\n        intValue\n        type\n      }\n    }\n    status\n    resource {\n      id\n      name\n      resourceProperties {\n        id\n        resourcePropertyType\n      }\n      locatedIn\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c951d225514da003b657c396c90bb997';

module.exports = node;
