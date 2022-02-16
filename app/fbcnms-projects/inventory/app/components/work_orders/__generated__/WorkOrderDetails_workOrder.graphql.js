/**
 * @generated SignedSource<<fe1270e70bede7676533f551fa72a1ca>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type CommentsActivitiesBox_activities$fragmentType = any;
type CommentsActivitiesBox_comments$fragmentType = any;
type EntityDocumentsTable_files$fragmentType = any;
type EntityDocumentsTable_hyperlinks$fragmentType = any;
type LocationBreadcrumbsTitle_locationDetails$fragmentType = any;
type WorkOrderDetailsPane_workOrder$fragmentType = any;
export type CellularNetworkType = "CDMA" | "GSM" | "LTE" | "WCDMA" | "%future added value";
export type CheckListItemEnumSelectionMode = "single" | "multiple" | "%future added value";
export type CheckListItemType = "simple" | "string" | "enum" | "files" | "yes_no" | "cell_scan" | "wifi_scan" | "%future added value";
export type FileType = "IMAGE" | "FILE" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type WorkOrderPriority = "URGENT" | "HIGH" | "MEDIUM" | "LOW" | "NONE" | "%future added value";
export type WorkOrderStatus = "PLANNED" | "IN_PROGRESS" | "PENDING" | "SUBMITTED" | "CLOSED" | "DONE" | "BLOCKED" | "CANCELED" | "SUSPENDED" | "%future added value";
export type YesNoResponse = "YES" | "NO" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type WorkOrderDetails_workOrder$fragmentType: FragmentType;
export type WorkOrderDetails_workOrder$ref = WorkOrderDetails_workOrder$fragmentType;
export type WorkOrderDetails_workOrder$data = {|
  +id: string,
  +name: string,
  +description: ?string,
  +scheduledAt: ?any,
  +organizationFk: ?{|
    +id: string,
    +name: string,
    +description: string,
  |},
  +workOrderType: {|
    +name: string,
    +id: string,
  |},
  +workOrderTemplate: ?{|
    +assigneeCanCompleteWorkOrder: ?boolean,
  |},
  +location: ?{|
    +name: string,
    +id: string,
    +latitude: number,
    +longitude: number,
    +locationType: {|
      +id: string,
      +mapType: ?string,
      +mapZoomLevel: ?number,
    |},
    +$fragmentSpreads: LocationBreadcrumbsTitle_locationDetails$fragmentType,
  |},
  +owner: {|
    +id: string,
    +email: string,
  |},
  +assignedTo: ?{|
    +id: string,
    +email: string,
  |},
  +creationDate: any,
  +installDate: ?any,
  +status: WorkOrderStatus,
  +priority: WorkOrderPriority,
  +properties: $ReadOnlyArray<?{|
    +id: string,
    +propertyType: {|
      +id: string,
      +name: string,
      +type: PropertyKind,
      +nodeType: ?string,
      +index: ?number,
      +stringValue: ?string,
      +intValue: ?number,
      +booleanValue: ?boolean,
      +floatValue: ?number,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +rangeFromValue: ?number,
      +rangeToValue: ?number,
      +isEditable: ?boolean,
      +isInstanceProperty: ?boolean,
      +isMandatory: ?boolean,
      +category: ?string,
      +isDeleted: ?boolean,
    |},
    +stringValue: ?string,
    +intValue: ?number,
    +floatValue: ?number,
    +booleanValue: ?boolean,
    +latitudeValue: ?number,
    +longitudeValue: ?number,
    +rangeFromValue: ?number,
    +rangeToValue: ?number,
    +nodeValue: ?{|
      +id: string,
      +name: string,
    |},
  |}>,
  +images: $ReadOnlyArray<?{|
    +$fragmentSpreads: EntityDocumentsTable_files$fragmentType,
  |}>,
  +files: $ReadOnlyArray<?{|
    +$fragmentSpreads: EntityDocumentsTable_files$fragmentType,
  |}>,
  +hyperlinks: $ReadOnlyArray<{|
    +$fragmentSpreads: EntityDocumentsTable_hyperlinks$fragmentType,
  |}>,
  +comments: $ReadOnlyArray<?{|
    +$fragmentSpreads: CommentsActivitiesBox_comments$fragmentType,
  |}>,
  +activities: $ReadOnlyArray<{|
    +$fragmentSpreads: CommentsActivitiesBox_activities$fragmentType,
  |}>,
  +project: ?{|
    +name: string,
    +id: string,
    +type: {|
      +id: string,
      +name: string,
    |},
  |},
  +checkListCategories: $ReadOnlyArray<{|
    +id: string,
    +title: string,
    +description: ?string,
    +checkList: $ReadOnlyArray<{|
      +id: string,
      +index: ?number,
      +isMandatory: ?boolean,
      +type: CheckListItemType,
      +title: string,
      +helpText: ?string,
      +checked: ?boolean,
      +enumValues: ?string,
      +stringValue: ?string,
      +enumSelectionMode: ?CheckListItemEnumSelectionMode,
      +selectedEnumValues: ?string,
      +yesNoResponse: ?YesNoResponse,
      +files: ?$ReadOnlyArray<{|
        +id: string,
        +fileName: string,
        +sizeInBytes: ?number,
        +modified: ?any,
        +uploaded: ?any,
        +fileType: ?FileType,
        +storeKey: ?string,
        +category: ?string,
        +annotation: ?string,
      |}>,
      +cellData: ?$ReadOnlyArray<{|
        +id: string,
        +networkType: CellularNetworkType,
        +signalStrength: number,
        +timestamp: ?number,
        +baseStationID: ?string,
        +networkID: ?string,
        +systemID: ?string,
        +cellID: ?string,
        +locationAreaCode: ?string,
        +mobileCountryCode: ?string,
        +mobileNetworkCode: ?string,
        +primaryScramblingCode: ?string,
        +operator: ?string,
        +arfcn: ?number,
        +physicalCellID: ?string,
        +trackingAreaCode: ?string,
        +timingAdvance: ?number,
        +earfcn: ?number,
        +uarfcn: ?number,
        +latitude: ?number,
        +longitude: ?number,
      |}>,
      +wifiData: ?$ReadOnlyArray<{|
        +id: string,
        +timestamp: number,
        +frequency: number,
        +channel: number,
        +bssid: string,
        +strength: number,
        +ssid: ?string,
        +band: ?string,
        +channelWidth: ?number,
        +capabilities: ?string,
        +latitude: ?number,
        +longitude: ?number,
      |}>,
    |}>,
  |}>,
  +$fragmentSpreads: WorkOrderDetailsPane_workOrder$fragmentType,
  +$fragmentType: WorkOrderDetails_workOrder$fragmentType,
|};
export type WorkOrderDetails_workOrder = WorkOrderDetails_workOrder$data;
export type WorkOrderDetails_workOrder$key = {
  +$data?: WorkOrderDetails_workOrder$data,
  +$fragmentSpreads: WorkOrderDetails_workOrder$fragmentType,
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
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitude",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitude",
  "storageKey": null
},
v5 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMandatory",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v18 = [
  (v0/*: any*/),
  (v1/*: any*/)
],
v19 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "EntityDocumentsTable_files"
  }
],
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkOrderDetails_workOrder",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
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
      "concreteType": "Organization",
      "kind": "LinkedField",
      "name": "organizationFk",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "WorkOrderType",
      "kind": "LinkedField",
      "name": "workOrderType",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        (v0/*: any*/)
      ],
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
        (v1/*: any*/),
        (v0/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "LocationType",
          "kind": "LinkedField",
          "name": "locationType",
          "plural": false,
          "selections": [
            (v0/*: any*/),
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
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LocationBreadcrumbsTitle_locationDetails"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "assignedTo",
      "plural": false,
      "selections": (v5/*: any*/),
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priority",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorkOrderDetailsPane_workOrder"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Property",
      "kind": "LinkedField",
      "name": "properties",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyType",
          "kind": "LinkedField",
          "name": "propertyType",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v6/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "nodeType",
              "storageKey": null
            },
            (v7/*: any*/),
            (v8/*: any*/),
            (v9/*: any*/),
            (v10/*: any*/),
            (v11/*: any*/),
            (v12/*: any*/),
            (v13/*: any*/),
            (v14/*: any*/),
            (v15/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isEditable",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isInstanceProperty",
              "storageKey": null
            },
            (v16/*: any*/),
            (v17/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isDeleted",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        (v8/*: any*/),
        (v9/*: any*/),
        (v11/*: any*/),
        (v10/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "nodeValue",
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
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": (v19/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "files",
      "plural": true,
      "selections": (v19/*: any*/),
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntityDocumentsTable_hyperlinks"
        }
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CommentsActivitiesBox_comments"
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CommentsActivitiesBox_activities"
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
        (v1/*: any*/),
        (v0/*: any*/),
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
        (v0/*: any*/),
        (v20/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "CheckListItem",
          "kind": "LinkedField",
          "name": "checkList",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            (v7/*: any*/),
            (v16/*: any*/),
            (v6/*: any*/),
            (v20/*: any*/),
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
            (v8/*: any*/),
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "fileName",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "sizeInBytes",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "modified",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "uploaded",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "fileType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "storeKey",
                  "storageKey": null
                },
                (v17/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "annotation",
                  "storageKey": null
                }
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
                (v0/*: any*/),
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
                (v21/*: any*/),
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
                (v3/*: any*/),
                (v4/*: any*/)
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
                (v0/*: any*/),
                (v21/*: any*/),
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
                (v3/*: any*/),
                (v4/*: any*/)
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
  "type": "WorkOrder",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "05eebced3564947e9c1dbe9b5b9dcd0a";

module.exports = ((node/*: any*/)/*: Fragment<
  WorkOrderDetails_workOrder$fragmentType,
  WorkOrderDetails_workOrder$data,
>*/);
