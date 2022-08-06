#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import random
import string
import time
from psym.api.organization import add_organization

from psym.api.user import add_user, get_user_by_email
from psym.api.work_order import (
    add_work_order,
    delete_work_order,
    edit_work_order,
    get_work_order_by_id,
    get_work_orders,
)
from psym.api.work_order_type import add_work_order_type
from psym.common.data_class import PropertyDefinition
from psym.graphql.enum.property_kind import PropertyKind
from psym.graphql.enum.work_order_priority import WorkOrderPriority

from ..utils.base_test import BaseTest


class TestWorkOrder(BaseTest):
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
        self.test_organization_created = add_organization(
            client=self.client,
            name="organization_1",
            description="organization"
        )
        user_name = f"{self.random_string()}@fb.com"
        self.user = add_user(
            client=self.client, 
            email=user_name, 
            password=user_name, 
            firstName="leon" ,
            lastName= "alvares",
            organization=self.test_organization_created.id,

        )
        self.user_by_email = get_user_by_email(
            self.client, 
            email=self.user.email
            
        )
        self.work_order = add_work_order(
            self.client,
            name="Work order",
            description="Work order description",
            priority="HIGH",
            work_order_type=self.work_order_type,
            organization=self.user_by_email.organization
            
        )

    @staticmethod
    def random_string(length: int = 10) -> str:
        letters = string.ascii_lowercase
        return "".join(random.choices(letters, k=length))

    def test_add_work_order(self) -> None:
        fetched_work_orders = list(get_work_orders(client=self.client))
        self.assertEqual(len(fetched_work_orders), 1)
        self.assertEqual(self.work_order.id, fetched_work_orders[0].id)

    def test_get_work_order_by_id(self) -> None:
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=self.work_order.id
        )
        self.assertEqual(self.work_order.id, fetched_work_order.id)

    def test_edit_work_order(self) -> None:
        user_name = f"{self.random_string()}@fb.com"
        user = add_user(client=self.client, email=user_name, password=user_name, firstName="leon" ,lastName= "alvares", organization=str(self.test_organization_created.id))

        edited_work_order = edit_work_order(
            client=self.client, work_order_id=self.work_order.id, new_name="New name"
        )
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=edited_work_order.id
        )
        self.assertEqual(self.work_order.id, fetched_work_order.id)
        self.assertEqual(fetched_work_order.name, "New name")
        self.assertEqual(self.work_order.description, fetched_work_order.description)
        edited_work_order = edit_work_order(
            client=self.client,
            work_order_id=self.work_order.id,
            new_description="New description",
        )
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=edited_work_order.id
        )
        self.assertEqual(self.work_order.id, fetched_work_order.id)
        self.assertEqual(fetched_work_order.name, "New name")
        self.assertEqual(fetched_work_order.description, "New description")
        edited_work_order = edit_work_order(
            client=self.client,
            work_order_id=self.work_order.id,
            new_properties_dict={"work order type property": "new test string value"},
        )
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=edited_work_order.id
        )
        fetched_properties = fetched_work_order.properties
        self.assertIsNotNone(fetched_properties)
        self.assertEqual(len(fetched_properties), 1)
        self.assertEqual(fetched_properties[0].stringValue, "new test string value")
        edited_work_order = edit_work_order(
            client=self.client, work_order_id=self.work_order.id, new_owner_id=user.id
        )
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=edited_work_order.id
        )
        self.assertEqual(self.work_order.id, fetched_work_order.id)
        self.assertEqual(fetched_work_order.owner_id, user.id)
        self.assertIsNone(fetched_work_order.assignee_id)
        edited_work_order = edit_work_order(
            client=self.client,
            work_order_id=self.work_order.id,
            new_assignee_id=user.id,
        )
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=edited_work_order.id
        )
        self.assertEqual(self.work_order.id, fetched_work_order.id)
        self.assertEqual(fetched_work_order.owner_id, user.id)
        self.assertEqual(fetched_work_order.assignee_id, user.id)
        edited_work_order = edit_work_order(
            client=self.client,
            work_order_id=self.work_order.id,
            new_priority=WorkOrderPriority("HIGH"),
        )
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=edited_work_order.id
        )
        self.assertEqual(self.work_order.id, fetched_work_order.id)
        self.assertEqual(fetched_work_order.priority, WorkOrderPriority.HIGH)
        edited_work_order = edit_work_order(
            client=self.client,
            work_order_id=self.work_order.id,
            new_name="New name again",
            new_description="New description again",
        )
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=edited_work_order.id
        )
        self.assertEqual(self.work_order.id, fetched_work_order.id)
        self.assertEqual(fetched_work_order.name, "New name again")
        self.assertEqual(fetched_work_order.description, "New description again")
        
        edited_work_order = edit_work_order(
            client=self.client,
            work_order_id=self.work_order.id,
            new_name="New name again_again",
            new_description="New description again_again",
            new_organization=self.user_by_email.organization
        )
        fetched_work_order = get_work_order_by_id(
            client=self.client, id=edited_work_order.id
        )
        self.assertEqual(self.work_order.id, fetched_work_order.id)
        self.assertEqual(fetched_work_order.name, "New name again_again")
        self.assertEqual(fetched_work_order.description, "New description again_again")
        self.assertEqual(fetched_work_order.organization, self.user_by_email.organization)

    def test_delete_work_order(self) -> None:
        delete_work_order(client=self.client, id=self.work_order.id)
        fetched_work_orders = list(get_work_orders(client=self.client))
        self.assertEqual(len(fetched_work_orders), 0)