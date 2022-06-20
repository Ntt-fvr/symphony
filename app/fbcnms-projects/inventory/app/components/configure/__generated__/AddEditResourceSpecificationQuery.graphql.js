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
export type AddEditResourceSpecificationQueryVariables = {||};
export type AddEditResourceSpecificationQueryResponse = {|
  +queryConfigurationParameterType: ?$ReadOnlyArray<?{|
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
    +mappingIn: ?string,
    +mappingOut: ?string,
    +nodeType: ?string,
    +rawValue: ?string,
    +resourceSpecification: string,
    +stringValue: ?string,
    +tags: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
    |}>,
    +type: ParameterKind,
  |}>
|};
export type AddEditResourceSpecificationQuery = {|
  variables: AddEditResourceSpecificationQueryVariables,
  response: AddEditResourceSpecificationQueryResponse,
|};
*/


/*
query AddEditResourceSpecificationQuery {
  queryConfigurationParameterType {
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
    mappingIn
    mappingOut
    nodeType
    rawValue
    resourceSpecification
    stringValue
    tags {
      id
      name
    }
    type
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
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ConfigurationParameterType",
    "kind": "LinkedField",
    "name": "queryConfigurationParameterType",
    "plural": true,
    "selections": [
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
        "name": "rawValue",
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
        "name": "stringValue",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ConfigParamTag",
        "kind": "LinkedField",
        "name": "tags",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      },
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddEditResourceSpecificationQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddEditResourceSpecificationQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "863825093b37af0d6d4ff5d11628b768",
    "id": null,
    "metadata": {},
    "name": "AddEditResourceSpecificationQuery",
    "operationKind": "query",
    "text": "query AddEditResourceSpecificationQuery {\n  queryConfigurationParameterType {\n    name\n    id\n    booleanValue\n    category\n    externalId\n    floatValue\n    index\n    intValue\n    isDeleted\n    isEditable\n    isListable\n    isMandatory\n    isPrioritary\n    mappingIn\n    mappingOut\n    nodeType\n    rawValue\n    resourceSpecification\n    stringValue\n    tags {\n      id\n      name\n    }\n    type\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b32c603888c3148d3a8ca16e9873144c';

module.exports = node;
