#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class FormulaFilterType(Enum):
    TEXTFORMULA = "TEXTFORMULA"
    STATUS = "STATUS"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "FormulaFilterType":
        return cls.MISSING_ENUM
