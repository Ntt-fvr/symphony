/**
 * @generated SignedSource<<e8719e19e13b1990e84c3cd35af8e2d8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type PositionDefinitionsAddEditTable_positionDefinition$fragmentType: FragmentType;
export type PositionDefinitionsAddEditTable_positionDefinition$ref = PositionDefinitionsAddEditTable_positionDefinition$fragmentType;
export type PositionDefinitionsAddEditTable_positionDefinition$data = {
  +id: string,
  +name: string,
  +index: ?number,
  +visibleLabel: ?string,
  ...
};
export type PositionDefinitionsAddEditTable_positionDefinition = PositionDefinitionsAddEditTable_positionDefinition$data;
export type PositionDefinitionsAddEditTable_positionDefinition$key = {
  +$data?: PositionDefinitionsAddEditTable_positionDefinition$data,
  +$fragmentSpreads: PositionDefinitionsAddEditTable_positionDefinition$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "mask": false
  },
  "name": "PositionDefinitionsAddEditTable_positionDefinition",
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

(node/*: any*/).hash = "3952fd6597286104bfc0889a1d16bb1a";

module.exports = ((node/*: any*/)/*: Fragment<
  PositionDefinitionsAddEditTable_positionDefinition$fragmentType,
  PositionDefinitionsAddEditTable_positionDefinition$data,
>*/);
