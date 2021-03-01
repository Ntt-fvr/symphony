#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field as _field
from functools import partial
from ...config import custom_scalars, datetime
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin, config

from ..input.entry_point_input import EntryPointInput
from ..input.exit_point_input import ExitPointInput


@dataclass(frozen=True)
class ConnectorInput(DataClassJsonMixin):
    sourceBlockCid: str
    targetBlockCid: str
    sourcePoint: Optional[ExitPointInput] = None
    targetPoint: Optional[EntryPointInput] = None
