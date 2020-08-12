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
export type HubVersionQueryVariables = {||};
export type HubVersionQueryResponse = {|
  +version: {|
    +string: string
  |}
|};
export type HubVersionQuery = {|
  variables: HubVersionQueryVariables,
  response: HubVersionQueryResponse,
|};
*/


/*
query HubVersionQuery {
  version {
    string
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Version",
    "kind": "LinkedField",
    "name": "version",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "string",
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
    "name": "HubVersionQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HubVersionQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "92d4b3cb877cb1bcf2ac299ccbd461c9",
    "id": null,
    "metadata": {},
    "name": "HubVersionQuery",
    "operationKind": "query",
    "text": "query HubVersionQuery {\n  version {\n    string\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '34ebb96a32faf7bffcb55abca095e681';

module.exports = node;
