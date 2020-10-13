#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from functools import partial
from gql.gql.datetime_utils import DATETIME_FIELD
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional

from dataclasses_json import DataClassJsonMixin

from gql.gql.enum_utils import enum_field
from ..enum.action_type_id import ActionTypeId

from ..input.block_u_i_representation import BlockUIRepresentationInput
from ..input.variable_expression import VariableExpressionInput
@dataclass
class ActionBlockInput(DataClassJsonMixin):
    cid: str
    params: List[VariableExpressionInput]
    actionType: ActionTypeId = enum_field(ActionTypeId)
    uiRepresentation: Optional[BlockUIRepresentationInput] = None

