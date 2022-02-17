/**
 * @generated SignedSource<<2a0b365bce8ed4ebd8852c288b4206d0>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type ServicePanel_endToEndPathQuery$variables = {|
  linkId?: ?string,
  portId?: ?string,
|};
export type ServicePanel_endToEndPathQueryVariables = ServicePanel_endToEndPathQuery$variables;
export type ServicePanel_endToEndPathQuery$data = {|
  +endToEndPath: ?{|
    +links: ?$ReadOnlyArray<?{|
      +id: string,
    |}>,
    +ports: ?$ReadOnlyArray<?{|
      +id: string,
    |}>,
  |},
|};
export type ServicePanel_endToEndPathQueryResponse = ServicePanel_endToEndPathQuery$data;
export type ServicePanel_endToEndPathQuery = {|
  variables: ServicePanel_endToEndPathQueryVariables,
  response: ServicePanel_endToEndPathQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "linkId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "portId"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "linkId",
        "variableName": "linkId"
      },
      {
        "kind": "Variable",
        "name": "portId",
        "variableName": "portId"
      }
    ],
    "concreteType": "EndToEndPath",
    "kind": "LinkedField",
    "name": "endToEndPath",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Link",
        "kind": "LinkedField",
        "name": "links",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EquipmentPort",
        "kind": "LinkedField",
        "name": "ports",
        "plural": true,
        "selections": (v1/*: any*/),
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
    "name": "ServicePanel_endToEndPathQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServicePanel_endToEndPathQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "246aa1bacd0c009264574ebfd473ba72",
    "id": null,
    "metadata": {},
    "name": "ServicePanel_endToEndPathQuery",
    "operationKind": "query",
    "text": "query ServicePanel_endToEndPathQuery(\n  $linkId: ID\n  $portId: ID\n) {\n  endToEndPath(portId: $portId, linkId: $linkId) {\n    links {\n      id\n    }\n    ports {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "1cf02ecc40f77f71d02dc6f829acb5c5";

module.exports = ((node/*: any*/)/*: Query<
  ServicePanel_endToEndPathQuery$variables,
  ServicePanel_endToEndPathQuery$data,
>*/);
