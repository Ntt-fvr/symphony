/**
 * @generated SignedSource<<706b5273e9178bddd2d6ff81a1df46d2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type DocumentTable_hyperlinks$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type EntityDocumentsTable_hyperlinks$fragmentType: FragmentType;
export type EntityDocumentsTable_hyperlinks$ref = EntityDocumentsTable_hyperlinks$fragmentType;
export type EntityDocumentsTable_hyperlinks$data = $ReadOnlyArray<{|
  +$fragmentSpreads: DocumentTable_hyperlinks$fragmentType,
  +$fragmentType: EntityDocumentsTable_hyperlinks$fragmentType,
|}>;
export type EntityDocumentsTable_hyperlinks = EntityDocumentsTable_hyperlinks$data;
export type EntityDocumentsTable_hyperlinks$key = $ReadOnlyArray<{
  +$data?: EntityDocumentsTable_hyperlinks$data,
  +$fragmentSpreads: EntityDocumentsTable_hyperlinks$fragmentType,
  ...
}>;
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "EntityDocumentsTable_hyperlinks",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DocumentTable_hyperlinks"
    }
  ],
  "type": "Hyperlink",
  "abstractKey": null
};

(node/*: any*/).hash = "dff4323de5cb8d1ba32bfd2518647a88";

module.exports = ((node/*: any*/)/*: Fragment<
  EntityDocumentsTable_hyperlinks$fragmentType,
  EntityDocumentsTable_hyperlinks$data,
>*/);
