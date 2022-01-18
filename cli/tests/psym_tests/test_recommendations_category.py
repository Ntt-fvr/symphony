#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.recommendation_category import (
    add_recommendations_category,
    edit_recommendations_category,
    get_recommendations_categoryes,
    remove_recommendations_category,
)

from ..utils.base_test import BaseTest
import unittest




class TestRecommendationsCategory(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_recommendation_category_created = add_recommendations_category(
            client=self.client,
            name="recommendation_category_1",
        )

        self.test_recommendation_category_created_2 = add_recommendations_category(
            client=self.client,
            name="recommendation_category_2",
        )
        
    
    def test_add_recommendation_category(self) -> None:
        fetched_recommendation_category_created = add_recommendations_category(
            client=self.client,
            name="recommendation_category_3",
        )
        self.assertNotEqual(self.test_recommendation_category_created, fetched_recommendation_category_created)
  

    def test_edit_recommendation_category(self) -> None:
        new_name = "recommendation_category_edited"
        u = self.test_recommendation_category_created_2
        edit_recommendations_category(
            client=self.client,
            recommendation_category=u,
            new_name=new_name,
        )
        self.assertNotEqual("recommendation_category_2", u)
 

    def test_get_recommendation_categoryes(self) -> None:
        recommendation_categoryes_ = list(get_recommendations_categoryes(client=self.client))
        self.assertEqual(len(recommendation_categoryes_), 2)
        add_recommendations_category(
            client=self.client,
            name="RecommendationsCategory_3"
        )
        recommendation_categoryes_= list(get_recommendations_categoryes(client=self.client))
        self.assertEqual(len(recommendation_categoryes_), 3)

    

    def test_delete_RecommendationsCategory(self) -> None:
        recommendation_categoryes_ = list(get_recommendations_categoryes(client=self.client))
        self.assertEqual(len(recommendation_categoryes_), 2)
        remove_recommendations_category(client=self.client, id=self.test_recommendation_category_created_2.id)
        recommendation_categoryes_ = list(get_recommendations_categoryes(client=self.client))
        self.assertEqual(len(recommendation_categoryes_), 1)
 




    

