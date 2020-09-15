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

from ..fragment.project_type import ProjectTypeFragment, QUERY as ProjectTypeFragmentQuery
from ..input.add_project_type import AddProjectTypeInput


QUERY: List[str] = ProjectTypeFragmentQuery + ["""
mutation AddProjectTypeMutation($input: AddProjectTypeInput!) {
  createProjectType(input: $input) {
    ...ProjectTypeFragment
  }
}
"""]

@dataclass
class AddProjectTypeMutation(DataClassJsonMixin):
    @dataclass
    class AddProjectTypeMutationData(DataClassJsonMixin):
        @dataclass
        class ProjectType(ProjectTypeFragment):
            pass

        createProjectType: ProjectType

    data: AddProjectTypeMutationData

    @classmethod
    # fmt: off
    def execute(cls, client: GraphqlClient, input: AddProjectTypeInput) -> AddProjectTypeMutationData.ProjectType:
        # fmt: off
        variables: Dict[str, Any] = {"input": input}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.from_json(response_text).data
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("AddProjectTypeMutation", variables, network_time, decode_time)
            return res.createProjectType
        except OperationException as e:
            raise FailedOperationException(
                client.reporter,
                e.err_msg,
                e.err_id,
                "AddProjectTypeMutation",
                variables,
            )
