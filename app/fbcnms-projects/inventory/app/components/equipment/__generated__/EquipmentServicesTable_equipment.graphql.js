/**
 * @generated SignedSource<<71f832829e70121b969c5f78cac78428>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type EquipmentServicesTable_equipment$fragmentType: FragmentType;
export type EquipmentServicesTable_equipment$ref = EquipmentServicesTable_equipment$fragmentType;
export type EquipmentServicesTable_equipment$data = {|
  +id: string,
  +name: string,
  +services: $ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +externalId: ?string,
    +customer: ?{|
      +name: string,
    |},
    +serviceType: {|
      +id: string,
      +name: string,
    |},
  |}>,
  +$fragmentType: EquipmentServicesTable_equipment$fragmentType,
|};
export type EquipmentServicesTable_equipment = EquipmentServicesTable_equipment$data;
export type EquipmentServicesTable_equipment$key = {
  +$data?: EquipmentServicesTable_equipment$data,
  +$fragmentSpreads: EquipmentServicesTable_equipment$fragmentType,
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
  "name": "EquipmentServicesTable_equipment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Service",
      "kind": "LinkedField",
      "name": "services",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "externalId",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Customer",
          "kind": "LinkedField",
          "name": "customer",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ServiceType",
          "kind": "LinkedField",
          "name": "serviceType",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
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

(node/*: any*/).hash = "26ffdbf9cc9e158c631da821bc4d0393";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentServicesTable_equipment$fragmentType,
  EquipmentServicesTable_equipment$data,
>*/);
