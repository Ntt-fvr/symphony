#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.counter_family import (
    add_counter_family,
    edit_counter_family,
    get_counter_families,
    remove_counter_family,


)

from ..utils.base_test import BaseTest
import unittest




class TestCounterFamily(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_counter_family_created = add_counter_family(
            client=self.client,
            name="counter_family_1",
        )

        self.test_counter_family_created_2 = add_counter_family(
            client=self.client,
            name="counter_family_2",
        )
        
    
    def test_add_counter_family(self) -> None:
        fetched_counter_family_created = add_counter_family(
            client=self.client,
            name="counter_family_3",
        )
        self.assertNotEqual(self.test_counter_family_created, fetched_counter_family_created)
  

    def test_edit_counter_family(self) -> None:
        new_name = "counter_family_edited"
        u = self.test_counter_family_created_2
        edit_counter_family(
            client=self.client,
            counter_family=u,
            new_name=new_name,
        )
        self.assertNotEqual("counter_family_2", u)
 

    def test_get_counter_families(self) -> None:
        counter_families_ = list(get_counter_families(client=self.client))
        self.assertEqual(len(counter_families_), 2)
        add_counter_family(
            client=self.client,
            name="counterFamily_3"
        )
        counter_families_= list(get_counter_families(client=self.client))
        self.assertEqual(len(counter_families_), 3)

    

    def test_delete_counterFamily(self) -> None:
        counter_families_ = list(get_counter_families(client=self.client))
        self.assertEqual(len(counter_families_), 2)
        remove_counter_family(client=self.client, id=self.test_counter_family_created_2.id)
        counter_families_ = list(get_counter_families(client=self.client))
        self.assertEqual(len(counter_families_), 1)
 





    
    
    

