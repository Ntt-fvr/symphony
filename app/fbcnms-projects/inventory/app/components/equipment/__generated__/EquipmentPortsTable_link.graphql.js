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
import type { ReaderFragment } from 'relay-runtime';
type EquipmentBreadcrumbs_equipment$ref = any;
export type FutureState = "INSTALL" | "REMOVE" | "%future added value";
export type PropertyKind = "bool" | "date" | "datetime_local" | "email" | "enum" | "float" | "gps_location" | "int" | "node" | "range" | "string" | "%future added value";
export type WorkOrderStatus = "BLOCKED" | "CANCELED" | "CLOSED" | "DONE" | "IN_PROGRESS" | "PENDING" | "PLANNED" | "SUBMITTED" | "SUSPENDED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type EquipmentPortsTable_link$ref: FragmentReference;
declare export opaque type EquipmentPortsTable_link$fragmentType: EquipmentPortsTable_link$ref;
export type EquipmentPortsTable_link = {|
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
        |}>
      |},
    |},
    +parentEquipment: {|
      +id: string,
      +name: string,
      +futureState: ?FutureState,
      +equipmentType: {|
        +id: string,
        +name: string,
      |},
      +$fragmentRefs: EquipmentBreadcrumbs_equipment$ref,
    |},
    +serviceEndpoints: $ReadOnlyArray<{|
      +definition: {|
        +role: ?string
      |},
      +service: {|
        +name: string
      |},
    |}>,
  |}>,
  +workOrder: ?{|
    +id: string,
    +status: WorkOrderStatus,
  |},
  +properties: $ReadOnlyArray<?{|
    +id: string,
    +propertyTypeValue: ?{|
      +id: string,
      +name: string,
    |},
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
      +parentPropertyType: ?{|
        +id: string,
        +name: string,
      |},
      +propertyTypeValues: ?$ReadOnlyArray<{|
        +id: string,
        +isDeleted: ?boolean,
        +name: string,
        +parentPropertyTypeValue: ?$ReadOnlyArray<?{|
          +id: string,
          +isDeleted: ?boolean,
          +name: string,
        |}>,
      |}>,
      +dependencePropertyTypes: $ReadOnlyArray<?{|
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
        +isMandatory: ?boolean,
        +isInstanceProperty: ?boolean,
        +isDeleted: ?boolean,
        +category: ?string,
        +propertyTypeValues: ?$ReadOnlyArray<{|
          +id: string,
          +isDeleted: ?boolean,
          +name: string,
          +parentPropertyTypeValue: ?$ReadOnlyArray<?{|
            +id: string,
            +isDeleted: ?boolean,
            +name: string,
          |}>,
        |}>,
      |}>,
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
  +services: $ReadOnlyArray<?{|
    +id: string,
    +name: string,
  |}>,
  +$refType: EquipmentPortsTable_link$ref,
|};
export type EquipmentPortsTable_link$data = EquipmentPortsTable_link;
export type EquipmentPortsTable_link$key = {
  +$data?: EquipmentPortsTable_link$data,
  +$fragmentRefs: EquipmentPortsTable_link$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
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
  "name": "type",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nodeType",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "index",
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
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeleted",
  "storageKey": null
},
v19 = [
  (v0/*: any*/),
  (v2/*: any*/)
],
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "PropertyTypeValue",
  "kind": "LinkedField",
  "name": "propertyTypeValues",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v18/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyTypeValue",
      "kind": "LinkedField",
      "name": "parentPropertyTypeValue",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v18/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EquipmentPortsTable_link",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "visibleLabel",
              "storageKey": null
            },
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
                    (v3/*: any*/),
                    (v4/*: any*/),
                    (v5/*: any*/),
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
                    (v16/*: any*/),
                    (v17/*: any*/),
                    (v18/*: any*/)
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
              "selections": (v19/*: any*/),
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "EquipmentBreadcrumbs_equipment"
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
                }
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
              "selections": [
                (v2/*: any*/)
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
      "concreteType": "Property",
      "kind": "LinkedField",
      "name": "properties",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyTypeValue",
          "kind": "LinkedField",
          "name": "propertyTypeValue",
          "plural": false,
          "selections": (v19/*: any*/),
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
            (v0/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
            (v4/*: any*/),
            (v5/*: any*/),
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
            (v16/*: any*/),
            (v17/*: any*/),
            (v18/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "PropertyType",
              "kind": "LinkedField",
              "name": "parentPropertyType",
              "plural": false,
              "selections": (v19/*: any*/),
              "storageKey": null
            },
            (v20/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "PropertyType",
              "kind": "LinkedField",
              "name": "dependencePropertyTypes",
              "plural": true,
              "selections": [
                (v0/*: any*/),
                (v2/*: any*/),
                (v3/*: any*/),
                (v4/*: any*/),
                (v5/*: any*/),
                (v6/*: any*/),
                (v7/*: any*/),
                (v8/*: any*/),
                (v9/*: any*/),
                (v10/*: any*/),
                (v11/*: any*/),
                (v12/*: any*/),
                (v13/*: any*/),
                (v14/*: any*/),
                (v16/*: any*/),
                (v15/*: any*/),
                (v18/*: any*/),
                (v17/*: any*/),
                (v20/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "nodeValue",
          "plural": false,
          "selections": (v19/*: any*/),
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
      "selections": (v19/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Link",
  "abstractKey": null
};
})();
// prettier-ignore
(node/*: any*/).hash = '305eb52ae1d04d26954b2a42bc4c81ac';

module.exports = node;
