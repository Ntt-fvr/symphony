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

from ..fragment.location_type import LocationTypeFragment, QUERY as LocationTypeFragmentQuery


# fmt: off
QUERY: List[str] = LocationTypeFragmentQuery + ["""
query LocationTypeDetailsQuery($id: ID!) {
  locationType: node(id: $id) {
    ... on LocationType {
      ...LocationTypeFragment
    }
  }
}
"""
]


class LocationTypeDetailsQuery:
    @dataclass(frozen=True)
    class LocationTypeDetailsQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class Node(LocationTypeFragment):
            pass

        locationType: Optional[Node]

    # fmt: off
    @classmethod
    def execute(cls, client: Client, id: str) -> Optional[LocationTypeDetailsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.LocationTypeDetailsQueryData.from_dict(response_text)
        return res.locationType

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, id: str) -> Optional[LocationTypeDetailsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.LocationTypeDetailsQueryData.from_dict(response_text)
        return res.locationType
