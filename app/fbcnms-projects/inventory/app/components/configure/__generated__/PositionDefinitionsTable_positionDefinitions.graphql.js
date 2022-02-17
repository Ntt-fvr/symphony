/**
 * @generated SignedSource<<19f16a32cbb0d741aa6bd3be346ae546>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type PositionDefinitionsTable_positionDefinitions$fragmentType: FragmentType;
export type PositionDefinitionsTable_positionDefinitions$ref = PositionDefinitionsTable_positionDefinitions$fragmentType;
export type PositionDefinitionsTable_positionDefinitions$data = $ReadOnlyArray<{|
  +id: string,
  +name: string,
  +index: ?number,
  +visibleLabel: ?string,
  +$fragmentType: PositionDefinitionsTable_positionDefinitions$fragmentType,
|}>;
export type PositionDefinitionsTable_positionDefinitions = PositionDefinitionsTable_positionDefinitions$data;
export type PositionDefinitionsTable_positionDefinitions$key = $ReadOnlyArray<{
  +$data?: PositionDefinitionsTable_positionDefinitions$data,
  +$fragmentSpreads: PositionDefinitionsTable_positionDefinitions$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PositionDefinitionsTable_positionDefinitions",
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
      "name": "visibleLabel",
      "storageKey": null
    }
  ],
  "type": "EquipmentPositionDefinition",
  "abstractKey": null
};

(node/*: any*/).hash = "e380bf28ed2fa9bb1090ea936f6e7b25";

module.exports = ((node/*: any*/)/*: Fragment<
  PositionDefinitionsTable_positionDefinitions$fragmentType,
  PositionDefinitionsTable_positionDefinitions$data,
>*/);
