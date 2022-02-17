/**
 * @generated SignedSource<<b3321d60584b7b68f3280fdf9f150446>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type DynamicPropertiesGrid_properties$fragmentType = any;
type DynamicPropertiesGrid_propertyTypes$fragmentType = any;
type PropertyFormField_property$fragmentType = any;
type PropertyTypeFormField_propertyType$fragmentType = any;
export type DiscoveryMethod = "MANUAL" | "INVENTORY" | "%future added value";
export type ServiceStatus = "PENDING" | "IN_SERVICE" | "MAINTENANCE" | "DISCONNECTED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ServicesView_service$fragmentType: FragmentType;
export type ServicesView_service$ref = ServicesView_service$fragmentType;
export type ServicesView_service$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +externalId: ?string,
  +status: ServiceStatus,
  +customer: ?{|
    +id: string,
    +name: string,
  |},
  +serviceType: {|
    +id: string,
    +name: string,
    +discoveryMethod: DiscoveryMethod,
    +propertyTypes: $ReadOnlyArray<?{|
      +$fragmentSpreads: PropertyTypeFormField_propertyType$fragmentType & DynamicPropertiesGrid_propertyTypes$fragmentType,
    |}>,
  |},
  +properties: $ReadOnlyArray<?{|
    +$fragmentSpreads: PropertyFormField_property$fragmentType & DynamicPropertiesGrid_properties$fragmentType,
  |}>,
  +$fragmentType: ServicesView_service$fragmentType,
|}>;
export type ServicesView_service = ServicesView_service$data;
export type ServicesView_service$key = $ReadOnlyArray<{
  +$data?: ServicesView_service$data,
  +$fragmentSpreads: ServicesView_service$fragmentType,
  ...
}>;
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
    "plural": true
  },
  "name": "ServicesView_service",
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
      "kind": "ScalarField",
      "name": "status",
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
        (v0/*: any*/),
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
        (v1/*: any*/),
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
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DynamicPropertiesGrid_propertyTypes"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Property",
      "kind": "LinkedField",
      "name": "properties",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PropertyFormField_property"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DynamicPropertiesGrid_properties"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Service",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "082bbb9aa27247bc35148e31b2a04903";

module.exports = ((node/*: any*/)/*: Fragment<
  ServicesView_service$fragmentType,
  ServicesView_service$data,
>*/);
