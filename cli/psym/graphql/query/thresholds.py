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

from ..input.threshold_filter_input import ThresholdFilterInput
from ..input.threshold_order import ThresholdOrder


# fmt: off
QUERY: List[str] = ["""
query thresholds(
$after: Cursor
$first: Int
$before: Cursor
$last: Int
$orderBy: ThresholdOrder
$filterBy: [ThresholdFilterInput!]
){
thresholds(after: $after, first: $first, before: $before, last: $last, orderBy: $orderBy, filterBy: $filterBy){
totalCount
edges{
node{
id
name
description
status
kpi{id}

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


class thresholds:
    @dataclass(frozen=True)
    class thresholdsData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class ThresholdConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class ThresholdEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class Threshold(DataClassJsonMixin):
                    @dataclass(frozen=True)
                    class Kpi(DataClassJsonMixin):
                        id: str

                    id: str
                    name: str
                    description: str
                    status: bool
                    kpi: Optional[Kpi]

                node: Optional[Threshold]
                cursor: str

            @dataclass(frozen=True)
            class PageInfo(DataClassJsonMixin):
                hasNextPage: bool
                hasPreviousPage: bool
                startCursor: Optional[str]
                endCursor: Optional[str]

            totalCount: int
            edges: List[ThresholdEdge]
            pageInfo: PageInfo

        thresholds: ThresholdConnection

    # fmt: off
    @classmethod
    def execute(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[ThresholdOrder] = None, filterBy: List[ThresholdFilterInput] = []) -> thresholdsData.ThresholdConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.thresholdsData.from_dict(response_text)
        return res.thresholds

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[ThresholdOrder] = None, filterBy: List[ThresholdFilterInput] = []) -> thresholdsData.ThresholdConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.thresholdsData.from_dict(response_text)
        return res.thresholds
