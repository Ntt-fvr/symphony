#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.


from psym.api.project_type import (
    _populate_project_types,
    add_project_type,
    delete_project_type,
)
from psym.api.work_order_type import add_work_order_type
from psym.client import SymphonyClient
from psym.common.cache import PROJECT_TYPES
from psym.common.data_class import PropertyDefinition, WorkOrderDefinition
from psym.graphql.enum.property_kind import PropertyKind

from ..utils.base_test import BaseTest
from ..utils.grpc.rpc_pb2_grpc import TenantServiceStub


class TestProjectType(BaseTest):
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
        self.project_type = add_project_type(
            self.client,
            name="Project type name",
            description="Project type description",
            properties=[
                PropertyDefinition(
                    property_name="project type property",
                    property_kind=PropertyKind.string,
                    default_raw_value="test string value",
                    is_fixed=False,
                )
            ],
            work_order_definitions=[
                WorkOrderDefinition(
                    id=None,
                    definition_index=0,
                    work_order_type_id=self.work_order_type.id,
                )
            ],
        )

    def test_project_type_populated(self) -> None:
        self.assertEqual(len(PROJECT_TYPES), 1)
        PROJECT_TYPES.clear()
        _populate_project_types(client=self.client)
        self.assertEqual(len(PROJECT_TYPES), 1)

    def test_delete_project_type(self) -> None:
        delete_project_type(client=self.client, id=self.project_type.id)
        self.assertEqual(len(PROJECT_TYPES), 0)
