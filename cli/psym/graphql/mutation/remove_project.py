#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from gql.gql.datetime_utils import DATETIME_FIELD
from gql.gql.graphql_client import GraphqlClient
from gql.gql.client import OperationException
from gql.gql.reporter import FailedOperationException
from functools import partial
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional, Dict
from time import perf_counter
from dataclasses_json import DataClassJsonMixin


QUERY: List[str] = ["""
mutation RemoveProjectMutation($id: ID!) {
  deleteProject(id: $id)
}

"""]

@dataclass
class RemoveProjectMutation(DataClassJsonMixin):
    @dataclass
    class RemoveProjectMutationData(DataClassJsonMixin):
        deleteProject: bool

    data: RemoveProjectMutationData

    @classmethod
    # fmt: off
    def execute(cls, client: GraphqlClient, id: str) -> bool:
        # fmt: off
        variables: Dict[str, Any] = {"id": id}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.from_json(response_text).data
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("RemoveProjectMutation", variables, network_time, decode_time)
            return res.deleteProject
        except OperationException as e:
            raise FailedOperationException(
                client.reporter,
                e.err_msg,
                e.err_id,
                "RemoveProjectMutation",
                variables,
            )