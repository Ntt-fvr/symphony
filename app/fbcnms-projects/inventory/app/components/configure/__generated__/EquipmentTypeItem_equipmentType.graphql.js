/**
 * @generated SignedSource<<d04776630abe2f22639be1cd648e3eb1>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type DynamicPropertyTypesGrid_propertyTypes$fragmentType = any;
type PortDefinitionsTable_portDefinitions$fragmentType = any;
type PositionDefinitionsTable_positionDefinitions$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type EquipmentTypeItem_equipmentType$fragmentType: FragmentType;
export type EquipmentTypeItem_equipmentType$ref = EquipmentTypeItem_equipmentType$fragmentType;
export type EquipmentTypeItem_equipmentType$data = {|
  +id: string,
  +name: string,
  +propertyTypes: $ReadOnlyArray<?{|
    +$fragmentSpreads: DynamicPropertyTypesGrid_propertyTypes$fragmentType,
  |}>,
  +positionDefinitions: $ReadOnlyArray<?{|
    +$fragmentSpreads: PositionDefinitionsTable_positionDefinitions$fragmentType,
  |}>,
  +portDefinitions: $ReadOnlyArray<?{|
    +$fragmentSpreads: PortDefinitionsTable_portDefinitions$fragmentType,
  |}>,
  +numberOfEquipment: number,
  +$fragmentType: EquipmentTypeItem_equipmentType$fragmentType,
|};
export type EquipmentTypeItem_equipmentType = EquipmentTypeItem_equipmentType$data;
export type EquipmentTypeItem_equipmentType$key = {
  +$data?: EquipmentTypeItem_equipmentType$data,
  +$fragmentSpreads: EquipmentTypeItem_equipmentType$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EquipmentTypeItem_equipmentType",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "propertyTypes",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DynamicPropertyTypesGrid_propertyTypes"
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PositionDefinitionsTable_positionDefinitions"
        }
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PortDefinitionsTable_portDefinitions"
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

(node/*: any*/).hash = "c31a356dc2022425956e57facd0ae246";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentTypeItem_equipmentType$fragmentType,
  EquipmentTypeItem_equipmentType$data,
>*/);
