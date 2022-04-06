---
id: psym-release-notes
title: Python API psym package Release Notes
---

<!--
***
This is template for release notes
# new version number
 Features
 Changes
 Deprecated
 Removed
 Bug fixes
***
-->

***
## 2.5.14 - release date 02.02.2022
### Bugs fixed
- Recommendations Sources:
    -`get_recommendation_sources`.

***


***
## 2.5.14 - release date 02.02.2022
### Changes
- Document category:
    -`get_document_category_by_names`.

### Features
-Add document category to a location type
***

***
## 2.3.14 - release date 04.01.2022
### Changes
- Documentation: New documentation pertaining to entities is added, in addition to notices on the entities.
### Bug fixes
***

***
## 2.3.12 - release date 23.12.2021
### Changes
- WorkOrder:
    - `add_work_order`
    - `edit_work_order`
    - `get_work_order_by_name`
- user:
    - `get_user_by_email`
    - `edit_user`
### Features
- Assurance entities
- MultiContrarctor entities
- New Documentation

### Bug fixes
***

***
## 2.2.11 - release date 18.11.2020
### Features
- counterFamily:
    - `add_counter_family`
    - `edit_counter_family`
    - `get_counter_families`
    - `remove_counter_family`
 - counterFamilyormula:
    - `add_counter_formula`
 - counter:
    - `add_counter`
    - `edit_counter`
    - `get_counters`
    - `remove_counter`
- domain:
    - `add_domain`
    - `edit_domain`
    - `get_domains`
    - `remove_domain`
- eventSeverity:
    - `add_event_severity`
    - `edit_event_severity`
    - `get_event_severities`
    - `remove_event_severity`
- formula:
    - `add_formula`
    - `edit_formula`
    - `get_formulas`
    - `remove_formula`
- kpiCategory:
    - `add_kpi_category`
    - `get_kpi_categories`
    - `delete_kpi_category`
    - `edit_kpi_category`
- kpi:
    - `add_kpi`
    - `edit_kpi`
    - `get_kpis`
    - `remove_kpi`
- kqiCategory:
    - `add_kqi_category`
    - `edit_kqi_category`
    - `delete_kqi_category`
    - `get_kqi_categories`
- kqiPerspective:
    - `add_kqi_perspective`
    - `edit_kqi_perspective`
    - `delete_kqi_perspective`
    - `get_kqi_perspectives`
- kqiSource:
    - `add_kqi_source`
    - `edit_kqi_source`
    - `delete_kqi_source`
    - `get_kqi_sources`
- kqiTemporal_frecuency:
    - `add_kqi_temporal_frecuency`
    - `edit_kqi_temporal_frecuency`
    - `delete_kqi_temporal_frecuency`
    - `get_kqi_temporal_frecuencies`    
- networkType:
    - `add_network_type`
    - `edit_network_type`
    - `get_network_types`
    - `remove_network_type`   
- recommendationCategory:
    - `add_recommendations_category`
    - `edit_recommendations_category`
    - `get_recommendations_categoryes`
    - `remove_recommendations_category`    
- recommendationSources:
    - `add_recommendations_sources`
    - `edit_recommendations_sources`
    - `get_recommendations_sourceses`
    - `remove_recommendations_sources`
- recommendations:
    - `add_recommendations` 
    - `edit_recommendations`
    - `get_recommendations`
    - `remove_recommendations`
- ruleLimit:
    - `add_rule_limit`
    - `edit_rule_limit`
    - `remove_rule_limit` 
- ruleType:
    - `add_rule_type`
    - `edit_rule_type`
    - `get_rule_types`
    - `remove_rule_type`
- rule:
    - `add_rule`   
- tech:
    - `add_tech`
    - `edit_tech`
    - `get_tech`
    - `remove_tech`
- threshold:
    - `add_threshold`
    - `edit_threshold`
    - `get_thresholds`
    - `remove_threshold`
- vendor:
    - `add_vendor`
    - `edit_vendor`
    - `get_vendors`
    - `remove_vendor`
- comparator:
    - `add_comparator`
    - `edit_comparator`
    - `get_comparators`
    - `remove_comparator`
- alarmStatus:
    - `add_alarm_status`
    - `edit_alarm_status`
    - `get_alarm_statuses`
    - `remove_alarm_status`
- organization:
    - `add_organization` 
    - `edit_organization` 
    - `get_organizations` 
    - `remove_organization`
    - `get_organization_by_name`
### Bug fixes
***

***
## 2.2.1 - release date 1.11.2020
### Changes
- Refactor to internally use https://pypi.org/project/py-gql-client/
***

***
## 2.2.0 - release date 06.10.2020
### Features
- ServiceType:
    - `get_service_types`
- LocationType:
    - `edit_location_type`
    - `add_property_types_to_location_type`
- EquipmentType:
    - `add_property_types_to_equipment_type`
- WorkOrderType:
    - `add_property_types_to_work_order_type`
- ServiceType:
    - `add_property_types_to_service_type`
### Bug fixes
***


***
## 2.1.0 - release date 24.09.2020
### Features
- Project:
    - `add_project`
    - `delete_project`
    - `edit_project`
    - `get_project_by_id`
    - `get_projects`
- ProjectType:
    - `add_project_type`
    - `delete_project_type`
    - `edit_project_type`
    - `get_project_type_by_id`
    - `get_project_types`
- PortType:
    - `get_equipment_port_types`
- LocationType:
    - `delete_location_type`
    - `get_location_type_by_id`
    - `get_location_types`
- EquipmentType:
    - `delete_equipment_type`
    - `get_equipment_type_by_id`
    - `get_equipment_types`
### Bug fixes
***


***
## 2.0.0 - release date 13.09.2020
### Features
- WorkOrder:
    - `add_work_order`
    - `delete_work_order`
    - `edit_work_order`
    - `get_work_order_by_id`
    - `get_work_orders`
### Bug fixes
### Breaking Changes
- `EquipmentPortDefinition` has new attributes: `visible_label` and `port_type_name`
***


***
## 1.0.0 - release date 30.08.2020
### Features
- WorkOrderType:
    - `get_work_order_type_by_name`
    - `get_work_order_type_by_id`
    - `get_work_order_types`
    - `add_work_order_type`
    - `delete_work_order_type`
### Bug fixes
### Breaking Changes
- `InventoryClient` -> `PsymClient`
- `from pysymphony import SymphonyClient` -> `from psym.client import SymphonyClient`
***
