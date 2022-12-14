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

from ..input.comparator_filter_input import ComparatorFilterInput
from ..input.comparator_order import ComparatorOrder


# fmt: off
QUERY: List[str] = ["""
query comparators(
$after: Cursor
$first: Int
$before: Cursor
$last: Int
$orderBy: ComparatorOrder
$filterBy: [ComparatorFilterInput!]
){
comparators(after: $after, first: $first, before: $before, last: $last, orderBy: $orderBy, filterBy: $filterBy){
totalCount
edges{
node{
id
name

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


class comparators:
    @dataclass(frozen=True)
    class comparatorsData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class ComparatorConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class ComparatorEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class Comparator(DataClassJsonMixin):
                    id: str
                    name: str

                node: Optional[Comparator]
                cursor: str

            @dataclass(frozen=True)
            class PageInfo(DataClassJsonMixin):
                hasNextPage: bool
                hasPreviousPage: bool
                startCursor: Optional[str]
                endCursor: Optional[str]

            totalCount: int
            edges: List[ComparatorEdge]
            pageInfo: PageInfo

        comparators: ComparatorConnection

    # fmt: off
    @classmethod
    def execute(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[ComparatorOrder] = None, filterBy: List[ComparatorFilterInput] = []) -> comparatorsData.ComparatorConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.comparatorsData.from_dict(response_text)
        return res.comparators

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[ComparatorOrder] = None, filterBy: List[ComparatorFilterInput] = []) -> comparatorsData.ComparatorConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.comparatorsData.from_dict(response_text)
        return res.comparators
