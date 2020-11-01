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


QUERY: List[str] = ["""
mutation RemoveServiceMutation($id: ID!) {
  removeService(id: $id)
}

"""]

@dataclass
class RemoveServiceMutation(DataClassJsonMixin):
    @dataclass
    class RemoveServiceMutationData(DataClassJsonMixin):
        removeService: str

    data: RemoveServiceMutationData

    @classmethod
    # fmt: off
    def execute(cls, client: GraphqlClient, id: str) -> str:
        # fmt: off
        variables: Dict[str, Any] = {"id": id}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.from_json(response_text).data
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("RemoveServiceMutation", variables, network_time, decode_time)
            return res.removeService
        except OperationException as e:
            raise FailedOperationException(
                client.reporter,
                e.err_msg,
                "RemoveServiceMutation",
                variables,
            )
