#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class CounterFamilyOrderField(Enum):
    NAME = "NAME"
    CREATED_AT = "CREATED_AT"
    UPDATED_AT = "UPDATED_AT"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "CounterFamilyOrderField":
        return cls.MISSING_ENUM
