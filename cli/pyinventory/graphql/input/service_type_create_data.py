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
from ..enum.discovery_method import DiscoveryMethod

from ..input.property_type import PropertyTypeInput
from ..input.service_endpoint_definition import ServiceEndpointDefinitionInput
@dataclass
class ServiceTypeCreateData(DataClassJsonMixin):
    name: str
    hasCustomer: bool
    discoveryMethod: Optional[DiscoveryMethod] = None
    properties: Optional[List[PropertyTypeInput]] = None
    endpoints: Optional[List[ServiceEndpointDefinitionInput]] = None

