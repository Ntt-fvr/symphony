#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.
import time
import json


from psym.api.kpi_category import (add_kpi_category,)
from psym.api.domain import (add_domain,)
from psym.api.kpi import (add_kpi,)
from psym.api.threshold import (add_threshold,)
from psym.api.rule_type import (add_rule_type,)
from psym.api.event_severity import (add_event_severity,)
from psym.api.rule import (
    add_rule,
    )
from ..utils.base_test import BaseTest
import unittest


class TestRule(BaseTest):
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
        self.test_rule_type_created = add_rule_type(
            client=self.client,
            name="rule_type_1",
        )
        self.test_event_severity_created = add_event_severity(
            client=self.client,
            name="event_severity_1",
        )

        self.test_rule_created = add_rule(
            client=self.client,
            name="rule_1",
            additionalInfo="none",
            eventTypeName="none",
            gracePeriod=2,
            specificProblem="none",
            status=True,
            threshold=self.test_threshold_created.id,
            ruleType=self.test_rule_type_created.id,
            eventSeverity=self.test_event_severity_created.id,
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
        self.test_threshold_created_2 = add_threshold(
            client=self.client,
            name="threshold_2",
            description="threshold",
            status=True,
            kpi=self.test_Kpi_created_2.id
        )
        self.test_rule_type_created_2 = add_rule_type(
            client=self.client,
            name="rule_type_2",
        )
        self.test_event_severity_created_2 = add_event_severity(
            client=self.client,
            name="event_severity_2",
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
        self.test_rule_type_created_3 = add_rule_type(
            client=self.client,
            name="rule_type_3",
        )
        self.test_event_severity_created_3 = add_event_severity(
            client=self.client,
            name="event_severity_3",
        )
        self.test_rule_created_2 = add_rule(
            client=self.client,
            name="rule_3",
            additionalInfo="none",
            eventTypeName="none",
            gracePeriod=2,
            specificProblem="none",
            status=True,
            threshold=self.test_threshold_created_3.id,
            ruleType=self.test_rule_type_created_3.id,
            eventSeverity=self.test_event_severity_created_3.id,
        )




    def test_add_rule(self) -> None:
        fetched_rule_created = add_rule(
            client=self.client,
            name="rule_2",
            additionalInfo="none",
            eventTypeName="none",
            gracePeriod=4,
            specificProblem="none",
            status=False,
            threshold=self.test_threshold_created_2.id,
            ruleType=self.test_rule_type_created_2.id,
            eventSeverity=self.test_event_severity_created_2.id,


        )
        self.assertNotEqual(self.test_rule_created, fetched_rule_created)

