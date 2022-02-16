/**
 * @generated SignedSource<<92e2a261f747ce38b3203b9a00ec5ce9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type DocumentTable_files$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type EntityDocumentsTable_files$fragmentType: FragmentType;
export type EntityDocumentsTable_files$ref = EntityDocumentsTable_files$fragmentType;
export type EntityDocumentsTable_files$data = $ReadOnlyArray<{|
  +$fragmentSpreads: DocumentTable_files$fragmentType,
  +$fragmentType: EntityDocumentsTable_files$fragmentType,
|}>;
export type EntityDocumentsTable_files = EntityDocumentsTable_files$data;
export type EntityDocumentsTable_files$key = $ReadOnlyArray<{
  +$data?: EntityDocumentsTable_files$data,
  +$fragmentSpreads: EntityDocumentsTable_files$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "EntityDocumentsTable_files",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DocumentTable_files"
    }
  ],
  "type": "File",
  "abstractKey": null
};

(node/*: any*/).hash = "bf947c22e479b0150cc5e2861374aa18";

module.exports = ((node/*: any*/)/*: Fragment<
  EntityDocumentsTable_files$fragmentType,
  EntityDocumentsTable_files$data,
>*/);
