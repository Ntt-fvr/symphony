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

from ..input.equipment_filter_input import EquipmentFilterInput


# fmt: off
QUERY: List[str] = EquipmentFragmentQuery + ["""
query EquipmentSearchQuery($filters: [EquipmentFilterInput!]!, $limit: Int) {
  equipments(filterBy: $filters, first: $limit) {
    edges {
      node {
        ...EquipmentFragment
      }
    }
    totalCount
  }
}

"""
]


class EquipmentSearchQuery:
    @dataclass(frozen=True)
    class EquipmentSearchQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class EquipmentConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class EquipmentEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class Equipment(EquipmentFragment):
                    pass

                node: Optional[Equipment]

            edges: List[EquipmentEdge]
            totalCount: int

        equipments: EquipmentConnection

    # fmt: off
    @classmethod
    def execute(cls, client: Client, filters: List[EquipmentFilterInput] = [], limit: Optional[int] = None) -> EquipmentSearchQueryData.EquipmentConnection:
        variables: Dict[str, Any] = {"filters": filters, "limit": limit}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.EquipmentSearchQueryData.from_dict(response_text)
        return res.equipments

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, filters: List[EquipmentFilterInput] = [], limit: Optional[int] = None) -> EquipmentSearchQueryData.EquipmentConnection:
        variables: Dict[str, Any] = {"filters": filters, "limit": limit}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.EquipmentSearchQueryData.from_dict(response_text)
        return res.equipments
