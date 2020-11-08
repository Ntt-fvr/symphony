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

from ..fragment.location_type import LocationTypeFragment, QUERY as LocationTypeFragmentQuery
from ..input.add_location_type_input import AddLocationTypeInput


QUERY: List[str] = LocationTypeFragmentQuery + ["""
mutation AddLocationTypeMutation($input: AddLocationTypeInput!) {
  addLocationType(input: $input) {
    ...LocationTypeFragment
  }
}

"""]

class AddLocationTypeMutation(DataClassJsonMixin):
    @dataclass
    class AddLocationTypeMutationData(DataClassJsonMixin):
        @dataclass
        class LocationType(LocationTypeFragment):
            pass

        addLocationType: LocationType

    @classmethod
    def execute(cls, client: GraphqlClient, input: AddLocationTypeInput) -> AddLocationTypeMutationData.LocationType:
        variables: Dict[str, Any] = {"input": input}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.AddLocationTypeMutationData.from_dict(response_text)
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("AddLocationTypeMutation", variables, network_time, decode_time)
            return res.addLocationType
        except TransportQueryError as e:
            raise FailedOperationException(
                client.reporter,
                str(e.errors),
                "AddLocationTypeMutation",
                variables,
            )
