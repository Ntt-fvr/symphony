/**
 * @generated SignedSource<<9c51129dfeb5314581807519b3265567>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type DynamicPropertiesGrid_propertyTypes$fragmentType: FragmentType;
export type DynamicPropertiesGrid_propertyTypes$ref = DynamicPropertiesGrid_propertyTypes$fragmentType;
export type DynamicPropertiesGrid_propertyTypes$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +index: ?number,
  +isInstanceProperty: ?boolean,
  +type: PropertyKind,
  +nodeType: ?string,
  +stringValue: ?string,
  +intValue: ?number,
  +booleanValue: ?boolean,
  +latitudeValue: ?number,
  +longitudeValue: ?number,
  +rangeFromValue: ?number,
  +rangeToValue: ?number,
  +floatValue: ?number,
  +$fragmentType: DynamicPropertiesGrid_propertyTypes$fragmentType,
|}>;
export type DynamicPropertiesGrid_propertyTypes = DynamicPropertiesGrid_propertyTypes$data;
export type DynamicPropertiesGrid_propertyTypes$key = $ReadOnlyArray<{
  +$data?: DynamicPropertiesGrid_propertyTypes$data,
  +$fragmentSpreads: DynamicPropertiesGrid_propertyTypes$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DynamicPropertiesGrid_propertyTypes",
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
      "kind": "ScalarField",
      "name": "isInstanceProperty",
      "storageKey": null
    },
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
      "name": "floatValue",
      "storageKey": null
    }
  ],
  "type": "PropertyType",
  "abstractKey": null
};

(node/*: any*/).hash = "f28bea12cb3a2126f30e1696b5d6f117";

module.exports = ((node/*: any*/)/*: Fragment<
  DynamicPropertiesGrid_propertyTypes$fragmentType,
  DynamicPropertiesGrid_propertyTypes$data,
>*/);
