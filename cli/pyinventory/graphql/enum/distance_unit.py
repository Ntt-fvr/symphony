#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum

class DistanceUnit(Enum):
    KILOMETER = "KILOMETER"
    MILE = "MILE"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "DistanceUnit":
        return cls.MISSING_ENUM
