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

from ..fragment.location_type import LocationTypeFragment, QUERY as LocationTypeFragmentQuery


# fmt: off
QUERY: List[str] = LocationTypeFragmentQuery + ["""
query LocationTypesQuery {
  locationTypes {
    edges {
      node {
        ...LocationTypeFragment
      }
    }
  }
}

"""
]


class LocationTypesQuery:
    @dataclass(frozen=True)
    class LocationTypesQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class LocationTypeConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class LocationTypeEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class LocationType(LocationTypeFragment):
                    pass

                node: Optional[LocationType]

            edges: List[LocationTypeEdge]

        locationTypes: Optional[LocationTypeConnection]

    # fmt: off
    @classmethod
    def execute(cls, client: Client) -> Optional[LocationTypesQueryData.LocationTypeConnection]:
        variables: Dict[str, Any] = {}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.LocationTypesQueryData.from_dict(response_text)
        return res.locationTypes

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client) -> Optional[LocationTypesQueryData.LocationTypeConnection]:
        variables: Dict[str, Any] = {}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.LocationTypesQueryData.from_dict(response_text)
        return res.locationTypes
