/**
 * @generated SignedSource<<51c21270d470c9eb860f37096dc46e80>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
type AddEditEquipmentPortTypeCard_editingEquipmentPortType$fragmentType = any;
type EquipmentPortTypeItem_equipmentPortType$fragmentType = any;
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type EditEquipmentPortTypeInput = {|
  id: string,
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
export type EditEquipmentPortTypeMutation$variables = {|
  input: EditEquipmentPortTypeInput,
|};
export type EditEquipmentPortTypeMutationVariables = EditEquipmentPortTypeMutation$variables;
export type EditEquipmentPortTypeMutation$data = {|
  +editEquipmentPortType: {|
    +id: string,
    +name: string,
    +$fragmentSpreads: EquipmentPortTypeItem_equipmentPortType$fragmentType & AddEditEquipmentPortTypeCard_editingEquipmentPortType$fragmentType,
  |},
|};
export type EditEquipmentPortTypeMutationResponse = EditEquipmentPortTypeMutation$data;
export type EditEquipmentPortTypeMutation = {|
  variables: EditEquipmentPortTypeMutationVariables,
  response: EditEquipmentPortTypeMutation$data,
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
    "name": "EditEquipmentPortTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentPortType",
        "kind": "LinkedField",
        "name": "editEquipmentPortType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EquipmentPortTypeItem_equipmentPortType"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddEditEquipmentPortTypeCard_editingEquipmentPortType"
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
    "name": "EditEquipmentPortTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentPortType",
        "kind": "LinkedField",
        "name": "editEquipmentPortType",
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
    "cacheID": "b658e508e824b5637fe4d411da458a37",
    "id": null,
    "metadata": {},
    "name": "EditEquipmentPortTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditEquipmentPortTypeMutation(\n  $input: EditEquipmentPortTypeInput!\n) {\n  editEquipmentPortType(input: $input) {\n    id\n    name\n    ...EquipmentPortTypeItem_equipmentPortType\n    ...AddEditEquipmentPortTypeCard_editingEquipmentPortType\n  }\n}\n\nfragment AddEditEquipmentPortTypeCard_editingEquipmentPortType on EquipmentPortType {\n  id\n  name\n  numberOfPortDefinitions\n  propertyTypes {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    isEditable\n    isInstanceProperty\n  }\n  linkPropertyTypes {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    isEditable\n    isInstanceProperty\n  }\n}\n\nfragment DynamicPropertyTypesGrid_propertyTypes on PropertyType {\n  ...PropertyTypeFormField_propertyType\n  id\n  index\n}\n\nfragment EquipmentPortTypeItem_equipmentPortType on EquipmentPortType {\n  id\n  name\n  numberOfPortDefinitions\n  propertyTypes {\n    ...DynamicPropertyTypesGrid_propertyTypes\n    id\n  }\n  linkPropertyTypes {\n    ...DynamicPropertyTypesGrid_propertyTypes\n    id\n  }\n}\n\nfragment PropertyTypeFormField_propertyType on PropertyType {\n  id\n  name\n  type\n  nodeType\n  index\n  stringValue\n  intValue\n  booleanValue\n  floatValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  isEditable\n  isInstanceProperty\n  isMandatory\n  category\n  isDeleted\n}\n"
  }
};
})();

(node/*: any*/).hash = "30f0a21de0af9f642d1d36e4fd0cc913";

module.exports = ((node/*: any*/)/*: Mutation<
  EditEquipmentPortTypeMutation$variables,
  EditEquipmentPortTypeMutation$data,
>*/);
