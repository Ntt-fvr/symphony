/**
 * @generated SignedSource<<4e5d3b1b9ac384c4a57a9444400b16a9>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
type EquipmentBreadcrumbs_equipment$fragmentType = any;
export type FutureState = "INSTALL" | "REMOVE" | "%future added value";
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type WorkOrderStatus = "PLANNED" | "IN_PROGRESS" | "PENDING" | "SUBMITTED" | "CLOSED" | "DONE" | "BLOCKED" | "CANCELED" | "SUSPENDED" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type PowerSearchLinksResultsTable_links$fragmentType: FragmentType;
export type PowerSearchLinksResultsTable_links$ref = PowerSearchLinksResultsTable_links$fragmentType;
export type PowerSearchLinksResultsTable_links$data = $ReadOnlyArray<{|
  +id: string,
  +futureState: ?FutureState,
  +ports: $ReadOnlyArray<?{|
    +id: string,
    +definition: {|
      +id: string,
      +name: string,
      +visibleLabel: ?string,
      +portType: ?{|
        +linkPropertyTypes: $ReadOnlyArray<?{|
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
        |}>,
      |},
    |},
    +parentEquipment: {|
      +id: string,
      +name: string,
      +futureState: ?FutureState,
      +equipmentType: {|
        +id: string,
        +name: string,
        +portDefinitions: $ReadOnlyArray<?{|
          +id: string,
          +name: string,
          +visibleLabel: ?string,
          +bandwidth: ?string,
          +portType: ?{|
            +id: string,
            +name: string,
          |},
        |}>,
      |},
      +$fragmentSpreads: EquipmentBreadcrumbs_equipment$fragmentType,
    |},
  |}>,
  +properties: $ReadOnlyArray<?{|
    +id: string,
    +stringValue: ?string,
    +intValue: ?number,
    +floatValue: ?number,
    +booleanValue: ?boolean,
    +latitudeValue: ?number,
    +longitudeValue: ?number,
    +rangeFromValue: ?number,
    +rangeToValue: ?number,
    +propertyType: {|
      +id: string,
      +name: string,
      +type: PropertyKind,
      +nodeType: ?string,
      +isEditable: ?boolean,
      +isInstanceProperty: ?boolean,
      +stringValue: ?string,
      +intValue: ?number,
      +floatValue: ?number,
      +booleanValue: ?boolean,
      +latitudeValue: ?number,
      +longitudeValue: ?number,
      +rangeFromValue: ?number,
      +rangeToValue: ?number,
    |},
  |}>,
  +workOrder: ?{|
    +id: string,
    +status: WorkOrderStatus,
  |},
  +services: $ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>,
  +$fragmentType: PowerSearchLinksResultsTable_links$fragmentType,
|}>;
export type PowerSearchLinksResultsTable_links = PowerSearchLinksResultsTable_links$data;
export type PowerSearchLinksResultsTable_links$key = $ReadOnlyArray<{
  +$data?: PowerSearchLinksResultsTable_links$data,
  +$fragmentSpreads: PowerSearchLinksResultsTable_links$fragmentType,
  ...
}>;
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
  "name": "futureState",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibleLabel",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeType",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stringValue",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "intValue",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "booleanValue",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "floatValue",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitudeValue",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitudeValue",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeFromValue",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rangeToValue",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isEditable",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInstanceProperty",
  "storageKey": null
},
v16 = [
  (v0/*: any*/),
  (v2/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PowerSearchLinksResultsTable_links",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EquipmentPort",
      "kind": "LinkedField",
      "name": "ports",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "EquipmentPortDefinition",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
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
                    (v0/*: any*/),
                    (v2/*: any*/),
                    (v4/*: any*/),
                    (v5/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "index",
                      "storageKey": null
                    },
                    (v6/*: any*/),
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
                      "name": "isMandatory",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "category",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "isDeleted",
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Equipment",
          "kind": "LinkedField",
          "name": "parentEquipment",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/),
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "EquipmentType",
              "kind": "LinkedField",
              "name": "equipmentType",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EquipmentPortDefinition",
                  "kind": "LinkedField",
                  "name": "portDefinitions",
                  "plural": true,
                  "selections": [
                    (v0/*: any*/),
                    (v2/*: any*/),
                    (v3/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "bandwidth",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "EquipmentPortType",
                      "kind": "LinkedField",
                      "name": "portType",
                      "plural": false,
                      "selections": (v16/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "EquipmentBreadcrumbs_equipment"
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
      "concreteType": "Property",
      "kind": "LinkedField",
      "name": "properties",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        (v9/*: any*/),
        (v8/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyType",
          "kind": "LinkedField",
          "name": "propertyType",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v2/*: any*/),
            (v4/*: any*/),
            (v5/*: any*/),
            (v14/*: any*/),
            (v15/*: any*/),
            (v6/*: any*/),
            (v7/*: any*/),
            (v9/*: any*/),
            (v8/*: any*/),
            (v10/*: any*/),
            (v11/*: any*/),
            (v12/*: any*/),
            (v13/*: any*/)
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Service",
      "kind": "LinkedField",
      "name": "services",
      "plural": true,
      "selections": (v16/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Link",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "a8e04e91f3b3dad4b69b5fc1ded6abce";

module.exports = ((node/*: any*/)/*: Fragment<
  PowerSearchLinksResultsTable_links$fragmentType,
  PowerSearchLinksResultsTable_links$data,
>*/);
