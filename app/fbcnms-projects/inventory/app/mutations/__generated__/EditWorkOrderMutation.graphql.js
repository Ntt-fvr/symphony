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
type WorkOrderDetails_workOrder$ref = any;
export type CellularNetworkType = "CDMA" | "GSM" | "LTE" | "WCDMA" | "%future added value";
export type CheckListItemEnumSelectionMode = "multiple" | "single" | "%future added value";
export type CheckListItemType = "cell_scan" | "enum" | "files" | "simple" | "string" | "wifi_scan" | "yes_no" | "%future added value";
export type FileType = "FILE" | "IMAGE" | "%future added value";
export type WorkOrderPriority = "HIGH" | "LOW" | "MEDIUM" | "NONE" | "URGENT" | "%future added value";
export type WorkOrderStatus = "BLOCKED" | "CANCELED" | "CLOSED" | "DONE" | "IN_PROGRESS" | "PENDING" | "PLANNED" | "SUBMITTED" | "SUSPENDED" | "%future added value";
export type YesNoResponse = "NO" | "YES" | "%future added value";
export type EditWorkOrderInput = {|
  assigneeId?: ?string,
  checkList?: ?$ReadOnlyArray<CheckListItemInput>,
  checkListCategories?: ?$ReadOnlyArray<CheckListCategoryInput>,
  description?: ?string,
  dueDate?: ?any,
  duration?: ?number,
  id: string,
  index?: ?number,
  installDate?: ?any,
  isNameEditable?: ?boolean,
  locationId?: ?string,
  name: string,
  organizationFk?: ?string,
  ownerId?: ?string,
  priority?: ?WorkOrderPriority,
  projectId?: ?string,
  properties?: ?$ReadOnlyArray<PropertyInput>,
  scheduledAt?: ?any,
  status?: ?WorkOrderStatus,
|};
export type CheckListItemInput = {|
  cellData?: ?$ReadOnlyArray<SurveyCellScanData>,
  checked?: ?boolean,
  enumSelectionMode?: ?CheckListItemEnumSelectionMode,
  enumValues?: ?string,
  files?: ?$ReadOnlyArray<FileInput>,
  helpText?: ?string,
  id?: ?string,
  index?: ?number,
  isMandatory?: ?boolean,
  selectedEnumValues?: ?string,
  stringValue?: ?string,
  title: string,
  type: CheckListItemType,
  wifiData?: ?$ReadOnlyArray<SurveyWiFiScanData>,
  yesNoResponse?: ?YesNoResponse,
|};
export type SurveyCellScanData = {|
  altitude?: ?number,
  arfcn?: ?number,
  baseStationID?: ?string,
  cellID?: ?string,
  earfcn?: ?number,
  heading?: ?number,
  latitude?: ?number,
  locationAreaCode?: ?string,
  longitude?: ?number,
  mobileCountryCode?: ?string,
  mobileNetworkCode?: ?string,
  networkID?: ?string,
  networkType: CellularNetworkType,
  operator?: ?string,
  physicalCellID?: ?string,
  primaryScramblingCode?: ?string,
  rssi?: ?number,
  signalStrength: number,
  systemID?: ?string,
  timestamp?: ?number,
  timingAdvance?: ?number,
  trackingAreaCode?: ?string,
  uarfcn?: ?number,
|};
export type FileInput = {|
  annotation?: ?string,
  fileName: string,
  fileType?: ?FileType,
  id?: ?string,
  mimeType?: ?string,
  modificationTime?: ?number,
  sizeInBytes?: ?number,
  storeKey: string,
  uploadTime?: ?number,
|};
export type SurveyWiFiScanData = {|
  altitude?: ?number,
  band?: ?string,
  bssid: string,
  capabilities?: ?string,
  channel: number,
  channelWidth?: ?number,
  frequency: number,
  heading?: ?number,
  latitude?: ?number,
  longitude?: ?number,
  rssi?: ?number,
  ssid?: ?string,
  strength: number,
  timestamp: number,
|};
export type CheckListCategoryInput = {|
  checkList?: ?$ReadOnlyArray<CheckListItemInput>,
  description?: ?string,
  id?: ?string,
  title: string,
|};
export type PropertyInput = {|
  booleanValue?: ?boolean,
  dependenceProperties?: ?$ReadOnlyArray<PropertyInput>,
  floatValue?: ?number,
  id?: ?string,
  intValue?: ?number,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  nodeIDValue?: ?string,
  propertyTypeID: string,
  propertyTypeValueID?: ?string,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  stringValue?: ?string,
|};
export type EditWorkOrderMutationVariables = {|
  input: EditWorkOrderInput
|};
export type EditWorkOrderMutationResponse = {|
  +editWorkOrder: {|
    +id: string,
    +name: string,
    +description: ?string,
    +organizationFk: ?{|
      +id: string,
      +name: string,
      +description: string,
    |},
    +owner: {|
      +id: string,
      +email: string,
    |},
    +creationDate: any,
    +installDate: ?any,
    +status: WorkOrderStatus,
    +priority: WorkOrderPriority,
    +assignedTo: ?{|
      +id: string,
      +email: string,
    |},
    +$fragmentRefs: WorkOrderDetails_workOrder$ref,
  |}
|};
export type EditWorkOrderMutation = {|
  variables: EditWorkOrderMutationVariables,
  response: EditWorkOrderMutationResponse,
|};
*/


