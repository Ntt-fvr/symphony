#!/usr/bin/env python3
# @generated AUTOGENERATED file. Do not Change!

from enum import Enum


class VariableExpressionType(Enum):
    VariableDefinition = "VariableDefinition"
    PropertyTypeDefinition = "PropertyTypeDefinition"
    DecisionDefinition = "DecisionDefinition"
    ChekListItemDefinition = "ChekListItemDefinition"
    MISSING_ENUM = ""

    @classmethod
    def _missing_(cls, value: object) -> "VariableExpressionType":
        return cls.MISSING_ENUM
