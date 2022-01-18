#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.organization import (
    add_organization,
    edit_organization,
    get_organizations,
    remove_organization,
    


)

from ..utils.base_test import BaseTest
import unittest




class TestOrganization(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_organization_created = add_organization(
            client=self.client,
            name="organization_1",
            description="organization"
        )

        self.test_organization_created_2 = add_organization(
            client=self.client,
            name="organization_2",
            description="organization"
        )
        
    
    def test_add_organization(self) -> None:
        fetched_organization_created = add_organization(
            client=self.client,
            name="organization_3",
            description="organization"
        )
        self.assertNotEqual(self.test_organization_created, fetched_organization_created)
  

    def test_edit_organization(self) -> None:
        new_name = "organization_edited"
        u = self.test_organization_created_2
        edit_organization(
            client=self.client,
            organization=u,
            new_name=new_name,
            new_description="organization"
        )
        self.assertNotEqual("organization_2", u)
    
    def test_get_organizations(self) -> None:
        organizations_ = list(get_organizations(client=self.client))
        self.assertEqual(len(organizations_), 3)
        add_organization(
            client=self.client,
            name="organization_3",
            description="organization"
        )
        organizations_= list(get_organizations(client=self.client))
        self.assertEqual(len(organizations_), 4)

    

    def test_delete_organization(self) -> None:
        organizations_ = list(get_organizations(client=self.client))
        self.assertEqual(len(organizations_), 3)
        remove_organization(client=self.client, id=self.test_organization_created_2.id)
        organizations_ = list(get_organizations(client=self.client))
        self.assertEqual(len(organizations_), 2)
 




    
    
    

