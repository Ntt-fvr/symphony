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
    +resourceSpecifications: string,
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
    resourceSpecifications
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
  "name": "type",
  "storageKey": null
},
v3 = [
  {
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
        "name": "stringValue",
        "storageKey": null
      },
      (v2/*: any*/),
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
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "resourceSpecifications",
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
    "name": "AddEditResourceSpecificationQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddEditResourceSpecificationQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "3b6814933f063b5da3e9daf1549f8823",
    "id": null,
    "metadata": {},
    "name": "AddEditResourceSpecificationQuery",
    "operationKind": "query",
    "text": "query AddEditResourceSpecificationQuery {\n  queryConfigurationParameterType {\n    resourceSpecification\n    name\n    id\n    booleanValue\n    category\n    externalId\n    floatValue\n    index\n    intValue\n    isDeleted\n    isEditable\n    isListable\n    isMandatory\n    isPrioritary\n    latitudeValue\n    longitudeValue\n    mappingIn\n    mappingOut\n    nodeType\n    rangeFromValue\n    rangeToValue\n    rawValue\n    stringValue\n    type\n    __typename\n  }\n  queryActionTemplate {\n    id\n    name\n    type\n    resourceSpecifications\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cec0a6a51149b1e50a2cbf1c96b996e8';

module.exports = node;
