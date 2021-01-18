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

from ..input.add_flow_draft_input import AddFlowDraftInput


# fmt: off
QUERY: List[str] = ["""
mutation AddFlowDraftMutation($input: AddFlowDraftInput!) {
  addFlowDraft(input: $input) {
    id
    name
  }
}

"""
]


class AddFlowDraftMutation:
    @dataclass(frozen=True)
    class AddFlowDraftMutationData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class FlowDraft(DataClassJsonMixin):
            id: str
            name: str

        addFlowDraft: FlowDraft

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: AddFlowDraftInput) -> AddFlowDraftMutationData.FlowDraft:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.AddFlowDraftMutationData.from_dict(response_text)
        return res.addFlowDraft

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: AddFlowDraftInput) -> AddFlowDraftMutationData.FlowDraft:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.AddFlowDraftMutationData.from_dict(response_text)
        return res.addFlowDraft
