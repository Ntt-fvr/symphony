#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json


from psym.api.event_severity import (
    add_event_severity,
    edit_event_severity,
    get_event_severities,
    remove_event_severity,



)

from ..utils.base_test import BaseTest
import unittest




class TestEventSeverity(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_event_severity_created = add_event_severity(
            client=self.client,
            name="event_severity_1",
        )

        self.test_event_severity_created_2 = add_event_severity(
            client=self.client,
            name="event_severity_2",
        )
        
    
    def test_add_event_severity(self) -> None:
        fetched_event_severity_created = add_event_severity(
            client=self.client,
            name="event_severity_3",
        )
        self.assertNotEqual(self.test_event_severity_created, fetched_event_severity_created)


    def test_edit_event_severity(self) -> None:
        new_name = "event_severity_edited"
        u = self.test_event_severity_created_2
        edit_event_severity(
            client=self.client,
            event_severity=u,
            new_name=new_name,
        )
        self.assertNotEqual("event_severity_2", u)


    def test_get_event_severities(self) -> None:
        get_event_severitys_ = list(get_event_severities(client=self.client))
        self.assertEqual(len(get_event_severitys_), 2)
        add_event_severity(
            client=self.client,
            name="event_severity_3"
        )
        get_event_severitys_= list(get_event_severities(client=self.client))
        self.assertEqual(len(get_event_severitys_), 3)

    

    def test_delete_event_severity(self) -> None:
        get_event_severitys_ = list(get_event_severities(client=self.client))
        self.assertEqual(len(get_event_severitys_), 2)
        remove_event_severity(client=self.client, id=self.test_event_severity_created_2.id)
        get_event_severitys_ = list(get_event_severities(client=self.client))
        self.assertEqual(len(get_event_severitys_), 1)
 


