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

from ..fragment.work_order import WorkOrderFragment, QUERY as WorkOrderFragmentQuery


# fmt: off
QUERY: List[str] = WorkOrderFragmentQuery + ["""
query WorkOrdersQuery {
  workOrders {
    edges {
      node {
        ...WorkOrderFragment
      }
    }
  }
}
"""
]


class WorkOrdersQuery:
    @dataclass(frozen=True)
    class WorkOrdersQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class WorkOrderConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class WorkOrderEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class WorkOrder(WorkOrderFragment):
                    pass

                node: Optional[WorkOrder]

            edges: List[WorkOrderEdge]

        workOrders: WorkOrderConnection

    # fmt: off
    @classmethod
    def execute(cls, client: Client) -> WorkOrdersQueryData.WorkOrderConnection:
        variables: Dict[str, Any] = {}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.WorkOrdersQueryData.from_dict(response_text)
        return res.workOrders

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client) -> WorkOrdersQueryData.WorkOrderConnection:
        variables: Dict[str, Any] = {}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.WorkOrdersQueryData.from_dict(response_text)
        return res.workOrders
