/**
 * @generated SignedSource<<80e70c8273b3cc78239af51273c91506>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type UserFilterType = "USER_NAME" | "USER_STATUS" | "USER_ORGANIZATION" | "%future added value";
export type UserStatus = "ACTIVE" | "DEACTIVATED" | "%future added value";
export type UserFilterInput = {|
  filterType: UserFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  propertyValue?: ?PropertyTypeInput,
  statusValue?: ?UserStatus,
  idSet?: ?$ReadOnlyArray<string>,
  stringSet?: ?$ReadOnlyArray<string>,
  maxDepth?: ?number,
|};
export type PropertyTypeInput = {|
  id?: ?string,
  externalId?: ?string,
  name: string,
  type: PropertyKind,
  nodeType?: ?string,
  index?: ?number,
  category?: ?string,
  stringValue?: ?string,
  intValue?: ?number,
  booleanValue?: ?boolean,
  floatValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  isMandatory?: ?boolean,
  isDeleted?: ?boolean,
  propertyCategoryID?: ?string,
  isListable?: ?boolean,
|};
export type PowerSearchWorkOrderGeneralUserFilter_userQuery$variables = {|
  filters: $ReadOnlyArray<UserFilterInput>,
|};
export type PowerSearchWorkOrderGeneralUserFilter_userQueryVariables = PowerSearchWorkOrderGeneralUserFilter_userQuery$variables;
export type PowerSearchWorkOrderGeneralUserFilter_userQuery$data = {|
  +users: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +email: string,
      |},
    |}>,
  |},
|};
export type PowerSearchWorkOrderGeneralUserFilter_userQueryResponse = PowerSearchWorkOrderGeneralUserFilter_userQuery$data;
export type PowerSearchWorkOrderGeneralUserFilter_userQuery = {|
  variables: PowerSearchWorkOrderGeneralUserFilter_userQueryVariables,
  response: PowerSearchWorkOrderGeneralUserFilter_userQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filterBy",
        "variableName": "filters"
      },
      {
        "kind": "Literal",
        "name": "first",
        "value": 10
      }
    ],
    "concreteType": "UserConnection",
    "kind": "LinkedField",
    "name": "users",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
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
                "name": "email",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PowerSearchWorkOrderGeneralUserFilter_userQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PowerSearchWorkOrderGeneralUserFilter_userQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "34a9f9096cfb7d28bfb720f8ce62afa8",
    "id": null,
    "metadata": {},
    "name": "PowerSearchWorkOrderGeneralUserFilter_userQuery",
    "operationKind": "query",
    "text": "query PowerSearchWorkOrderGeneralUserFilter_userQuery(\n  $filters: [UserFilterInput!]!\n) {\n  users(first: 10, filterBy: $filters) {\n    edges {\n      node {\n        id\n        email\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "32481b562d44f21de3acd5b2b9325a8a";

module.exports = ((node/*: any*/)/*: Query<
  PowerSearchWorkOrderGeneralUserFilter_userQuery$variables,
  PowerSearchWorkOrderGeneralUserFilter_userQuery$data,
>*/);
