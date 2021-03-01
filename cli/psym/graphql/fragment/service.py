#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field as _field
from ...config import custom_scalars, datetime
from gql_client.runtime.variables import encode_variables
from gql import gql, Client
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional
from time import perf_counter
from dataclasses_json import DataClassJsonMixin, config

from .customer import CustomerFragment, QUERY as CustomerFragmentQuery

from .property import PropertyFragment, QUERY as PropertyFragmentQuery

# fmt: off
QUERY: List[str] = CustomerFragmentQuery + PropertyFragmentQuery + ["""
fragment ServiceFragment on Service {
  id
  name
  externalId
  serviceType {
    id
    name
  }
  customer {
    ...CustomerFragment
  }
  properties {
    ...PropertyFragment
  }
}

"""]

@dataclass(frozen=True)
class ServiceFragment(DataClassJsonMixin):
    @dataclass(frozen=True)
    class ServiceType(DataClassJsonMixin):
        id: str
        name: str

    @dataclass(frozen=True)
    class Customer(CustomerFragment):
        pass

    @dataclass(frozen=True)
    class Property(PropertyFragment):
        pass

    id: str
    name: str
    externalId: Optional[str]
    serviceType: ServiceType
    customer: Optional[Customer]
    properties: List[Property]
