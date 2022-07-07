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
export type PlanningSubStatus = "ACTIVATED" | "DESACTIVATED" | "%future added value";
export type TypePlanningSubStatus = "DESIGNED" | "FEASIBILITY_CHECKED" | "ORDERED" | "PROPOSED" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
export type ResourceCardQueryVariables = {||};
export type ResourceCardQueryResponse = {|
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
  +resourceTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceSpecification: ?$ReadOnlyArray<?{|
          +id: string,
          +name: string,
          +vendor: ?{|
            +id: string,
            +name: string,
          |},
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
    locatedIn
    resourceSpecification
    isDeleted
    lifecycleStatus
    typePlanningSubStatus
    planningSubStatus
    usageSubStatus
    operationalSubStatus
  }
  resourceTypes {
    edges {
      node {
        id
        name
        resourceSpecification {
          id
          name
          vendor {
            id
            name
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
  (v0/*: any*/),
  (v1/*: any*/)
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
        "name": "locatedIn",
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
                    "concreteType": "Vendor",
                    "kind": "LinkedField",
                    "name": "vendor",
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
    "cacheID": "e1ed3587ba753e961019be748f02116f",
    "id": null,
    "metadata": {},
    "name": "ResourceCardQuery",
    "operationKind": "query",
    "text": "query ResourceCardQuery {\n  queryResource {\n    id\n    name\n    locatedIn\n    resourceSpecification\n    isDeleted\n    lifecycleStatus\n    typePlanningSubStatus\n    planningSubStatus\n    usageSubStatus\n    operationalSubStatus\n  }\n  resourceTypes {\n    edges {\n      node {\n        id\n        name\n        resourceSpecification {\n          id\n          name\n          vendor {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n  resourceSpecifications {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9f74b7cd4f3665f2792a7dadbcc5f180';

module.exports = node;
