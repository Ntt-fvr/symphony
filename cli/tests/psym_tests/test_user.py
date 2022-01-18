#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

import random
import string
from unittest import skip

import time


from psym import UserDeactivatedException
from psym.api.user import (
    activate_user,
    add_user,
    deactivate_user,
    edit_user,
    edit_user_for_password_and_role,
    get_active_users,
    get_user_by_email,
)

from psym.api.organization import (
    add_organization,
)
from psym.common.data_class import organization
from psym.graphql.enum.user_role import UserRole
from psym.graphql.enum.user_status import UserStatus

from ..utils import init_client
from ..utils.base_test import BaseTest


class TestUser(BaseTest):
    @staticmethod
    def random_string(length: int = 10) -> str:
        letters = string.ascii_lowercase
        return "".join(random.choices(letters, k=length))

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
        user_name = f"{self.random_string()}@fb.com"
        self.user = add_user(
            client=self.client, 
            email=user_name, 
            password=user_name, 
            firstName="leon" ,
            lastName= "alvares",
            organization=self.test_organization_created.id,

        )

    def test_user_created(self) -> None:
        user_name = f"{self.random_string()}@fb.com"
        u = add_user(client=self.client, 
        email=user_name, 
        password=user_name, 
        firstName="leon" ,
        lastName= "alvares",
        organization=self.test_organization_created.id,

        )
        self.assertEqual(user_name, u.email)
        self.assertEqual(UserStatus.ACTIVE, u.status)
        active_users = get_active_users(client=self.client)
        self.assertEqual(3, len(active_users))
        client2 = init_client(email=user_name, password=user_name)
        active_users = get_active_users(client=client2)
        self.assertEqual(3, len(active_users))

    def test_user_edited(self) -> None:
        user_name = f"{self.random_string()}@fb.com"
        new_password = self.random_string()
        u = add_user(client=self.client, 
        email=user_name, password=user_name,        
        firstName="leon" ,
        lastName= "alvares", 
        organization=self.test_organization_created.id)
        edit_user_for_password_and_role(
            client=self.client,
            user=u,
            new_password=new_password,
            new_role=UserRole.OWNER,
        )
        client2 = init_client(email=user_name, password=new_password)
        active_users = get_active_users(client=client2)
        self.assertEqual(3, len(active_users))
        self.assertNotEqual(u.organization, self.test_organization_created)

    def test_user_deactivated(self) -> None:
        user_name = f"{self.random_string()}@fb.com"
        organizationFk=self.test_organization_created
        u = add_user(client=self.client, 
        email=user_name, 
        password=user_name,
        firstName="leon" ,
        lastName= "alvares",  
        organization=organizationFk)
        deactivate_user(client=self.client, user=u)
        active_users = get_active_users(client=self.client)
        self.assertEqual(2, len(active_users))
        with self.assertRaises(UserDeactivatedException):
            init_client(email=user_name, password=user_name)

    def test_user_reactivated(self) -> None:
        user_name = f"{self.random_string()}@fb.com"
        organizationFk=self.test_organization_created
        u = add_user(client=self.client, 
        email=user_name, 
        password=user_name,  
        firstName="leon" ,
        lastName= "alvares",
        organization=organizationFk)
        deactivate_user(client=self.client, user=u)
        activate_user(client=self.client, user=u)
        active_users = get_active_users(client=self.client)
        self.assertEqual(3, len(active_users))


    def test_get_user_by_email(self) -> None:
        fetched_user_email = get_user_by_email(
            client=self.client, email=self.user.email
        )
        self.assertEqual(self.user.email, fetched_user_email.email)
