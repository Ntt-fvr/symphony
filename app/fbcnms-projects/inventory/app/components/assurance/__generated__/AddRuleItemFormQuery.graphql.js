/**
 * @generated SignedSource<<90099e355310a70da482c73a20af1487>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AddRuleItemFormQuery$variables = {||};
export type AddRuleItemFormQueryVariables = AddRuleItemFormQuery$variables;
export type AddRuleItemFormQuery$data = {|
  +eventSeverities: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
  +comparators: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
  +ruleTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +name: string,
      |},
    |}>,
  |},
|};
export type AddRuleItemFormQueryResponse = AddRuleItemFormQuery$data;
export type AddRuleItemFormQuery = {|
  variables: AddRuleItemFormQueryVariables,
  response: AddRuleItemFormQuery$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "EventSeverityConnection",
    "kind": "LinkedField",
    "name": "eventSeverities",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "EventSeverityEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventSeverity",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ComparatorConnection",
    "kind": "LinkedField",
    "name": "comparators",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ComparatorEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Comparator",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "RuleTypeConnection",
    "kind": "LinkedField",
    "name": "ruleTypes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RuleTypeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RuleType",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddRuleItemFormQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AddRuleItemFormQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "87713f41602da8e7b3b60a945c89e2fd",
    "id": null,
    "metadata": {},
    "name": "AddRuleItemFormQuery",
    "operationKind": "query",
    "text": "query AddRuleItemFormQuery {\n  eventSeverities {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  comparators {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  ruleTypes {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "10ccdaae7cb934622ec9af64dd160b5b";

module.exports = ((node/*: any*/)/*: Query<
  AddRuleItemFormQuery$variables,
  AddRuleItemFormQuery$data,
>*/);
