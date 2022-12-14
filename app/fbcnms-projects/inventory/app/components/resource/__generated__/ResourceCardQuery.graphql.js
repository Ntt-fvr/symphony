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
export type AdministrativeSubStatus = "ACTIVATED" | "DESACTIVATED" | "%future added value";
export type LifecycleStatus = "INSTALLING" | "OPERATING" | "PLANNING" | "RETIRING" | "%future added value";
export type OperationalSubStatus = "NOT_WORKING" | "WORKING" | "%future added value";
export type PlanningSubStatus = "DESIGNED" | "FEASIBILITY_CHECKED" | "ORDERED" | "PROPOSED" | "%future added value";
export type ResourcePropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
export type ResourceCardQueryVariables = {||};
export type ResourceCardQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +isDeleted: ?boolean,
    +resourceSpecification: string,
    +locatedIn: ?string,
    +lifecycleStatus: ?LifecycleStatus,
    +administrativeSubStatus: ?AdministrativeSubStatus,
    +planningSubStatus: ?PlanningSubStatus,
    +usageSubStatus: ?UsageSubStatus,
    +operationalSubStatus: ?OperationalSubStatus,
    +belongsTo: ?{|
      +id: string
    |},
  |}>,
  +resourceTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceSpecification: ?$ReadOnlyArray<?{|
          +id: string,
          +name: string,
          +resourcePropertyTypes: $ReadOnlyArray<?{|
            +id: string,
            +name: string,
            +type: ResourcePropertyKind,
            +stringValue: ?string,
            +intValue: ?number,
            +booleanValue: ?boolean,
            +floatValue: ?number,
            +latitudeValue: ?number,
            +longitudeValue: ?number,
            +rangeFromValue: ?number,
            +rangeToValue: ?number,
            +isMandatory: ?boolean,
            +isInstanceProperty: ?boolean,
          |}>,
          +resourceSpecificationRelationship: ?$ReadOnlyArray<?{|
            +id: string,
            +name: string,
            +resourceSpecification: {|
              +id: string
            |},
          |}>,
        |}>,
      |}
    |}>
  |},
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
|};
export type ResourceCardQuery = {|
  variables: ResourceCardQueryVariables,
  response: ResourceCardQueryResponse,
|};
*/


/*
query ResourceCardQuery {
  queryResource {
    id
    name
    isDeleted
    resourceSpecification
    locatedIn
    lifecycleStatus
    administrativeSubStatus
    planningSubStatus
    usageSubStatus
    operationalSubStatus
    belongsTo {
      id
    }
  }
  resourceTypes {
    edges {
      node {
        id
        name
        resourceSpecification {
          id
          name
          resourcePropertyTypes {
            id
            name
            type
            stringValue
            intValue
            booleanValue
            floatValue
            latitudeValue
            longitudeValue
            rangeFromValue
            rangeToValue
            isMandatory
            isInstanceProperty
          }
          resourceSpecificationRelationship {
            id
            name
            resourceSpecification {
              id
            }
          }
        }
      }
    }
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
v2 = [
  (v0/*: any*/)
],
v3 = [
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
        "name": "resourceSpecification",
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
        "name": "lifecycleStatus",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "administrativeSubStatus",
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
        "concreteType": "Resource",
        "kind": "LinkedField",
        "name": "belongsTo",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceTypeConnection",
    "kind": "LinkedField",
    "name": "resourceTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResourceType",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceSpecification",
                "kind": "LinkedField",
                "name": "resourceSpecification",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourcePropertyType",
                    "kind": "LinkedField",
                    "name": "resourcePropertyTypes",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
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
                        "name": "stringValue",
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
                        "name": "booleanValue",
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
                        "name": "isMandatory",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isInstanceProperty",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceSpecificationRelationship",
                    "kind": "LinkedField",
                    "name": "resourceSpecificationRelationship",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ResourceSpecification",
                        "kind": "LinkedField",
                        "name": "resourceSpecification",
                        "plural": false,
                        "selections": (v2/*: any*/),
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ResourceCardQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ResourceCardQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "1f6142effb51e2e3bb1b8058fc5beeab",
    "id": null,
    "metadata": {},
    "name": "ResourceCardQuery",
    "operationKind": "query",
    "text": "query ResourceCardQuery {\n  queryResource {\n    id\n    name\n    isDeleted\n    resourceSpecification\n    locatedIn\n    lifecycleStatus\n    administrativeSubStatus\n    planningSubStatus\n    usageSubStatus\n    operationalSubStatus\n    belongsTo {\n      id\n    }\n  }\n  resourceTypes {\n    edges {\n      node {\n        id\n        name\n        resourceSpecification {\n          id\n          name\n          resourcePropertyTypes {\n            id\n            name\n            type\n            stringValue\n            intValue\n            booleanValue\n            floatValue\n            latitudeValue\n            longitudeValue\n            rangeFromValue\n            rangeToValue\n            isMandatory\n            isInstanceProperty\n          }\n          resourceSpecificationRelationship {\n            id\n            name\n            resourceSpecification {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n  resourceSpecifications {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1d53fb001989176bac48f7a6351a0d4b';

module.exports = node;
