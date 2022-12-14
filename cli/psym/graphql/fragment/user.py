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

from gql_client.runtime.enum_utils import enum_field_metadata
from ..enum.user_role import UserRole
from ..enum.user_status import UserStatus

# fmt: off
QUERY: List[str] = ["""
fragment UserFragment on User {
  id
  authID
  email
  firstName
  lastName
  status
  role
  organizationFk{id}
  
}

"""]

@dataclass(frozen=True)
class UserFragment(DataClassJsonMixin):
    @dataclass(frozen=True)
    class Organization(DataClassJsonMixin):
        id: str

    id: str
    authID: str
    email: str
    firstName: str
    lastName: str
    status: UserStatus = _field(metadata=enum_field_metadata(UserStatus))
    role: UserRole = _field(metadata=enum_field_metadata(UserRole))
    organizationFk: Optional[Organization]
