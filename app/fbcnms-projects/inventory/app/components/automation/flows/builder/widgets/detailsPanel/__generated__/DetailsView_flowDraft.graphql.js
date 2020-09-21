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
declare export opaque type DetailsView_flowDraft$ref: FragmentReference;
declare export opaque type DetailsView_flowDraft$fragmentType: DetailsView_flowDraft$ref;
export type DetailsView_flowDraft = {|
  +name: string,
  +$refType: DetailsView_flowDraft$ref,
|};
export type DetailsView_flowDraft$data = DetailsView_flowDraft;
export type DetailsView_flowDraft$key = {
  +$data?: DetailsView_flowDraft$data,
  +$fragmentRefs: DetailsView_flowDraft$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DetailsView_flowDraft",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "FlowDraft",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '69315dd1566abf860feed5e9fc06a136';

module.exports = node;
