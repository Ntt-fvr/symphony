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
export type AddEditResourceInLocationParameterQueryVariables = {||};
export type AddEditResourceInLocationParameterQueryResponse = {|
  +queryParameter: ?$ReadOnlyArray<?{|
    +id: string,
    +stringValue: ?string,
    +intValue: ?number,
    +floatValue: ?number,
    +parameterType: {|
      +id: string,
      +name: string,
      +stringValue: ?string,
      +intValue: ?number,
      +floatValue: ?number,
      +resourceSpecification: string,
    |},
  |}>
|};
export type AddEditResourceInLocationParameterQuery = {|
  variables: AddEditResourceInLocationParameterQueryVariables,
  response: AddEditResourceInLocationParameterQueryResponse,
|};
*/


/*
query AddEditResourceInLocationParameterQuery {
  queryParameter {
    id
    stringValue
    intValue
    floatValue
    parameterType {
      id
      name
      stringValue
      intValue
      floatValue
      resourceSpecification
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
  "name": "intValue",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Parameter",
    "kind": "LinkedField",
    "name": "queryParameter",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "ConfigurationParameterType",
        "kind": "LinkedField",
        "name": "parameterType",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "resourceSpecification",
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
    "name": "AddEditResourceInLocationParameterQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddEditResourceInLocationParameterQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "0b1ff154b5354ff7a6f1b029a19ab391",
    "id": null,
    "metadata": {},
    "name": "AddEditResourceInLocationParameterQuery",
    "operationKind": "query",
    "text": "query AddEditResourceInLocationParameterQuery {\n  queryParameter {\n    id\n    stringValue\n    intValue\n    floatValue\n    parameterType {\n      id\n      name\n      stringValue\n      intValue\n      floatValue\n      resourceSpecification\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '449ac71c627c856c80c873b7137dd394';

module.exports = node;
