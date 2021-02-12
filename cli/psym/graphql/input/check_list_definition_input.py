#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field as _field
from functools import partial
from ...config import custom_scalars, datetime
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin, config

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.check_list_item_enum_selection_mode import CheckListItemEnumSelectionMode
from ..enum.check_list_item_type import CheckListItemType


@dataclass(frozen=True)
class CheckListDefinitionInput(DataClassJsonMixin):
    title: str
    type: CheckListItemType = _field(metadata=enum_field_metadata(CheckListItemType))
    id: Optional[str] = None
    index: Optional[int] = None
    isMandatory: Optional[bool] = None
    enumValues: Optional[str] = None
    enumSelectionMode: Optional[CheckListItemEnumSelectionMode] = None
    helpText: Optional[str] = None
