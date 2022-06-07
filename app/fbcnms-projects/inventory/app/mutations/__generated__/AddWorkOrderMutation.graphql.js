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
export type CellularNetworkType = "CDMA" | "GSM" | "LTE" | "WCDMA" | "%future added value";
export type CheckListItemEnumSelectionMode = "multiple" | "single" | "%future added value";
export type CheckListItemType = "cell_scan" | "enum" | "files" | "simple" | "string" | "wifi_scan" | "yes_no" | "%future added value";
export type FileType = "FILE" | "IMAGE" | "%future added value";
export type WorkOrderPriority = "HIGH" | "LOW" | "MEDIUM" | "NONE" | "URGENT" | "%future added value";
export type WorkOrderStatus = "BLOCKED" | "CANCELED" | "CLOSED" | "DONE" | "IN_PROGRESS" | "PENDING" | "PLANNED" | "SUBMITTED" | "SUSPENDED" | "%future added value";
export type YesNoResponse = "NO" | "YES" | "%future added value";
export type AddWorkOrderInput = {|
  assigneeId?: ?string,
  checkList?: ?$ReadOnlyArray<CheckListItemInput>,
  checkListCategories?: ?$ReadOnlyArray<CheckListCategoryInput>,
  description?: ?string,
  dueDate?: ?any,
  duration?: ?number,
  index?: ?number,
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
  workOrderTypeId: string,
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
export type AddWorkOrderMutationVariables = {|
  input: AddWorkOrderInput
|};
export type AddWorkOrderMutationResponse = {|
  +addWorkOrder: {|
    +id: string,
    +organizationFk: ?{|
      +id: string,
      +name: string,
    |},
  |}
|};
export type AddWorkOrderMutation = {|
  variables: AddWorkOrderMutationVariables,
  response: AddWorkOrderMutationResponse,
|};
*/


/*
mutation AddWorkOrderMutation(
  $input: AddWorkOrderInput!
) {
  addWorkOrder(input: $input) {
    id
    organizationFk {
      id
      name
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "WorkOrder",
    "kind": "LinkedField",
    "name": "addWorkOrder",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "organizationFk",
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddWorkOrderMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddWorkOrderMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "182fb6cdeb0767aa667d029444722316",
    "id": null,
    "metadata": {},
    "name": "AddWorkOrderMutation",
    "operationKind": "mutation",
    "text": "mutation AddWorkOrderMutation(\n  $input: AddWorkOrderInput!\n) {\n  addWorkOrder(input: $input) {\n    id\n    organizationFk {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fb996588ebca77a8fb81d745d24fa138';

module.exports = node;
