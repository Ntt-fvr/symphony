#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json
from psym.api.kqi_temporal_frecuency import (
    add_kqi_temporal_frecuency,
    edit_kqi_temporal_frecuency,
    delete_kqi_temporal_frecuency,
    get_kqi_temporal_frecuencies,

)

from ..utils.base_test import BaseTest
import unittest




class TestKqiTemporalFrencuency(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_kqi_temporal_frecuency_created = add_kqi_temporal_frecuency(
            client=self.client,
            name="kqi_kqi_temporal_frecuency_1",
        )

        self.test_kqi_temporal_frecuency_created_2 = add_kqi_temporal_frecuency(
            client=self.client,
            name="kqi_kqi_temporal_frecuency_2",
        )
        
    
    def test_add_kqi_temporal_frecuency(self) -> None:
        fetched_kqi_kqi_temporal_frecuency_created = add_kqi_temporal_frecuency(
            client=self.client,
            name="kqi_kqi_temporal_frecuency_3",
        )
        self.assertNotEqual(self.test_kqi_temporal_frecuency_created,fetched_kqi_kqi_temporal_frecuency_created)
    
    
    def test_edit_kqi_temporal_frecuency(self) -> None:
        new_name = "kqi_kqi_temporal_frecuency_edited"
        u = self.test_kqi_temporal_frecuency_created_2
        edit_kqi_temporal_frecuency(
            client=self.client,
            kqitemporalfrecuency=u,
            new_name=new_name,
        )
        self.assertNotEqual("kqi_kqi_temporal_frecuency_2", u)
     
    
    def test_get_kqi_temporal_frecuency(self) -> None:
        kqi_temporal_frecuencies = list(get_kqi_temporal_frecuencies(client=self.client))
        self.assertEqual(len(kqi_temporal_frecuencies), 2)
        add_kqi_temporal_frecuency(
            client=self.client,
            name="kqi_perspective_4"
        )
        kqi_temporal_frecuencies = list(get_kqi_temporal_frecuencies(client=self.client))
        self.assertEqual(len(kqi_temporal_frecuencies), 3)

    

    def test_delete_kqi_temporal_frecuencies(self) -> None:
        kqi_temporal_frecuencies = list(get_kqi_temporal_frecuencies(client=self.client))
        self.assertEqual(len(kqi_temporal_frecuencies), 2)
        delete_kqi_temporal_frecuency(client=self.client, id=self.test_kqi_temporal_frecuency_created_2.id)
        kqi_temporal_frecuencies = list(get_kqi_temporal_frecuencies(client=self.client))
        self.assertEqual(len(kqi_temporal_frecuencies), 1)




