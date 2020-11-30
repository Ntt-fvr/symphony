#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from datetime import datetime
from gql_client.runtime.datetime_utils import DATETIME_FIELD_METADATA
from gql_client.runtime.variables import encode_variables
from gql import gql, Client
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, AsyncGenerator, Callable, Dict, List, Generator, Optional
from time import perf_counter
from dataclasses_json import DataClassJsonMixin

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.flow_instance_status import FlowInstanceStatus

from ..input.start_flow_input import StartFlowInput


# fmt: off
QUERY: List[str] = ["""
mutation StartFlowMutation($input: StartFlowInput!) {
  startFlow(input: $input) {
    id
    status
  }
}

"""
]


class StartFlowMutation:
    @dataclass(frozen=True)
    class StartFlowMutationData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class FlowInstance(DataClassJsonMixin):
            id: str
            status: FlowInstanceStatus = field(metadata=enum_field_metadata(FlowInstanceStatus))

        startFlow: FlowInstance

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: StartFlowInput) -> StartFlowMutationData.FlowInstance:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.StartFlowMutationData.from_dict(response_text)
        return res.startFlow

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: StartFlowInput) -> StartFlowMutationData.FlowInstance:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.StartFlowMutationData.from_dict(response_text)
        return res.startFlow
