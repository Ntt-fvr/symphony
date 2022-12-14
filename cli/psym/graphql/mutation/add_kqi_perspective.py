#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field as _field
from ...config import custom_scalars, datetime
from gql_client.runtime.variables import encode_variables
from gql import gql, Client
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, AsyncGenerator, Dict, List, Generator, Optional
from time import perf_counter
from dataclasses_json import DataClassJsonMixin, config

from ..input.add_kqi_perspective_input import AddKqiPerspectiveInput


# fmt: off
QUERY: List[str] = ["""
mutation addKqiPerspective($input: AddKqiPerspectiveInput!) {
  addKqiPerspective(input: $input) {
    id
    name
  }
}

"""
]


class addKqiPerspective:
    @dataclass(frozen=True)
    class addKqiPerspectiveData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class KqiPerspective(DataClassJsonMixin):
            id: str
            name: str

        addKqiPerspective: KqiPerspective

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: AddKqiPerspectiveInput) -> addKqiPerspectiveData.KqiPerspective:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.addKqiPerspectiveData.from_dict(response_text)
        return res.addKqiPerspective

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: AddKqiPerspectiveInput) -> addKqiPerspectiveData.KqiPerspective:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.addKqiPerspectiveData.from_dict(response_text)
        return res.addKqiPerspective
