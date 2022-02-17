/**
 * @generated SignedSource<<d8d69091ea7c4dc3de39d37c58620db8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type SurveyQuestionType = "BOOL" | "EMAIL" | "COORDS" | "PHONE" | "TEXT" | "TEXTAREA" | "PHOTO" | "WIFI" | "CELLULAR" | "FLOAT" | "INTEGER" | "DATE" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type AddEditLocationTypeCard_editingLocationType$fragmentType: FragmentType;
export type AddEditLocationTypeCard_editingLocationType$ref = AddEditLocationTypeCard_editingLocationType$fragmentType;
export type AddEditLocationTypeCard_editingLocationType$data = {|
  +id: string,
  +name: string,
  +mapType: ?string,
  +mapZoomLevel: ?number,
  +numberOfLocations: number,
  +propertyTypes: $ReadOnlyArray<?{|
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
    +propertyCategory: ?{|
      +id: string,
      +name: ?string,
    |},
  |}>,
  +documentCategories: $ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +index: ?number,
    +numberOfDocuments: number,
  |}>,
  +surveyTemplateCategories: ?$ReadOnlyArray<?{|
    +id: string,
    +categoryTitle: string,
    +categoryDescription: string,
    +surveyTemplateQuestions: ?$ReadOnlyArray<?{|
      +id: string,
      +questionTitle: string,
      +questionDescription: string,
      +questionType: SurveyQuestionType,
      +index: number,
    |}>,
  |}>,
  +$fragmentType: AddEditLocationTypeCard_editingLocationType$fragmentType,
|};
export type AddEditLocationTypeCard_editingLocationType = AddEditLocationTypeCard_editingLocationType$data;
export type AddEditLocationTypeCard_editingLocationType$key = {
  +$data?: AddEditLocationTypeCard_editingLocationType$data,
  +$fragmentSpreads: AddEditLocationTypeCard_editingLocationType$fragmentType,
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
  "name": "index",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddEditLocationTypeCard_editingLocationType",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "numberOfLocations",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PropertyType",
      "kind": "LinkedField",
      "name": "propertyTypes",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "nodeType",
          "storageKey": null
        },
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "stringValue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "intValue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "booleanValue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "floatValue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "latitudeValue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "longitudeValue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "rangeFromValue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "rangeToValue",
          "storageKey": null
        },
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
          "name": "isMandatory",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInstanceProperty",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PropertyCategory",
          "kind": "LinkedField",
          "name": "propertyCategory",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DocumentCategory",
      "kind": "LinkedField",
      "name": "documentCategories",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "numberOfDocuments",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SurveyTemplateCategory",
      "kind": "LinkedField",
      "name": "surveyTemplateCategories",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "categoryTitle",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "categoryDescription",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SurveyTemplateQuestion",
          "kind": "LinkedField",
          "name": "surveyTemplateQuestions",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "questionTitle",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "questionDescription",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "questionType",
              "storageKey": null
            },
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "LocationType",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "bf5f7b7c2910e46dd59deb7d8029ff85";

module.exports = ((node/*: any*/)/*: Fragment<
  AddEditLocationTypeCard_editingLocationType$fragmentType,
  AddEditLocationTypeCard_editingLocationType$data,
>*/);
