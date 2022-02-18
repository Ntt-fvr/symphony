/**
 * @generated SignedSource<<39903fccdf1cf0d1f57ca38861502154>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type AddToEquipmentDialog_parentEquipment$fragmentType: FragmentType;
export type AddToEquipmentDialog_parentEquipment$ref = AddToEquipmentDialog_parentEquipment$fragmentType;
export type AddToEquipmentDialog_parentEquipment$data = {|
  +id: string,
  +locationHierarchy: $ReadOnlyArray<{|
    +id: string,
  |}>,
  +$fragmentType: AddToEquipmentDialog_parentEquipment$fragmentType,
|};
export type AddToEquipmentDialog_parentEquipment = AddToEquipmentDialog_parentEquipment$data;
export type AddToEquipmentDialog_parentEquipment$key = {
  +$data?: AddToEquipmentDialog_parentEquipment$data,
  +$fragmentSpreads: AddToEquipmentDialog_parentEquipment$fragmentType,
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddToEquipmentDialog_parentEquipment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "locationHierarchy",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Equipment",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "5f1bb222d3448e6445d42e84470b6d5c";

module.exports = ((node/*: any*/)/*: Fragment<
  AddToEquipmentDialog_parentEquipment$fragmentType,
  AddToEquipmentDialog_parentEquipment$data,
>*/);
