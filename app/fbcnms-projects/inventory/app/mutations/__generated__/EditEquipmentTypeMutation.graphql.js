/**
 * @generated SignedSource<<d240625049e52cd905e06d0c1c24c134>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
type EquipmentTypeItem_equipmentType$fragmentType = any;
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type EditEquipmentTypeInput = {|
  id: string,
  name: string,
  category?: ?string,
  positions?: ?$ReadOnlyArray<EquipmentPositionInput>,
  ports?: ?$ReadOnlyArray<EquipmentPortInput>,
  properties?: ?$ReadOnlyArray<PropertyTypeInput>,
|};
export type EquipmentPositionInput = {|
  id?: ?string,
  name: string,
  index?: ?number,
  visibleLabel?: ?string,
|};
export type EquipmentPortInput = {|
  id?: ?string,
  name: string,
  index?: ?number,
  visibleLabel?: ?string,
  portTypeID?: ?string,
  bandwidth?: ?string,
  connectedPorts?: ?$ReadOnlyArray<EquipmentPortConnectionInput>,
|};
export type EquipmentPortConnectionInput = {|
  id?: ?string,
  name?: ?string,
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
export type EditEquipmentTypeMutation$variables = {|
  input: EditEquipmentTypeInput,
|};
export type EditEquipmentTypeMutationVariables = EditEquipmentTypeMutation$variables;
export type EditEquipmentTypeMutation$data = {|
  +editEquipmentType: {|
    +id: string,
    +name: string,
    +$fragmentSpreads: EquipmentTypeItem_equipmentType$fragmentType,
  |},
|};
export type EditEquipmentTypeMutationResponse = EditEquipmentTypeMutation$data;
export type EditEquipmentTypeMutation = {|
  variables: EditEquipmentTypeMutationVariables,
  response: EditEquipmentTypeMutation$data,
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibleLabel",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditEquipmentTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentType",
        "kind": "LinkedField",
        "name": "editEquipmentType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EquipmentTypeItem_equipmentType"
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
    "name": "EditEquipmentTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EquipmentType",
        "kind": "LinkedField",
        "name": "editEquipmentType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PropertyType",
            "kind": "LinkedField",
            "name": "propertyTypes",
            "plural": true,
            "selections": [
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
              (v4/*: any*/),
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
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPositionDefinition",
            "kind": "LinkedField",
            "name": "positionDefinitions",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPortDefinition",
            "kind": "LinkedField",
            "name": "portDefinitions",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPortType",
                "kind": "LinkedField",
                "name": "portType",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPortDefinition",
                "kind": "LinkedField",
                "name": "connectedPorts",
                "plural": true,
                "selections": (v6/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "numberOfEquipment",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "74dafaac4b041f0c8886cd694f6bfa82",
    "id": null,
    "metadata": {},
    "name": "EditEquipmentTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditEquipmentTypeMutation(\n  $input: EditEquipmentTypeInput!\n) {\n  editEquipmentType(input: $input) {\n    id\n    name\n    ...EquipmentTypeItem_equipmentType\n  }\n}\n\nfragment DynamicPropertyTypesGrid_propertyTypes on PropertyType {\n  ...PropertyTypeFormField_propertyType\n  id\n  index\n}\n\nfragment EquipmentTypeItem_equipmentType on EquipmentType {\n  id\n  name\n  propertyTypes {\n    ...DynamicPropertyTypesGrid_propertyTypes\n    id\n  }\n  positionDefinitions {\n    ...PositionDefinitionsTable_positionDefinitions\n    id\n  }\n  portDefinitions {\n    ...PortDefinitionsTable_portDefinitions\n    id\n  }\n  numberOfEquipment\n}\n\nfragment PortDefinitionsTable_portDefinitions on EquipmentPortDefinition {\n  id\n  name\n  index\n  visibleLabel\n  portType {\n    id\n    name\n  }\n  connectedPorts {\n    id\n    name\n  }\n}\n\nfragment PositionDefinitionsTable_positionDefinitions on EquipmentPositionDefinition {\n  id\n  name\n  index\n  visibleLabel\n}\n\nfragment PropertyTypeFormField_propertyType on PropertyType {\n  id\n  name\n  type\n  nodeType\n  index\n  stringValue\n  intValue\n  booleanValue\n  floatValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  isEditable\n  isInstanceProperty\n  isMandatory\n  category\n  isDeleted\n}\n"
  }
};
})();

(node/*: any*/).hash = "4c0468445c1dd5408fa15f7c4689eee2";

module.exports = ((node/*: any*/)/*: Mutation<
  EditEquipmentTypeMutation$variables,
  EditEquipmentTypeMutation$data,
>*/);
