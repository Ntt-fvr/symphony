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
type ActionsAddDialog_triggerData$ref = any;
export type TriggerID = "magma_alert" | "%future added value";
export type Actions_ActionsQueryVariables = {||};
export type Actions_ActionsQueryResponse = {|
  +actionsTriggers: ?{|
    +results: $ReadOnlyArray<?{|
      +triggerID: TriggerID,
      +description: string,
      +$fragmentRefs: ActionsAddDialog_triggerData$ref,
    |}>,
    +count: number,
  |}
|};
export type Actions_ActionsQuery = {|
  variables: Actions_ActionsQueryVariables,
  response: Actions_ActionsQueryResponse,
|};
*/


/*
query Actions_ActionsQuery {
  actionsTriggers {
    results {
      triggerID
      description
      ...ActionsAddDialog_triggerData
      id
    }
    count
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
  "name": "triggerID",
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
  "name": "count",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dataType",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Actions_ActionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionsTriggersSearchResult",
        "kind": "LinkedField",
        "name": "actionsTriggers",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionsTrigger",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ActionsAddDialog_triggerData"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
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
    "name": "Actions_ActionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ActionsTriggersSearchResult",
        "kind": "LinkedField",
        "name": "actionsTriggers",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActionsTrigger",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ActionsAction",
                "kind": "LinkedField",
                "name": "supportedActions",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "actionID",
                    "storageKey": null
                  },
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "filterID",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ActionsOperator",
                    "kind": "LinkedField",
                    "name": "supportedOperators",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "operatorID",
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b06f5453a022b9aee6a681e63f84dfd9",
    "id": null,
    "metadata": {},
    "name": "Actions_ActionsQuery",
    "operationKind": "query",
    "text": "query Actions_ActionsQuery {\n  actionsTriggers {\n    results {\n      triggerID\n      description\n      ...ActionsAddDialog_triggerData\n      id\n    }\n    count\n  }\n}\n\nfragment ActionRow_data on ActionsTrigger {\n  triggerID\n  supportedActions {\n    actionID\n    dataType\n    description\n  }\n}\n\nfragment ActionsAddDialog_triggerData on ActionsTrigger {\n  triggerID\n  description\n  ...ActionRow_data\n  ...TriggerFilterRow_data\n}\n\nfragment TriggerFilterOperator_data on ActionsFilter {\n  supportedOperators {\n    operatorID\n    description\n    dataType\n  }\n}\n\nfragment TriggerFilterRow_data on ActionsTrigger {\n  triggerID\n  supportedFilters {\n    filterID\n    description\n    supportedOperators {\n      operatorID\n    }\n    ...TriggerFilterOperator_data\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3d7dfd46b65c97833ed524cbe563e058';

module.exports = node;
