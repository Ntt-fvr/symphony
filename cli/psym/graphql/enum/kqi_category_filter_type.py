#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class KqiCategoryFilterType(Enum):
    NAME = "NAME"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "KqiCategoryFilterType":
        return cls.MISSING_ENUM
