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
export type ConfigurationsViewQueryVariables = {||};
export type ConfigurationsViewQueryResponse = {|
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
    +createTime: ?any,
    +updateTime: ?any,
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
export type ConfigurationsViewQuery = {|
  variables: ConfigurationsViewQueryVariables,
  response: ConfigurationsViewQueryResponse,
|};
*/


/*
query ConfigurationsViewQuery {
  queryResource {
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
    createTime
    updateTime
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "locatedIn",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecification",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
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
  "name": "intValue",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Resource",
    "kind": "LinkedField",
    "name": "queryResource",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
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
      },
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
        "kind": "ScalarField",
        "name": "updateTime",
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
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceType",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
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
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Parameter",
        "kind": "LinkedField",
        "name": "parameters",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v4/*: any*/),
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
          (v5/*: any*/),
          (v6/*: any*/),
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
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
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceProperty",
            "kind": "LinkedField",
            "name": "resourceProperties",
            "plural": true,
            "selections": [
              (v0/*: any*/),
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConfigurationsViewQuery",
    "selections": (v7/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConfigurationsViewQuery",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "576195334f293eeaef010fe9681c9078",
    "id": null,
    "metadata": {},
    "name": "ConfigurationsViewQuery",
    "operationKind": "query",
    "text": "query ConfigurationsViewQuery {\n  queryResource {\n    id\n    name\n    locatedIn\n    resourceSpecification\n    isDeleted\n    lifecycleStatus\n    typePlanningSubStatus\n    planningSubStatus\n    usageSubStatus\n    operationalSubStatus\n    createTime\n    updateTime\n  }\n  resourceSpecifications {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n        }\n      }\n    }\n  }\n  queryCMVersion {\n    id\n    parameters {\n      id\n      stringValue\n      rangeToValue\n      rangeFromValue\n      floatValue\n      intValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      parameterType {\n        id\n        name\n        resourceSpecification\n        stringValue\n        floatValue\n        intValue\n        type\n      }\n    }\n    status\n    resource {\n      id\n      name\n      resourceProperties {\n        id\n        resourcePropertyType\n      }\n      locatedIn\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0f35e87e809635b054ec3c5a51be4fcb';

module.exports = node;
