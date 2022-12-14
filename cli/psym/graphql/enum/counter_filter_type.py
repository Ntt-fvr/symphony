#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class CounterFilterType(Enum):
    NAME = "NAME"
    EXTERNALID = "EXTERNALID"
    NETWORKMANAGERSYSTEM = "NETWORKMANAGERSYSTEM"
    COUNTERFAMILY = "COUNTERFAMILY"
    VENDORFK = "VENDORFK"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "CounterFilterType":
        return cls.MISSING_ENUM
