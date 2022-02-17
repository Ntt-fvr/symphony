/**
 * @generated SignedSource<<684bacf7c8a3f244a1f94d826c5ddb41>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type FileAttachment_file$fragmentType = any;
import type { FragmentType } from "relay-runtime";
declare export opaque type LocationFloorPlansTab_location$fragmentType: FragmentType;
export type LocationFloorPlansTab_location$ref = LocationFloorPlansTab_location$fragmentType;
export type LocationFloorPlansTab_location$data = {|
  +id: string,
  +floorPlans: $ReadOnlyArray<?{|
    +id: string,
    +name: string,
    +image: {|
      +$fragmentSpreads: FileAttachment_file$fragmentType,
    |},
  |}>,
  +$fragmentType: LocationFloorPlansTab_location$fragmentType,
|};
export type LocationFloorPlansTab_location = LocationFloorPlansTab_location$data;
export type LocationFloorPlansTab_location$key = {
  +$data?: LocationFloorPlansTab_location$data,
  +$fragmentSpreads: LocationFloorPlansTab_location$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationFloorPlansTab_location",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "FloorPlan",
      "kind": "LinkedField",
      "name": "floorPlans",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
          "concreteType": "File",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FileAttachment_file"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "33ba200160169ecb72ef20fca4c58fe5";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationFloorPlansTab_location$fragmentType,
  LocationFloorPlansTab_location$data,
>*/);
