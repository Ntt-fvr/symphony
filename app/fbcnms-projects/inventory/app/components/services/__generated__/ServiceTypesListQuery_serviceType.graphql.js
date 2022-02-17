/**
 * @generated SignedSource<<d2c64e45b2fff922e0d7cfc9129f9508>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type DiscoveryMethod = "MANUAL" | "INVENTORY" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceTypesListQuery_serviceType$fragmentType: FragmentType;
export type ServiceTypesListQuery_serviceType$ref = ServiceTypesListQuery_serviceType$fragmentType;
export type ServiceTypesListQuery_serviceType$data = {|
  +id: string,
  +name: string,
  +discoveryMethod: DiscoveryMethod,
  +$fragmentType: ServiceTypesListQuery_serviceType$fragmentType,
|};
export type ServiceTypesListQuery_serviceType = ServiceTypesListQuery_serviceType$data;
export type ServiceTypesListQuery_serviceType$key = {
  +$data?: ServiceTypesListQuery_serviceType$data,
  +$fragmentSpreads: ServiceTypesListQuery_serviceType$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServiceTypesListQuery_serviceType",
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
      "name": "discoveryMethod",
      "storageKey": null
    }
  ],
  "type": "ServiceType",
  "abstractKey": null
};

(node/*: any*/).hash = "746b4b7d14876a363b38950f2f7ab94d";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceTypesListQuery_serviceType$fragmentType,
  ServiceTypesListQuery_serviceType$data,
>*/);
