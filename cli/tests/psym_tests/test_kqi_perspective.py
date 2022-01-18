#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json
from psym.api.kqi_perspective import (
    add_kqi_perspective,
    edit_kqi_perspective,
    delete_kqi_perspective,
    get_kqi_perspectives,

)

from ..utils.base_test import BaseTest
import unittest




class TestKqiPerspective(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_kqi_perspective_created = add_kqi_perspective(
            client=self.client,
            name="kqi_cperspective_1",
        )

        self.test_kqi_perspective_created_2 = add_kqi_perspective(
            client=self.client,
            name="kqi_perspective_2",
        )
        
    
    def test_add_kqi_perspective(self) -> None:
        fetched_kqi_perspective_created = add_kqi_perspective(
            client=self.client,
            name="kqi_perspective_3",
        )
        self.assertNotEqual(self.test_kqi_perspective_created,fetched_kqi_perspective_created)
    
    
    def test_edit_kqi_perspective(self) -> None:
        new_name = "kqi_perspective_edited"
        u = self.test_kqi_perspective_created_2
        edit_kqi_perspective(
            client=self.client,
            kqiperspective=u,
            new_name=new_name,
        )
        self.assertNotEqual("kqi_perspective_2", u)
     
    
    def test_get_kqi_perspectives(self) -> None:
        kqi_perspectives = list(get_kqi_perspectives(client=self.client))
        self.assertEqual(len(kqi_perspectives), 2)
        add_kqi_perspective(
            client=self.client,
            name="kqi_perspective_4"
        )
        kqi_perspectives = list(get_kqi_perspectives(client=self.client))
        self.assertEqual(len(kqi_perspectives), 3)

    

    def test_delete_kqi_perspective(self) -> None:
        kqi_perspectives = list(get_kqi_perspectives(client=self.client))
        self.assertEqual(len(kqi_perspectives), 2)
        delete_kqi_perspective(client=self.client, id=self.test_kqi_perspective_created_2.id)
        kqi_perspectives = list(get_kqi_perspectives(client=self.client))
        self.assertEqual(len(kqi_perspectives), 1)




