#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json


from psym.api.domain import (
    add_domain,
)

from psym.api.tech import (
    add_tech,
    edit_tech,
    get_tech,
    remove_tech,
)

from ..utils.base_test import BaseTest
import unittest




class TestTech(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_domain_created = add_domain(
            client=self.client,
            name="domain_1",
        )

        self.test_tech_created = add_tech(
            client=self.client,
            name="tech_1",
            domain=self.test_domain_created.id

        )

        self.test_tech_created_2 = add_tech(
            client=self.client,
            name="tech_2",
            domain=self.test_domain_created.id

        )
        
    def test_add_tech(self) -> None:
        fetched_tech_created = add_tech(
            client=self.client,
            name="tech_3",
            domain=self.test_domain_created.id
        )
        self.assertNotEqual(self.test_tech_created, fetched_tech_created)
    
    
    def test_edit_tech(self) -> None:
        new_name = "tech_edited"
        u = self.test_tech_created_2
        edit_tech(
            client=self.client,
            tech=u,
            new_name=new_name,
            domain=self.test_domain_created.id
        )
        self.assertNotEqual("tech_2", u)

    def test_get_techs(self) -> None:
        techs = list(get_tech(client=self.client))
        self.assertEqual(len(techs), 2)
        add_tech(
            client=self.client,
            name="tech_3",
            domain=self.test_domain_created.id
        )
        techs= list(get_tech(client=self.client))
        self.assertEqual(len(techs), 3)

    

    def test_delete_tech(self) -> None:
        techs = list(get_tech(client=self.client))
        self.assertEqual(len(techs), 2)
        remove_tech(client=self.client, id=self.test_tech_created_2.id)
        techs = list(get_tech(client=self.client))
        self.assertEqual(len(techs), 1)
 


