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
export type ResourceHasFilter = "actionScheduler" | "administrativeSubStatus" | "available" | "belongsTo" | "changeItems" | "cmVersions" | "composedOf" | "createTime" | "crossConnection" | "crossconnectionInv" | "externalId" | "isDeleted" | "isEditable" | "lifecycleStatus" | "locatedIn" | "logicalLinkInv" | "logicalLinks" | "name" | "numericPools" | "operationalSubStatus" | "physicalLink" | "physicalLinkInv" | "planningSubStatus" | "resourceProperties" | "resourceSpecification" | "updateTime" | "usageSubStatus" | "%future added value";
export type ResourcePropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type ResourceTypeClassKind = "CARD" | "EQUIPMENT" | "NETWORK_FUNCTION" | "PORT" | "RACK" | "SLOT" | "VLAN" | "%future added value";
export type UsageSubStatus = "ASSIGNED" | "AVAILABLE" | "NO_AVAILABLE" | "RESERVED" | "TERMINATING" | "%future added value";
export type ResourceFilter = {|
  and?: ?$ReadOnlyArray<?ResourceFilter>,
  externalId?: ?StringHashFilter_StringRegExpFilter,
  has?: ?$ReadOnlyArray<?ResourceHasFilter>,
  id?: ?$ReadOnlyArray<string>,
  locatedIn?: ?StringHashFilter,
  name?: ?StringHashFilter_StringRegExpFilter,
  not?: ?ResourceFilter,
  or?: ?$ReadOnlyArray<?ResourceFilter>,
  resourceSpecification?: ?StringHashFilter,
|};
export type StringHashFilter_StringRegExpFilter = {|
  eq?: ?string,
  in?: ?$ReadOnlyArray<?string>,
  regexp?: ?string,
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
    +externalId: ?string,
    +resourceSpecification: string,
    +isDeleted: ?boolean,
    +lifecycleStatus: ?LifecycleStatus,
    +administrativeSubStatus: ?AdministrativeSubStatus,
    +planningSubStatus: ?PlanningSubStatus,
    +usageSubStatus: ?UsageSubStatus,
    +operationalSubStatus: ?OperationalSubStatus,
    +belongsTo: ?{|
      +id: string
    |},
    +resourceProperties: ?$ReadOnlyArray<?{|
      +booleanValue: ?boolean,
      +floatValue: ?number,
      +id: string,
      +intValue: ?number,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +rangeFromValue: ?number,
      +rangeToValue: ?number,
      +stringValue: ?string,
      +resourcePropertyType: string,
      +isMandatory: ?boolean,
      +isInstanceProperty: ?boolean,
    |}>,
  |}>,
  +resourceSpecifications: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
        +resourceType: ?{|
          +id: string,
          +name: string,
          +resourceTypeClass: ResourceTypeClassKind,
        |},
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
      |}
    |}>
  |},
  +locations: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
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
    locatedIn
    externalId
    resourceSpecification
    isDeleted
    lifecycleStatus
    administrativeSubStatus
    planningSubStatus
    usageSubStatus
    operationalSubStatus
    belongsTo {
      id
    }
    resourceProperties {
      booleanValue
      floatValue
      id
      intValue
      latitudeValue
      longitudeValue
      rangeFromValue
      rangeToValue
      stringValue
      resourcePropertyType
      isMandatory
      isInstanceProperty
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
          resourceTypeClass
        }
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
      }
    }
  }
  locations {
    edges {
      node {
        id
        name
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
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
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMandatory",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInstanceProperty",
  "storageKey": null
},
v13 = [
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
        "name": "locatedIn",
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
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ResourceProperty",
        "kind": "LinkedField",
        "name": "resourceProperties",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v1/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "resourcePropertyType",
            "storageKey": null
          },
          (v11/*: any*/),
          (v12/*: any*/)
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
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "resourceTypeClass",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourcePropertyType",
                "kind": "LinkedField",
                "name": "resourcePropertyTypes",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  (v10/*: any*/),
                  (v5/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/)
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
    "concreteType": "LocationConnection",
    "kind": "LinkedField",
    "name": "locations",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "node",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResourcePropertiesCardQuery",
    "selections": (v13/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResourcePropertiesCardQuery",
    "selections": (v13/*: any*/)
  },
  "params": {
    "cacheID": "5a29ce72402ddb5cb6c91cbf708905c6",
    "id": null,
    "metadata": {},
    "name": "ResourcePropertiesCardQuery",
    "operationKind": "query",
    "text": "query ResourcePropertiesCardQuery(\n  $filterResource: ResourceFilter\n) {\n  queryResource(filter: $filterResource) {\n    id\n    name\n    locatedIn\n    externalId\n    resourceSpecification\n    isDeleted\n    lifecycleStatus\n    administrativeSubStatus\n    planningSubStatus\n    usageSubStatus\n    operationalSubStatus\n    belongsTo {\n      id\n    }\n    resourceProperties {\n      booleanValue\n      floatValue\n      id\n      intValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      stringValue\n      resourcePropertyType\n      isMandatory\n      isInstanceProperty\n    }\n  }\n  resourceSpecifications {\n    edges {\n      node {\n        id\n        name\n        resourceType {\n          id\n          name\n          resourceTypeClass\n        }\n        resourcePropertyTypes {\n          id\n          name\n          type\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isMandatory\n          isInstanceProperty\n        }\n      }\n    }\n  }\n  locations {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9afaf823fa332f6e87aadc634d83af34';

module.exports = node;
