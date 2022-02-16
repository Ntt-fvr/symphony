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

from ..input.alarm_status_filter_input import AlarmStatusFilterInput
from ..input.alarm_status_order import AlarmStatusOrder


# fmt: off
QUERY: List[str] = ["""
query alarmStatuses(
$after: Cursor
$first: Int
$before: Cursor
$last: Int
$orderBy: AlarmStatusOrder
$filterBy: [AlarmStatusFilterInput!]
){
alarmStatus(after: $after, first: $first, before: $before, last: $last, orderBy: $orderBy, filterBy: $filterBy){
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


class alarmStatuses:
    @dataclass(frozen=True)
    class alarmStatusesData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class AlarmStatusConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class AlarmStatusEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class AlarmStatus(DataClassJsonMixin):
                    id: str
                    name: str

                node: Optional[AlarmStatus]
                cursor: str

            @dataclass(frozen=True)
            class PageInfo(DataClassJsonMixin):
                hasNextPage: bool
                hasPreviousPage: bool
                startCursor: Optional[str]
                endCursor: Optional[str]

            totalCount: int
            edges: List[AlarmStatusEdge]
            pageInfo: PageInfo

        alarmStatus: AlarmStatusConnection

    # fmt: off
    @classmethod
    def execute(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[AlarmStatusOrder] = None, filterBy: List[AlarmStatusFilterInput] = []) -> alarmStatusesData.AlarmStatusConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.alarmStatusesData.from_dict(response_text)
        return res.alarmStatus

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[AlarmStatusOrder] = None, filterBy: List[AlarmStatusFilterInput] = []) -> alarmStatusesData.AlarmStatusConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.alarmStatusesData.from_dict(response_text)
        return res.alarmStatus