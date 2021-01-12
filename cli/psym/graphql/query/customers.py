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

from ..fragment.customer import CustomerFragment, QUERY as CustomerFragmentQuery


# fmt: off
QUERY: List[str] = CustomerFragmentQuery + ["""
query CustomersQuery {
  customers {
    edges {
      node {
        ...CustomerFragment
      }
    }
  }
}

"""
]


class CustomersQuery:
    @dataclass(frozen=True)
    class CustomersQueryData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class CustomerConnection(DataClassJsonMixin):
            @dataclass(frozen=True)
            class CustomerEdge(DataClassJsonMixin):
                @dataclass(frozen=True)
                class Customer(CustomerFragment):
                    pass

                node: Optional[Customer]

            edges: List[CustomerEdge]

        customers: Optional[CustomerConnection]

    # fmt: off
    @classmethod
    def execute(cls, client: Client) -> Optional[CustomersQueryData.CustomerConnection]:
        variables: Dict[str, Any] = {}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.CustomersQueryData.from_dict(response_text)
        return res.customers

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client) -> Optional[CustomersQueryData.CustomerConnection]:
        variables: Dict[str, Any] = {}
        new_variables = encode_variables(variables, custom_scalars)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.CustomersQueryData.from_dict(response_text)
        return res.customers
