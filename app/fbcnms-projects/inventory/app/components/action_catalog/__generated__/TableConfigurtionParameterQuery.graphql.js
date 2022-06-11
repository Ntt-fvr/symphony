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
export type TableConfigurtionParameterQueryVariables = {||};
export type TableConfigurtionParameterQueryResponse = {|
  +queryConfigurationParameterType: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>
|};
export type TableConfigurtionParameterQuery = {|
  variables: TableConfigurtionParameterQueryVariables,
  response: TableConfigurtionParameterQueryResponse,
|};
*/


/*
query TableConfigurtionParameterQuery {
  queryConfigurationParameterType {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
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
    "name": "TableConfigurtionParameterQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TableConfigurtionParameterQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b59c0beb69d65601272b5970dc11850b",
    "id": null,
    "metadata": {},
    "name": "TableConfigurtionParameterQuery",
    "operationKind": "query",
    "text": "query TableConfigurtionParameterQuery {\n  queryConfigurationParameterType {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7aad38e3a599e759a63f8ece8fe8a548';

module.exports = node;
