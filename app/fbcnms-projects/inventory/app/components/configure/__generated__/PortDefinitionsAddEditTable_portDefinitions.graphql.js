/**
 * @generated SignedSource<<fc2adb20ebfbd4ecd1ba69596b13ef9f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type PortDefinitionsAddEditTable_portDefinitions$fragmentType: FragmentType;
export type PortDefinitionsAddEditTable_portDefinitions$ref = PortDefinitionsAddEditTable_portDefinitions$fragmentType;
export type PortDefinitionsAddEditTable_portDefinitions$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +index: ?number,
  +visibleLabel: ?string,
  +portType: ?{|
    +id: string,
    +name: string,
  |},
  +connectedPorts: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
  |}>,
  +$fragmentType: PortDefinitionsAddEditTable_portDefinitions$fragmentType,
|}>;
export type PortDefinitionsAddEditTable_portDefinitions = PortDefinitionsAddEditTable_portDefinitions$data;
export type PortDefinitionsAddEditTable_portDefinitions$key = $ReadOnlyArray<{
  +$data?: PortDefinitionsAddEditTable_portDefinitions$data,
  +$fragmentSpreads: PortDefinitionsAddEditTable_portDefinitions$fragmentType,
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
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PortDefinitionsAddEditTable_portDefinitions",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
      "name": "visibleLabel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPortType",
      "kind": "LinkedField",
      "name": "portType",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPortDefinition",
      "kind": "LinkedField",
      "name": "connectedPorts",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "EquipmentPortDefinition",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "f2c5fd60596396613128d564008293ac";

module.exports = ((node/*: any*/)/*: Fragment<
  PortDefinitionsAddEditTable_portDefinitions$fragmentType,
  PortDefinitionsAddEditTable_portDefinitions$data,
>*/);
