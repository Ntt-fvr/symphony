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

from ..fragment.equipment import EquipmentFragment, QUERY as EquipmentFragmentQuery

from ..input.add_equipment_input import AddEquipmentInput


# fmt: off
QUERY: List[str] = EquipmentFragmentQuery + ["""
mutation AddEquipmentMutation($input: AddEquipmentInput!) {
  addEquipment(input: $input) {
    ...EquipmentFragment
  }
}

"""
]


class AddEquipmentMutation:
    @dataclass(frozen=True)
    class AddEquipmentMutationData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class Equipment(EquipmentFragment):
            pass

        addEquipment: Equipment

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: AddEquipmentInput) -> AddEquipmentMutationData.Equipment:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.AddEquipmentMutationData.from_dict(response_text)
        return res.addEquipment

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: AddEquipmentInput) -> AddEquipmentMutationData.Equipment:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.AddEquipmentMutationData.from_dict(response_text)
        return res.addEquipment
