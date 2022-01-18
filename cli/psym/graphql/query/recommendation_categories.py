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

from ..input.recommendations_category_filter_input import RecommendationsCategoryFilterInput
from ..input.recommendations_category_order import RecommendationsCategoryOrder


# fmt: off
QUERY: List[str] = ["""
query RecommendationsCategories(
$after: Cursor
$first: Int
$before: Cursor
$last: Int
$orderBy: RecommendationsCategoryOrder
$filterBy: [RecommendationsCategoryFilterInput!]
){
RecommendationsCategories(after: $after, first: $first, before: $before, last: $last, orderBy: $orderBy, filterBy: $filterBy){
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


class RecommendationsCategories:
    @dataclass(frozen=True)
    class RecommendationsCategoriesData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class RecommendationsCategoryConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class RecommendationsCategoryEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class RecommendationsCategory(DataClassJsonMixin):
                    id: str
                    name: str

                node: Optional[RecommendationsCategory]
                cursor: str

            @dataclass(frozen=True)
            class PageInfo(DataClassJsonMixin):
                hasNextPage: bool
                hasPreviousPage: bool
                startCursor: Optional[str]
                endCursor: Optional[str]

            totalCount: int
            edges: List[RecommendationsCategoryEdge]
            pageInfo: PageInfo

        RecommendationsCategories: RecommendationsCategoryConnection

    # fmt: off
    @classmethod
    def execute(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[RecommendationsCategoryOrder] = None, filterBy: List[RecommendationsCategoryFilterInput] = []) -> RecommendationsCategoriesData.RecommendationsCategoryConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.RecommendationsCategoriesData.from_dict(response_text)
        return res.RecommendationsCategories

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, after: Optional[str] = None, first: Optional[int] = None, before: Optional[str] = None, last: Optional[int] = None, orderBy: Optional[RecommendationsCategoryOrder] = None, filterBy: List[RecommendationsCategoryFilterInput] = []) -> RecommendationsCategoriesData.RecommendationsCategoryConnection:
        variables: Dict[str, Any] = {"after": after, "first": first, "before": before, "last": last, "orderBy": orderBy, "filterBy": filterBy}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.RecommendationsCategoriesData.from_dict(response_text)
        return res.RecommendationsCategories
