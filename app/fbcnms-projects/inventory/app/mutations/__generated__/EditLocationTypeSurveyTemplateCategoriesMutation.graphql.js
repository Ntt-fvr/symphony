/**
 * @generated SignedSource<<4f6d216187120354e01f2c9fbae383c2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type SurveyQuestionType = "BOOL" | "EMAIL" | "COORDS" | "PHONE" | "TEXT" | "TEXTAREA" | "PHOTO" | "WIFI" | "CELLULAR" | "FLOAT" | "INTEGER" | "DATE" | "%future added value";
export type SurveyTemplateCategoryInput = {|
  id?: ?string,
  categoryTitle: string,
  categoryDescription: string,
  surveyTemplateQuestions?: ?$ReadOnlyArray<?SurveyTemplateQuestionInput>,
|};
export type SurveyTemplateQuestionInput = {|
  id?: ?string,
  questionTitle: string,
  questionDescription: string,
  questionType: SurveyQuestionType,
  index: number,
|};
export type EditLocationTypeSurveyTemplateCategoriesMutation$variables = {|
  id: string,
  surveyTemplateCategories: $ReadOnlyArray<SurveyTemplateCategoryInput>,
|};
export type EditLocationTypeSurveyTemplateCategoriesMutationVariables = EditLocationTypeSurveyTemplateCategoriesMutation$variables;
export type EditLocationTypeSurveyTemplateCategoriesMutation$data = {|
  +editLocationTypeSurveyTemplateCategories: ?$ReadOnlyArray<{|
    +id: string,
  |}>,
|};
export type EditLocationTypeSurveyTemplateCategoriesMutationResponse = EditLocationTypeSurveyTemplateCategoriesMutation$data;
export type EditLocationTypeSurveyTemplateCategoriesMutation = {|
  variables: EditLocationTypeSurveyTemplateCategoriesMutationVariables,
  response: EditLocationTypeSurveyTemplateCategoriesMutation$data,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "surveyTemplateCategories"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "surveyTemplateCategories",
        "variableName": "surveyTemplateCategories"
      }
    ],
    "concreteType": "SurveyTemplateCategory",
    "kind": "LinkedField",
    "name": "editLocationTypeSurveyTemplateCategories",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "EditLocationTypeSurveyTemplateCategoriesMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditLocationTypeSurveyTemplateCategoriesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a59c0f8df4a12a1861f389ba3ee9f767",
    "id": null,
    "metadata": {},
    "name": "EditLocationTypeSurveyTemplateCategoriesMutation",
    "operationKind": "mutation",
    "text": "mutation EditLocationTypeSurveyTemplateCategoriesMutation(\n  $id: ID!\n  $surveyTemplateCategories: [SurveyTemplateCategoryInput!]!\n) {\n  editLocationTypeSurveyTemplateCategories(id: $id, surveyTemplateCategories: $surveyTemplateCategories) {\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "85792e6b61c311d8ce3645703deb69b6";

module.exports = ((node/*: any*/)/*: Mutation<
  EditLocationTypeSurveyTemplateCategoriesMutation$variables,
  EditLocationTypeSurveyTemplateCategoriesMutation$data,
>*/);
