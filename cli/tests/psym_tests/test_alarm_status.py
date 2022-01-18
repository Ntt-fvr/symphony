#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.alarm_status import (
    add_alarm_status,
    edit_alarm_status,
    get_alarm_statuses,
    remove_alarm_status,


)

from ..utils.base_test import BaseTest
import unittest




class TestAlarmStatus(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_alarm_status_created = add_alarm_status(
            client=self.client,
            name="alarm_status_1",
        )

        self.test_alarm_status_created_2 = add_alarm_status(
            client=self.client,
            name="alarm_status_2",
        )
        
    
    def test_add_alarm_status(self) -> None:
        fetched_alarm_status_created = add_alarm_status(
            client=self.client,
            name="alarm_status_3",
        )
        self.assertNotEqual(self.test_alarm_status_created, fetched_alarm_status_created)
  

    def test_edit_alarm_status(self) -> None:
        new_name = "alarm_status_edited"
        u = self.test_alarm_status_created_2
        edit_alarm_status(
            client=self.client,
            alarm_status=u,
            new_name=new_name,
        )
        self.assertNotEqual("alarm_status_2", u)
 

    def test_get_alarm_statuses(self) -> None:
        alarm_statuses_ = list(get_alarm_statuses(client=self.client))
        self.assertEqual(len(alarm_statuses_), 2)
        add_alarm_status(
            client=self.client,
            name="AlarmStatus_3"
        )
        alarm_statuses_= list(get_alarm_statuses(client=self.client))
        self.assertEqual(len(alarm_statuses_), 3)

    

    def test_delete_AlarmStatus(self) -> None:
        alarm_statuses_ = list(get_alarm_statuses(client=self.client))
        self.assertEqual(len(alarm_statuses_), 2)
        remove_alarm_status(client=self.client, id=self.test_alarm_status_created_2.id)
        alarm_statuses_ = list(get_alarm_statuses(client=self.client))
        self.assertEqual(len(alarm_statuses_), 1)
 





    
    
    

