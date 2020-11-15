#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from functools import partial
from gql_client.runtime.datetime_utils import DATETIME_FIELD
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional

from dataclasses_json import DataClassJsonMixin

from gql_client.runtime.enum_utils import enum_field
from ..enum.survey_status import SurveyStatus

from ..input.survey_question_response import SurveyQuestionResponse
@dataclass
class SurveyCreateData(DataClassJsonMixin):
    name: str
    completionTimestamp: int
    locationID: str
    surveyResponses: List[SurveyQuestionResponse]
    status: Optional[SurveyStatus] = None
    ownerName: Optional[str] = None
    creationTimestamp: Optional[int] = None

