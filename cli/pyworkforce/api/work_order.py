#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

from pyinventory.graphql.input.add_work_order_type import AddWorkOrderTypeInput
from pyinventory.graphql.mutation.add_work_order_type import AddWorkOrderTypeMutation
from pysymphony import SymphonyClient
from pysymphony.common.data_class import WorkOrder, WorkOrderType

from ..graphql.input.add_work_order import AddWorkOrderInput
from ..graphql.mutation.add_work_order import AddWorkOrderMutation


def add_work_order_type(client: SymphonyClient, name: str) -> WorkOrderType:
    """This function creates work order type with the given name

        Args:
            name (str): work order type name

        Returns:
            `pyworkforce.common.data_class.WorkOrderType`

        Example:
            ```
            client.add_work_order_type("Deployment work order")
            ```
    """
    result = AddWorkOrderTypeMutation.execute(
        client, AddWorkOrderTypeInput(name=name, checkListCategories=[])
    )
    return WorkOrderType(id=result.id)


def add_work_order(
    client: SymphonyClient, name: str, work_order_type: WorkOrderType
) -> WorkOrder:
    """This function creates work order of with the given name and type

        Args:
            name (str): work order name
            work_order_type (`pyworkforce.common.data_class.WorkOrderType`): work order type

        Returns:
            `pyworkforce.common.data_class.WorkOrder`

        Example:
            ```
            work_order_type = client.add_work_order_type("Deployment work order")
            client.add_work_order_type("new work order", work_order_type)
            ```
    """
    result = AddWorkOrderMutation.execute(
        client,
        AddWorkOrderInput(
            name=name,
            workOrderTypeId=work_order_type.id,
            properties=[],
            checkList=[],
            checkListCategories=[],
        ),
    )
    return WorkOrder(id=result.id, name=result.name)
