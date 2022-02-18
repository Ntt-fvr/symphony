/**
 * @generated SignedSource<<1a43066319bb5470e7248c09026842b4>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type LocationBreadcrumbsTitle_locationDetails$fragmentType: FragmentType;
export type LocationBreadcrumbsTitle_locationDetails$ref = LocationBreadcrumbsTitle_locationDetails$fragmentType;
export type LocationBreadcrumbsTitle_locationDetails$data = {|
  +id: string,
  +name: string,
  +locationType: {|
    +name: string,
  |},
  +locationHierarchy: $ReadOnlyArray<{|
    +id: string,
    +name: string,
    +locationType: {|
      +name: string,
    |},
  |}>,
  +$fragmentType: LocationBreadcrumbsTitle_locationDetails$fragmentType,
|};
export type LocationBreadcrumbsTitle_locationDetails = LocationBreadcrumbsTitle_locationDetails$data;
export type LocationBreadcrumbsTitle_locationDetails$key = {
  +$data?: LocationBreadcrumbsTitle_locationDetails$data,
  +$fragmentSpreads: LocationBreadcrumbsTitle_locationDetails$fragmentType,
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "LocationType",
  "kind": "LinkedField",
  "name": "locationType",
  "plural": false,
  "selections": [
    (v1/*: any*/)
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocationBreadcrumbsTitle_locationDetails",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "locationHierarchy",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Location",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "807c6b11117d3143cb9babd7a3239785";

module.exports = ((node/*: any*/)/*: Fragment<
  LocationBreadcrumbsTitle_locationDetails$fragmentType,
  LocationBreadcrumbsTitle_locationDetails$data,
>*/);
