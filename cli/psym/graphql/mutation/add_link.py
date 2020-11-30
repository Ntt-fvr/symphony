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

from ..fragment.link import LinkFragment, QUERY as LinkFragmentQuery
from ..input.add_link_input import AddLinkInput


# fmt: off
QUERY: List[str] = LinkFragmentQuery + ["""
mutation AddLinkMutation($input: AddLinkInput!) {
  addLink(input: $input) {
    ...LinkFragment
  }
}

"""
]


class AddLinkMutation:
    @dataclass(frozen=True)
    class AddLinkMutationData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class Link(LinkFragment):
            pass

        addLink: Link

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: AddLinkInput) -> AddLinkMutationData.Link:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.AddLinkMutationData.from_dict(response_text)
        return res.addLink

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: AddLinkInput) -> AddLinkMutationData.Link:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.AddLinkMutationData.from_dict(response_text)
        return res.addLink
