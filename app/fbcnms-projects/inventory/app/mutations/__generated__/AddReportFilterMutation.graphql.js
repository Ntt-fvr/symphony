/**
 * @generated SignedSource<<3ab0a1152d26c93514a37b1356940e3a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type FilterEntity = "WORK_ORDER" | "PORT" | "EQUIPMENT" | "LINK" | "LOCATION" | "SERVICE" | "%future added value";
export type FilterOperator = "IS" | "IS_NIL" | "IS_NIL_OR_DATE_GREATER_OR_EQUAL_THAN" | "CONTAINS" | "IS_ONE_OF" | "IS_NOT_ONE_OF" | "DATE_GREATER_THAN" | "DATE_LESS_THAN" | "DATE_GREATER_OR_EQUAL_THAN" | "DATE_LESS_OR_EQUAL_THAN" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type ReportFilterInput = {|
  name: string,
  entity: FilterEntity,
  filters?: ?$ReadOnlyArray<?GeneralFilterInput>,
|};
export type GeneralFilterInput = {|
  filterType: string,
  key: string,
  operator: FilterOperator,
  stringValue?: ?string,
  idSet?: ?$ReadOnlyArray<string>,
  stringSet?: ?$ReadOnlyArray<string>,
  boolValue?: ?boolean,
  propertyValue?: ?PropertyTypeInput,
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
export type AddReportFilterMutation$variables = {|
  input: ReportFilterInput,
|};
export type AddReportFilterMutationVariables = AddReportFilterMutation$variables;
export type AddReportFilterMutation$data = {|
  +addReportFilter: {|
    +id: string,
    +name: string,
    +entity: FilterEntity,
    +filters: $ReadOnlyArray<{|
      +filterType: string,
      +key: string,
      +operator: FilterOperator,
      +stringValue: ?string,
      +idSet: ?$ReadOnlyArray<string>,
      +stringSet: ?$ReadOnlyArray<string>,
      +boolValue: ?boolean,
      +propertyValue: ?{|
        +id: string,
        +name: string,
        +type: PropertyKind,
        +nodeType: ?string,
        +isEditable: ?boolean,
        +isInstanceProperty: ?boolean,
        +stringValue: ?string,
        +intValue: ?number,
        +floatValue: ?number,
        +booleanValue: ?boolean,
        +latitudeValue: ?number,
        +longitudeValue: ?number,
        +rangeFromValue: ?number,
        +rangeToValue: ?number,
      |},
    |}>,
  |},
|};
export type AddReportFilterMutationResponse = AddReportFilterMutation$data;
export type AddReportFilterMutation = {|
  variables: AddReportFilterMutationVariables,
  response: AddReportFilterMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
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
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ReportFilter",
    "kind": "LinkedField",
    "name": "addReportFilter",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "entity",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneralFilter",
        "kind": "LinkedField",
        "name": "filters",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "filterType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "key",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "operator",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "idSet",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stringSet",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "boolValue",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PropertyType",
            "kind": "LinkedField",
            "name": "propertyValue",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
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
                "name": "isEditable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isInstanceProperty",
                "storageKey": null
              },
              (v3/*: any*/),
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
                "name": "floatValue",
                "storageKey": null
              },
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
                "name": "rangeFromValue",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "rangeToValue",
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
    "name": "AddReportFilterMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddReportFilterMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "f3252b27c57a12186160840d9876835b",
    "id": null,
    "metadata": {},
    "name": "AddReportFilterMutation",
    "operationKind": "mutation",
    "text": "mutation AddReportFilterMutation(\n  $input: ReportFilterInput!\n) {\n  addReportFilter(input: $input) {\n    id\n    name\n    entity\n    filters {\n      filterType\n      key\n      operator\n      stringValue\n      idSet\n      stringSet\n      boolValue\n      propertyValue {\n        id\n        name\n        type\n        nodeType\n        isEditable\n        isInstanceProperty\n        stringValue\n        intValue\n        floatValue\n        booleanValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "bbcdc57260e039cef894ffdf32b2ff2e";

module.exports = ((node/*: any*/)/*: Mutation<
  AddReportFilterMutation$variables,
  AddReportFilterMutation$data,
>*/);
