/**
 * @generated SignedSource<<1a8fd76189b173750ad8f816b709ac6f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ServiceLinksAndPortsView_links$fragmentType: FragmentType;
export type ServiceLinksAndPortsView_links$ref = ServiceLinksAndPortsView_links$fragmentType;
export type ServiceLinksAndPortsView_links$data = $ReadOnlyArray<{|
  +id: string,
  +ports: $ReadOnlyArray<?{|
    +parentEquipment: {|
      +id: string,
      +name: string,
    |},
    +definition: {|
      +id: string,
      +name: string,
    |},
  |}>,
  +$fragmentType: ServiceLinksAndPortsView_links$fragmentType,
|}>;
export type ServiceLinksAndPortsView_links = ServiceLinksAndPortsView_links$data;
export type ServiceLinksAndPortsView_links$key = $ReadOnlyArray<{
  +$data?: ServiceLinksAndPortsView_links$data,
  +$fragmentSpreads: ServiceLinksAndPortsView_links$fragmentType,
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
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ServiceLinksAndPortsView_links",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPort",
      "kind": "LinkedField",
      "name": "ports",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Equipment",
          "kind": "LinkedField",
          "name": "parentEquipment",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPortDefinition",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Link",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "dac279cc0466da09947a7a4de86cfa09";

module.exports = ((node/*: any*/)/*: Fragment<
  ServiceLinksAndPortsView_links$fragmentType,
  ServiceLinksAndPortsView_links$data,
>*/);
