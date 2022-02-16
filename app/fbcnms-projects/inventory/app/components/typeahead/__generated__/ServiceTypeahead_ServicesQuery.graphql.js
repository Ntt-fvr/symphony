/**
 * @generated SignedSource<<3ab5bfcd478645de9d7edf41ee5d74b6>>
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
export type ServiceFilterType = "SERVICE_INST_NAME" | "SERVICE_STATUS" | "SERVICE_DISCOVERY_METHOD" | "SERVICE_TYPE" | "SERVICE_INST_EXTERNAL_ID" | "SERVICE_INST_CUSTOMER_NAME" | "PROPERTY" | "LOCATION_INST" | "LOCATION_INST_EXTERNAL_ID" | "EQUIPMENT_IN_SERVICE" | "%future added value";
export type ServiceFilterInput = {|
  filterType: ServiceFilterType,
  operator: FilterOperator,
  stringValue?: ?string,
  propertyValue?: ?PropertyTypeInput,
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
export type ServiceTypeahead_ServicesQuery$variables = {|
  filters: $ReadOnlyArray<ServiceFilterInput>,
  limit?: ?number,
|};
export type ServiceTypeahead_ServicesQueryVariables = ServiceTypeahead_ServicesQuery$variables;
export type ServiceTypeahead_ServicesQuery$data = {|
  +services: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type ServiceTypeahead_ServicesQueryResponse = ServiceTypeahead_ServicesQuery$data;
export type ServiceTypeahead_ServicesQuery = {|
  variables: ServiceTypeahead_ServicesQueryVariables,
  response: ServiceTypeahead_ServicesQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filters"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "limit"
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
        "kind": "Variable",
        "name": "first",
        "variableName": "limit"
      }
    ],
    "concreteType": "ServiceConnection",
    "kind": "LinkedField",
    "name": "services",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ServiceEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Service",
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
                "name": "name",
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
    "name": "ServiceTypeahead_ServicesQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServiceTypeahead_ServicesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6a1fdc9f4b74656d6c45da94c5a0f370",
    "id": null,
    "metadata": {},
    "name": "ServiceTypeahead_ServicesQuery",
    "operationKind": "query",
    "text": "query ServiceTypeahead_ServicesQuery(\n  $filters: [ServiceFilterInput!]!\n  $limit: Int\n) {\n  services(filterBy: $filters, first: $limit) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "76ab89e627f48adb6ac1601ad66f151f";

module.exports = ((node/*: any*/)/*: Query<
  ServiceTypeahead_ServicesQuery$variables,
  ServiceTypeahead_ServicesQuery$data,
>*/);
