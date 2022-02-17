/**
 * @generated SignedSource<<c46314245c1d0ab040436e60e439eea5>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type DynamicPropertyTypesGrid_propertyTypes$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type LocationTypeItem_locationType$fragmentType: FragmentType;
export type LocationTypeItem_locationType$ref = LocationTypeItem_locationType$fragmentType;
export type LocationTypeItem_locationType$data = {|
  +id: string,
  +name: string,
  +index: ?number,
  +propertyTypes: $ReadOnlyArray<?{|
    +$fragmentSpreads: DynamicPropertyTypesGrid_propertyTypes$fragmentType,
  |}>,
  +numberOfLocations: number,
  +$fragmentType: LocationTypeItem_locationType$fragmentType,
|};
export type LocationTypeItem_locationType = LocationTypeItem_locationType$data;
export type LocationTypeItem_locationType$key = {
  +$data?: LocationTypeItem_locationType$data,
  +$fragmentSpreads: LocationTypeItem_locationType$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationTypeItem_locationType",
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
      "kind": "ScalarField",
      "name": "index",
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
      "kind": "ScalarField",
      "name": "numberOfLocations",
      "storageKey": null
    }
  ],
  "type": "LocationType",
  "abstractKey": null
};

(node/*: any*/).hash = "dbc429726327dcfb05c2a80d49cfa429";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationTypeItem_locationType$fragmentType,
  LocationTypeItem_locationType$data,
>*/);
