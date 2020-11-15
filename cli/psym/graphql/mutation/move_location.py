#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from gql_client.runtime.datetime_utils import DATETIME_FIELD
from gql_client.runtime.graphql_client import GraphqlClient
from gql_client.runtime.reporter import FailedOperationException
from gql import gql
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional, Dict
from time import perf_counter
from dataclasses_json import DataClassJsonMixin

from ..fragment.location import LocationFragment, QUERY as LocationFragmentQuery

QUERY: List[str] = LocationFragmentQuery + ["""
mutation MoveLocationMutation($locationID: ID!, $parentLocationID: ID) {
  moveLocation(locationID: $locationID, parentLocationID: $parentLocationID) {
    ...LocationFragment
  }
}

"""]

class MoveLocationMutation(DataClassJsonMixin):
    @dataclass
    class MoveLocationMutationData(DataClassJsonMixin):
        @dataclass
        class Location(LocationFragment):
            pass

        moveLocation: Location

    @classmethod
    def execute(cls, client: GraphqlClient, locationID: str, parentLocationID: Optional[str] = None) -> MoveLocationMutationData.Location:
        variables: Dict[str, Any] = {"locationID": locationID, "parentLocationID": parentLocationID}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.MoveLocationMutationData.from_dict(response_text)
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("MoveLocationMutation", variables, network_time, decode_time)
            return res.moveLocation
        except TransportQueryError as e:
            raise FailedOperationException(
                client.reporter,
                str(e.errors),
                "MoveLocationMutation",
                variables,
            )
