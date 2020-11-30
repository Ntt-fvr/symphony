#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from datetime import datetime
from functools import partial
from gql_client.runtime.datetime_utils import DATETIME_FIELD_METADATA
from numbers import Number
from typing import Any, AsyncGenerator, Callable, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin

from ..input.link_side import LinkSide
from ..input.property_input import PropertyInput

@dataclass(frozen=True)
class EditEquipmentPortInput(DataClassJsonMixin):
    side: LinkSide
    properties: List[PropertyInput]
