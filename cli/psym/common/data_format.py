#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

from numbers import Number
from typing import List, Sequence, cast

from psym.graphql.fragment.project_type import ProjectTypeFragment
from psym.graphql.fragment.property_type import PropertyTypeFragment
from psym.graphql.input.property_type import PropertyTypeInput

from .data_class import ProjectType, PropertyDefinition, WorkOrderDefinition


def format_to_property_definition(
    property_type_fragment: PropertyTypeFragment,
) -> PropertyDefinition:
    """This function gets `psym.graphql.fragment.property_type.PropertyTypeFragment` object as argument
    and formats it to `psym.common.data_class.PropertyDefinition` object

        :param property_type_fragment: Existing property type fragment object
        :type property_type_fragment: :class:`~psym.graphql.fragment.property_type.PropertyTypeFragment`

        :return: PropertyDefinition object
        :rtype: :class:`~psym.common.data_class.PropertyDefinition`

        **Example**

        .. code-block:: python

            property_definition = format_to_property_definition(
                property_type_fragment=property_type_fragment,
            )
    """
    return PropertyDefinition(
        id=property_type_fragment.id,
        property_name=property_type_fragment.name,
        property_kind=property_type_fragment.type,
        default_raw_value=property_type_fragment.rawValue,
        is_fixed=not property_type_fragment.isInstanceProperty,
        external_id=property_type_fragment.externalId,
        is_mandatory=property_type_fragment.isMandatory,
        is_deleted=property_type_fragment.isDeleted,
    )


def format_to_property_definitions(
    data: Sequence[PropertyTypeFragment],
) -> Sequence[PropertyDefinition]:
    """This function gets Sequence[ `PropertyTypeFragment` ] as argument and formats it to Sequence[ `PropertyDefinition` ]

    :param data: Existing property type fragments sequence
    :type data: Sequence[ :class:`~psym.graphql.fragment.property_type.PropertyTypeFragment` ]

    :return: PropertyDefinitions sequence
    :rtype: Sequence[ :class:`~psym.common.data_class.PropertyDefinition` ]

    **Example**

    .. code-block:: python

        property_definitions = format_to_property_definitions(
            data=property_type_fragments,
        )
    """
    return [
        format_to_property_definition(property_type_fragment)
        for property_type_fragment in data
    ]


def format_to_property_type_input(
    property_definition: PropertyDefinition, is_new: bool = True
) -> PropertyTypeInput:
    """This function gets `PropertyDefinition` object as argument and formats it to `PropertyTypeInput` object

    :param property_definition: Existing property definition object
    :type property_definition: :class:`~psym.common.data_class.PropertyDefinition`
    :param is_new: Is new flag
    :type is_new: bool

    :return: PropertyTypeInput object
    :rtype: :class:`~psym.graphql.input.property_type.PropertyTypeInput`

    **Example**

    .. code-block:: python

        property_type_input = format_to_property_type_input(
            property_definition=property_definition,
        )
    """
    string_value = None
    int_value = None
    boolean_value = None
    float_value = None
    latitude_value = None
    longitude_value = None
    range_from_value = None
    range_to_value = None

    kind = property_definition.property_kind.value

    if property_definition.default_raw_value is not None:
        default_raw_value = property_definition.default_raw_value
        if kind == "int":
            int_value = int(default_raw_value, base=10)
        elif kind == "bool":
            boolean_value = True if default_raw_value.lower() == "true" else False
        elif kind == "float":
            float_value = cast(Number, float(default_raw_value))
        elif kind == "range":
            string_range = default_raw_value.split(" - ")
            range_from_value = cast(Number, float(string_range[0]))
            range_to_value = cast(Number, float(string_range[1]))
        elif kind == "gps_location":
            string_coordinates = default_raw_value.split(", ")
            latitude_value = cast(Number, float(string_coordinates[0]))
            longitude_value = cast(Number, float(string_coordinates[1]))
        else:
            string_value = default_raw_value

    return PropertyTypeInput(
        id=property_definition.id if not is_new else None,
        name=property_definition.property_name,
        type=property_definition.property_kind,
        externalId=property_definition.external_id
        if not is_new and property_definition.external_id
        else None,
        stringValue=string_value,
        intValue=int_value,
        booleanValue=boolean_value,
        floatValue=float_value,
        latitudeValue=latitude_value,
        longitudeValue=longitude_value,
        rangeFromValue=range_from_value,
        rangeToValue=range_to_value,
        isInstanceProperty=not property_definition.is_fixed,
        isMandatory=property_definition.is_mandatory,
        isDeleted=property_definition.is_deleted,
    )


def format_to_property_type_inputs(
    data: Sequence[PropertyDefinition],
) -> List[PropertyTypeInput]:
    """This function gets Sequence[ `PropertyDefinition` ] as argument and formats it to Sequence[ `PropertyTypeInput` ]

    :param data: Existing property definitions sequence
    :type data: Sequence[ :class:`~psym.common.data_class.PropertyDefinition` ]

    :return: PropertyTypeInputs list
    :rtype: List[ :class:`~psym.graphql.input.property_type.PropertyTypeInput` ]

    **Example**

    .. code-block:: python

        property_type_inputs = format_to_property_type_inputs(
            data=property_type_definitions,
        )
    """
    return [
        format_to_property_type_input(property_definition)
        for property_definition in data
    ]


def format_to_project_type(project_type_fragment: ProjectTypeFragment) -> ProjectType:
    """This function gets `psym.graphql.fragment.project_type.ProjectTypeFragment` object as argument
    and formats it to `psym.common.data_class.ProjectType` object

        :param project_type_fragment: Existing property type fragment object
        :type project_type_fragment: :class:`~psym.graphql.fragment.project_type.ProjectTypeFragment`

        :return: ProjectType object
        :rtype: :class:`~psym.common.data_class.ProjectType`

        **Example**

        .. code-block:: python

            project_type = format_to_project_type(
                project_type_fragment=project_type_fragment,
            )
    """
    return ProjectType(
        id=project_type_fragment.id,
        name=project_type_fragment.name,
        description=project_type_fragment.description,
        property_types=format_to_property_definitions(project_type_fragment.properties),
        work_order_definitions=[
            WorkOrderDefinition(
                id=wod.id if wod.id else None,
                definition_index=wod.index if wod.index else None,
                work_order_type_id=wod.type.id,
            )
            for wod in project_type_fragment.workOrders
        ],
    )
