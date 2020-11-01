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

from ..fragment.location import LocationFragment, QUERY as LocationFragmentQuery
from ..input.location_filter_input import LocationFilterInput


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

"""]

@dataclass
class LocationSearchQuery(DataClassJsonMixin):
    @dataclass
    class LocationSearchQueryData(DataClassJsonMixin):
        @dataclass
        class LocationConnection(DataClassJsonMixin):
            @dataclass
            class LocationEdge(DataClassJsonMixin):
                @dataclass
                class Location(LocationFragment):
                    pass

                node: Optional[Location]

            edges: List[LocationEdge]
            totalCount: int

        locations: Optional[LocationConnection]

    data: LocationSearchQueryData

    @classmethod
    # fmt: off
    def execute(cls, client: GraphqlClient, filters: List[LocationFilterInput] = [], limit: Optional[int] = None) -> Optional[LocationSearchQueryData.LocationConnection]:
        # fmt: off
        variables: Dict[str, Any] = {"filters": filters, "limit": limit}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.from_json(response_text).data
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("LocationSearchQuery", variables, network_time, decode_time)
            return res.locations
        except OperationException as e:
            raise FailedOperationException(
                client.reporter,
                e.err_msg,
                "LocationSearchQuery",
                variables,
            )
