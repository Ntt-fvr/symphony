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

from ..input.add_formula_input import AddFormulaInput


# fmt: off
QUERY: List[str] = ["""
mutation addFormula($input: AddFormulaInput!) {
  addFormula(input: $input) {
    id
    textFormula
    status
    techFk{id}
    networkTypeFk{id}
    kpiFk{id}    
  }
}
"""
]


class addFormula:
    @dataclass(frozen=True)
    class addFormulaData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class Formula(DataClassJsonMixin):
            @dataclass(frozen=True)
            class Tech(DataClassJsonMixin):
                id: str

            @dataclass(frozen=True)
            class NetworkType(DataClassJsonMixin):
                id: str

            @dataclass(frozen=True)
            class Kpi(DataClassJsonMixin):
                id: str

            id: str
            textFormula: str
            status: bool
            techFk: Tech
            networkTypeFk: NetworkType
            kpiFk: Kpi

        addFormula: Formula

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: AddFormulaInput) -> addFormulaData.Formula:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.addFormulaData.from_dict(response_text)
        return res.addFormula

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: AddFormulaInput) -> addFormulaData.Formula:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.addFormulaData.from_dict(response_text)
        return res.addFormula
