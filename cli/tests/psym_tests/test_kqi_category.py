#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json
from psym.api.kqi_category import (
    add_kqi_category,
    edit_kqi_category,
    delete_kqi_category,
    get_kqi_categories,
)
from psym.common.data_class import KqiCategory
from psym.graphql.enum.kqi_category_filter_type import KqiCategoryFilterType
from psym.graphql.enum.kqi_category_order_field import KqiCategoryOrderField
from psym.common.data_class import PropertyDefinition
from psym.graphql.enum.property_kind import PropertyKind
from ..utils.base_test import BaseTest
import unittest




class TestKqiCategory(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_kqi_category_created = add_kqi_category(
            client=self.client,
            name="kqi_category_1",
        )

        self.test_kqi_category_created_2 = add_kqi_category(
            client=self.client,
            name="kqi_category_2",
        )
        
    
    def test_add_kqi_category(self) -> None:
        fetched_kqi_category_created = add_kqi_category(
            client=self.client,
            name="kqi_category_3",
        )
        self.assertNotEqual(self.test_kqi_category_created,fetched_kqi_category_created)
    
    
    def test_edit_kqi_category(self) -> None:
        new_name = "kqi_edited"
        u = self.test_kqi_category_created_2
        edit_kqi_category(
            client=self.client,
            kpicategory=u,
            new_name=new_name,
        )
        self.assertNotEqual("kqi_category_2", u)
     
    
    def test_get_kqi_categories(self) -> None:
        kqi_categories = list(get_kqi_categories(client=self.client))
        self.assertEqual(len(kqi_categories), 2)
        add_kqi_category(
            client=self.client,
            name="kqi_category_4"
        )
        kqi_categories = list(get_kqi_categories(client=self.client))
        self.assertEqual(len(kqi_categories), 3)

    

    def test_delete_kqi_category(self) -> None:
        kqi_categories = list(get_kqi_categories(client=self.client))
        self.assertEqual(len(kqi_categories), 2)
        delete_kqi_category(client=self.client, id=self.test_kqi_category_created_2.id)
        kqi_categories = list(get_kqi_categories(client=self.client))
        self.assertEqual(len(kqi_categories), 1)




