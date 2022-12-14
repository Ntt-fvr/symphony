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

from ..input.add_counter_input import AddCounterInput


# fmt: off
QUERY: List[str] = ["""
mutation addCounter($input: AddCounterInput!) {
  addCounter(input: $input) {
    id
    name
    externalID
    counterFamily{id}
    vendorFk{id}
    networkManagerSystem
  }
}


"""
]


class addCounter:
    @dataclass(frozen=True)
    class addCounterData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class Counter(DataClassJsonMixin):
            @dataclass(frozen=True)
            class CounterFamily(DataClassJsonMixin):
                id: str

            @dataclass(frozen=True)
            class Vendor(DataClassJsonMixin):
                id: str

            id: str
            name: str
            externalID: str
            counterFamily: Optional[CounterFamily]
            vendorFk: Vendor
            networkManagerSystem: str

        addCounter: Counter

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: AddCounterInput) -> addCounterData.Counter:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.addCounterData.from_dict(response_text)
        return res.addCounter

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: AddCounterInput) -> addCounterData.Counter:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.addCounterData.from_dict(response_text)
        return res.addCounter
