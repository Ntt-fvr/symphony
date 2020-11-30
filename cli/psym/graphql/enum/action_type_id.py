#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class ActionTypeId(Enum):
    work_order = "work_order"
    update_inventory = "update_inventory"
    update_workforce = "update_workforce"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "ActionTypeId":
        return cls.MISSING_ENUM
