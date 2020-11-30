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

# fmt: off
QUERY: List[str] = ["""
fragment PropertyFragment on Property {
  id
  propertyType {
    id
    externalId
    name
  }
  stringValue
  intValue
  floatValue
  booleanValue
  latitudeValue
  longitudeValue
  rangeFromValue
  rangeToValue
}

"""]

@dataclass(frozen=True)
class PropertyFragment(DataClassJsonMixin):
    @dataclass(frozen=True)
    class PropertyType(DataClassJsonMixin):
        id: str
        externalId: Optional[str]
        name: str

    id: str
    propertyType: PropertyType
    stringValue: Optional[str]
    intValue: Optional[int]
    floatValue: Optional[Number]
    booleanValue: Optional[bool]
    latitudeValue: Optional[Number]
    longitudeValue: Optional[Number]
    rangeFromValue: Optional[Number]
    rangeToValue: Optional[Number]
