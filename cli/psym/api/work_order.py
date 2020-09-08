#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

from typing import Dict, Iterator, Optional

from psym.client import SymphonyClient
from psym.common.cache import WORK_ORDER_TYPES
from psym.common.data_class import PropertyValue, WorkOrder, WorkOrderType
from psym.graphql.enum.work_order_priority import WorkOrderPriority
from psym.graphql.enum.work_order_status import WorkOrderStatus

from .._utils import get_graphql_property_inputs
from ..graphql.input.add_work_order import AddWorkOrderInput
from ..graphql.mutation.add_work_order import AddWorkOrderMutation
from ..graphql.query.work_orders import WorkOrdersQuery


def add_work_order(
    client: SymphonyClient,
    name: str,
    work_order_type: WorkOrderType,
    description: Optional[str] = None,
    location_id: Optional[str] = None,
    project_id: Optional[str] = None,
    properties_dict: Dict[str, PropertyValue] = {},
    owner_id: Optional[str] = None,
    assignee_id: Optional[str] = None,
    status: Optional[WorkOrderStatus] = None,
    priority: Optional[WorkOrderPriority] = None,
) -> WorkOrder:
    """This function creates work order of with the given name and type

    :param name: Work order name
    :type name: str
    :param description: Work order description
    :type description: str, optional
    :param work_order_type: Work order type object
    :type work_order_type: :class:`~psym.common.data_class.WorkOrderType`
    :param location_id: Existing location ID
    :type location_id: str, optional
    :param project_id: Existing project ID
    :type project_id: str, optional
    :param properties_dict: Dictionary of property name to property value

        * str - property name
        * PropertyValue - new value of the same type for this property

    :type properties_dict: Dict[str, PropertyValue]
    :param owner_id: Owner ID
    :type owner_id: str, optional
    :param assignee_id: Assignee ID
    :type assignee_id: str, optional
    :param status: Work order status
    :type status: :class:`~psym.common.data_enum.work_order_status.WorkOrderStatus`, optional
    :param priority: Work order priority
    :type priority: :class:`~psym.common.data_enum.work_order_priority.WorkOrderPriority`, optional

    :return: Work order
    :rtype: :class:`~psym.common.data_class.WorkOrder`

    **Example**

    .. code-block:: python

        work_order_type = client.add_work_order_type(
            name="Work order type",
            description="Work order type description",
            properties=[
                PropertyDefinition(
                    property_name="work order type property",
                    property_kind=PropertyKind.string,
                    default_raw_value="string value",
                    is_fixed=False,
                )
            ],
        )
        client.add_work_order_type(
            name="new work order",
            work_order_type=work_order_type,
            description="Work order description",
            location_id="12345678",
            project_id="87654321",
            properties_dict={
                "Date Property": date.today(),
                "Lat/Lng Property": (-1.23,9.232),
                "E-mail Property": "user@fb.com",
                "Number Property": 11,
                "String Property": "aa",
                "Float Property": 1.23
            },
            owner_id="81726354",
            assignee_id="18273645",
            status="PLANNED",
            priority="MEDIUM",
        )
    """
    property_types = WORK_ORDER_TYPES[work_order_type.name].property_types
    properties = get_graphql_property_inputs(property_types, properties_dict)
    result = AddWorkOrderMutation.execute(
        client,
        AddWorkOrderInput(
            name=name,
            description=description,
            workOrderTypeId=work_order_type.id,
            locationId=location_id,
            projectId=project_id,
            properties=properties,
            ownerId=owner_id,
            assigneeId=assignee_id,
            status=WorkOrderStatus(status) if status else None,
            priority=WorkOrderPriority(priority) if priority else None,
            checkList=[],
            checkListCategories=[],
        ),
    )
    return WorkOrder(
        id=result.id,
        name=result.name,
        description=result.description,
        work_order_type_id=result.workOrderType.id,
        location_id=result.location.id if result.location else None,
        project_id=result.project.id if result.project else None,
        properties=result.properties if result.properties else None,
        owner_id=result.owner.id,
        assignee_id=result.assignedTo.id if result.assignedTo else None,
        status=result.status,
        priority=result.priority,
    )


def get_work_orders(client: SymphonyClient) -> Iterator[WorkOrder]:
    """Get the iterator of work orders

    :raises:
        FailedOperationException: Internal inventory error

    :return: WorkOrder Iterator
    :rtype: Iterator[ :class:`~psym.common.data_class.WorkOrder` ]

    **Example**

    .. code-block:: python

        work_orders = client.get_work_orders()
        for work_order in work_orders:
            print(work_order.name, work_order.description)
    """
    result = WorkOrdersQuery.execute(client)
    if result is None:
        return
    for edge in result.edges:
        node = edge.node
        if node is not None:
            yield WorkOrder(
                id=node.id,
                name=node.name,
                description=node.description,
                work_order_type_id=node.workOrderType.id,
                location_id=node.location.id if node.location else None,
                project_id=node.project.id if node.project else None,
                properties=node.properties if node.properties else None,
                owner_id=node.owner.id,
                assignee_id=node.assignedTo.id if node.assignedTo else None,
                status=node.status,
                priority=node.priority,
            )
