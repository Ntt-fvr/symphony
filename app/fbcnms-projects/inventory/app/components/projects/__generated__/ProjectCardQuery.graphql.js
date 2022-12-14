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
type ProjectDetails_project$ref = any;
type ProjectMoreActionsButton_project$ref = any;
export type ProjectCardQueryVariables = {|
  projectId: string
|};
export type ProjectCardQueryResponse = {|
  +project: ?{|
    +$fragmentRefs: ProjectMoreActionsButton_project$ref & ProjectDetails_project$ref
  |}
|};
export type ProjectCardQuery = {|
  variables: ProjectCardQueryVariables,
  response: ProjectCardQueryResponse,
|};
*/


/*
query ProjectCardQuery(
  $projectId: ID!
) {
  project: node(id: $projectId) {
    __typename
    ... on Project {
      ...ProjectMoreActionsButton_project
      ...ProjectDetails_project
    }
    id
  }
}

fragment CommentsActivitiesBox_comments on Comment {
  ...CommentsActivitiesLog_comments
}

fragment CommentsActivitiesLog_comments on Comment {
  id
  createTime
  ...TextCommentPost_comment
}

fragment LocationBreadcrumbsTitle_locationDetails on Location {
  id
  name
  locationType {
    name
    id
  }
  locationHierarchy {
    id
    name
    locationType {
      name
      id
    }
  }
}

fragment ProjectDetails_project on Project {
  id
  name
  description
  createdBy {
    id
    email
  }
  type {
    name
    id
  }
  location {
    id
    name
    latitude
    longitude
    locationType {
      mapType
      mapZoomLevel
      id
    }
    ...LocationBreadcrumbsTitle_locationDetails
  }
  priority
  properties {
    id
    propertyTypeValue {
      id
      name
    }
    propertyType {
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
      isInstanceProperty
      isMandatory
      category
      isDeleted
      parentPropertyType {
        id
        name
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
    }
    stringValue
    intValue
    floatValue
    booleanValue
    latitudeValue
    longitudeValue
    rangeFromValue
    rangeToValue
    nodeValue {
      __typename
      id
      name
    }
  }
  workOrders {
    ...ProjectWorkOrdersList_workOrders
    id
  }
  comments {
    ...CommentsActivitiesBox_comments
    id
  }
  ...ProjectMoreActionsButton_project
}

fragment ProjectMoreActionsButton_project on Project {
  id
  name
  numberOfWorkOrders
  type {
    id
  }
}

fragment ProjectWorkOrdersList_workOrders on WorkOrder {
  id
  workOrderType {
    name
    id
  }
  name
  description
  owner {
    id
    email
  }
  creationDate
  installDate
  status
  priority
}

fragment TextCommentPost_comment on Comment {
  id
  author {
    email
    id
  }
  text
  createTime
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "projectId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "projectId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v8 = [
  (v3/*: any*/),
  (v7/*: any*/)
],
v9 = [
  (v4/*: any*/),
  (v3/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "priority",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeType",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isEditable",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInstanceProperty",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMandatory",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyTypeValue",
  "kind": "LinkedField",
  "name": "propertyTypeValues",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    (v26/*: any*/),
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyTypeValue",
      "kind": "LinkedField",
      "name": "parentPropertyTypeValue",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        (v26/*: any*/),
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProjectCardQuery",
    "selections": [
      {
        "alias": "project",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProjectMoreActionsButton_project"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProjectDetails_project"
              }
            ],
            "type": "Project",
            "abstractKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProjectCardQuery",
    "selections": [
      {
        "alias": "project",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "numberOfWorkOrders",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ProjectType",
                "kind": "LinkedField",
                "name": "type",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "createdBy",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Location",
                "kind": "LinkedField",
                "name": "location",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "latitude",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "longitude",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LocationType",
                    "kind": "LinkedField",
                    "name": "locationType",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mapType",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mapZoomLevel",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "locationHierarchy",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LocationType",
                        "kind": "LinkedField",
                        "name": "locationType",
                        "plural": false,
                        "selections": (v9/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Property",
                "kind": "LinkedField",
                "name": "properties",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyTypeValue",
                    "kind": "LinkedField",
                    "name": "propertyTypeValue",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyType",
                    "kind": "LinkedField",
                    "name": "propertyType",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                      (v23/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyType",
                        "kind": "LinkedField",
                        "name": "parentPropertyType",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      (v27/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyType",
                        "kind": "LinkedField",
                        "name": "dependencePropertyTypes",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
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
                          (v24/*: any*/),
                          (v23/*: any*/),
                          (v26/*: any*/),
                          (v25/*: any*/),
                          (v27/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v17/*: any*/),
                  (v16/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "nodeValue",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "WorkOrder",
                "kind": "LinkedField",
                "name": "workOrders",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "WorkOrderType",
                    "kind": "LinkedField",
                    "name": "workOrderType",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "owner",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "creationDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "installDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Comment",
                "kind": "LinkedField",
                "name": "comments",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "author",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "text",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Project",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "043d82448bf5c473a569467cee4345c4",
    "id": null,
    "metadata": {},
    "name": "ProjectCardQuery",
    "operationKind": "query",
    "text": "query ProjectCardQuery(\n  $projectId: ID!\n) {\n  project: node(id: $projectId) {\n    __typename\n    ... on Project {\n      ...ProjectMoreActionsButton_project\n      ...ProjectDetails_project\n    }\n    id\n  }\n}\n\nfragment CommentsActivitiesBox_comments on Comment {\n  ...CommentsActivitiesLog_comments\n}\n\nfragment CommentsActivitiesLog_comments on Comment {\n  id\n  createTime\n  ...TextCommentPost_comment\n}\n\nfragment LocationBreadcrumbsTitle_locationDetails on Location {\n  id\n  name\n  locationType {\n    name\n    id\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n}\n\nfragment ProjectDetails_project on Project {\n  id\n  name\n  description\n  createdBy {\n    id\n    email\n  }\n  type {\n    name\n    id\n  }\n  location {\n    id\n    name\n    latitude\n    longitude\n    locationType {\n      mapType\n      mapZoomLevel\n      id\n    }\n    ...LocationBreadcrumbsTitle_locationDetails\n  }\n  priority\n  properties {\n    id\n    propertyTypeValue {\n      id\n      name\n    }\n    propertyType {\n      id\n      name\n      type\n      nodeType\n      index\n      stringValue\n      intValue\n      booleanValue\n      floatValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      isEditable\n      isInstanceProperty\n      isMandatory\n      category\n      isDeleted\n      parentPropertyType {\n        id\n        name\n      }\n      propertyTypeValues {\n        id\n        isDeleted\n        name\n        parentPropertyTypeValue {\n          id\n          isDeleted\n          name\n        }\n      }\n      dependencePropertyTypes {\n        id\n        name\n        type\n        nodeType\n        index\n        stringValue\n        intValue\n        booleanValue\n        floatValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        isEditable\n        isMandatory\n        isInstanceProperty\n        isDeleted\n        category\n        propertyTypeValues {\n          id\n          isDeleted\n          name\n          parentPropertyTypeValue {\n            id\n            isDeleted\n            name\n          }\n        }\n      }\n    }\n    stringValue\n    intValue\n    floatValue\n    booleanValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    nodeValue {\n      __typename\n      id\n      name\n    }\n  }\n  workOrders {\n    ...ProjectWorkOrdersList_workOrders\n    id\n  }\n  comments {\n    ...CommentsActivitiesBox_comments\n    id\n  }\n  ...ProjectMoreActionsButton_project\n}\n\nfragment ProjectMoreActionsButton_project on Project {\n  id\n  name\n  numberOfWorkOrders\n  type {\n    id\n  }\n}\n\nfragment ProjectWorkOrdersList_workOrders on WorkOrder {\n  id\n  workOrderType {\n    name\n    id\n  }\n  name\n  description\n  owner {\n    id\n    email\n  }\n  creationDate\n  installDate\n  status\n  priority\n}\n\nfragment TextCommentPost_comment on Comment {\n  id\n  author {\n    email\n    id\n  }\n  text\n  createTime\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4e882cb1745fd90983186a7b66242bfa';

module.exports = node;
