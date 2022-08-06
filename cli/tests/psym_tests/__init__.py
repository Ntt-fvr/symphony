#!/usr/bin/env python3
# Copyright (c) 2004-present Facebook All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

from typing import Optional
from unittest import TestSuite
from unittest.loader import TestLoader

from ..utils import init_cleaner, init_client, wait_for_platform
from ..utils.constant import TEST_USER_EMAIL

def load_tests(
    loader: TestLoader, tests: TestSuite, pattern: Optional[str]
) -> TestSuite:
    from .test_equipment import TestEquipment
    from .test_equipment_type import TestEquipmentType
    from .test_flow import TestFlow
    from .test_link import TestLink
    from .test_location import TestLocation
    from .test_port_type import TestEquipmentPortType
    from .test_service import TestService
    from .test_service_type import TestServiceType
    from .test_work_order import TestWorkOrder
    from .test_work_order_type import TestWorkOrderType
    from .test_site_survey import TestSiteSurvey
    from .test_work_order_subscription import TestWorkOrderSubscription
    from .test_project_type import TestProjectType
    from .test_project import TestProject
    from .test_location_type import TestLocationType
    from .test_kqi_category import TestKqiCategory
    from .test_kqi_perspective import TestKqiPerspective
    from .test_kqi_temporal_frecuency import TestKqiTemporalFrencuency
    from .test_kqi_source import TestKqiSource
    from .test_domain import TestDomain
    from .test_tech import TestTech
    from .test_vendor import TestVendor
    from .test_kpi_category import TestKpiCategory
    from .test_network_type import TestNetworkType
    from .test_counter_family import TestCounterFamily
    from .test_kpi import TestKpi
    from .test_formula import TestFormula
    from .test_counter import TestCounter
    from .test_counter_formula import TestCounterFormula
    from .test_comparator import TestComparator
    from .test_rule_type import TestRuleType
    from .test_event_severity import TestEventSeverity
    from .test_threshold import TestThreshold
    from .test_rule import TestRule
    from .test_rule_limit import TestRuleLimit
    from .test_alarm_status import TestAlarmStatus
    from .test_user import TestUser
    from .test_organization import TestOrganization
    from .test_recommendations_source import TestRecommendationsSources
    from .test_recommendations_category import TestRecommendationsCategory
    from .test_recommendations import TestRecommendations
    

    TESTS = [
        TestEquipment,
        TestEquipmentType,
        TestLink,
        TestLocation,
        TestLocationType,
        TestEquipmentPortType,
        TestService,
        TestServiceType,
        TestWorkOrder,
        TestWorkOrderType,
        TestSiteSurvey,
        TestWorkOrderSubscription,
        TestProjectType,
        TestProject,
        TestFlow,
        TestUser,
        TestKqiCategory,
        TestKqiPerspective,
        TestKqiTemporalFrencuency,
        TestKqiSource,
        TestKpiCategory,
        TestDomain,
        TestTech,
        TestNetworkType,
        TestKpi,
        TestFormula,
        TestVendor,
        TestCounterFamily,
        TestCounter,
        TestComparator,
        TestRuleType,
        TestEventSeverity,
        TestThreshold,
        TestRule,
        TestRuleLimit,
        TestAlarmStatus,
        TestOrganization,
        TestRecommendationsSources,
        TestRecommendationsCategory,
        TestRecommendations,
        TestCounterFormula,
    ]
    print("Waiting for symphony to be ready")
    wait_for_platform()
    print("Initializing client")
    client = init_client(TEST_USER_EMAIL, TEST_USER_EMAIL)
    print("Initializing cleaner")
    cleaner = init_cleaner()
    print("Packing tests")
    test_suite = TestSuite()
    for test_class in TESTS:
        testCaseNames = loader.getTestCaseNames(test_class)
        for test_case_name in testCaseNames:
            test_suite.addTest(test_class(test_case_name, client, cleaner))
    return test_suite
