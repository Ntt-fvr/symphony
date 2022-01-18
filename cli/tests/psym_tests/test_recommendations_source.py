#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.recommendation_sources import (
    add_recommendations_sources,
    edit_recommendations_sources,
    get_recommendations_sourceses,
    remove_recommendations_sources,
)

from ..utils.base_test import BaseTest
import unittest




class TestRecommendationsSources(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_recommendation_sources_created = add_recommendations_sources(
            client=self.client,
            name="recommendation_sources_1",
        )

        self.test_recommendation_sources_created_2 = add_recommendations_sources(
            client=self.client,
            name="recommendation_sources_2",
        )
        
    
    def test_add_recommendation_sources(self) -> None:
        fetched_recommendation_sources_created = add_recommendations_sources(
            client=self.client,
            name="recommendation_sources_3",
        )
        self.assertNotEqual(self.test_recommendation_sources_created, fetched_recommendation_sources_created)
  

    def test_edit_recommendation_sources(self) -> None:
        new_name = "recommendation_sources_edited"
        u = self.test_recommendation_sources_created_2
        edit_recommendations_sources(
            client=self.client,
            recommendation_sources=u,
            new_name=new_name,
        )
        self.assertNotEqual("recommendation_sources_2", u)
 

    def test_get_recommendation_sourceses(self) -> None:
        recommendation_sourceses_ = list(get_recommendations_sourceses(client=self.client))
        self.assertEqual(len(recommendation_sourceses_), 2)
        add_recommendations_sources(
            client=self.client,
            name="RecommendationsSources_3"
        )
        recommendation_sourceses_= list(get_recommendations_sourceses(client=self.client))
        self.assertEqual(len(recommendation_sourceses_), 3)

    

    def test_delete_RecommendationsSources(self) -> None:
        recommendation_sourceses_ = list(get_recommendations_sourceses(client=self.client))
        self.assertEqual(len(recommendation_sourceses_), 2)
        remove_recommendations_sources(client=self.client, id=self.test_recommendation_sources_created_2.id)
        recommendation_sourceses_ = list(get_recommendations_sourceses(client=self.client))
        self.assertEqual(len(recommendation_sourceses_), 1)
 




    

