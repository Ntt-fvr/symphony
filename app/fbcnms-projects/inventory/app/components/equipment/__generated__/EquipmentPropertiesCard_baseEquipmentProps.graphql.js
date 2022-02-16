/**
 * @generated SignedSource<<a5e52a806362c3a749eb608df3aa6c3e>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type FutureState = "INSTALL" | "REMOVE" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type EquipmentPropertiesCard_baseEquipmentProps$fragmentType: FragmentType;
export type EquipmentPropertiesCard_baseEquipmentProps$ref = EquipmentPropertiesCard_baseEquipmentProps$fragmentType;
export type EquipmentPropertiesCard_baseEquipmentProps$data = {
  +id: string,
  +name: string,
  +futureState: ?FutureState,
  +parentLocation: ?{
    +id: string,
    +name: string,
    ...
  },
  ...
};
export type EquipmentPropertiesCard_baseEquipmentProps = EquipmentPropertiesCard_baseEquipmentProps$data;
export type EquipmentPropertiesCard_baseEquipmentProps$key = {
  +$data?: EquipmentPropertiesCard_baseEquipmentProps$data,
  +$fragmentSpreads: EquipmentPropertiesCard_baseEquipmentProps$fragmentType,
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
  "metadata": {
    "mask": false
  },
  "name": "EquipmentPropertiesCard_baseEquipmentProps",
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
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "parentLocation",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Equipment",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "38c108dd662662f36827a889ffc2706f";

module.exports = ((node/*: any*/)/*: Fragment<
  EquipmentPropertiesCard_baseEquipmentProps$fragmentType,
  EquipmentPropertiesCard_baseEquipmentProps$data,
>*/);
