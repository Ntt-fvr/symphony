#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from datetime import datetime
from functools import partial
from gql_client.runtime.datetime_utils import DATETIME_FIELD_METADATA
from numbers import Number
from typing import Any, AsyncGenerator, Callable, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.distance_unit import DistanceUnit
from ..enum.user_role import UserRole
from ..enum.user_status import UserStatus


@dataclass(frozen=True)
class EditUserInput(DataClassJsonMixin):
    id: str
    status: Optional[UserStatus] = None
    role: Optional[UserRole] = None
    distanceUnit: Optional[DistanceUnit] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
