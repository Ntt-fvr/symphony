#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json

from psym.api.kpi_category import (add_kpi_category,)
from psym.api.domain import (add_domain,)
from psym.api.kpi import (add_kpi,)
from psym.api.tech import (add_tech,)
from psym.api.network_type import (add_network_type,)
from psym.api.kpi import (add_kpi,)
from psym.api.formula import (add_formula,)
from psym.api.counter_family import (add_counter_family,)
from psym.api.vendor import (add_vendor,)
from psym.api.counter import (add_counter,)
from psym.api.counter_formula import (add_counter_formula,)

from ..utils.base_test import BaseTest
import unittest

class TestCounterFormula(BaseTest):
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
            domainId=self.test_domain_created_1.id,
            kpiCategoryId=self.test_kpi_category_created_1.id
        )

        self.test_tech_created_1 = add_tech(
            client=self.client,
            name="tech_1",
            domainId=self.test_domain_created_1.id

        )

        self.test_network_type_created_1 = add_network_type(
            client=self.client,
            name="network_type_1",
        )

        self.test_formula_created = add_formula(
            client=self.client,
            textformula="formula_1",
            status=True,
            kpiFk=self.test_Kpi_created_1.id,
            techFk=self.test_tech_created_1.id,
            networkTypeFk=self.test_network_type_created_1.id
            
        )

        self.test_counter_family_created = add_counter_family(
            client=self.client,
            name="counter_family_1",
        )

        self.test_vendor_created = add_vendor(
            client=self.client,
            name="vendor_1",
        )

        self.test_counter_created = add_counter(
            client=self.client,
            name="counter_1",
            externalID="new counter_1",
            networkManagerSystem="counter",
            counterFamilyFk=self.test_counter_family_created.id,
            vendorFk= self.test_vendor_created.id
        )
    
        self.test_counter_formula_created = add_counter_formula(
            client=self.client,
            mandatory=True,
            counter=self.test_counter_created.id,
            formula=self.test_formula_created.id

        )
    
    def test_add_counter_formula(self) -> None:
        fetched_counter_formula_created = add_counter_formula(
            client=self.client,
            mandatory=False,
            counter=self.test_counter_created.id,
            formula=self.test_formula_created.id

        )
        self.assertNotEqual(self.test_counter_formula_created, fetched_counter_formula_created)


    def test_edit_counter_formula(self) -> None:
        new_mandatory = True
        u =  self.test_counter_formula_created
        edit_counter_formula(
            client=self.client,
            CounterFormula=u,
            new_mandatory=new_mandatory,
            counter=self.test_counter_created.id,
            formula=self.test_formula_created.id
        )
        self.assertNotEqual(u.mandatory, False)
