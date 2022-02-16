/**
 * @generated SignedSource<<302fa86c5e2a7410de1f9f0cd52d5279>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type PropertyFormField_property$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type DynamicPropertiesGrid_properties$fragmentType: FragmentType;
export type DynamicPropertiesGrid_properties$ref = DynamicPropertiesGrid_properties$fragmentType;
export type DynamicPropertiesGrid_properties$data = $ReadOnlyArray<{|
  +propertyType: {|
    +id: string,
    +index: ?number,
  |},
  +$fragmentSpreads: PropertyFormField_property$fragmentType,
  +$fragmentType: DynamicPropertiesGrid_properties$fragmentType,
|}>;
export type DynamicPropertiesGrid_properties = DynamicPropertiesGrid_properties$data;
export type DynamicPropertiesGrid_properties$key = $ReadOnlyArray<{
  +$data?: DynamicPropertiesGrid_properties$data,
  +$fragmentSpreads: DynamicPropertiesGrid_properties$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DynamicPropertiesGrid_properties",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PropertyFormField_property"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "propertyType",
      "plural": false,
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
          "name": "index",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Property",
  "abstractKey": null
};

(node/*: any*/).hash = "7b83547f439381a2346b2b5c487b5134";

module.exports = ((node/*: any*/)/*: Fragment<
  DynamicPropertiesGrid_properties$fragmentType,
  DynamicPropertiesGrid_properties$data,
>*/);
