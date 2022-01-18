#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.vendor import (
    add_vendor,
    edit_vendor,
    get_vendors,
    remove_vendor,
)

from ..utils.base_test import BaseTest
import unittest




class TestVendor(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_vendor_created = add_vendor(
            client=self.client,
            name="vendor_1",
        )

        self.test_vendor_created_2 = add_vendor(
            client=self.client,
            name="vendor_2",
        )
        
    
    def test_add_vendor(self) -> None:
        fetched_vendor_created = add_vendor(
            client=self.client,
            name="vendor_3",
        )
        self.assertNotEqual(self.test_vendor_created, fetched_vendor_created)
  

    def test_edit_vendor(self) -> None:
        new_name = "vendor_edited"
        u = self.test_vendor_created_2
        edit_vendor(
            client=self.client,
            vendor=u,
            new_name=new_name,
        )
        self.assertNotEqual("vendor_2", u)
    

    def test_get_vendors(self) -> None:
        vendors_ = list(get_vendors(client=self.client))
        self.assertEqual(len(vendors_), 2)
        add_vendor(
            client=self.client,
            name="vendor_3"
        )
        vendors_= list(get_vendors(client=self.client))
        self.assertEqual(len(vendors_), 3)

    

    def test_delete_vendor(self) -> None:
        vendors_ = list(get_vendors(client=self.client))
        self.assertEqual(len(vendors_), 2)
        remove_vendor(client=self.client, id=self.test_vendor_created_2.id)
        vendors_ = list(get_vendors(client=self.client))
        self.assertEqual(len(vendors_), 1)
 




    
    
    

