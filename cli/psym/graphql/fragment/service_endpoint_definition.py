#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from gql_client.runtime.datetime_utils import DATETIME_FIELD
from gql_client.runtime.graphql_client import GraphqlClient
from gql_client.runtime.reporter import FailedOperationException
from gql import gql
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional, Dict
from time import perf_counter
from dataclasses_json import DataClassJsonMixin

QUERY: List[str] = ["""
fragment ServiceEndpointDefinitionFragment on ServiceEndpointDefinition {
  id
  role
  name
  index
  equipmentType {
    id
  }
}

"""]

@dataclass
class ServiceEndpointDefinitionFragment(DataClassJsonMixin):
    @dataclass
    class EquipmentType(DataClassJsonMixin):
        id: str

    id: str
    role: Optional[str]
    name: str
    index: int
    equipmentType: EquipmentType
