/**
 * @generated SignedSource<<51045151a7ef62110bb82bcb6e04ebcc>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type PropertyTypeFormField_propertyType$fragmentType = any;
type ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$fragmentType = any;
export type DiscoveryMethod = "MANUAL" | "INVENTORY" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceTypeItem_serviceType$fragmentType: FragmentType;
export type ServiceTypeItem_serviceType$ref = ServiceTypeItem_serviceType$fragmentType;
export type ServiceTypeItem_serviceType$data = {|
  +id: string,
  +name: string,
  +discoveryMethod: DiscoveryMethod,
  +propertyTypes: $ReadOnlyArray<?{|
    +$fragmentSpreads: PropertyTypeFormField_propertyType$fragmentType,
  |}>,
  +endpointDefinitions: $ReadOnlyArray<{|
    +$fragmentSpreads: ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions$fragmentType,
  |}>,
  +numberOfServices: number,
  +$fragmentType: ServiceTypeItem_serviceType$fragmentType,
|};
export type ServiceTypeItem_serviceType = ServiceTypeItem_serviceType$data;
export type ServiceTypeItem_serviceType$key = {
  +$data?: ServiceTypeItem_serviceType$data,
  +$fragmentSpreads: ServiceTypeItem_serviceType$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServiceTypeItem_serviceType",
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
          "name": "PropertyTypeFormField_propertyType"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ServiceEndpointDefinition",
      "kind": "LinkedField",
      "name": "endpointDefinitions",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ServiceEndpointDefinitionStaticTable_serviceEndpointDefinitions"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "numberOfServices",
      "storageKey": null
    }
  ],
  "type": "ServiceType",
  "abstractKey": null
};

(node/*: any*/).hash = "bdd10c4d5e7ee31784df58baac76728d";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceTypeItem_serviceType$fragmentType,
  ServiceTypeItem_serviceType$data,
>*/);
