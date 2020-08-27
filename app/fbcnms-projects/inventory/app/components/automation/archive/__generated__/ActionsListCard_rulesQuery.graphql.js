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
import type { ConcreteRequest } from 'relay-runtime';
type ActionsListCard_actionsRule$ref = any;
export type ActionsListCard_rulesQueryVariables = {||};
export type ActionsListCard_rulesQueryResponse = {|
  +actionsRules: ?{|
    +results: $ReadOnlyArray<?{|
      +$fragmentRefs: ActionsListCard_actionsRule$ref
    |}>
  |}
|};
export type ActionsListCard_rulesQuery = {|
  variables: ActionsListCard_rulesQueryVariables,
  response: ActionsListCard_rulesQueryResponse,
|};
*/


/*
query ActionsListCard_rulesQuery {
  actionsRules {
    results {
      ...ActionsListCard_actionsRule
      id
    }
  }
}

fragment ActionRow_data on ActionsTrigger {
  triggerID
  supportedActions {
    actionID
    dataType
    description
  }
}

fragment ActionsAddDialog_triggerData on ActionsTrigger {
  triggerID
  description
  ...ActionRow_data
  ...TriggerFilterRow_data
}

fragment ActionsListCard_actionsRule on ActionsRule {
  id
  name
  trigger {
    description
    ...ActionsAddDialog_triggerData
    id
  }
  ruleActions {
    actionID
    data
  }
  ruleFilters {
    filterID
    operatorID
    data
  }
}

fragment TriggerFilterOperator_data on ActionsFilter {
  supportedOperators {
    operatorID
    description
    dataType
  }
}

fragment TriggerFilterRow_data on ActionsTrigger {
  triggerID
  supportedFilters {
    filterID
    description
    supportedOperators {
      operatorID
    }
    ...TriggerFilterOperator_data
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
  "name": "description",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "actionID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dataType",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "filterID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "operatorID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "data",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActionsListCard_rulesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionsRulesSearchResult",
        "kind": "LinkedField",
        "name": "actionsRules",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionsRule",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ActionsListCard_actionsRule"
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
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ActionsListCard_rulesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionsRulesSearchResult",
        "kind": "LinkedField",
        "name": "actionsRules",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionsRule",
            "kind": "LinkedField",
            "name": "results",
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
                "concreteType": "ActionsTrigger",
                "kind": "LinkedField",
                "name": "trigger",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "triggerID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ActionsAction",
                    "kind": "LinkedField",
                    "name": "supportedActions",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ActionsFilter",
                    "kind": "LinkedField",
                    "name": "supportedFilters",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ActionsOperator",
                        "kind": "LinkedField",
                        "name": "supportedOperators",
                        "plural": true,
                        "selections": [
                          (v5/*: any*/),
                          (v1/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ActionsRuleAction",
                "kind": "LinkedField",
                "name": "ruleActions",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ActionsRuleFilter",
                "kind": "LinkedField",
                "name": "ruleFilters",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d7f4d605fc40187c8f2901c7b33cb45b",
    "id": null,
    "metadata": {},
    "name": "ActionsListCard_rulesQuery",
    "operationKind": "query",
    "text": "query ActionsListCard_rulesQuery {\n  actionsRules {\n    results {\n      ...ActionsListCard_actionsRule\n      id\n    }\n  }\n}\n\nfragment ActionRow_data on ActionsTrigger {\n  triggerID\n  supportedActions {\n    actionID\n    dataType\n    description\n  }\n}\n\nfragment ActionsAddDialog_triggerData on ActionsTrigger {\n  triggerID\n  description\n  ...ActionRow_data\n  ...TriggerFilterRow_data\n}\n\nfragment ActionsListCard_actionsRule on ActionsRule {\n  id\n  name\n  trigger {\n    description\n    ...ActionsAddDialog_triggerData\n    id\n  }\n  ruleActions {\n    actionID\n    data\n  }\n  ruleFilters {\n    filterID\n    operatorID\n    data\n  }\n}\n\nfragment TriggerFilterOperator_data on ActionsFilter {\n  supportedOperators {\n    operatorID\n    description\n    dataType\n  }\n}\n\nfragment TriggerFilterRow_data on ActionsTrigger {\n  triggerID\n  supportedFilters {\n    filterID\n    description\n    supportedOperators {\n      operatorID\n    }\n    ...TriggerFilterOperator_data\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ea80e4c4f3ab927ae77127e709c1ca77';

module.exports = node;
