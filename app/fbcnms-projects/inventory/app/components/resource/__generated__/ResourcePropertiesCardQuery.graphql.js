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
export type ResourceHasFilter = "available" | "belongsTo" | "composedOf" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDelete" | "lifecycleStatus" | "locatedIn" | "logicalLink" | "logicalLinkInv" | "name" | "numericPool" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourcePropertys" | "resourceSpecification" | "typePlanningSubStatus" | "usageSubStatus" | "%future added value";
export type ResourceFilter = {|
  and?: ?$ReadOnlyArray<?ResourceFilter>,
  has?: ?$ReadOnlyArray<?ResourceHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  name?: ?StringHashFilter,
  not?: ?ResourceFilter,
  or?: ?$ReadOnlyArray<?ResourceFilter>,
  resourceSpecification?: ?Int64Filter,
|};
export type StringHashFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
|};
export type Int64Filter = {|
  between?: ?Int64Range,
  eq?: ?any,
  ge?: ?any,
  gt?: ?any,
  in?: ?$ReadOnlyArray<?any>,
  le?: ?any,
  lt?: ?any,
|};
export type Int64Range = {|
  max: any,
  min: any,
|};
export type ResourcePropertiesCardQueryVariables = {|
  filterResource?: ?ResourceFilter
|};
export type ResourcePropertiesCardQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +isDelete: boolean,
    +resourceSpecification: any,
    +locatedIn: ?any,
  |}>,
  +resourceTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
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
    isDelete
    resourceSpecification
    locatedIn
  }
  resourceTypes {
    edges {
      node {
        id
        name
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
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isDelete",
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
            "selections": (v3/*: any*/),
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
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceType",
                "kind": "LinkedField",
                "name": "resourceType",
                "plural": false,
                "selections": (v3/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResourcePropertiesCardQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResourcePropertiesCardQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "45e5d2110a2c81d9d0014f5ead7674c2",
    "id": null,
    "metadata": {},
    "name": "ResourcePropertiesCardQuery",
    "operationKind": "query",
    "text": "query ResourcePropertiesCardQuery(\n  $filterResource: ResourceFilter\n) {\n  queryResource(filter: $filterResource) {\n    id\n    name\n    isDelete\n    resourceSpecification\n    locatedIn\n  }\n  resourceTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  resourceSpecifications {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b54a239478edc62df38cc566f0d947ac';

module.exports = node;
