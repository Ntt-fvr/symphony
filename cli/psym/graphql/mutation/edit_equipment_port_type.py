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

from ..fragment.equipment_port_type import EquipmentPortTypeFragment, QUERY as EquipmentPortTypeFragmentQuery

from ..input.edit_equipment_port_type_input import EditEquipmentPortTypeInput


# fmt: off
QUERY: List[str] = EquipmentPortTypeFragmentQuery + ["""
mutation EditEquipmentPortTypeMutation($input: EditEquipmentPortTypeInput!) {
  editEquipmentPortType(input: $input) {
    ...EquipmentPortTypeFragment
  }
}

"""
]


class EditEquipmentPortTypeMutation:
    @dataclass(frozen=True)
    class EditEquipmentPortTypeMutationData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class EquipmentPortType(EquipmentPortTypeFragment):
            pass

        editEquipmentPortType: EquipmentPortType

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: EditEquipmentPortTypeInput) -> EditEquipmentPortTypeMutationData.EquipmentPortType:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.EditEquipmentPortTypeMutationData.from_dict(response_text)
        return res.editEquipmentPortType

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: EditEquipmentPortTypeInput) -> EditEquipmentPortTypeMutationData.EquipmentPortType:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.EditEquipmentPortTypeMutationData.from_dict(response_text)
        return res.editEquipmentPortType
