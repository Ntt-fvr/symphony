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

from psym.api.tech import (
    add_tech,
)


from psym.api.network_type import (
    add_network_type,
)
from psym.api.formula import (
    add_formula,
    edit_formula,
    get_formulas,
    remove_formula,
)


from ..utils.base_test import BaseTest
import unittest



    
class TestFormula(BaseTest):
    def setUp(self) -> None:
        super().setUp()

        self.test_kpi_category_created_1 = add_kpi_category(
            client=self.client,
            name="kpi_category_1",
        )

        self.test_domain_created_1 = add_domain(
            client=self.client,
            name="domain_1",
        )

        self.test_Kpi_created_1 = add_kpi(
            client=self.client,
            name="Kpi_1",
            description="new kpi_1",
            status=True,
            domain=self.test_domain_created_1.id,
            kpiCategory=self.test_kpi_category_created_1.id
        )

        self.test_tech_created_1 = add_tech(
            client=self.client,
            name="tech_1",
            domain=self.test_domain_created_1.id

        )

        self.test_network_type_created_1 = add_network_type(
            client=self.client,
            name="network_type_1",
        )

        self.test_formula_created = add_formula(
            client=self.client,
            textFormula="formula_1",
            status=True,
            kpi=self.test_Kpi_created_1.id,
            tech=self.test_tech_created_1.id,
            networkType=self.test_network_type_created_1.id
            
        )

    def test_add_formula(self) -> None:
        fetched_formula_created = add_formula(
            client=self.client,
            textFormula="formula_2",
            status=True,
            kpi=self.test_Kpi_created_1.id,
            tech=self.test_tech_created_1.id,
            networkType=self.test_network_type_created_1.id


        )
        self.assertNotEqual(self.test_formula_created, fetched_formula_created)
  
 
    def test_edit_formula(self) -> None:
        new_name = "formula_edited"
        u = self.test_formula_created
        edit_formula(
            client=self.client,
            formula=u,
            new_name=new_name,
            status=True,
            kpi=self.test_Kpi_created_1.id,
            tech=self.test_tech_created_1.id,
            networkType=self.test_network_type_created_1.id
        )
        self.assertNotEqual("formula_1", u)
    
    def test_get_formulas(self) -> None:
        formulas_ = list(get_formulas(client=self.client))
        self.assertEqual(len(formulas_), 1)
        add_formula(
            client=self.client,
            textFormula="formula_3",
            status=True,
            kpi=self.test_Kpi_created_1.id,
            tech=self.test_tech_created_1.id,
            networkType=self.test_network_type_created_1.id
        )
        formulas_= list(get_formulas(client=self.client))
        self.assertEqual(len(formulas_), 2)
    
    def test_delete_formula(self) -> None:
        formulas_ = list(get_formulas(client=self.client))
        self.assertEqual(len(formulas_), 1)
        remove_formula(client=self.client, id=self.test_formula_created.id)
        formulas_= list(get_formulas(client=self.client))
        self.assertEqual(len(formulas_), 0)
 


