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

from ..fragment.service import ServiceFragment, QUERY as ServiceFragmentQuery

# fmt: off
QUERY: List[str] = ServiceFragmentQuery + ["""
query ServiceDetailsQuery($id: ID!) {
  service: node(id: $id) {
    ... on Service {
      ...ServiceFragment
    }
  }
}

"""
]


class ServiceDetailsQuery:
    @dataclass(frozen=True)
    class ServiceDetailsQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class Node(ServiceFragment):
            pass

        service: Optional[Node]

    # fmt: off
    @classmethod
    def execute(cls, client: Client, id: str) -> Optional[ServiceDetailsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        new_variables = encode_variables(variables)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.ServiceDetailsQueryData.from_dict(response_text)
        return res.service

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, id: str) -> Optional[ServiceDetailsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        new_variables = encode_variables(variables)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.ServiceDetailsQueryData.from_dict(response_text)
        return res.service
