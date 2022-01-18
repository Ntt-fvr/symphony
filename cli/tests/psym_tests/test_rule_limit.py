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
from psym.api.rule import (add_rule,)
from psym.api.comparator import (add_comparator,)
from psym.api.rule_limit import (
    add_rule_limit,
    edit_rule_limit,
    remove_rule_limit,)
from ..utils.base_test import BaseTest
import unittest


class TestRuleLimit(BaseTest):
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

        self.test_rule_1 = add_rule(
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

        self.test_comparator_1 = add_comparator(
            client=self.client,
            name="comparator_1",
        )
        self.test_rule_limit_1 = add_rule_limit(
            client=self.client,
            number=2,
            limitType="none",
            comparator=self.test_comparator_1.id,
            rule=self.test_rule_1.id
        )

        self.test_kpi_category_2 = add_kpi_category(
            client=self.client,
            name="kpi_category_2",
        )
        self.test_domain_2 = add_domain(
            client=self.client,
            name="domain_2",
        )
        self.test_Kpi_2 = add_kpi(
            client=self.client,
            name="Kpi_2",
            description="new kpi_2",
            status=True,
            domain=self.test_domain_2.id,
            kpiCategory=self.test_kpi_category_2.id
        )
        self.test_threshold_2 = add_threshold(
            client=self.client,
            name="threshold_2",
            description="threshold",
            status=True,
            kpi=self.test_Kpi_2.id
        )
        self.test_rule_type_2 = add_rule_type(
            client=self.client,
            name="rule_type_2",
        )
        self.test_event_severity_2 = add_event_severity(
            client=self.client,
            name="event_severity_2",
        )

        self.test_rule_2 = add_rule(
            client=self.client,
            name="rule_2",
            additionalInfo="none",
            eventTypeName="none",
            gracePeriod=2,
            specificProblem="none",
            status=True,
            threshold=self.test_threshold_2.id,
            ruleType=self.test_rule_type_2.id,
            eventSeverity=self.test_event_severity_2.id,
        )

        self.test_comparator_2 = add_comparator(
            client=self.client,
            name="comparator_2",
            )






    def test_add_rule_limit(self) -> None:
        fetched_rule_limit_created = add_rule_limit(
            client=self.client,
            number=2,
            limitType="none",
            comparator=self.test_comparator_2.id,
            rule=self.test_rule_2.id


        )
        self.assertNotEqual(self.test_rule_limit_1, fetched_rule_limit_created)

    def test_edit_rule_limit(self) -> None:
        new_number = 3
        u = self.test_rule_limit_1
        edit_rule_limit(
            client=self.client,
            rule_limit=u,
            new_number=new_number,
            limitType="none",
            comparator=self.test_comparator_1.id,
            rule=self.test_rule_1.id
        )
        self.assertNotEqual(2, u)

