#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from ...config import custom_scalars, datetime
from gql_client.runtime.variables import encode_variables
from gql import gql, Client
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional
from time import perf_counter
from dataclasses_json import DataClassJsonMixin, config

from .property import PropertyFragment, QUERY as PropertyFragmentQuery

from .work_order import WorkOrderFragment, QUERY as WorkOrderFragmentQuery

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.project_priority import ProjectPriority

# fmt: off
QUERY: List[str] = PropertyFragmentQuery + WorkOrderFragmentQuery + ["""
fragment ProjectFragment on Project {
    id
    name
    description
    priority
    createdBy{
        id
    }
    type{
        id
        name
    }
    location{
        id
    }
    workOrders {
        ...WorkOrderFragment
    }
    properties{
        ...PropertyFragment
    }
}
"""]

@dataclass(frozen=True)
class ProjectFragment(DataClassJsonMixin):
    @dataclass(frozen=True)
    class User(DataClassJsonMixin):
        id: str

    @dataclass(frozen=True)
    class ProjectType(DataClassJsonMixin):
        id: str
        name: str

    @dataclass(frozen=True)
    class Location(DataClassJsonMixin):
        id: str

    @dataclass(frozen=True)
    class WorkOrder(WorkOrderFragment):
        pass

    @dataclass(frozen=True)
    class Property(PropertyFragment):
        pass

    id: str
    name: str
    description: Optional[str]
    priority: ProjectPriority = field(metadata=enum_field_metadata(ProjectPriority))
    createdBy: Optional[User]
    type: ProjectType
    location: Optional[Location]
    workOrders: List[WorkOrder]
    properties: List[Property]
