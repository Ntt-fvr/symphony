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

from ..input.counter_filter_input import CounterFilterInput
from ..input.counter_order import CounterOrder


# fmt: off
QUERY: List[str] = ["""
query counters(
$after: Cursor
$first: Int
$before: Cursor
$last: Int
$orderBy: CounterOrder
$filterBy: [CounterFilterInput!]
){
counters(after: $after, first: $first, before: $before, last: $last, orderBy: $orderBy, filterBy: $filterBy){
totalCount
edges{
node{
id
name
externalID
networkManagerSystem
vendorFk{id}
counterFamily{id}

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


class counters:
    @dataclass(frozen=True)
    class countersData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class CounterConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class CounterEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class Counter(DataClassJsonMixin):
                    @dataclass(frozen=True)
                    class Vendor(DataClassJsonMixin):
                        id: str

                    @dataclass(frozen=True)
                    class CounterFamily(DataClassJsonMixin):
                        id: str

                    id: str
                    name: str
                    externalID: str
                    networkManagerSystem: str
                    vendorFk: Vendor
                    counterFamily: Optional[CounterFamily]

                node: Optional[Counter]
                cursor: str

            @dataclass(frozen=True)
            class PageInfo(DataClassJsonMixin):
                hasNextPage: bool
                hasPreviousPage: bool
                startCursor: Optional[str]
                endCursor: Optional[str]

            totalCount: int
            edges: List[CounterEdge]
            pageInfo: PageInfo

        counters: CounterConnection

    # fmt: off
    @classmethod
    def execute(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[CounterOrder] = None, filterBy: List[CounterFilterInput] = []) -> countersData.CounterConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.countersData.from_dict(response_text)
        return res.counters

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[CounterOrder] = None, filterBy: List[CounterFilterInput] = []) -> countersData.CounterConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.countersData.from_dict(response_text)
        return res.counters
