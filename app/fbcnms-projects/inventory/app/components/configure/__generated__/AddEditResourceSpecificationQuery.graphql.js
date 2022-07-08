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
export type ActionTemplateType = "AUTOMATION_FLOW" | "CONFIGURATION_PARAMETER" | "%future added value";
export type ParameterKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "range" | "string" | "%future added value";
export type AddEditResourceSpecificationQueryVariables = {||};
export type AddEditResourceSpecificationQueryResponse = {|
  +queryConfigurationParameterType: ?$ReadOnlyArray<?{|
    +resourceSpecification: string,
    +name: string,
    +id: string,
    +booleanValue: ?boolean,
    +category: ?string,
    +externalId: ?string,
    +floatValue: ?number,
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
    +nodeType: ?string,
    +rangeFromValue: ?number,
    +rangeToValue: ?number,
    +rawValue: ?string,
    +stringValue: ?string,
    +type: ParameterKind,
    +__typename: string,
  |}>,
  +queryActionTemplate: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +type: ActionTemplateType,
    +actionTemplateItems: $ReadOnlyArray<{|
      +id: string,
      +parameters: {|
        +id: string,
        +name: string,
      |},
      +value: {|
        +stringValue: ?string
      |},
      +isDeleted: ?boolean,
    |}>,
    +resourceSpecifications: string,
    +isDeleted: ?boolean,
  |}>,
|};
export type AddEditResourceSpecificationQuery = {|
  variables: AddEditResourceSpecificationQueryVariables,
  response: AddEditResourceSpecificationQueryResponse,
|};
*/


/*
query AddEditResourceSpecificationQuery {
  queryConfigurationParameterType {
    resourceSpecification
    name
    id
    booleanValue
    category
    externalId
    floatValue
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
    nodeType
    rangeFromValue
    rangeToValue
    rawValue
    stringValue
    type
    __typename
  }
  queryActionTemplate {
    id
    name
    type
    actionTemplateItems {
      id
      parameters {
        id
        name
      }
      value {
        stringValue
        id
      }
      isDeleted
    }
    resourceSpecifications
    isDeleted
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
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
  "name": "isDeleted",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "ConfigurationParameterType",
  "kind": "LinkedField",
  "name": "queryConfigurationParameterType",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "resourceSpecification",
      "storageKey": null
    },
    (v0/*: any*/),
    (v1/*: any*/),
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
    (v2/*: any*/),
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
    (v3/*: any*/),
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "ConfigurationParameterType",
  "kind": "LinkedField",
  "name": "parameters",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v0/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "resourceSpecifications",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddEditResourceSpecificationQuery",
    "selections": [
      (v5/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionTemplate",
        "kind": "LinkedField",
        "name": "queryActionTemplate",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionTemplateItem",
            "kind": "LinkedField",
            "name": "actionTemplateItems",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Parameter",
                "kind": "LinkedField",
                "name": "value",
                "plural": false,
                "selections": [
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddEditResourceSpecificationQuery",
    "selections": [
      (v5/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionTemplate",
        "kind": "LinkedField",
        "name": "queryActionTemplate",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionTemplateItem",
            "kind": "LinkedField",
            "name": "actionTemplateItems",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Parameter",
                "kind": "LinkedField",
                "name": "value",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6b4f4d674229df9ff5a0934dea69a8ff",
    "id": null,
    "metadata": {},
    "name": "AddEditResourceSpecificationQuery",
    "operationKind": "query",
    "text": "query AddEditResourceSpecificationQuery {\n  queryConfigurationParameterType {\n    resourceSpecification\n    name\n    id\n    booleanValue\n    category\n    externalId\n    floatValue\n    index\n    intValue\n    isDeleted\n    isEditable\n    isListable\n    isMandatory\n    isPrioritary\n    latitudeValue\n    longitudeValue\n    mappingIn\n    mappingOut\n    nodeType\n    rangeFromValue\n    rangeToValue\n    rawValue\n    stringValue\n    type\n    __typename\n  }\n  queryActionTemplate {\n    id\n    name\n    type\n    actionTemplateItems {\n      id\n      parameters {\n        id\n        name\n      }\n      value {\n        stringValue\n        id\n      }\n      isDeleted\n    }\n    resourceSpecifications\n    isDeleted\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c5b7e46e504e41917e32913ed1bcb27f';

module.exports = node;
