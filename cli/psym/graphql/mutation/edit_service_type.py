#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from dataclasses import dataclass, field
from datetime import datetime
from gql_client.runtime.datetime_utils import DATETIME_FIELD_METADATA
from gql_client.runtime.variables import encode_variables
from gql import gql, Client
from gql.transport.exceptions import TransportQueryError
from functools import partial
from numbers import Number
from typing import Any, AsyncGenerator, Callable, Dict, List, Generator, Optional
from time import perf_counter
from dataclasses_json import DataClassJsonMixin

from ..fragment.service_type import ServiceTypeFragment, QUERY as ServiceTypeFragmentQuery
from ..input.service_type_edit_data import ServiceTypeEditData


# fmt: off
QUERY: List[str] = ServiceTypeFragmentQuery + ["""
mutation EditServiceTypeMutation($input: ServiceTypeEditData!) {
  editServiceType(data: $input) {
    ...ServiceTypeFragment
  }
}

"""
]


class EditServiceTypeMutation:
    @dataclass(frozen=True)
    class EditServiceTypeMutationData(DataClassJsonMixin):
        @dataclass(frozen=True)
        class ServiceType(ServiceTypeFragment):
            pass

        editServiceType: ServiceType

    # fmt: off
    @classmethod
    def execute(cls, client: Client, input: ServiceTypeEditData) -> EditServiceTypeMutationData.ServiceType:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables)
        response_text = client.execute(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.EditServiceTypeMutationData.from_dict(response_text)
        return res.editServiceType

    # fmt: off
    @classmethod
    async def execute_async(cls, client: Client, input: ServiceTypeEditData) -> EditServiceTypeMutationData.ServiceType:
        variables: Dict[str, Any] = {"input": input}
        new_variables = encode_variables(variables)
        response_text = await client.execute_async(
            gql("".join(set(QUERY))), variable_values=new_variables
        )
        res = cls.EditServiceTypeMutationData.from_dict(response_text)
        return res.editServiceType
