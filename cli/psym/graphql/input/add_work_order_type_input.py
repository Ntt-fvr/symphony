#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field as _field
from functools import partial
from ...config import custom_scalars, datetime
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin, config

from ..input.check_list_category_definition_input import CheckListCategoryDefinitionInput
from ..input.property_type_input import PropertyTypeInput


@dataclass(frozen=True)
class AddWorkOrderTypeInput(DataClassJsonMixin):
    name: str
    checkListCategories: List[CheckListCategoryDefinitionInput]
    description: Optional[str] = None
    properties: Optional[List[PropertyTypeInput]] = None
    assigneeCanCompleteWorkOrder: Optional[bool] = None
    duration: Optional[Number] = None
