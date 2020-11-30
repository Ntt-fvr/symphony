#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class CellularNetworkType(Enum):
    CDMA = "CDMA"
    GSM = "GSM"
    LTE = "LTE"
    WCDMA = "WCDMA"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "CellularNetworkType":
        return cls.MISSING_ENUM
