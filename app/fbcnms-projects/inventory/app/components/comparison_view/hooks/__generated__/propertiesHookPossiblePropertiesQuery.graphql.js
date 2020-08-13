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
export type PropertyEntity = "EQUIPMENT" | "LINK" | "LOCATION" | "PORT" | "PROJECT" | "SERVICE" | "WORK_ORDER" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type propertiesHookPossiblePropertiesQueryVariables = {|
  entityType: PropertyEntity
|};
export type propertiesHookPossiblePropertiesQueryResponse = {|
  +possibleProperties: $ReadOnlyArray<{|
    +name: string,
    +type: PropertyKind,
    +stringValue: ?string,
  |}>
|};
export type propertiesHookPossiblePropertiesQuery = {|
  variables: propertiesHookPossiblePropertiesQueryVariables,
  response: propertiesHookPossiblePropertiesQueryResponse,
|};
*/


/*
query propertiesHookPossiblePropertiesQuery(
  $entityType: PropertyEntity!
) {
  possibleProperties(entityType: $entityType) {
    name
    type
    stringValue
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "entityType"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "entityType",
    "variableName": "entityType"
  }
],
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
  "name": "type",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "propertiesHookPossiblePropertiesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PropertyType",
        "kind": "LinkedField",
        "name": "possibleProperties",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "propertiesHookPossiblePropertiesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PropertyType",
        "kind": "LinkedField",
        "name": "possibleProperties",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e0abbdf9be3861677aac8270d30ff7c1",
    "id": null,
    "metadata": {},
    "name": "propertiesHookPossiblePropertiesQuery",
    "operationKind": "query",
    "text": "query propertiesHookPossiblePropertiesQuery(\n  $entityType: PropertyEntity!\n) {\n  possibleProperties(entityType: $entityType) {\n    name\n    type\n    stringValue\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bb938da07f028b2a4f6fc67588a53b78';

module.exports = node;
