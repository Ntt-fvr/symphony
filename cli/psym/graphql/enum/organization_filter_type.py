#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class OrganizationFilterType(Enum):
    ID = "ID"
    NAME = "NAME"
    DESCRIPTION = "DESCRIPTION"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "OrganizationFilterType":
        return cls.MISSING_ENUM
