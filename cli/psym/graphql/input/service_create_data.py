#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from functools import partial
from ...config import custom_scalars, datetime
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional

from dataclasses_json import DataClassJsonMixin, config

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.service_status import ServiceStatus

from ..input.property_input import PropertyInput


@dataclass(frozen=True)
class ServiceCreateData(DataClassJsonMixin):
    name: str
    status: ServiceStatus = field(metadata=enum_field_metadata(ServiceStatus))
    serviceTypeId: str
    upstreamServiceIds: List[str]
    externalId: Optional[str] = None
    customerId: Optional[str] = None
    properties: Optional[List[PropertyInput]] = None
