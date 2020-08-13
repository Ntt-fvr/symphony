/**
 * @generated
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 **/

 /**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ServiceLinksView_links$ref: FragmentReference;
declare export opaque type ServiceLinksView_links$fragmentType: ServiceLinksView_links$ref;
export type ServiceLinksView_links = $ReadOnlyArray<{|
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
  +$refType: ServiceLinksView_links$ref,
|}>;
export type ServiceLinksView_links$data = ServiceLinksView_links;
export type ServiceLinksView_links$key = $ReadOnlyArray<{
  +$data?: ServiceLinksView_links$data,
  +$fragmentRefs: ServiceLinksView_links$ref,
  ...
}>;
*/


const node/*: ReaderFragment*/ = (function(){
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
  "name": "ServiceLinksView_links",
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
// prettier-ignore
(node/*: any*/).hash = '0e01ac9e52351ad401bac91867ae8714';

module.exports = node;
