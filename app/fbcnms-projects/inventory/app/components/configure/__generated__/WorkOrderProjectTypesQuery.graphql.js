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
type AddEditProjectTypeCard_editingProjectType$ref = any;
type ProjectTypeCard_projectType$ref = any;
type ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$ref = any;
export type WorkOrderProjectTypesQueryVariables = {||};
export type WorkOrderProjectTypesQueryResponse = {|
  +projectTypes: ?{|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: ProjectTypeCard_projectType$ref & AddEditProjectTypeCard_editingProjectType$ref,
      |}
    |}>
  |},
  +workOrderTypes: {|
    +edges: $ReadOnlyArray<{|
      +node: ?{|
        +$fragmentRefs: ProjectTypeWorkOrderTemplatesPanel_workOrderTypes$ref
      |}
    |}>
  |},
|};
export type WorkOrderProjectTypesQuery = {|
  variables: WorkOrderProjectTypesQueryVariables,
  response: WorkOrderProjectTypesQueryResponse,
|};
*/


/*
query WorkOrderProjectTypesQuery {
  projectTypes(first: 500) {
    edges {
      node {
        id
        ...ProjectTypeCard_projectType
        ...AddEditProjectTypeCard_editingProjectType
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  workOrderTypes {
    edges {
      node {
        ...ProjectTypeWorkOrderTemplatesPanel_workOrderTypes
        id
      }
    }
  }
}

fragment AddEditProjectTypeCard_editingProjectType on ProjectType {
  id
  name
  description
  workOrders {
    id
    type {
      id
      name
      ...ProjectTypeWorkOrderTemplatesPanel_workOrderTypes
    }
  }
  properties {
    id
    name
    type
    nodeType
    index
    stringValue
    intValue
    booleanValue
    floatValue
    latitudeValue
    longitudeValue
    rangeFromValue
    rangeToValue
    isEditable
    isMandatory
    isInstanceProperty
    isDeleted
    category
    dependencePropertyTypes {
      id
      name
      type
      nodeType
      index
      stringValue
      intValue
      booleanValue
      floatValue
      latitudeValue
      longitudeValue
      rangeFromValue
      rangeToValue
      isEditable
      isMandatory
      isInstanceProperty
      isDeleted
      category
      propertyTypeValues {
        id
        isDeleted
        name
        parentPropertyTypeValue {
          id
          isDeleted
          name
        }
      }
    }
    propertyTypeValues {
      id
      isDeleted
      name
      parentPropertyTypeValue {
        id
        isDeleted
        name
      }
    }
    parentPropertyType {
      id
      name
    }
  }
}

fragment ProjectTypeCard_projectType on ProjectType {
  id
  name
  description
  numberOfProjects
  workOrders {
    id
  }
}

fragment ProjectTypeWorkOrderTemplatesPanel_workOrderTypes on WorkOrderType {
  id
  name
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
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v3 = {
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
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v0/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeType",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isEditable",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMandatory",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInstanceProperty",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyTypeValue",
  "kind": "LinkedField",
  "name": "propertyTypeValues",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v21/*: any*/),
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyTypeValue",
      "kind": "LinkedField",
      "name": "parentPropertyTypeValue",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v21/*: any*/),
        (v5/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkOrderProjectTypesQuery",
    "selections": [
      {
        "alias": "projectTypes",
        "args": null,
        "concreteType": "ProjectTypeConnection",
        "kind": "LinkedField",
        "name": "__WorkOrderProjectTypesQuery_projectTypes_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProjectType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ProjectTypeCard_projectType"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AddEditProjectTypeCard_editingProjectType"
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "WorkOrderTypeConnection",
        "kind": "LinkedField",
        "name": "workOrderTypes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkOrderTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkOrderType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ProjectTypeWorkOrderTemplatesPanel_workOrderTypes"
                  }
                ],
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
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "WorkOrderProjectTypesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "ProjectTypeConnection",
        "kind": "LinkedField",
        "name": "projectTypes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProjectType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "numberOfProjects",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "WorkOrderDefinition",
                    "kind": "LinkedField",
                    "name": "workOrders",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "WorkOrderType",
                        "kind": "LinkedField",
                        "name": "type",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyType",
                    "kind": "LinkedField",
                    "name": "properties",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v5/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyType",
                        "kind": "LinkedField",
                        "name": "dependencePropertyTypes",
                        "plural": true,
                        "selections": [
                          (v0/*: any*/),
                          (v5/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v21/*: any*/),
                          (v22/*: any*/),
                          (v23/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v23/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyType",
                        "kind": "LinkedField",
                        "name": "parentPropertyType",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "projectTypes(first:500)"
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "WorkOrderProjectTypesQuery_projectTypes",
        "kind": "LinkedHandle",
        "name": "projectTypes"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "WorkOrderTypeConnection",
        "kind": "LinkedField",
        "name": "workOrderTypes",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkOrderTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkOrderType",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": (v6/*: any*/),
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
    "cacheID": "03898d21294ebdc4846a5778083a19b6",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "projectTypes"
          ]
        }
      ]
    },
    "name": "WorkOrderProjectTypesQuery",
    "operationKind": "query",
    "text": "query WorkOrderProjectTypesQuery {\n  projectTypes(first: 500) {\n    edges {\n      node {\n        id\n        ...ProjectTypeCard_projectType\n        ...AddEditProjectTypeCard_editingProjectType\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  workOrderTypes {\n    edges {\n      node {\n        ...ProjectTypeWorkOrderTemplatesPanel_workOrderTypes\n        id\n      }\n    }\n  }\n}\n\nfragment AddEditProjectTypeCard_editingProjectType on ProjectType {\n  id\n  name\n  description\n  workOrders {\n    id\n    type {\n      id\n      name\n      ...ProjectTypeWorkOrderTemplatesPanel_workOrderTypes\n    }\n  }\n  properties {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    isEditable\n    isMandatory\n    isInstanceProperty\n    isDeleted\n    category\n    dependencePropertyTypes {\n      id\n      name\n      type\n      nodeType\n      index\n      stringValue\n      intValue\n      booleanValue\n      floatValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      isEditable\n      isMandatory\n      isInstanceProperty\n      isDeleted\n      category\n      propertyTypeValues {\n        id\n        isDeleted\n        name\n        parentPropertyTypeValue {\n          id\n          isDeleted\n          name\n        }\n      }\n    }\n    propertyTypeValues {\n      id\n      isDeleted\n      name\n      parentPropertyTypeValue {\n        id\n        isDeleted\n        name\n      }\n    }\n    parentPropertyType {\n      id\n      name\n    }\n  }\n}\n\nfragment ProjectTypeCard_projectType on ProjectType {\n  id\n  name\n  description\n  numberOfProjects\n  workOrders {\n    id\n  }\n}\n\nfragment ProjectTypeWorkOrderTemplatesPanel_workOrderTypes on WorkOrderType {\n  id\n  name\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c3f4898b42bea467f6aa4f3af6e0a400';

module.exports = node;
