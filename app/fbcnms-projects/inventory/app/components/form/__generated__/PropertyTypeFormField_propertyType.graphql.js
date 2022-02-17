/**
 * @generated SignedSource<<b2e5d0f2705ad755cf38691680e38ad9>>
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
declare export opaque type PropertyTypeFormField_propertyType$fragmentType: FragmentType;
export type PropertyTypeFormField_propertyType$ref = PropertyTypeFormField_propertyType$fragmentType;
export type PropertyTypeFormField_propertyType$data = {|
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
  +$fragmentType: PropertyTypeFormField_propertyType$fragmentType,
|};
export type PropertyTypeFormField_propertyType = PropertyTypeFormField_propertyType$data;
export type PropertyTypeFormField_propertyType$key = {
  +$data?: PropertyTypeFormField_propertyType$data,
  +$fragmentSpreads: PropertyTypeFormField_propertyType$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PropertyTypeFormField_propertyType",
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
  "type": "PropertyType",
  "abstractKey": null
};

(node/*: any*/).hash = "e9ebc13a5940b5ac262a1d0496f2253c";

module.exports = ((node/*: any*/)/*: Fragment<
  PropertyTypeFormField_propertyType$fragmentType,
  PropertyTypeFormField_propertyType$data,
>*/);
