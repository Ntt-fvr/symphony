#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json


from psym.api.rule_type import (
    add_rule_type,
    edit_rule_type,
    get_rule_types,
    remove_rule_type,
)

from ..utils.base_test import BaseTest
import unittest




class TestRuleType(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_rule_type_created = add_rule_type(
            client=self.client,
            name="rule_type_1",
        )

        self.test_rule_type_created_2 = add_rule_type(
            client=self.client,
            name="rule_type_2",
        )
        
    
    def test_add_rule_type(self) -> None:
        fetched_rule_type_created = add_rule_type(
            client=self.client,
            name="rule_type_3",
        )
        self.assertNotEqual(self.test_rule_type_created, fetched_rule_type_created)


    def test_edit_rule_type(self) -> None:
        new_name = "rule_type_edited"
        u = self.test_rule_type_created_2
        edit_rule_type(
            client=self.client,
            rule_type=u,
            new_name=new_name,
        )
        self.assertNotEqual("rule_type_2", u)


    def test_get_rule_types(self) -> None:
        get_rule_types_ = list(get_rule_types(client=self.client))
        self.assertEqual(len(get_rule_types_), 2)
        add_rule_type(
            client=self.client,
            name="rule_type_3"
        )
        get_rule_types_= list(get_rule_types(client=self.client))
        self.assertEqual(len(get_rule_types_), 3)

    

    def test_delete_rule_type(self) -> None:
        get_rule_types_ = list(get_rule_types(client=self.client))
        self.assertEqual(len(get_rule_types_), 2)
        remove_rule_type(client=self.client, id=self.test_rule_type_created_2.id)
        get_rule_types_ = list(get_rule_types(client=self.client))
        self.assertEqual(len(get_rule_types_), 1)
 


