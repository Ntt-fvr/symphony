#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from functools import partial
from gql_client.runtime.datetime_utils import DATETIME_FIELD
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional

from dataclasses_json import DataClassJsonMixin

from ..input.equipment_port_connection_input import EquipmentPortConnectionInput
@dataclass
class EquipmentPortInput(DataClassJsonMixin):
    name: str
    connectedPorts: List[EquipmentPortConnectionInput]
    id: Optional[str] = None
    index: Optional[int] = None
    visibleLabel: Optional[str] = None
    portTypeID: Optional[str] = None
    bandwidth: Optional[str] = None
