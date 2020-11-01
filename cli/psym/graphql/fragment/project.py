#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from gql_client.runtime.datetime_utils import DATETIME_FIELD
from gql_client.runtime.graphql_client import GraphqlClient
from gql_client.runtime.client import OperationException
from gql_client.runtime.reporter import FailedOperationException
from functools import partial
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional, Dict
from time import perf_counter
from dataclasses_json import DataClassJsonMixin

from .property import PropertyFragment, QUERY as PropertyFragmentQuery
from .work_order import WorkOrderFragment, QUERY as WorkOrderFragmentQuery
from gql_client.runtime.enum_utils import enum_field
from ..enum.project_priority import ProjectPriority

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

@dataclass
class ProjectFragment(DataClassJsonMixin):
    @dataclass
    class User(DataClassJsonMixin):
        id: str

    @dataclass
    class ProjectType(DataClassJsonMixin):
        id: str
        name: str

    @dataclass
    class Location(DataClassJsonMixin):
        id: str

    @dataclass
    class WorkOrder(WorkOrderFragment):
        pass

    @dataclass
    class Property(PropertyFragment):
        pass

    id: str
    name: str
    description: Optional[str]
    createdBy: Optional[User]
    type: ProjectType
    location: Optional[Location]
    workOrders: List[WorkOrder]
    properties: List[Property]
    priority: ProjectPriority = enum_field(ProjectPriority)
