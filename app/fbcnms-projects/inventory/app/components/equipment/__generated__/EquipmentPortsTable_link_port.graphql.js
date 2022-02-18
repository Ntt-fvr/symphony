/**
 * @generated SignedSource<<e680a4f0f15c2cea4205bf48307c5075>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type EquipmentBreadcrumbs_equipment$fragmentType = any;
export type FutureState = "INSTALL" | "REMOVE" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type EquipmentPortsTable_link_port$fragmentType: FragmentType;
export type EquipmentPortsTable_link_port$ref = EquipmentPortsTable_link_port$fragmentType;
export type EquipmentPortsTable_link_port$data = {|
  +id: string,
  +definition: {|
    +id: string,
    +name: string,
    +visibleLabel: ?string,
    +portType: ?{|
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
        +rangeFromValue: ?number,
        +rangeToValue: ?number,
        +isEditable: ?boolean,
        +isInstanceProperty: ?boolean,
        +isMandatory: ?boolean,
        +category: ?string,
        +isDeleted: ?boolean,
      |}>,
    |},
  |},
  +parentEquipment: {|
    +id: string,
    +name: string,
    +futureState: ?FutureState,
    +equipmentType: {|
      +id: string,
      +name: string,
    |},
    +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
  |},
  +serviceEndpoints: $ReadOnlyArray<{|
    +definition: {|
      +role: ?string,
    |},
    +service: {|
      +name: string,
    |},
  |}>,
  +$fragmentType: EquipmentPortsTable_link_port$fragmentType,
|};
export type EquipmentPortsTable_link_port = EquipmentPortsTable_link_port$data;
export type EquipmentPortsTable_link_port$key = {
  +$data?: EquipmentPortsTable_link_port$data,
  +$fragmentSpreads: EquipmentPortsTable_link_port$fragmentType,
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EquipmentPortsTable_link_port",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPortDefinition",
      "kind": "LinkedField",
      "name": "definition",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "visibleLabel",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPortType",
          "kind": "LinkedField",
          "name": "portType",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PropertyType",
              "kind": "LinkedField",
              "name": "linkPropertyTypes",
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
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
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
          "kind": "ScalarField",
          "name": "futureState",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentType",
          "kind": "LinkedField",
          "name": "equipmentType",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EquipmentBreadcrumbs_equipment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ServiceEndpoint",
      "kind": "LinkedField",
      "name": "serviceEndpoints",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ServiceEndpointDefinition",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "role",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Service",
          "kind": "LinkedField",
          "name": "service",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "EquipmentPort",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "7862fde7be9146274a4a5678aea147a8";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentPortsTable_link_port$fragmentType,
  EquipmentPortsTable_link_port$data,
>*/);
