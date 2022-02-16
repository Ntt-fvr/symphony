/**
 * @generated SignedSource<<9427ab2d922402c9d4398544ff91fcdf>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type FlowInstanceStatus = "IN_PROGRESS" | "FAILED" | "COMPLETED" | "CANCELED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type FlowInstancesView_query$fragmentType: FragmentType;
export type FlowInstancesView_query$ref = FlowInstancesView_query$fragmentType;
type FlowInstancesViewPaginationQuery$variables = any;
export type FlowInstancesView_query$data = {|
  +flowInstances: {|
    +totalCount: number,
    +edges: ?$ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +status: FlowInstanceStatus,
        +startDate: any,
        +endDate: ?any,
        +bssCode: string,
        +serviceInstanceCode: ?string,
        +template: {|
          +id: string,
          +name: string,
        |},
      |},
    |}>,
  |},
  +$fragmentType: FlowInstancesView_query$fragmentType,
|};
export type FlowInstancesView_query = FlowInstancesView_query$data;
export type FlowInstancesView_query$key = {
  +$data?: FlowInstancesView_query$data,
  +$fragmentSpreads: FlowInstancesView_query$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = [
  "flowInstances"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "filterBy"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "orderBy"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./FlowInstancesViewPaginationQuery.graphql')
    }
  },
  "name": "FlowInstancesView_query",
  "selections": [
    {
      "alias": "flowInstances",
      "args": [
        {
          "kind": "Variable",
          "name": "filterBy",
          "variableName": "filterBy"
        },
        {
          "kind": "Variable",
          "name": "orderBy",
          "variableName": "orderBy"
        }
      ],
      "concreteType": "FlowInstanceConnection",
      "kind": "LinkedField",
      "name": "__FlowInstancesView_flowInstances_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "FlowInstanceEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "FlowInstance",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "status",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "startDate",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endDate",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "bssCode",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "serviceInstanceCode",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "FlowExecutionTemplate",
                  "kind": "LinkedField",
                  "name": "template",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "5638d06230090775fb1733edaf39f546";

module.exports = ((node/*: any*/)/*: RefetchableFragment<
  FlowInstancesView_query$fragmentType,
  FlowInstancesView_query$data,
  FlowInstancesViewPaginationQuery$variables,
>*/);
