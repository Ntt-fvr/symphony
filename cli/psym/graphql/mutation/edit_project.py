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

from ..fragment.project import ProjectFragment, QUERY as ProjectFragmentQuery
from ..input.edit_project_input import EditProjectInput


QUERY: List[str] = ProjectFragmentQuery + ["""
mutation EditProjectMutation($input: EditProjectInput!) {
  editProject(input: $input) {
    ...ProjectFragment
  }
} 
"""]

@dataclass
class EditProjectMutation(DataClassJsonMixin):
    @dataclass
    class EditProjectMutationData(DataClassJsonMixin):
        @dataclass
        class Project(ProjectFragment):
            pass

        editProject: Project

    data: EditProjectMutationData

    @classmethod
    # fmt: off
    def execute(cls, client: GraphqlClient, input: EditProjectInput) -> EditProjectMutationData.Project:
        # fmt: off
        variables: Dict[str, Any] = {"input": input}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.from_json(response_text).data
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("EditProjectMutation", variables, network_time, decode_time)
            return res.editProject
        except OperationException as e:
            raise FailedOperationException(
                client.reporter,
                e.err_msg,
                "EditProjectMutation",
                variables,
            )
