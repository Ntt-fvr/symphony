#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from functools import partial
from ...config import custom_scalars, datetime
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin, config

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.filter_operator import FilterOperator
from ..enum.location_filter_type import LocationFilterType

from ..input.property_type_input import PropertyTypeInput


@dataclass(frozen=True)
class LocationFilterInput(DataClassJsonMixin):
    filterType: LocationFilterType = field(metadata=enum_field_metadata(LocationFilterType))
    operator: FilterOperator = field(metadata=enum_field_metadata(FilterOperator))
    idSet: List[str]
    stringSet: List[str]
    boolValue: Optional[bool] = None
    stringValue: Optional[str] = None
    propertyValue: Optional[PropertyTypeInput] = None
    maxDepth: Optional[int] = None
