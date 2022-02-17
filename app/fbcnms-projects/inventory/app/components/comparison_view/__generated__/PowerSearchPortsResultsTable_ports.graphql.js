/**
 * @generated SignedSource<<12122f4f79063be5eff6330ac55bbc4d>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type EquipmentBreadcrumbs_equipment$fragmentType = any;
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type PowerSearchPortsResultsTable_ports$fragmentType: FragmentType;
export type PowerSearchPortsResultsTable_ports$ref = PowerSearchPortsResultsTable_ports$fragmentType;
export type PowerSearchPortsResultsTable_ports$data = $ReadOnlyArray<{|
  +id: string,
  +definition: {|
    +id: string,
    +name: string,
  |},
  +link: ?{|
    +id: string,
    +ports: $ReadOnlyArray<?{|
      +id: string,
      +definition: {|
        +id: string,
        +name: string,
      |},
      +parentEquipment: {|
        +id: string,
        +name: string,
        +equipmentType: {|
          +id: string,
          +name: string,
          +portDefinitions: $ReadOnlyArray<?{|
            +id: string,
            +name: string,
          |}>,
        |},
        +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
      |},
    |}>,
    +properties: $ReadOnlyArray<?{|
      +id: string,
      +stringValue: ?string,
      +intValue: ?number,
      +floatValue: ?number,
      +booleanValue: ?boolean,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +rangeFromValue: ?number,
      +rangeToValue: ?number,
      +propertyType: {|
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
  +parentEquipment: {|
    +id: string,
    +name: string,
    +equipmentType: {|
      +id: string,
      +name: string,
    |},
    +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
  |},
  +properties: $ReadOnlyArray<{|
    +id: string,
    +stringValue: ?string,
    +intValue: ?number,
    +floatValue: ?number,
    +booleanValue: ?boolean,
    +latitudeValue: ?number,
    +longitudeValue: ?number,
    +rangeFromValue: ?number,
    +rangeToValue: ?number,
    +propertyType: {|
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
  +$fragmentType: PowerSearchPortsResultsTable_ports$fragmentType,
|}>;
export type PowerSearchPortsResultsTable_ports = PowerSearchPortsResultsTable_ports$data;
export type PowerSearchPortsResultsTable_ports$key = $ReadOnlyArray<{
  +$data?: PowerSearchPortsResultsTable_ports$data,
  +$fragmentSpreads: PowerSearchPortsResultsTable_ports$fragmentType,
  ...
}>;
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
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentPortDefinition",
  "kind": "LinkedField",
  "name": "definition",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v4 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "EquipmentBreadcrumbs_equipment"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Property",
  "kind": "LinkedField",
  "name": "properties",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "propertyType",
      "plural": false,
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
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/),
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PowerSearchPortsResultsTable_ports",
  "selections": [
    (v0/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Link",
      "kind": "LinkedField",
      "name": "link",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPort",
          "kind": "LinkedField",
          "name": "ports",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            (v3/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Equipment",
              "kind": "LinkedField",
              "name": "parentEquipment",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EquipmentType",
                  "kind": "LinkedField",
                  "name": "equipmentType",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "EquipmentPortDefinition",
                      "kind": "LinkedField",
                      "name": "portDefinitions",
                      "plural": true,
                      "selections": (v2/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                (v4/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        (v13/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Equipment",
      "kind": "LinkedField",
      "name": "parentEquipment",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentType",
          "kind": "LinkedField",
          "name": "equipmentType",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        (v4/*: any*/)
      ],
      "storageKey": null
    },
    (v13/*: any*/)
  ],
  "type": "EquipmentPort",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "f3d4baf07d506ffa9fd1278d4f19fe50";

module.exports = ((node/*: any*/)/*: Fragment<
  PowerSearchPortsResultsTable_ports$fragmentType,
  PowerSearchPortsResultsTable_ports$data,
>*/);
