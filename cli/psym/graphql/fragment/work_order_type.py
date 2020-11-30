#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from datetime import datetime
from gql_client.runtime.datetime_utils import DATETIME_FIELD_METADATA
from gql_client.runtime.variables import encode_variables
from gql import gql, Client
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, AsyncGenerator, Callable, Dict, List, Generator, Optional
from time import perf_counter
from dataclasses_json import DataClassJsonMixin

from .property_type import PropertyTypeFragment, QUERY as PropertyTypeFragmentQuery
# fmt: off
QUERY: List[str] = PropertyTypeFragmentQuery + ["""
fragment WorkOrderTypeFragment on WorkOrderType {
    id
    name
    description
    propertyTypes {
      ...PropertyTypeFragment
    }
}

"""]

@dataclass(frozen=True)
class WorkOrderTypeFragment(DataClassJsonMixin):
    @dataclass(frozen=True)
    class PropertyType(PropertyTypeFragment):
        pass

    id: str
    name: str
    description: Optional[str]
    propertyTypes: List[PropertyType]
