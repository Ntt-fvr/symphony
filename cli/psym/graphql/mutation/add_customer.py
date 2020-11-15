#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass
from datetime import datetime
from gql_client.runtime.datetime_utils import DATETIME_FIELD
from gql_client.runtime.graphql_client import GraphqlClient
from gql_client.runtime.reporter import FailedOperationException
from gql import gql
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, Callable, List, Mapping, Optional, Dict
from time import perf_counter
from dataclasses_json import DataClassJsonMixin

from ..fragment.customer import CustomerFragment, QUERY as CustomerFragmentQuery
from ..input.add_customer_input import AddCustomerInput


QUERY: List[str] = CustomerFragmentQuery + ["""
mutation AddCustomerMutation($input: AddCustomerInput!) {
  addCustomer(input: $input) {
    ...CustomerFragment
  }
}

"""]

class AddCustomerMutation(DataClassJsonMixin):
    @dataclass
    class AddCustomerMutationData(DataClassJsonMixin):
        @dataclass
        class Customer(CustomerFragment):
            pass

        addCustomer: Customer

    @classmethod
    def execute(cls, client: GraphqlClient, input: AddCustomerInput) -> AddCustomerMutationData.Customer:
        variables: Dict[str, Any] = {"input": input}
        try:
            network_start = perf_counter()
            response_text = client.call(''.join(set(QUERY)), variables=variables)
            decode_start = perf_counter()
            res = cls.AddCustomerMutationData.from_dict(response_text)
            decode_time = perf_counter() - decode_start
            network_time = decode_start - network_start
            client.reporter.log_successful_operation("AddCustomerMutation", variables, network_time, decode_time)
            return res.addCustomer
        except TransportQueryError as e:
            raise FailedOperationException(
                client.reporter,
                str(e.errors),
                "AddCustomerMutation",
                variables,
            )
