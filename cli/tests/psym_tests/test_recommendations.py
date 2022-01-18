#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import random
import string
import time
import json

from psym.api.vendor import (add_vendor)
from psym.api.user import (add_user)
from psym.api.organization import (add_organization,)
from psym.api.recommendation_category import (add_recommendations_category)
from psym.api.recommendation_sources import (add_recommendations_sources)
from psym.api.recommendations import (add_recommendations, edit_recommendations, get_recommendations, remove_recommendations)
from psym.common.data_class import recommendations

from ..utils.base_test import BaseTest
import unittest




class TestRecommendations(BaseTest):
    @staticmethod
    def random_string(length: int = 10) -> str:
        letters = string.ascii_lowercase
        return "".join(random.choices(letters, k=length))

    def setUp(self) -> None:
        super().setUp()

        self.test_vendor_1 = add_vendor(
            client=self.client,
            name="VENDOR_1",
        )
        self.test_organization_1 = add_organization(
            client=self.client,
            name=f"{self.random_string()}",
            description=f"{self.random_string()}"
        )
        self.test_user_1 = add_user(
            client=self.client, 
            email=f"{self.random_string()}@fb.com", 
            password=f"{self.random_string()}@fb.com", 
            firstName="leon" ,
            lastName= "alvares",
            organization=self.test_organization_1.id
        )

        self.test_recommendation_sources_1 = add_recommendations_sources(
            client=self.client,
            name="recommendation_sources_1",
        )
        self.test_recommendation_category_1= add_recommendations_category(
            client=self.client,
            name="recommendation_category_1",
        )

        self.test_recommendations_1 = add_recommendations(
            client=self.client,
            externalID="externalID",
            resource="resoruce",
            alarmType="alarmType",
            LongDescription="LongDescription",
            shortDescription="shortDescription",
            command="command",
            runbook="runbook",
            priority=1,
            status=True,
            used=1,
            vendor=self.test_vendor_1.id,
            RecomendationSources= self.test_recommendation_sources_1.id,
            RecomendationsCategory=self.test_recommendation_category_1.id,
            userCreated=self.test_user_1.id,
            userApproved=self.test_user_1.id
        )

        self.test_vendor_2 = add_vendor(
            client=self.client,
            name="VENDOR_2",
        )
        self.test_organization_2 = add_organization(
            client=self.client,
            name=f"{self.random_string()}",
            description=f"{self.random_string()}"
        )
        self.test_user_2 = add_user(
            client=self.client, 
            email=f"{self.random_string()}@fb.com", 
            password=f"{self.random_string()}@fb.com", 
            firstName="leon" ,
            lastName= "alvares",
            organization=self.test_organization_2.id
        )

        self.test_recommendation_sources_2 = add_recommendations_sources(
            client=self.client,
            name="recommendation_sources_2",
        )
        self.test_recommendation_category_2= add_recommendations_category(
            client=self.client,
            name="recommendation_category_2",
        )


        self.test_vendor_4 = add_vendor(
            client=self.client,
            name="VENDOR_4",
        )
        self.test_organization_4 = add_organization(
            client=self.client,
            name=f"{self.random_string()}",
            description=f"{self.random_string()}"
        )
        self.test_user_4 = add_user(
            client=self.client, 
            email=f"{self.random_string()}@fb.com", 
            password=f"{self.random_string()}@fb.com", 
            firstName="leon" ,
            lastName= "alvares",
            organization=self.test_organization_4.id
        )

        self.test_recommendation_sources_4 = add_recommendations_sources(
            client=self.client,
            name="recommendation_sources_4",
        )
        self.test_recommendation_category_4= add_recommendations_category(
            client=self.client,
            name="recommendation_category_4",
        )

        self.test_recommendations_4 = add_recommendations(
            client=self.client,
            externalID="externalID_4",
            resource="resoruce",
            alarmType="alarmType",
            LongDescription="LongDescription",
            shortDescription="shortDescription",
            command="command",
            runbook="runbook",
            priority=1,
            status=True,
            used=1,
            vendor=self.test_vendor_4.id,
            RecomendationSources= self.test_recommendation_sources_4.id,
            RecomendationsCategory=self.test_recommendation_category_4.id,
            userCreated=self.test_user_4.id,
            userApproved=self.test_user_4.id
        )


    def test_add_recommendations(self) -> None:
        fetched_recommendatios_created = add_recommendations(
            client=self.client,
            externalID="externalID_2",
            resource="resoruce_2",
            alarmType="alarmType_2",
            LongDescription="LongDescription_2",
            shortDescription="shortDescription_2",
            command="command_2",
            runbook="runbook_2",
            priority=2,
            status=False,
            used=2,
            vendor=self.test_vendor_2.id,
            RecomendationSources= self.test_recommendation_sources_2.id,
            RecomendationsCategory=self.test_recommendation_category_2.id,
            userCreated=self.test_user_2.id,
            userApproved=self.test_user_2.id


        )
        self.assertNotEqual(self.test_recommendations_1, fetched_recommendatios_created)
  
 
 

    def test_edit_recommendations(self) -> None:
        new_externalID = "new externalID"
        u = self.test_recommendations_1
        edit_recommendations(
            client=self.client,
            recommendations=u,
            new_externalID=new_externalID,
            resource="resoruce_2",
            alarmType="alarmType_2",
            LongDescription="LongDescription_2",
            shortDescription="shortDescription_2",
            command="command_2",
            runbook="runbook_2",
            priority=2,
            status=False,
            used=2,
            vendor=self.test_vendor_2.id,
            RecomendationSources= self.test_recommendation_sources_2.id,
            RecomendationsCategory=self.test_recommendation_category_2.id,
            userApproved=self.test_user_2.id
        )
        self.assertNotEqual(2, u)
    
    def test_get_recommendations(self) -> None:
        recommendation_sourceses_ = list(get_recommendations(client=self.client))
        self.assertEqual(len(recommendation_sourceses_), 2)
        add_recommendations(
            client=self.client,
            externalID="new_externalID_3",
            resource="resoruce_2",
            alarmType="alarmType_2",
            LongDescription="LongDescription_2",
            shortDescription="shortDescription_2",
            command="command_2",
            runbook="runbook_2",
            priority=2,
            status=False,
            used=2,
            vendor=self.test_vendor_2.id,
            RecomendationSources= self.test_recommendation_sources_2.id,
            RecomendationsCategory=self.test_recommendation_category_2.id,
            userCreated=self.test_user_2.id,
            userApproved=self.test_user_2.id
        )
        recommendation_sourceses_= list(get_recommendations(client=self.client))
        self.assertEqual(len(recommendation_sourceses_), 3)

    def test_delete_recommendations(self) -> None:
        get_recommendations_ = list(get_recommendations(client=self.client))
        self.assertEqual(len(get_recommendations_), 2)
        remove_recommendations(client=self.client, id=self.test_recommendations_1.id)
        get_rule_types_ = list(get_recommendations(client=self.client))
        self.assertEqual(len(get_rule_types_), 1)