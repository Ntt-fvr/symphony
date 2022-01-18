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
    edit_kpi,
    get_kpis,
    remove_kpi,
)

from ..utils.base_test import BaseTest
import unittest




class TestKpi(BaseTest):
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

        self.test_Kpi_created_2 = add_kpi(
            client=self.client,
            name="Kpi_2",
            description="new kpi_2",
            status=True,
            domain=self.test_domain_created.id,
            kpiCategory=self.test_kpi_category_created.id
        )
        
    
    def test_add_Kpi(self) -> None:
        fetched_Kpi_created = add_kpi(
            client=self.client,
            name="Kpi_3",
            description="new kpi_3",
            status=True,
            domain=self.test_domain_created.id,
            kpiCategory=self.test_kpi_category_created.id


        )
        self.assertNotEqual(self.test_Kpi_created, fetched_Kpi_created)
  
 

    def test_edit_kpi(self) -> None:
        new_name = "kpi_edited"
        u = self.test_Kpi_created_2
        edit_kpi(
            client=self.client,
            KPI=u,
            new_name=new_name,
            description="new kpi_edited",
            status=True,
            domain=self.test_domain_created.id,
            kpiCategory=self.test_kpi_category_created.id
        )
        self.assertNotEqual("Kpi_2", u)
    
    def test_get_kpis(self) -> None:
        kpis = list(get_kpis(client=self.client))
        self.assertEqual(len(kpis), 2)
        add_kpi(
            client=self.client,
            name="Kpi_3",
            description="kpi_3",
            status=True,
            domain=self.test_domain_created.id,
            kpiCategory=self.test_kpi_category_created.id
        )
        kpis= list(get_kpis(client=self.client))
        self.assertEqual(len(kpis), 3)

    

    def test_delete_kpi(self) -> None:
        kpis = list(get_kpis(client=self.client))
        self.assertEqual(len(kpis), 2)
        remove_kpi(client=self.client, id=self.test_Kpi_created_2.id)
        kpis = list(get_kpis(client=self.client))
        self.assertEqual(len(kpis), 1)
 





    
    
    

