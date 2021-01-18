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
query WorkOrderDetailsQuery($id: ID!) {
  workOrder: node(id: $id) {
    ... on WorkOrder {
      ...WorkOrderFragment
    }
  }
} 

"""
]


class WorkOrderDetailsQuery:
    @dataclass(frozen=True)
    class WorkOrderDetailsQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class Node(WorkOrderFragment):
            pass

        workOrder: Optional[Node]

    # fmt: off
    @classmethod
    def execute(cls, client: Client, id: str) -> Optional[WorkOrderDetailsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.WorkOrderDetailsQueryData.from_dict(response_text)
        return res.workOrder

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, id: str) -> Optional[WorkOrderDetailsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.WorkOrderDetailsQueryData.from_dict(response_text)
        return res.workOrder
