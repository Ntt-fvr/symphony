#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class RuleTypeFilterType(Enum):
    NAME = "NAME"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "RuleTypeFilterType":
        return cls.MISSING_ENUM
