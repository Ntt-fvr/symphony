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

from ..fragment.location import LocationFragment, QUERY as LocationFragmentQuery
from ..input.location_filter_input import LocationFilterInput


# fmt: off
QUERY: List[str] = LocationFragmentQuery + ["""
query LocationSearchQuery($filters: [LocationFilterInput!]!, $limit: Int) {
  locations(filterBy: $filters, first: $limit) {
    edges {
      node {
        ...LocationFragment
      }
    }
    totalCount
  }
}

"""
]


class LocationSearchQuery:
    @dataclass(frozen=True)
    class LocationSearchQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class LocationConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class LocationEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class Location(LocationFragment):
                    pass

                node: Optional[Location]

            edges: List[LocationEdge]
            totalCount: int

        locations: Optional[LocationConnection]

    # fmt: off
    @classmethod
    def execute(cls, client: Client, filters: List[LocationFilterInput] = [], limit: Optional[int] = None) -> Optional[LocationSearchQueryData.LocationConnection]:
        variables: Dict[str, Any] = {"filters": filters, "limit": limit}
        new_variables = encode_variables(variables)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.LocationSearchQueryData.from_dict(response_text)
        return res.locations

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, filters: List[LocationFilterInput] = [], limit: Optional[int] = None) -> Optional[LocationSearchQueryData.LocationConnection]:
        variables: Dict[str, Any] = {"filters": filters, "limit": limit}
        new_variables = encode_variables(variables)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.LocationSearchQueryData.from_dict(response_text)
        return res.locations
