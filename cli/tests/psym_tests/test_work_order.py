#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.


from psym.api.work_order import add_work_order, get_work_orders
from psym.api.work_order_type import add_work_order_type
from psym.client import SymphonyClient
from psym.common.data_class import PropertyDefinition
from psym.graphql.enum.property_kind import PropertyKind

from ..utils.base_test import BaseTest
from ..utils.grpc.rpc_pb2_grpc import TenantServiceStub


class TestWorkOrder(BaseTest):
    def __init__(
        self, test_name: str, client: SymphonyClient, stub: TenantServiceStub
    ) -> None:
        super().__init__(test_name, client, stub)

    def setUp(self) -> None:
        super().setUp()
        self.work_order_type = add_work_order_type(
            self.client,
            name="Work order type",
            description="Test work order type",
            properties=[
                PropertyDefinition(
                    property_name="work order type property",
                    property_kind=PropertyKind.string,
                    default_raw_value="test string value",
                    is_fixed=False,
                )
            ],
        )
        self.work_order = add_work_order(
            self.client,
            name="Work order",
            description="Work order description",
            work_order_type=self.work_order_type,
        )

    def test_add_work_order(self) -> None:
        fetched_work_orders = list(get_work_orders(client=self.client))
        self.assertEqual(len(fetched_work_orders), 1)
        self.assertEqual(self.work_order.id, fetched_work_orders[0].id)
