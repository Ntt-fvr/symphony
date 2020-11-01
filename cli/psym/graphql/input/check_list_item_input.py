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
from ..enum.check_list_item_enum_selection_mode import CheckListItemEnumSelectionMode
from ..enum.check_list_item_type import CheckListItemType
from ..enum.yes_no_response import YesNoResponse

from ..input.file_input import FileInput
from ..input.survey_cell_scan_data import SurveyCellScanData
from ..input.survey_wi_fi_scan_data import SurveyWiFiScanData
@dataclass
class CheckListItemInput(DataClassJsonMixin):
    title: str
    files: List[FileInput]
    wifiData: List[SurveyWiFiScanData]
    cellData: List[SurveyCellScanData]
    type: CheckListItemType = enum_field(CheckListItemType)
    enumSelectionMode: Optional[CheckListItemEnumSelectionMode] = None
    yesNoResponse: Optional[YesNoResponse] = None
    id: Optional[str] = None
    index: Optional[int] = None
    isMandatory: Optional[bool] = None
    helpText: Optional[str] = None
    enumValues: Optional[str] = None
    selectedEnumValues: Optional[str] = None
    stringValue: Optional[str] = None
    checked: Optional[bool] = None
