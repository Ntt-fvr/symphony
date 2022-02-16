/**
 * @generated SignedSource<<800d724713027da59fe5b8b661a06185>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
type EquipmentPortTypeItem_equipmentPortType$fragmentType = any;
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type AddEquipmentPortTypeInput = {|
  name: string,
  properties?: ?$ReadOnlyArray<PropertyTypeInput>,
  linkProperties?: ?$ReadOnlyArray<PropertyTypeInput>,
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
export type AddEquipmentPortTypeMutation$variables = {|
  input: AddEquipmentPortTypeInput,
|};
export type AddEquipmentPortTypeMutationVariables = AddEquipmentPortTypeMutation$variables;
export type AddEquipmentPortTypeMutation$data = {|
  +addEquipmentPortType: {|
    +id: string,
    +name: string,
    +$fragmentSpreads: EquipmentPortTypeItem_equipmentPortType$fragmentType,
  |},
|};
export type AddEquipmentPortTypeMutationResponse = AddEquipmentPortTypeMutation$data;
export type AddEquipmentPortTypeMutation = {|
  variables: AddEquipmentPortTypeMutationVariables,
  response: AddEquipmentPortTypeMutation$data,
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
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/),
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
    "name": "index",
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
    "kind": "ScalarField",
    "name": "intValue",
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
    "name": "floatValue",
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
    "name": "category",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isDeleted",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddEquipmentPortTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentPortType",
        "kind": "LinkedField",
        "name": "addEquipmentPortType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EquipmentPortTypeItem_equipmentPortType"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddEquipmentPortTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentPortType",
        "kind": "LinkedField",
        "name": "addEquipmentPortType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "numberOfPortDefinitions",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PropertyType",
            "kind": "LinkedField",
            "name": "propertyTypes",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PropertyType",
            "kind": "LinkedField",
            "name": "linkPropertyTypes",
            "plural": true,
            "selections": (v4/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bf39c6d57c4910557f13d11b1324db32",
    "id": null,
    "metadata": {},
    "name": "AddEquipmentPortTypeMutation",
    "operationKind": "mutation",
    "text": "mutation AddEquipmentPortTypeMutation(\n  $input: AddEquipmentPortTypeInput!\n) {\n  addEquipmentPortType(input: $input) {\n    id\n    name\n    ...EquipmentPortTypeItem_equipmentPortType\n  }\n}\n\nfragment DynamicPropertyTypesGrid_propertyTypes on PropertyType {\n  ...PropertyTypeFormField_propertyType\n  id\n  index\n}\n\nfragment EquipmentPortTypeItem_equipmentPortType on EquipmentPortType {\n  id\n  name\n  numberOfPortDefinitions\n  propertyTypes {\n    ...DynamicPropertyTypesGrid_propertyTypes\n    id\n  }\n  linkPropertyTypes {\n    ...DynamicPropertyTypesGrid_propertyTypes\n    id\n  }\n}\n\nfragment PropertyTypeFormField_propertyType on PropertyType {\n  id\n  name\n  type\n  nodeType\n  index\n  stringValue\n  intValue\n  booleanValue\n  floatValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  isEditable\n  isInstanceProperty\n  isMandatory\n  category\n  isDeleted\n}\n"
  }
};
})();

(node/*: any*/).hash = "454f79d6f06b34bbd5fe4c8aae3f4743";

module.exports = ((node/*: any*/)/*: Mutation<
  AddEquipmentPortTypeMutation$variables,
  AddEquipmentPortTypeMutation$data,
>*/);
