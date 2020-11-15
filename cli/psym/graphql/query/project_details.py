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

from ..fragment.project import ProjectFragment, QUERY as ProjectFragmentQuery

QUERY: List[str] = ProjectFragmentQuery + ["""
query ProjectDetailsQuery($id: ID!) {
  project: node(id: $id) {
    ... on Project {
      ...ProjectFragment
    }
  }
} 

"""]

class ProjectDetailsQuery(DataClassJsonMixin):
    @dataclass
    class ProjectDetailsQueryData(DataClassJsonMixin):
        @dataclass
        class Node(ProjectFragment):
            pass

        project: Optional[Node]

    @classmethod
    def execute(cls, client: GraphqlClient, id: str) -> Optional[ProjectDetailsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.ProjectDetailsQueryData.from_dict(response_text)
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("ProjectDetailsQuery", variables, network_time, decode_time)
            return res.project
        except TransportQueryError as e:
            raise FailedOperationException(
                client.reporter,
                str(e.errors),
                "ProjectDetailsQuery",
                variables,
            )
