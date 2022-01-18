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

from ..input.kqi_target_filter_input import KqiTargetFilterInput
from ..input.kqi_target_order import KqiTargetOrder


# fmt: off
QUERY: List[str] = ["""

query kqiTargets(
$after: Cursor
$first: Int
$before: Cursor
$last: Int
$orderBy: KqiTargetOrder
$filterBy: [KqiTargetFilterInput!]
){
  kqiTargets(after: $after, first: $first, before: $before, last: $last, orderBy: $orderBy, filterBy: $filterBy){
    totalCount
    edges{
      node{
        id
        name
        impact
        
        initTime
        endTime
        status
        kqi{
          id
          name
          description
          formula
          startDateTime
          endDateTime
        }
      }
      cursor
    }
    pageInfo{
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
"""
]


class kqiTargets:
    @dataclass(frozen=True)
    class kqiTargetsData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class KqiTargetConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class KqiTargetEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class KqiTarget(DataClassJsonMixin):
                    @dataclass(frozen=True)
                    class Kqi(DataClassJsonMixin):
                        id: str
                        name: str
                        description: str
                        formula: str
                        startDateTime: datetime = _field(metadata=config(encoder=custom_scalars["Time"].encoder, decoder=custom_scalars["Time"].decoder, mm_field=custom_scalars["Time"].mm_field))
                        endDateTime: datetime = _field(metadata=config(encoder=custom_scalars["Time"].encoder, decoder=custom_scalars["Time"].decoder, mm_field=custom_scalars["Time"].mm_field))

                    id: str
                    name: str
                    impact: str
                    initTime: datetime = _field(metadata=config(encoder=custom_scalars["Time"].encoder, decoder=custom_scalars["Time"].decoder, mm_field=custom_scalars["Time"].mm_field))
                    endTime: datetime = _field(metadata=config(encoder=custom_scalars["Time"].encoder, decoder=custom_scalars["Time"].decoder, mm_field=custom_scalars["Time"].mm_field))
                    status: bool
                    kqi: Kqi

                node: Optional[KqiTarget]
                cursor: str

            @dataclass(frozen=True)
            class PageInfo(DataClassJsonMixin):
                hasNextPage: bool
                hasPreviousPage: bool
                startCursor: Optional[str]
                endCursor: Optional[str]

            totalCount: int
            edges: List[KqiTargetEdge]
            pageInfo: PageInfo

        kqiTargets: KqiTargetConnection

    # fmt: off
    @classmethod
    def execute(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[KqiTargetOrder] = None, filterBy: List[KqiTargetFilterInput] = []) -> kqiTargetsData.KqiTargetConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.kqiTargetsData.from_dict(response_text)
        return res.kqiTargets

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[KqiTargetOrder] = None, filterBy: List[KqiTargetFilterInput] = []) -> kqiTargetsData.KqiTargetConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.kqiTargetsData.from_dict(response_text)
        return res.kqiTargets
