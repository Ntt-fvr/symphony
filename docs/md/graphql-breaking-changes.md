---
id: graphql-breaking-changes
title: Graphql API Breaking Changes
---

[//]: <> (@generated This file was created by cli/extract_graphql_deprecations.pydo not change it manually)

## Deprecated Queries
* `equipmentSearch` - Use `equipments` instead. Will be removed on 2020-09-01
* `workOrderSearch` - Use `workOrders` instead. Will be removed on 2020-09-01
* `linkSearch` - Use `links` instead. Will be removed on 2020-09-01
* `portSearch` - Use `equipmentPorts` instead. Will be removed on 2020-09-01
* `locationSearch` - Use `locations` instead. Will be removed on 2020-09-01
* `projectSearch` - Use `projects` instead. Will be removed on 2020-09-01
* `customerSearch` - Use `customers` instead. Will be removed on 2020-09-01
* `serviceSearch` - Use `services` instead. Will be removed on 2020-09-01
* `userSearch` - Use `users` instead. Will be removed on 2020-09-01
* `permissionsPolicySearch` - Use `permissionsPolicies` instead. Will be removed on 2020-09-01
* `usersGroupSearch` - Use `usersGroups` instead. Will be removed on 2020-09-01

## Deprecated Mutations


## Deprecated Fields
* `PermissionSettings.canWrite` - Use specific policy in `adminPolicy`, `inventoryPolicy` or `workforcePolicy` instead. Will be removed on 2020-09-01

## Deprecated Input Fields
* `TechnicianWorkOrderUploadInput.checklist` - Use `TechnicianWorkOrderUploadInput.checkListCategories` instead. Will be removed on 2020-09-01. You cannot use `TechnicianWorkOrderUploadInput.checklist` and `TechnicianWorkOrderUploadInput.checkListCategories` together

## Deprecated Enums
* `WorkOrderStatus.PENDING` - Use new status `IN_PROGRESS` instead. Will be removed on 2020-11-01
* `WorkOrderStatus.DONE` - Use new status `CLOSED`, `SUBMITTED` or `BLOCKED` instead. Will be removed on 2020-11-01

