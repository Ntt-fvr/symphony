#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.kqi_source import (
    add_kqi_source,
    edit_kqi_source,
    delete_kqi_source,
    get_kqi_sources,

)

from ..utils.base_test import BaseTest
import unittest




class TestKqiSource(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_kqi_source_created = add_kqi_source(
            client=self.client,
            name="kqi_source_1",
        )

        self.test_kqi_source_created_2 = add_kqi_source(
            client=self.client,
            name="kqi_source_2",
        )
        
    
    def test_add_kqi_source(self) -> None:
        fetched_kqi_source_created = add_kqi_source(
            client=self.client,
            name="kqi_source_3",
        )
        self.assertNotEqual(self.test_kqi_source_created,fetched_kqi_source_created)
    
    
    def test_edit_kqi_source(self) -> None:
        new_name = "kqi_source_edited"
        u = self.test_kqi_source_created_2
        edit_kqi_source(
            client=self.client,
            kqisource=u,
            new_name=new_name,
        )
        self.assertNotEqual("kqi_source_2", u)
     
    
    def test_get_kqi_sources(self) -> None:
        kqi_sources = list(get_kqi_sources(client=self.client))
        self.assertEqual(len(kqi_sources), 2)
        add_kqi_source(
            client=self.client,
            name="kqi_source_4"
        )
        kqi_sources = list(get_kqi_sources(client=self.client))
        self.assertEqual(len(kqi_sources), 3)

    

    def test_delete_kqi_source(self) -> None:
        kqi_sources = list(get_kqi_sources(client=self.client))
        self.assertEqual(len(kqi_sources), 2)
        delete_kqi_source(client=self.client, id=self.test_kqi_source_created_2.id)
        kqi_sources = list(get_kqi_sources(client=self.client))
        self.assertEqual(len(kqi_sources), 1)




