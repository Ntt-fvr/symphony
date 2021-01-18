#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from functools import partial
from ...config import custom_scalars, datetime
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin, config


@dataclass(frozen=True)
class ServiceEndpointDefinitionInput(DataClassJsonMixin):
    name: str
    index: int
    equipmentTypeID: str
    id: Optional[str] = None
    role: Optional[str] = None
