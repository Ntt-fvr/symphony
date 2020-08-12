#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.


import time
from typing import Any, Dict, List

from pyinventory.api.work_order_type import add_work_order_type
from pyinventory.graphql.enum.property_kind import PropertyKind
from pysymphony import SymphonyClient
from pysymphony.common.data_class import PropertyDefinition
from pyworkforce.api.work_order import add_work_order

from ..utils.base_test import BaseTest
from ..utils.constant import TEST_USER_EMAIL, TestMode
from ..utils.grpc.rpc_pb2_grpc import TenantServiceStub
from .subscription_client import SubscriptionClient


class TestWorkOrderSubscription(BaseTest):
    def __init__(
        self, test_name: str, client: SymphonyClient, stub: TenantServiceStub
    ) -> None:
        super().__init__(test_name, client, stub)

    def setUp(self) -> None:
        super().setUp()
        self.type = add_work_order_type(
            self.client,
            name="Work Order Template",
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

    def test_subscribe_to_work_order_added(self) -> None:
        from ..utils import TEST_MODE

        url = "wss://fb-test.localtest.me/graph/query"
        if TEST_MODE == TestMode.DEV:
            url = "wss://fb-test.thesymphony.cloud/graph/query"

        sub_client = SubscriptionClient(url, TEST_USER_EMAIL, TEST_USER_EMAIL)
        work_orders_added: List[Dict[str, str]] = []

        def callback(_id: str, data: Dict[str, Any]) -> None:
            work_orders_added.append(data["payload"]["data"]["workOrderAdded"])

        query = """
            subscription {
                workOrderAdded {
                    id
                    name
                }
            }
        """

        sub_id = sub_client.subscribe(query, callback=callback)

        work_order = add_work_order(
            self.client, name="My Work Order", work_order_type=self.type
        )
        i = 0
        while len(work_orders_added) == 0:
            time.sleep(1)
            i = i + 1
            if i == 3:
                break

        self.assertEqual(1, len(work_orders_added))
        self.assertEqual(work_order.id, work_orders_added[0]["id"])
        self.assertEqual(work_order.name, work_orders_added[0]["name"])

        sub_client.stop_subscribe(sub_id)
        sub_client.close()
