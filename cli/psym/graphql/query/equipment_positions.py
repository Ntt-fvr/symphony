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


# fmt: off
QUERY: List[str] = EquipmentFragmentQuery + ["""
query EquipmentPositionsQuery($id: ID!) {
  equipment: node(id: $id) {
    ... on Equipment {
      equipmentType {
        positionDefinitions {
          id
          name
        }
      }
      positions {
        definition {
          id
          name
        }
        attachedEquipment {
          ...EquipmentFragment
        }
      }
    }
  }
}

"""
]


class EquipmentPositionsQuery:
    @dataclass(frozen=True)
    class EquipmentPositionsQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class Node(DataClassJsonMixin):
            @dataclass(frozen=True)
            class EquipmentType(DataClassJsonMixin):
                @dataclass(frozen=True)
                class EquipmentPositionDefinition(DataClassJsonMixin):
                    id: str
                    name: str

                positionDefinitions: List[EquipmentPositionDefinition]

            @dataclass(frozen=True)
            class EquipmentPosition(DataClassJsonMixin):
                @dataclass(frozen=True)
                class EquipmentPositionDefinition(DataClassJsonMixin):
                    id: str
                    name: str

                @dataclass(frozen=True)
                class Equipment(EquipmentFragment):
                    pass

                definition: EquipmentPositionDefinition
                attachedEquipment: Optional[Equipment]

            equipmentType: EquipmentType
            positions: List[EquipmentPosition]

        equipment: Optional[Node]

    # fmt: off
    @classmethod
    def execute(cls, client: Client, id: str) -> Optional[EquipmentPositionsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.EquipmentPositionsQueryData.from_dict(response_text)
        return res.equipment

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, id: str) -> Optional[EquipmentPositionsQueryData.Node]:
        variables: Dict[str, Any] = {"id": id}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.EquipmentPositionsQueryData.from_dict(response_text)
        return res.equipment
