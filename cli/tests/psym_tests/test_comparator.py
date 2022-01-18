#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.comparator import (
    add_comparator,
    edit_comparator,
    get_comparators,
    remove_comparator,
    


)

from ..utils.base_test import BaseTest
import unittest




class TestComparator(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_comparator_created = add_comparator(
            client=self.client,
            name="comparator_1",
        )

        self.test_comparator_created_2 = add_comparator(
            client=self.client,
            name="comparator_2",
        )
        
    
    def test_add_comparator(self) -> None:
        fetched_comparator_created = add_comparator(
            client=self.client,
            name="comparator_3",
        )
        self.assertNotEqual(self.test_comparator_created, fetched_comparator_created)
  

    def test_edit_comparator(self) -> None:
        new_name = "comparator_edited"
        u = self.test_comparator_created_2
        edit_comparator(
            client=self.client,
            comparator=u,
            new_name=new_name,
        )
        self.assertNotEqual("comparator_2", u)
    
    def test_get_comparators(self) -> None:
        comparators_ = list(get_comparators(client=self.client))
        self.assertEqual(len(comparators_), 2)
        add_comparator(
            client=self.client,
            name="comparator_3"
        )
        comparators_= list(get_comparators(client=self.client))
        self.assertEqual(len(comparators_), 3)

    

    def test_delete_comparator(self) -> None:
        comparators_ = list(get_comparators(client=self.client))
        self.assertEqual(len(comparators_), 2)
        remove_comparator(client=self.client, id=self.test_comparator_created_2.id)
        comparators_ = list(get_comparators(client=self.client))
        self.assertEqual(len(comparators_), 1)
 




    
    
    

