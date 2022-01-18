#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json


from psym.api.network_type import (
    add_network_type,
    edit_network_type,
    get_network_types,
    remove_network_type,
)

from ..utils.base_test import BaseTest
import unittest




class TestNetworkType(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_network_type_created = add_network_type(
            client=self.client,
            name="network_type_1",
        )

        self.test_network_type_created_2 = add_network_type(
            client=self.client,
            name="network_type_2",
        )
        
    
    def test_add_network_type(self) -> None:
        fetched_network_type_created = add_network_type(
            client=self.client,
            name="network_type_3",
        )
        self.assertNotEqual(self.test_network_type_created, fetched_network_type_created)


    def test_edit_network_type(self) -> None:
        new_name = "network_type_edited"
        u = self.test_network_type_created_2
        edit_network_type(
            client=self.client,
            network_type=u,
            new_name=new_name,
        )
        self.assertNotEqual("network_type_2", u)


    def test_get_network_types(self) -> None:
        get_network_types_ = list(get_network_types(client=self.client))
        self.assertEqual(len(get_network_types_), 2)
        add_network_type(
            client=self.client,
            name="network_type_3"
        )
        get_network_types_= list(get_network_types(client=self.client))
        self.assertEqual(len(get_network_types_), 3)

    

    def test_delete_network_type(self) -> None:
        get_network_types_ = list(get_network_types(client=self.client))
        self.assertEqual(len(get_network_types_), 2)
        remove_network_type(client=self.client, id=self.test_network_type_created_2.id)
        get_network_types_ = list(get_network_types(client=self.client))
        self.assertEqual(len(get_network_types_), 1)
 


