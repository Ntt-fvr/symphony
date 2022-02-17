/**
 * @generated SignedSource<<215521bf1a002058e7313d2da0973c12>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type EquipmentBreadcrumbs_equipment$fragmentType: FragmentType;
export type EquipmentBreadcrumbs_equipment$ref = EquipmentBreadcrumbs_equipment$fragmentType;
export type EquipmentBreadcrumbs_equipment$data = {|
  +id: string,
  +name: string,
  +equipmentType: {|
    +id: string,
    +name: string,
  |},
  +locationHierarchy: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +locationType: {|
      +name: string,
    |},
  |}>,
  +positionHierarchy: $ReadOnlyArray<{|
    +id: string,
    +definition: {|
      +id: string,
      +name: string,
      +visibleLabel: ?string,
    |},
    +parentEquipment: {|
      +id: string,
      +name: string,
      +equipmentType: {|
        +id: string,
        +name: string,
      |},
    |},
  |}>,
  +$fragmentType: EquipmentBreadcrumbs_equipment$fragmentType,
|};
export type EquipmentBreadcrumbs_equipment = EquipmentBreadcrumbs_equipment$data;
export type EquipmentBreadcrumbs_equipment$key = {
  +$data?: EquipmentBreadcrumbs_equipment$data,
  +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
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
  "concreteType": "EquipmentType",
  "kind": "LinkedField",
  "name": "equipmentType",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EquipmentBreadcrumbs_equipment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "locationHierarchy",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationType",
          "kind": "LinkedField",
          "name": "locationType",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPosition",
      "kind": "LinkedField",
      "name": "positionHierarchy",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPositionDefinition",
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
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Equipment",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "16aecc58a50e73e65b4a6094e719a457";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentBreadcrumbs_equipment$fragmentType,
  EquipmentBreadcrumbs_equipment$data,
>*/);
