/**
 * @generated SignedSource<<a241d75d6c64a44924557571ba4c019d>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
type AddEditLocationTypeCard_editingLocationType$fragmentType = any;
type LocationTypeItem_locationType$fragmentType = any;
export type PropertyKind = "string" | "int" | "bool" | "float" | "date" | "enum" | "range" | "email" | "gps_location" | "datetime_local" | "node" | "%future added value";
export type EditLocationTypeInput = {|
  id: string,
  name: string,
  mapType?: ?string,
  mapZoomLevel?: ?number,
  isSite?: ?boolean,
  documentCategories?: ?$ReadOnlyArray<DocumentCategoryInput>,
  properties?: ?$ReadOnlyArray<PropertyTypeInput>,
|};
export type DocumentCategoryInput = {|
  id?: ?string,
  name: string,
  index: number,
|};
export type PropertyTypeInput = {|
  id?: ?string,
  externalId?: ?string,
  name: string,
  type: PropertyKind,
  nodeType?: ?string,
  index?: ?number,
  category?: ?string,
  stringValue?: ?string,
  intValue?: ?number,
  booleanValue?: ?boolean,
  floatValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  isEditable?: ?boolean,
  isInstanceProperty?: ?boolean,
  isMandatory?: ?boolean,
  isDeleted?: ?boolean,
  propertyCategoryID?: ?string,
  isListable?: ?boolean,
|};
export type EditLocationTypeMutation$variables = {|
  input: EditLocationTypeInput,
|};
export type EditLocationTypeMutationVariables = EditLocationTypeMutation$variables;
export type EditLocationTypeMutation$data = {|
  +editLocationType: {|
    +id: string,
    +name: string,
    +$fragmentSpreads: LocationTypeItem_locationType$fragmentType & AddEditLocationTypeCard_editingLocationType$fragmentType,
  |},
|};
export type EditLocationTypeMutationResponse = EditLocationTypeMutation$data;
export type EditLocationTypeMutation = {|
  variables: EditLocationTypeMutationVariables,
  response: EditLocationTypeMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
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
  "name": "index",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditLocationTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LocationType",
        "kind": "LinkedField",
        "name": "editLocationType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LocationTypeItem_locationType"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AddEditLocationTypeCard_editingLocationType"
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
    "name": "EditLocationTypeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LocationType",
        "kind": "LinkedField",
        "name": "editLocationType",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PropertyType",
            "kind": "LinkedField",
            "name": "propertyTypes",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
              (v4/*: any*/),
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
                "name": "isInstanceProperty",
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
                "name": "category",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isDeleted",
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
                  (v2/*: any*/),
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
            "name": "numberOfLocations",
            "storageKey": null
          },
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
            "concreteType": "DocumentCategory",
            "kind": "LinkedField",
            "name": "documentCategories",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
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
              (v2/*: any*/),
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
                  (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "83e949b13b36278769e05535d211970b",
    "id": null,
    "metadata": {},
    "name": "EditLocationTypeMutation",
    "operationKind": "mutation",
    "text": "mutation EditLocationTypeMutation(\n  $input: EditLocationTypeInput!\n) {\n  editLocationType(input: $input) {\n    id\n    name\n    ...LocationTypeItem_locationType\n    ...AddEditLocationTypeCard_editingLocationType\n  }\n}\n\nfragment AddEditLocationTypeCard_editingLocationType on LocationType {\n  id\n  name\n  mapType\n  mapZoomLevel\n  numberOfLocations\n  propertyTypes {\n    id\n    name\n    type\n    nodeType\n    index\n    stringValue\n    intValue\n    booleanValue\n    floatValue\n    latitudeValue\n    longitudeValue\n    rangeFromValue\n    rangeToValue\n    isEditable\n    isMandatory\n    isInstanceProperty\n    propertyCategory {\n      id\n      name\n    }\n  }\n  documentCategories {\n    id\n    name\n    index\n    numberOfDocuments\n  }\n  surveyTemplateCategories {\n    id\n    categoryTitle\n    categoryDescription\n    surveyTemplateQuestions {\n      id\n      questionTitle\n      questionDescription\n      questionType\n      index\n    }\n  }\n}\n\nfragment DynamicPropertyTypesGrid_propertyTypes on PropertyType {\n  ...PropertyTypeFormField_propertyType\n  id\n  index\n}\n\nfragment LocationTypeItem_locationType on LocationType {\n  id\n  name\n  index\n  propertyTypes {\n    ...DynamicPropertyTypesGrid_propertyTypes\n    id\n  }\n  numberOfLocations\n}\n\nfragment PropertyTypeFormField_propertyType on PropertyType {\n  id\n  name\n  type\n  nodeType\n  index\n  stringValue\n  intValue\n  booleanValue\n  floatValue\n  latitudeValue\n  longitudeValue\n  rangeFromValue\n  rangeToValue\n  isEditable\n  isInstanceProperty\n  isMandatory\n  category\n  isDeleted\n}\n"
  }
};
})();

(node/*: any*/).hash = "f8c04f679267f8e1189b89e96b4b9420";

module.exports = ((node/*: any*/)/*: Mutation<
  EditLocationTypeMutation$variables,
  EditLocationTypeMutation$data,
>*/);
