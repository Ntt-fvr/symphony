#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json


from psym.api.counter_family import (
    add_counter_family,
)

from psym.api.vendor import (
    add_vendor,

)

from psym.api.counter import (
    add_counter,
    edit_counter,
    get_counters,
    remove_counter,
)

from ..utils.base_test import BaseTest
import unittest




class TestCounter(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_counter_family_created = add_counter_family(
            client=self.client,
            name="counter_family_1",
        )

        self.test_vendor_created = add_vendor(
            client=self.client,
            name="vendor_1",
        )

        self.test_counter_created = add_counter(
            client=self.client,
            name="counter_1",
            externalID="new counter_1",
            networkManagerSystem="counter",
            counterFamily=self.test_counter_family_created.id,
            vendor= self.test_vendor_created.id
        )

        self.test_counter_created_2 = add_counter(
            client=self.client,
            name="counter_2",
            externalID="new counter_2",
            networkManagerSystem="counter",
            counterFamily=self.test_counter_family_created.id,
            vendor= self.test_vendor_created.id
        )
        
    
    def test_add_counter(self) -> None:
        fetched_counter_created = add_counter(
            client=self.client,
            name="counter_3",
            externalID="new counter_3",
            networkManagerSystem="counter",
            counterFamily=self.test_counter_family_created.id,
            vendor= self.test_vendor_created.id


        )
        self.assertNotEqual(self.test_counter_created, fetched_counter_created)
  
 

    def test_edit_counter(self) -> None:
        new_name = "counter_edited"
        u = self.test_counter_created_2
        edit_counter(
            client=self.client,
            counter=u,
            new_name=new_name,
            externalID="new counter_4",
            networkManagerSystem="counter",
            vendor= self.test_vendor_created.id
        )
        self.assertNotEqual("new counter_2", u)
    

    def test_get_counters(self) -> None:
        counters = list(get_counters(client=self.client))
        self.assertEqual(len(counters), 2)
        add_counter(
            client=self.client,
            name="counter_5",
            externalID="new counter_5",
            networkManagerSystem="counter",
            counterFamily=self.test_counter_family_created.id,
            vendor= self.test_vendor_created.id
        )
        counters= list(get_counters(client=self.client))
        self.assertEqual(len(counters), 3)

    

    def test_delete_counter(self) -> None:
        counters = list(get_counters(client=self.client))
        self.assertEqual(len(counters), 2)
        remove_counter(client=self.client, id=self.test_counter_created_2.id)
        counters = list(get_counters(client=self.client))
        self.assertEqual(len(counters), 1)
 







    
    
    

