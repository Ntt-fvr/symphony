#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json


from psym.api.kpi_category import (
    add_kpi_category,
)

from psym.api.domain import (
    add_domain,

)
from psym.api.kpi import (
    add_kpi,
)

from psym.api.threshold import (
    add_threshold,
    edit_threshold,
    get_thresholds,
    remove_threshold,
)

from ..utils.base_test import BaseTest
import unittest




class TestThreshold(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_kpi_category_created = add_kpi_category(
            client=self.client,
            name="kpi_category_1",
        )
        self.test_domain_created = add_domain(
            client=self.client,
            name="domain_1",
        )
        self.test_Kpi_created = add_kpi(
            client=self.client,
            name="Kpi_1",
            description="new kpi_1",
            status=True,
            domain=self.test_domain_created.id,
            kpiCategory=self.test_kpi_category_created.id
        )
        self.test_threshold_created = add_threshold(
            client=self.client,
            name="threshold_1",
            description="threshold",
            status=True,
            kpi=self.test_Kpi_created.id

        )

        self.test_kpi_category_created_2 = add_kpi_category(
            client=self.client,
            name="kpi_category_2",
        )
        self.test_domain_created_2 = add_domain(
            client=self.client,
            name="domain_2",
        )
        self.test_Kpi_created_2 = add_kpi(
            client=self.client,
            name="Kpi_2",
            description="new kpi_2",
            status=True,
            domain=self.test_domain_created_2.id,
            kpiCategory=self.test_kpi_category_created_2.id
        )


        self.test_kpi_category_created_3 = add_kpi_category(
            client=self.client,
            name="kpi_category_3",
        )
        self.test_domain_created_3 = add_domain(
            client=self.client,
            name="domain_3",
        )
        self.test_Kpi_created_3 = add_kpi(
            client=self.client,
            name="Kpi_3",
            description="new kpi_3",
            status=True,
            domain=self.test_domain_created_3.id,
            kpiCategory=self.test_kpi_category_created_3.id
        )
        self.test_threshold_created_3 = add_threshold(
            client=self.client,
            name="threshold_3",
            description="threshold",
            status=True,
            kpi=self.test_Kpi_created_3.id

        )

        self.test_kpi_category_created_4 = add_kpi_category(
            client=self.client,
            name="kpi_category_4",
        )
        self.test_domain_created_4 = add_domain(
            client=self.client,
            name="domain_4",
        )
        self.test_Kpi_created_4 = add_kpi(
            client=self.client,
            name="Kpi_4",
            description="new kpi_4",
            status=True,
            domain=self.test_domain_created_4.id,
            kpiCategory=self.test_kpi_category_created_4.id
        )





    def test_add_threshold(self) -> None:
        fetched_threshold_created = add_threshold(
            client=self.client,
            name="threshold_2",
            description="threshold",
            status=True,
            kpi=self.test_Kpi_created_2.id
        )
        self.assertNotEqual(self.test_threshold_created, fetched_threshold_created)


    def test_edit_threshold(self) -> None:
        new_name = "threshold_edited"
        u = self.test_threshold_created_3
        edit_threshold(
            client=self.client,
            threshold=u,
            new_name=new_name,
            description="threshold",
            status=True
        )
        self.assertNotEqual("threshold_3", u)
    
    def test_get_thresholds(self) -> None:
        thresholds = list(get_thresholds(client=self.client))
        self.assertEqual(len(thresholds), 2)
        add_threshold(
            client=self.client,
            name="threshold_4",
            description="threshold",
            status=True,
            kpi=self.test_Kpi_created_4.id
        )
        thresholds= list(get_thresholds(client=self.client))
        self.assertEqual(len(thresholds), 3)

    def test_delete_threshold(self) -> None:
        thresholds = list(get_thresholds(client=self.client))
        self.assertEqual(len(thresholds), 2)
        remove_threshold(client=self.client, id=self.test_threshold_created_3.id)
        thresholds = list(get_thresholds(client=self.client))
        self.assertEqual(len(thresholds), 1)
 