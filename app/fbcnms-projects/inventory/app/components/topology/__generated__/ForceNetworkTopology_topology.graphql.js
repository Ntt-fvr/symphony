/**
 * @generated SignedSource<<aaa6cf385c6c9f2ad4a9b61cd20ebcc4>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ForceNetworkTopology_topology$fragmentType: FragmentType;
export type ForceNetworkTopology_topology$ref = ForceNetworkTopology_topology$fragmentType;
export type ForceNetworkTopology_topology$data = {|
  +nodes: $ReadOnlyArray<{|
    +id: string,
  |}>,
  +links: $ReadOnlyArray<{|
    +source: {|
      +id: string,
    |},
    +target: {|
      +id: string,
    |},
  |}>,
  +$fragmentType: ForceNetworkTopology_topology$fragmentType,
|};
export type ForceNetworkTopology_topology = ForceNetworkTopology_topology$data;
export type ForceNetworkTopology_topology$key = {
  +$data?: ForceNetworkTopology_topology$data,
  +$fragmentSpreads: ForceNetworkTopology_topology$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ForceNetworkTopology_topology",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "nodes",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "TopologyLink",
      "kind": "LinkedField",
      "name": "links",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "source",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "target",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NetworkTopology",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "63b721aff87697366221cbc6250df26e";

module.exports = ((node/*: any*/)/*: Fragment<
  ForceNetworkTopology_topology$fragmentType,
  ForceNetworkTopology_topology$data,
>*/);
