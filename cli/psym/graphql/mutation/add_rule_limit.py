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

from ..input.add_rule_limit_input import AddRuleLimitInput


# fmt: off
QUERY: List[str] = ["""
mutation addRuleLimit($input: AddRuleLimitInput!) {
  addRuleLimit(input: $input) {
    id
    number
    limitType
    comparator{id}
    rule{id}
  }
}


"""
]


class addRuleLimit:
    @dataclass(frozen=True)
    class addRuleLimitData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class RuleLimit(DataClassJsonMixin):
            @dataclass(frozen=True)
            class Comparator(DataClassJsonMixin):
                id: str

            @dataclass(frozen=True)
            class Rule(DataClassJsonMixin):
                id: str

            id: str
            number: int
            limitType: str
            comparator: Comparator
            rule: Optional[Rule]

        addRuleLimit: RuleLimit

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: AddRuleLimitInput) -> addRuleLimitData.RuleLimit:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.addRuleLimitData.from_dict(response_text)
        return res.addRuleLimit

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: AddRuleLimitInput) -> addRuleLimitData.RuleLimit:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.addRuleLimitData.from_dict(response_text)
        return res.addRuleLimit