/*
mutation EditWorkOrderMutation(
  $input: EditWorkOrderInput!
) {
  editWorkOrder(input: $input) {
    id
    name
    description
    organizationFk {
      id
      name
      description
    }
    owner {
      id
      email
    }
    creationDate
    installDate
    status
    priority
    assignedTo {
      id
      email
    }
    ...WorkOrderDetails_workOrder
  }
}

fragment ActivityPost_activity on Activity {
  id
  author {
    email
    id
  }
  newValue
  activityType
  createTime
  ...GenericActivityText_activity
  ...WorkOrderCheckInActivityText_activity
  ...WorkOrderCheckOutActivityText_activity
}

fragment CommentsActivitiesBox_activities on Activity {
  ...CommentsActivitiesLog_activities
}

fragment CommentsActivitiesBox_comments on Comment {
  ...CommentsActivitiesLog_comments
}

fragment CommentsActivitiesLog_activities on Activity {
  id
  createTime
  ...ActivityPost_activity
}

fragment CommentsActivitiesLog_comments on Comment {
  id
  createTime
  ...TextCommentPost_comment
}

fragment DocumentTable_files on File {
  id
  fileName
  category
  ...FileAttachment_file
}

fragment DocumentTable_hyperlinks on Hyperlink {
  id
  category
  url
  displayName
  ...HyperlinkTableRow_hyperlink
}

fragment EntityDocumentsTable_files on File {
  ...DocumentTable_files
}

fragment EntityDocumentsTable_hyperlinks on Hyperlink {
  ...DocumentTable_hyperlinks
}

fragment EquipmentBreadcrumbs_equipment on Equipment {
  id
  name
  equipmentType {
    id
    name
  }
  locationHierarchy {
    id
    name
    locationType {
      name
      id
    }
  }
  positionHierarchy {
    id
    definition {
      id
      name
      visibleLabel
    }
    parentEquipment {
      id
      name
      equipmentType {
        id
        name
      }
    }
  }
}

fragment FileAttachment_file on File {
  id
  fileName
  sizeInBytes
  uploaded
  fileType
  storeKey
  category
  annotation
  documentCategory {
    id
    name
  }
  ...ImageDialog_img
}

fragment GenericActivityText_activity on Activity {
  activityType
  newRelatedNode {
    __typename
    ... on User {
      email
    }
    id
  }
  oldRelatedNode {
    __typename
    ... on User {
      email
    }
    id
  }
  oldValue
  newValue
}

fragment HyperlinkTableMenu_hyperlink on Hyperlink {
  id
  displayName
  url
}

fragment HyperlinkTableRow_hyperlink on Hyperlink {
  id
  category
  url
  displayName
  createTime
  documentCategory {
    id
    name
  }
  ...HyperlinkTableMenu_hyperlink
}

fragment ImageDialog_img on File {
  storeKey
  fileName
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

fragment TextCommentPost_comment on Comment {
  id
  author {
    email
    id
  }
  text
  createTime
}

fragment WorkOrderCheckInActivityText_activity on Activity {
  activityType
  clockDetails {
    distanceMeters
  }
}

fragment WorkOrderCheckOutActivityText_activity on Activity {
  activityType
  clockDetails {
    clockOutReason
    distanceMeters
    comment
  }
}

fragment WorkOrderDetailsPaneEquipmentItem_equipment on Equipment {
  id
  name
  equipmentType {
    id
    name
  }
  parentLocation {
    id
    name
    locationType {
      id
      name
    }
  }
  parentPosition {
    id
    definition {
      name
      visibleLabel
      id
    }
    parentEquipment {
      id
      name
    }
  }
}

fragment WorkOrderDetailsPaneLinkItem_link on Link {
  id
  futureState
  ports {
    id
    definition {
      id
      name
      visibleLabel
      portType {
        linkPropertyTypes {
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
        }
        id
      }
    }
    parentEquipment {
      id
      name
      futureState
      equipmentType {
        id
        name
      }
      ...EquipmentBreadcrumbs_equipment
    }
    serviceEndpoints {
      definition {
        role
        id
      }
      service {
        name
        id
      }
      id
    }
  }
  workOrder {
    id
    status
  }
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
  services {
    id
    name
  }
}

fragment WorkOrderDetailsPane_workOrder on WorkOrder {
  id
  name
  equipmentToAdd {
    id
    ...WorkOrderDetailsPaneEquipmentItem_equipment
  }
  equipmentToRemove {
    id
    ...WorkOrderDetailsPaneEquipmentItem_equipment
  }
  linksToAdd {
    id
    ...WorkOrderDetailsPaneLinkItem_link
  }
  linksToRemove {
    id
    ...WorkOrderDetailsPaneLinkItem_link
  }
}

fragment WorkOrderDetails_workOrder on WorkOrder {
  id
  name
  description
  scheduledAt
  organizationFk {
    id
    name
    description
  }
  workOrderType {
    name
    id
  }
  workOrderTemplate {
    assigneeCanCompleteWorkOrder
  }
  location {
    name
    id
    latitude
    longitude
    locationType {
      id
      mapType
      mapZoomLevel
    }
    ...LocationBreadcrumbsTitle_locationDetails
  }
  owner {
    id
    email
  }
  assignedTo {
    id
    email
  }
  creationDate
  installDate
  status
  priority
  ...WorkOrderDetailsPane_workOrder
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
  images {
    ...EntityDocumentsTable_files
    id
  }
  files {
    ...EntityDocumentsTable_files
    id
  }
  hyperlinks {
    ...EntityDocumentsTable_hyperlinks
    id
  }
  comments {
    ...CommentsActivitiesBox_comments
    id
  }
  activities {
    ...CommentsActivitiesBox_activities
    id
  }
  project {
    name
    id
    type {
      id
      name
    }
  }
  checkListCategories {
    id
    title
    description
    checkList {
      id
      index
      isMandatory
      type
      title
      helpText
      checked
      enumValues
      stringValue
      enumSelectionMode
      selectedEnumValues
      yesNoResponse
      files {
        id
        fileName
        sizeInBytes
        modified
        uploaded
        fileType
        storeKey
        category
        annotation
      }
      cellData {
        id
        networkType
        signalStrength
        timestamp
        baseStationID
        networkID
        systemID
        cellID
        locationAreaCode
        mobileCountryCode
        mobileNetworkCode
        primaryScramblingCode
        operator
        arfcn
        physicalCellID
        trackingAreaCode
        timingAdvance
        earfcn
        uarfcn
        latitude
        longitude
      }
      wifiData {
        id
        timestamp
        frequency
        channel
        bssid
        strength
        ssid
        band
        channelWidth
        capabilities
        latitude
        longitude
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
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
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Organization",
  "kind": "LinkedField",
  "name": "organizationFk",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v7 = [
  (v2/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "owner",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creationDate",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "installDate",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "priority",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "assignedTo",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v14 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitude",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitude",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "locationHierarchy",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "LocationType",
      "kind": "LinkedField",
      "name": "locationType",
      "plural": false,
      "selections": (v14/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v18 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "EquipmentType",
  "kind": "LinkedField",
  "name": "equipmentType",
  "plural": false,
  "selections": (v18/*: any*/),
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibleLabel",
  "storageKey": null
},
v21 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v19/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Location",
    "kind": "LinkedField",
    "name": "parentLocation",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "LocationType",
        "kind": "LinkedField",
        "name": "locationType",
        "plural": false,
        "selections": (v18/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "EquipmentPosition",
    "kind": "LinkedField",
    "name": "parentPosition",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "EquipmentPositionDefinition",
        "kind": "LinkedField",
        "name": "definition",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v20/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Equipment",
        "kind": "LinkedField",
        "name": "parentEquipment",
        "plural": false,
        "selections": (v18/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "futureState",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeType",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isEditable",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInstanceProperty",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMandatory",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyTypeValue",
  "kind": "LinkedField",
  "name": "propertyTypeValues",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v38/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyTypeValue",
      "kind": "LinkedField",
      "name": "parentPropertyTypeValue",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v38/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "concreteType": "Property",
  "kind": "LinkedField",
  "name": "properties",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyTypeValue",
      "kind": "LinkedField",
      "name": "propertyTypeValue",
      "plural": false,
      "selections": (v18/*: any*/),
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
        (v2/*: any*/),
        (v3/*: any*/),
        (v23/*: any*/),
        (v24/*: any*/),
        (v25/*: any*/),
        (v26/*: any*/),
        (v27/*: any*/),
        (v28/*: any*/),
        (v29/*: any*/),
        (v30/*: any*/),
        (v31/*: any*/),
        (v32/*: any*/),
        (v33/*: any*/),
        (v34/*: any*/),
        (v35/*: any*/),
        (v36/*: any*/),
        (v37/*: any*/),
        (v38/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyType",
          "kind": "LinkedField",
          "name": "parentPropertyType",
          "plural": false,
          "selections": (v18/*: any*/),
          "storageKey": null
        },
        (v39/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyType",
          "kind": "LinkedField",
          "name": "dependencePropertyTypes",
          "plural": true,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/),
            (v23/*: any*/),
            (v24/*: any*/),
            (v25/*: any*/),
            (v26/*: any*/),
            (v27/*: any*/),
            (v28/*: any*/),
            (v29/*: any*/),
            (v30/*: any*/),
            (v31/*: any*/),
            (v32/*: any*/),
            (v33/*: any*/),
            (v34/*: any*/),
            (v36/*: any*/),
            (v35/*: any*/),
            (v38/*: any*/),
            (v37/*: any*/),
            (v39/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v26/*: any*/),
    (v27/*: any*/),
    (v29/*: any*/),
    (v28/*: any*/),
    (v30/*: any*/),
    (v31/*: any*/),
    (v32/*: any*/),
    (v33/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "nodeValue",
      "plural": false,
      "selections": [
        (v40/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v42 = [
  (v2/*: any*/),
  (v22/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "EquipmentPort",
    "kind": "LinkedField",
    "name": "ports",
    "plural": true,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "EquipmentPortDefinition",
        "kind": "LinkedField",
        "name": "definition",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v20/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPortType",
            "kind": "LinkedField",
            "name": "portType",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PropertyType",
                "kind": "LinkedField",
                "name": "linkPropertyTypes",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v23/*: any*/),
                  (v24/*: any*/),
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v27/*: any*/),
                  (v28/*: any*/),
                  (v29/*: any*/),
                  (v30/*: any*/),
                  (v31/*: any*/),
                  (v32/*: any*/),
                  (v33/*: any*/),
                  (v34/*: any*/),
                  (v35/*: any*/),
                  (v36/*: any*/),
                  (v37/*: any*/),
                  (v38/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Equipment",
        "kind": "LinkedField",
        "name": "parentEquipment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v22/*: any*/),
          (v19/*: any*/),
          (v17/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EquipmentPosition",
            "kind": "LinkedField",
            "name": "positionHierarchy",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EquipmentPositionDefinition",
                "kind": "LinkedField",
                "name": "definition",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Equipment",
                "kind": "LinkedField",
                "name": "parentEquipment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v19/*: any*/)
                ],
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
        "concreteType": "ServiceEndpoint",
        "kind": "LinkedField",
        "name": "serviceEndpoints",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ServiceEndpointDefinition",
            "kind": "LinkedField",
            "name": "definition",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "role",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Service",
            "kind": "LinkedField",
            "name": "service",
            "plural": false,
            "selections": (v14/*: any*/),
            "storageKey": null
          },
          (v2/*: any*/)
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
    "name": "workOrder",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      (v11/*: any*/)
    ],
    "storageKey": null
  },
  (v41/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Service",
    "kind": "LinkedField",
    "name": "services",
    "plural": true,
    "selections": (v18/*: any*/),
    "storageKey": null
  }
],
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fileName",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeInBytes",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "uploaded",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fileType",
  "storageKey": null
},
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "storeKey",
  "storageKey": null
},
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "annotation",
  "storageKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "concreteType": "DocumentCategory",
  "kind": "LinkedField",
  "name": "documentCategory",
  "plural": false,
  "selections": (v18/*: any*/),
  "storageKey": null
},
v50 = [
  (v2/*: any*/),
  (v43/*: any*/),
  (v37/*: any*/),
  (v44/*: any*/),
  (v45/*: any*/),
  (v46/*: any*/),
  (v47/*: any*/),
  (v48/*: any*/),
  (v49/*: any*/)
],
v51 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createTime",
  "storageKey": null
},
v52 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "author",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v53 = [
  (v40/*: any*/),
  (v2/*: any*/),
  {
    "kind": "InlineFragment",
    "selections": [
      (v6/*: any*/)
    ],
    "type": "User",
    "abstractKey": null
  }
],
v54 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v55 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditWorkOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "WorkOrder",
        "kind": "LinkedField",
        "name": "editWorkOrder",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorkOrderDetails_workOrder"
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
    "name": "EditWorkOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "WorkOrder",
        "kind": "LinkedField",
        "name": "editWorkOrder",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "scheduledAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkOrderType",
            "kind": "LinkedField",
            "name": "workOrderType",
            "plural": false,
            "selections": (v14/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "WorkOrderTemplate",
            "kind": "LinkedField",
            "name": "workOrderTemplate",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "assigneeCanCompleteWorkOrder",
                "storageKey": null
              }
            ],
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
              (v2/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "LocationType",
                "kind": "LinkedField",
                "name": "locationType",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v17/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Equipment",
            "kind": "LinkedField",
            "name": "equipmentToAdd",
            "plural": true,
            "selections": (v21/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Equipment",
            "kind": "LinkedField",
            "name": "equipmentToRemove",
            "plural": true,
            "selections": (v21/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Link",
            "kind": "LinkedField",
            "name": "linksToAdd",
            "plural": true,
            "selections": (v42/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Link",
            "kind": "LinkedField",
            "name": "linksToRemove",
            "plural": true,
            "selections": (v42/*: any*/),
            "storageKey": null
          },
          (v41/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "File",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": (v50/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "File",
            "kind": "LinkedField",
            "name": "files",
            "plural": true,
            "selections": (v50/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Hyperlink",
            "kind": "LinkedField",
            "name": "hyperlinks",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v37/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "displayName",
                "storageKey": null
              },
              (v51/*: any*/),
              (v49/*: any*/)
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
              (v2/*: any*/),
              (v51/*: any*/),
              (v52/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Activity",
            "kind": "LinkedField",
            "name": "activities",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v51/*: any*/),
              (v52/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "newValue",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "activityType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "newRelatedNode",
                "plural": false,
                "selections": (v53/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "oldRelatedNode",
                "plural": false,
                "selections": (v53/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "oldValue",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ClockDetails",
                "kind": "LinkedField",
                "name": "clockDetails",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "distanceMeters",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "clockOutReason",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "comment",
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
            "concreteType": "Project",
            "kind": "LinkedField",
            "name": "project",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ProjectType",
                "kind": "LinkedField",
                "name": "type",
                "plural": false,
                "selections": (v18/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CheckListCategory",
            "kind": "LinkedField",
            "name": "checkListCategories",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v54/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CheckListItem",
                "kind": "LinkedField",
                "name": "checkList",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v25/*: any*/),
                  (v36/*: any*/),
                  (v23/*: any*/),
                  (v54/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "helpText",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "checked",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "enumValues",
                    "storageKey": null
                  },
                  (v26/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "enumSelectionMode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "selectedEnumValues",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "yesNoResponse",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "File",
                    "kind": "LinkedField",
                    "name": "files",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v43/*: any*/),
                      (v44/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "modified",
                        "storageKey": null
                      },
                      (v45/*: any*/),
                      (v46/*: any*/),
                      (v47/*: any*/),
                      (v37/*: any*/),
                      (v48/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SurveyCellScan",
                    "kind": "LinkedField",
                    "name": "cellData",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "networkType",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "signalStrength",
                        "storageKey": null
                      },
                      (v55/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "baseStationID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "networkID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "systemID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cellID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "locationAreaCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mobileCountryCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mobileNetworkCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "primaryScramblingCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "operator",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "arfcn",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "physicalCellID",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "trackingAreaCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "timingAdvance",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "earfcn",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "uarfcn",
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SurveyWiFiScan",
                    "kind": "LinkedField",
                    "name": "wifiData",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v55/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "frequency",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "channel",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "bssid",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "strength",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "ssid",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "band",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "channelWidth",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "capabilities",
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v16/*: any*/)
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7bc6b3d7d44858145badc873cf3abc09",
    "id": null,
    "metadata": {},
    "name": "EditWorkOrderMutation",
    "operationKind": "mutation",
    "text": "mutation EditWorkOrderMutation(\n  $input: EditWorkOrderInput!\n) {\n  editWorkOrder(input: $input) {\n    id\n    name\n    description\n    organizationFk {\n      id\n      name\n      description\n    }\n    owner {\n      id\n      email\n    }\n    creationDate\n    installDate\n    status\n    priority\n    assignedTo {\n      id\n      email\n    }\n    ...WorkOrderDetails_workOrder\n  }\n}\n\nfragment ActivityPost_activity on Activity {\n  id\n  author {\n    email\n    id\n  }\n  newValue\n  activityType\n  createTime\n  ...GenericActivityText_activity\n  ...WorkOrderCheckInActivityText_activity\n  ...WorkOrderCheckOutActivityText_activity\n}\n\nfragment CommentsActivitiesBox_activities on Activity {\n  ...CommentsActivitiesLog_activities\n}\n\nfragment CommentsActivitiesBox_comments on Comment {\n  ...CommentsActivitiesLog_comments\n}\n\nfragment CommentsActivitiesLog_activities on Activity {\n  id\n  createTime\n  ...ActivityPost_activity\n}\n\nfragment CommentsActivitiesLog_comments on Comment {\n  id\n  createTime\n  ...TextCommentPost_comment\n}\n\nfragment DocumentTable_files on File {\n  id\n  fileName\n  category\n  ...FileAttachment_file\n}\n\nfragment DocumentTable_hyperlinks on Hyperlink {\n  id\n  category\n  url\n  displayName\n  ...HyperlinkTableRow_hyperlink\n}\n\nfragment EntityDocumentsTable_files on File {\n  ...DocumentTable_files\n}\n\nfragment EntityDocumentsTable_hyperlinks on Hyperlink {\n  ...DocumentTable_hyperlinks\n}\n\nfragment EquipmentBreadcrumbs_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n  positionHierarchy {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n    }\n    parentEquipment {\n      id\n      name\n      equipmentType {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment FileAttachment_file on File {\n  id\n  fileName\n  sizeInBytes\n  uploaded\n  fileType\n  storeKey\n  category\n  annotation\n  documentCategory {\n    id\n    name\n  }\n  ...ImageDialog_img\n}\n\nfragment GenericActivityText_activity on Activity {\n  activityType\n  newRelatedNode {\n    __typename\n    ... on User {\n      email\n    }\n    id\n  }\n  oldRelatedNode {\n    __typename\n    ... on User {\n      email\n    }\n    id\n  }\n  oldValue\n  newValue\n}\n\nfragment HyperlinkTableMenu_hyperlink on Hyperlink {\n  id\n  displayName\n  url\n}\n\nfragment HyperlinkTableRow_hyperlink on Hyperlink {\n  id\n  category\n  url\n  displayName\n  createTime\n  documentCategory {\n    id\n    name\n  }\n  ...HyperlinkTableMenu_hyperlink\n}\n\nfragment ImageDialog_img on File {\n  storeKey\n  fileName\n}\n\nfragment LocationBreadcrumbsTitle_locationDetails on Location {\n  id\n  name\n  locationType {\n    name\n    id\n  }\n  locationHierarchy {\n    id\n    name\n    locationType {\n      name\n      id\n    }\n  }\n}\n\nfragment TextCommentPost_comment on Comment {\n  id\n  author {\n    email\n    id\n  }\n  text\n  createTime\n}\n\nfragment WorkOrderCheckInActivityText_activity on Activity {\n  activityType\n  clockDetails {\n    distanceMeters\n  }\n}\n\nfragment WorkOrderCheckOutActivityText_activity on Activity {\n  activityType\n  clockDetails {\n    clockOutReason\n    distanceMeters\n    comment\n  }\n}\n\nfragment WorkOrderDetailsPaneEquipmentItem_equipment on Equipment {\n  id\n  name\n  equipmentType {\n    id\n    name\n  }\n  parentLocation {\n    id\n    name\n    locationType {\n      id\n      name\n    }\n  }\n  parentPosition {\n    id\n    definition {\n      name\n      visibleLabel\n      id\n    }\n    parentEquipment {\n      id\n      name\n    }\n  }\n}\n\nfragment WorkOrderDetailsPaneLinkItem_link on Link {\n  id\n  futureState\n  ports {\n    id\n    definition {\n      id\n      name\n      visibleLabel\n      portType {\n        linkPropertyTypes {\n          id\n          name\n          type\n          nodeType\n          index\n          stringValue\n          intValue\n          booleanValue\n          floatValue\n          latitudeValue\n          longitudeValue\n          rangeFromValue\n          rangeToValue\n          isEditable\n          isInstanceProperty\n          isMandatory\n          category\n          isDeleted\n        }\n        id\n      }\n    }\n    parentEquipment {\n      id\n      name\n      futureState\n      equipmentType {\n        id\n        name\n      }\n      ...EquipmentBreadcrumbs_equipment\n    }\n    serviceEndpoints {\n      definition {\n        role\n        id\n      }\n      service {\n        name\n        id\n      }\n      id\n    }\n  }\n  workOrder {\n    id\n    status\n  }\n  properties {\n    id\n    propertyTypeValue {\n      id\n      name\n    }\n    propertyType {\n      id\n      name\n      type\n      nodeType\n      index\n      stringValue\n      intValue\n      booleanValue\n      floatValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      isEditable\n      isInstanceProperty\n      isMandatory\n      category\n      isDeleted\n      parentPropertyType {\n        id\n        name\n      }\n      propertyTypeValues {\n        id\n        isDeleted\n        name\n        parentPropertyTypeValue {\n          id\n          isDeleted\n          name\n        }\n      }\n      dependencePropertyTypes {\n        id\n        name\n        type\n        nodeType\n        index\n        stringValue\n        intValue\n        booleanValue\n        floatValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        isEditable\n        isMandatory\n        isInstanceProperty\n        isDeleted\n        category\n        propertyTypeValues {\n          id\n          isDeleted\n          name\n          parentPropertyTypeValue {\n            id\n            isDeleted\n            name\n          }\n        }\n      }\n    }\n    stringValue\n    intValue\n    floatValue\n    booleanValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    nodeValue {\n      __typename\n      id\n      name\n    }\n  }\n  services {\n    id\n    name\n  }\n}\n\nfragment WorkOrderDetailsPane_workOrder on WorkOrder {\n  id\n  name\n  equipmentToAdd {\n    id\n    ...WorkOrderDetailsPaneEquipmentItem_equipment\n  }\n  equipmentToRemove {\n    id\n    ...WorkOrderDetailsPaneEquipmentItem_equipment\n  }\n  linksToAdd {\n    id\n    ...WorkOrderDetailsPaneLinkItem_link\n  }\n  linksToRemove {\n    id\n    ...WorkOrderDetailsPaneLinkItem_link\n  }\n}\n\nfragment WorkOrderDetails_workOrder on WorkOrder {\n  id\n  name\n  description\n  scheduledAt\n  organizationFk {\n    id\n    name\n    description\n  }\n  workOrderType {\n    name\n    id\n  }\n  workOrderTemplate {\n    assigneeCanCompleteWorkOrder\n  }\n  location {\n    name\n    id\n    latitude\n    longitude\n    locationType {\n      id\n      mapType\n      mapZoomLevel\n    }\n    ...LocationBreadcrumbsTitle_locationDetails\n  }\n  owner {\n    id\n    email\n  }\n  assignedTo {\n    id\n    email\n  }\n  creationDate\n  installDate\n  status\n  priority\n  ...WorkOrderDetailsPane_workOrder\n  properties {\n    id\n    propertyTypeValue {\n      id\n      name\n    }\n    propertyType {\n      id\n      name\n      type\n      nodeType\n      index\n      stringValue\n      intValue\n      booleanValue\n      floatValue\n      latitudeValue\n      longitudeValue\n      rangeFromValue\n      rangeToValue\n      isEditable\n      isInstanceProperty\n      isMandatory\n      category\n      isDeleted\n      parentPropertyType {\n        id\n        name\n      }\n      propertyTypeValues {\n        id\n        isDeleted\n        name\n        parentPropertyTypeValue {\n          id\n          isDeleted\n          name\n        }\n      }\n      dependencePropertyTypes {\n        id\n        name\n        type\n        nodeType\n        index\n        stringValue\n        intValue\n        booleanValue\n        floatValue\n        latitudeValue\n        longitudeValue\n        rangeFromValue\n        rangeToValue\n        isEditable\n        isMandatory\n        isInstanceProperty\n        isDeleted\n        category\n        propertyTypeValues {\n          id\n          isDeleted\n          name\n          parentPropertyTypeValue {\n            id\n            isDeleted\n            name\n          }\n        }\n      }\n    }\n    stringValue\n    intValue\n    floatValue\n    booleanValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    nodeValue {\n      __typename\n      id\n      name\n    }\n  }\n  images {\n    ...EntityDocumentsTable_files\n    id\n  }\n  files {\n    ...EntityDocumentsTable_files\n    id\n  }\n  hyperlinks {\n    ...EntityDocumentsTable_hyperlinks\n    id\n  }\n  comments {\n    ...CommentsActivitiesBox_comments\n    id\n  }\n  activities {\n    ...CommentsActivitiesBox_activities\n    id\n  }\n  project {\n    name\n    id\n    type {\n      id\n      name\n    }\n  }\n  checkListCategories {\n    id\n    title\n    description\n    checkList {\n      id\n      index\n      isMandatory\n      type\n      title\n      helpText\n      checked\n      enumValues\n      stringValue\n      enumSelectionMode\n      selectedEnumValues\n      yesNoResponse\n      files {\n        id\n        fileName\n        sizeInBytes\n        modified\n        uploaded\n        fileType\n        storeKey\n        category\n        annotation\n      }\n      cellData {\n        id\n        networkType\n        signalStrength\n        timestamp\n        baseStationID\n        networkID\n        systemID\n        cellID\n        locationAreaCode\n        mobileCountryCode\n        mobileNetworkCode\n        primaryScramblingCode\n        operator\n        arfcn\n        physicalCellID\n        trackingAreaCode\n        timingAdvance\n        earfcn\n        uarfcn\n        latitude\n        longitude\n      }\n      wifiData {\n        id\n        timestamp\n        frequency\n        channel\n        bssid\n        strength\n        ssid\n        band\n        channelWidth\n        capabilities\n        latitude\n        longitude\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd7258f0b0aa11f53c0f2c855cb1166f3';

module.exports = node;
