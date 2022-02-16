#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field as _field
from functools import partial
from ...config import custom_scalars, datetime
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin, config

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.order_direction import OrderDirection
from ..enum.recommendations_sources_order_field import RecommendationsSourcesOrderField


@dataclass(frozen=True)
class RecommendationsSourcesOrder(DataClassJsonMixin):
    direction: OrderDirection = _field(metadata=enum_field_metadata(OrderDirection))
    field: Optional[RecommendationsSourcesOrderField] = None