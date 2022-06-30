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
export type DialogStatusBulkQueryVariables = {||};
export type DialogStatusBulkQueryResponse = {|
  +queryResource: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>,
  +queryConfigurationParameterType: ?$ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>,
|};
export type DialogStatusBulkQuery = {|
  variables: DialogStatusBulkQueryVariables,
  response: DialogStatusBulkQueryResponse,
|};
*/


/*
query DialogStatusBulkQuery {
  queryResource {
    id
    name
  }
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
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Resource",
    "kind": "LinkedField",
    "name": "queryResource",
    "plural": true,
    "selections": (v0/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ConfigurationParameterType",
    "kind": "LinkedField",
    "name": "queryConfigurationParameterType",
    "plural": true,
    "selections": (v0/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DialogStatusBulkQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DialogStatusBulkQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bdceeea5839a599570a60385cd4178eb",
    "id": null,
    "metadata": {},
    "name": "DialogStatusBulkQuery",
    "operationKind": "query",
    "text": "query DialogStatusBulkQuery {\n  queryResource {\n    id\n    name\n  }\n  queryConfigurationParameterType {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0dc396df2f12fb37aa2903f488be513b';

module.exports = node;
