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