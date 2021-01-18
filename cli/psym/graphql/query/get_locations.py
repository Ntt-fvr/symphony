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

from ..fragment.location import LocationFragment, QUERY as LocationFragmentQuery

from ..fragment.page_info import PageInfoFragment, QUERY as PageInfoFragmentQuery


# fmt: off
QUERY: List[str] = LocationFragmentQuery + PageInfoFragmentQuery + ["""
query GetLocationsQuery($after: Cursor, $first: Int) {
  locations(after: $after, first: $first) {
    edges {
      node {
        ...LocationFragment
      }
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}

"""
]


class GetLocationsQuery:
    @dataclass(frozen=True)
    class GetLocationsQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class LocationConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class LocationEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class Location(LocationFragment):
                    pass

                node: Optional[Location]

            @dataclass(frozen=True)
            class PageInfo(PageInfoFragment):
                pass

            edges: List[LocationEdge]
            pageInfo: PageInfo

        locations: Optional[LocationConnection]

    # fmt: off
    @classmethod
    def execute(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None) -> Optional[GetLocationsQueryData.LocationConnection]:
        variables: Dict[str, Any] = {"after": after, "first": first}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.GetLocationsQueryData.from_dict(response_text)
        return res.locations

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None) -> Optional[GetLocationsQueryData.LocationConnection]:
        variables: Dict[str, Any] = {"after": after, "first": first}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.GetLocationsQueryData.from_dict(response_text)
        return res.locations
