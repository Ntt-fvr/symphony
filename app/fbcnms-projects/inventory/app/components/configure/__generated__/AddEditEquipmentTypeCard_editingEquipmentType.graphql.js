/**
 * @generated SignedSource<<beacbf6478e0bf44289a4c11f0fdc700>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type AddEditEquipmentTypeCard_editingEquipmentType$fragmentType: FragmentType;
export type AddEditEquipmentTypeCard_editingEquipmentType$ref = AddEditEquipmentTypeCard_editingEquipmentType$fragmentType;
export type AddEditEquipmentTypeCard_editingEquipmentType$data = {|
  +id: string,
  +name: string,
  +propertyTypes: $ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +type: PropertyKind,
    +nodeType: ?string,
    +index: ?number,
    +stringValue: ?string,
    +intValue: ?number,
    +booleanValue: ?boolean,
    +floatValue: ?number,
    +latitudeValue: ?number,
    +longitudeValue: ?number,
    +isEditable: ?boolean,
    +isInstanceProperty: ?boolean,
    +isMandatory: ?boolean,
  |}>,
  +positionDefinitions: $ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +index: ?number,
    +visibleLabel: ?string,
  |}>,
  +portDefinitions: $ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +index: ?number,
    +visibleLabel: ?string,
    +portType: ?{|
      +id: string,
      +name: string,
    |},
    +connectedPorts: ?$ReadOnlyArray<{|
      +id: string,
      +name: string,
    |}>,
  |}>,
  +numberOfEquipment: number,
  +$fragmentType: AddEditEquipmentTypeCard_editingEquipmentType$fragmentType,
|};
export type AddEditEquipmentTypeCard_editingEquipmentType = AddEditEquipmentTypeCard_editingEquipmentType$data;
export type AddEditEquipmentTypeCard_editingEquipmentType$key = {
  +$data?: AddEditEquipmentTypeCard_editingEquipmentType$data,
  +$fragmentSpreads: AddEditEquipmentTypeCard_editingEquipmentType$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibleLabel",
  "storageKey": null
},
v4 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddEditEquipmentTypeCard_editingEquipmentType",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "propertyTypes",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
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
        (v2/*: any*/),
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
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/)
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
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPortType",
          "kind": "LinkedField",
          "name": "portType",
          "plural": false,
          "selections": (v4/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPortDefinition",
          "kind": "LinkedField",
          "name": "connectedPorts",
          "plural": true,
          "selections": (v4/*: any*/),
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
  "type": "EquipmentType",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "226ffe758520c11d9f13e40b845252bc";

module.exports = ((node/*: any*/)/*: Fragment<
  AddEditEquipmentTypeCard_editingEquipmentType$fragmentType,
  AddEditEquipmentTypeCard_editingEquipmentType$data,
>*/);
