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
export type ActionID = "magma_reboot_node" | "%future added value";
export type TriggerID = "magma_alert" | "%future added value";
export type AddActionsRuleInput = {|
  name: string,
  triggerID: TriggerID,
  ruleActions: $ReadOnlyArray<?ActionsRuleActionInput>,
  ruleFilters: $ReadOnlyArray<?ActionsRuleFilterInput>,
|};
export type ActionsRuleActionInput = {|
  actionID: ActionID,
  data: string,
|};
export type ActionsRuleFilterInput = {|
  filterID: string,
  operatorID: string,
  data: string,
|};
export type EditActionsRuleMutationVariables = {|
  id: string,
  input: AddActionsRuleInput,
|};
export type EditActionsRuleMutationResponse = {|
  +editActionsRule: {|
    +$fragmentRefs: ActionsListCard_actionsRule$ref
  |}
|};
export type EditActionsRuleMutation = {|
  variables: EditActionsRuleMutationVariables,
  response: EditActionsRuleMutationResponse,
|};
*/


/*
mutation EditActionsRuleMutation(
  $id: ID!
  $input: AddActionsRuleInput!
) {
  editActionsRule(id: $id, input: $input) {
    ...ActionsListCard_actionsRule
    id
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "actionID",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dataType",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "filterID",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "operatorID",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "data",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditActionsRuleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ActionsRule",
        "kind": "LinkedField",
        "name": "editActionsRule",
        "plural": false,
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditActionsRuleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ActionsRule",
        "kind": "LinkedField",
        "name": "editActionsRule",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v3/*: any*/),
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v3/*: any*/)
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
                  (v6/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ActionsOperator",
                    "kind": "LinkedField",
                    "name": "supportedOperators",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      (v3/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
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
              (v4/*: any*/),
              (v8/*: any*/)
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
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c8c3aec23fe5ce707cc9b16e0ed9e817",
    "id": null,
    "metadata": {},
    "name": "EditActionsRuleMutation",
    "operationKind": "mutation",
    "text": "mutation EditActionsRuleMutation(\n  $id: ID!\n  $input: AddActionsRuleInput!\n) {\n  editActionsRule(id: $id, input: $input) {\n    ...ActionsListCard_actionsRule\n    id\n  }\n}\n\nfragment ActionRow_data on ActionsTrigger {\n  triggerID\n  supportedActions {\n    actionID\n    dataType\n    description\n  }\n}\n\nfragment ActionsAddDialog_triggerData on ActionsTrigger {\n  triggerID\n  description\n  ...ActionRow_data\n  ...TriggerFilterRow_data\n}\n\nfragment ActionsListCard_actionsRule on ActionsRule {\n  id\n  name\n  trigger {\n    description\n    ...ActionsAddDialog_triggerData\n    id\n  }\n  ruleActions {\n    actionID\n    data\n  }\n  ruleFilters {\n    filterID\n    operatorID\n    data\n  }\n}\n\nfragment TriggerFilterOperator_data on ActionsFilter {\n  supportedOperators {\n    operatorID\n    description\n    dataType\n  }\n}\n\nfragment TriggerFilterRow_data on ActionsTrigger {\n  triggerID\n  supportedFilters {\n    filterID\n    description\n    supportedOperators {\n      operatorID\n    }\n    ...TriggerFilterOperator_data\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '521657dc4718a97d75660361d8d42456';

module.exports = node;
