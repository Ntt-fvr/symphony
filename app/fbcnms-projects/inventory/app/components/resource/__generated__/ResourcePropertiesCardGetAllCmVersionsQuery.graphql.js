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
export type VersionStatus = "CURRENT" | "REPLACED" | "%future added value";
export type ResourcePropertiesCardGetAllCmVersionsQueryVariables = {||};
export type ResourcePropertiesCardGetAllCmVersionsQueryResponse = {|
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
      +versionCM: $ReadOnlyArray<?{|
        +id: string
      |}>,
      +parameterType: {|
        +id: string,
        +name: string,
        +resourceSpecification: string,
        +stringValue: ?string,
        +floatValue: ?number,
        +intValue: ?number,
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
  |}>
|};
export type ResourcePropertiesCardGetAllCmVersionsQuery = {|
  variables: ResourcePropertiesCardGetAllCmVersionsQueryVariables,
  response: ResourcePropertiesCardGetAllCmVersionsQueryResponse,
|};
*/


/*
query ResourcePropertiesCardGetAllCmVersionsQuery {
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
      versionCM {
        id
      }
      parameterType {
        id
        name
        resourceSpecification
        stringValue
        floatValue
        intValue
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
  "name": "stringValue",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
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
  "name": "name",
  "storageKey": null
},
v5 = [
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
          (v1/*: any*/),
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
          (v2/*: any*/),
          (v3/*: any*/),
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
            "concreteType": "CMVersion",
            "kind": "LinkedField",
            "name": "versionCM",
            "plural": true,
            "selections": [
              (v0/*: any*/)
            ],
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "resourceSpecification",
                "storageKey": null
              },
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
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
          (v4/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locatedIn",
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
    "name": "ResourcePropertiesCardGetAllCmVersionsQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ResourcePropertiesCardGetAllCmVersionsQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "5279e095c83a77a076197755ed820fab",
    "id": null,
    "metadata": {},
    "name": "ResourcePropertiesCardGetAllCmVersionsQuery",
    "operationKind": "query",
    "text": "query ResourcePropertiesCardGetAllCmVersionsQuery {\n  queryCMVersion {\n    id\n    parameters {\n      id\n      stringValue\n      rangeToValue\n      rangeFromValue\n      floatValue\n      intValue\n      booleanValue\n      latitudeValue\n      longitudeValue\n      versionCM {\n        id\n      }\n      parameterType {\n        id\n        name\n        resourceSpecification\n        stringValue\n        floatValue\n        intValue\n      }\n    }\n    status\n    resource {\n      id\n      name\n      resourceProperties {\n        id\n        resourcePropertyType\n      }\n      locatedIn\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b57d44566056aca1a93dd746792c8fdb';

module.exports = node;
