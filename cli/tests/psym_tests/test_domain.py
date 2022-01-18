#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.domain import (
    add_domain,
    edit_domain,
    get_domains,
    remove_domain,
    


)

from ..utils.base_test import BaseTest
import unittest




class TestDomain(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_domain_created = add_domain(
            client=self.client,
            name="domain_1",
        )

        self.test_domain_created_2 = add_domain(
            client=self.client,
            name="domain_2",
        )
        
    
    def test_add_domain(self) -> None:
        fetched_domain_created = add_domain(
            client=self.client,
            name="domain_3",
        )
        self.assertNotEqual(self.test_domain_created, fetched_domain_created)
  

    def test_edit_domain(self) -> None:
        new_name = "domain_edited"
        u = self.test_domain_created_2
        edit_domain(
            client=self.client,
            domain=u,
            new_name=new_name,
        )
        self.assertNotEqual("domain_2", u)
    
    def test_get_domains(self) -> None:
        domains_ = list(get_domains(client=self.client))
        self.assertEqual(len(domains_), 2)
        add_domain(
            client=self.client,
            name="domain_3"
        )
        domains_= list(get_domains(client=self.client))
        self.assertEqual(len(domains_), 3)

    

    def test_delete_domain(self) -> None:
        domains_ = list(get_domains(client=self.client))
        self.assertEqual(len(domains_), 2)
        remove_domain(client=self.client, id=self.test_domain_created_2.id)
        domains_ = list(get_domains(client=self.client))
        self.assertEqual(len(domains_), 1)
 




    
    
    

