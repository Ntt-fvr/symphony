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
declare export opaque type PortDefinitionsAddEditTable_portDefinitions$ref: FragmentReference;
declare export opaque type PortDefinitionsAddEditTable_portDefinitions$fragmentType: PortDefinitionsAddEditTable_portDefinitions$ref;
export type PortDefinitionsAddEditTable_portDefinitions = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +index: ?number,
  +visibleLabel: ?string,
  +portType: ?{|
    +id: string,
    +name: string,
  |},
  +$refType: PortDefinitionsAddEditTable_portDefinitions$ref,
|}>;
export type PortDefinitionsAddEditTable_portDefinitions$data = PortDefinitionsAddEditTable_portDefinitions;
export type PortDefinitionsAddEditTable_portDefinitions$key = $ReadOnlyArray<{
  +$data?: PortDefinitionsAddEditTable_portDefinitions$data,
  +$fragmentRefs: PortDefinitionsAddEditTable_portDefinitions$ref,
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
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "EquipmentPortDefinition",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '02bde9d17bd7bb5430914f693cdd659b';

module.exports = node;
