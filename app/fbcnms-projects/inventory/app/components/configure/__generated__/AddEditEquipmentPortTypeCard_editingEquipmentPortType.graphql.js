/**
 * @generated SignedSource<<980358159ef8be8d8ffbd40e3756cfd4>>
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
declare export opaque type AddEditEquipmentPortTypeCard_editingEquipmentPortType$fragmentType: FragmentType;
export type AddEditEquipmentPortTypeCard_editingEquipmentPortType$ref = AddEditEquipmentPortTypeCard_editingEquipmentPortType$fragmentType;
export type AddEditEquipmentPortTypeCard_editingEquipmentPortType$data = {|
  +id: string,
  +name: string,
  +numberOfPortDefinitions: number,
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
  |}>,
  +linkPropertyTypes: $ReadOnlyArray<?{|
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
  |}>,
  +$fragmentType: AddEditEquipmentPortTypeCard_editingEquipmentPortType$fragmentType,
|};
export type AddEditEquipmentPortTypeCard_editingEquipmentPortType = AddEditEquipmentPortTypeCard_editingEquipmentPortType$data;
export type AddEditEquipmentPortTypeCard_editingEquipmentPortType$key = {
  +$data?: AddEditEquipmentPortTypeCard_editingEquipmentPortType$data,
  +$fragmentSpreads: AddEditEquipmentPortTypeCard_editingEquipmentPortType$fragmentType,
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
v2 = [
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
    "name": "isEditable",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isInstanceProperty",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddEditEquipmentPortTypeCard_editingEquipmentPortType",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "linkPropertyTypes",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "EquipmentPortType",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "7ac4f29ced9bfcf2b8395e8a95c58b15";

module.exports = ((node/*: any*/)/*: Fragment<
  AddEditEquipmentPortTypeCard_editingEquipmentPortType$fragmentType,
  AddEditEquipmentPortTypeCard_editingEquipmentPortType$data,
>*/);
