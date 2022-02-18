/**
 * @generated SignedSource<<7a34887047da4a746fbdcb31d8b0a3de>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type PropertyTypeFormField_propertyType$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type DynamicPropertyTypesGrid_propertyTypes$fragmentType: FragmentType;
export type DynamicPropertyTypesGrid_propertyTypes$ref = DynamicPropertyTypesGrid_propertyTypes$fragmentType;
export type DynamicPropertyTypesGrid_propertyTypes$data = $ReadOnlyArray<{|
  +id: string,
  +index: ?number,
  +$fragmentSpreads: PropertyTypeFormField_propertyType$fragmentType,
  +$fragmentType: DynamicPropertyTypesGrid_propertyTypes$fragmentType,
|}>;
export type DynamicPropertyTypesGrid_propertyTypes = DynamicPropertyTypesGrid_propertyTypes$data;
export type DynamicPropertyTypesGrid_propertyTypes$key = $ReadOnlyArray<{
  +$data?: DynamicPropertyTypesGrid_propertyTypes$data,
  +$fragmentSpreads: DynamicPropertyTypesGrid_propertyTypes$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DynamicPropertyTypesGrid_propertyTypes",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PropertyTypeFormField_propertyType"
    },
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
      "name": "index",
      "storageKey": null
    }
  ],
  "type": "PropertyType",
  "abstractKey": null
};

(node/*: any*/).hash = "199f86b427d215c1e7c8d70543451535";

module.exports = ((node/*: any*/)/*: Fragment<
  DynamicPropertyTypesGrid_propertyTypes$fragmentType,
  DynamicPropertyTypesGrid_propertyTypes$data,
>*/);
