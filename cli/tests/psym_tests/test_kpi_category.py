#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json
from psym.api.kpi_category import (
    add_kpi_category,
    get_kpi_categories,
    delete_kpi_category,
    edit_kpi_category,

)
from psym.common.data_class import KpiCategory
from psym.graphql.enum.kpi_category_filter_type import KpiCategoryFilterType
from psym.graphql.enum.kpi_category_order_field import KpiCategoryOrderField
from psym.common.data_class import PropertyDefinition
from psym.graphql.enum.property_kind import PropertyKind
from ..utils.base_test import BaseTest
import unittest




class TestKpiCategory(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_kpi_category_created = add_kpi_category(
            client=self.client,
            name="kpi_category_1",
        )

        self.test_kpi_category_created_2 = add_kpi_category(
            client=self.client,
            name="kpi_category_2",
        )
        
    
    def test_add_kpi_category(self) -> None:
        fetched_kpi_category_created = add_kpi_category(
            client=self.client,
            name="kpi_category_3",
        )
        self.assertNotEqual(self.test_kpi_category_created,fetched_kpi_category_created)

    
    def test_edit_kpi_category(self) -> None:
        new_name = "kpi_edited"
        u = self.test_kpi_category_created_2
        edit_kpi_category(
            client=self.client,
            kpicategory=u,
            new_name=new_name,
        )
        self.assertNotEqual("kpi_category_2", u)

     
    
    def test_get_kpi_categories(self) -> None:
        kpi_categories = list(get_kpi_categories(client=self.client))
        self.assertEqual(len(kpi_categories), 2)
        add_kpi_category(
            client=self.client,
            name="kpi_category_4"
        )
        kpi_categories = list(get_kpi_categories(client=self.client))
        self.assertEqual(len(kpi_categories), 3)

    

    def test_delete_kpi_category(self) -> None:
        kpi_categories = list(get_kpi_categories(client=self.client))
        self.assertEqual(len(kpi_categories), 2)
        delete_kpi_category(client=self.client, id=self.test_kpi_category_created_2.id)
        kpi_categories = list(get_kpi_categories(client=self.client))
        self.assertEqual(len(kpi_categories), 1)





