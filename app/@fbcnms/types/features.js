/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

export type FeatureID =
  | 'lte_network_metrics'
  | 'sso_example_feature'
  | 'audit_log_example_feature'
  | 'audit_log_view'
  | 'third_party_devices'
  | 'network_topology'
  | 'alerts'
  | 'alert_receivers'
  | 'alert_routes'
  | 'alert_suppressions'
  | 'equipment_export'
  | 'file_categories'
  | 'floor_plans'
  | 'grafana_metrics'
  | 'work_order_map'
  | 'documents_site'
  | 'coverage_maps'
  | 'logs'
  | 'services'
  | 'planned_equipment'
  | 'multi_subject_reports'
  | 'equipment_live_status'
  | 'logged_out_alert'
  | 'deprecated_imports'
  | 'external_id'
  | 'checklistcategories'
  | 'saved_searches'
  | 'user_management_dev'
  | 'dashboard_v2'
  | 'work_order_activities_display'
  | 'mandatory_properties_on_work_order_close'
  | 'add_port_to_service'
  | 'execute_automation_flows'
  | 'projects_bulk_upload'
  | 'enable_backplane_connections'
  | 'projects_column_selector'
  | 'enable_resource_catalog_&_relationships'
  | 'multicontractor'
  | 'scheduling_filter_dates'
  | 'property_combo'
  | 'equipment_&_ports_module'
  | 'resource_inventory'
  | 'resource_port_management'
    'search_inventory'
  ;
