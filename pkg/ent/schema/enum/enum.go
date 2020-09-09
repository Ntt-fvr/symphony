// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package enum

import (
	"errors"
	"fmt"
	"io"
	"strconv"

	"github.com/facebook/ent/schema/field"
)

// Getter is the interface to get the value stored in an enum.
type Getter interface {
	fmt.Stringer
}

// Setter is the interface for set the value stored in an enum.
type Setter interface {
	field.EnumValues
	Set(string)
}

// MarshalGQL implements graphql marshaling for enum getters.
func MarshalGQL(w io.Writer, e Getter) error {
	_, err := io.WriteString(w, strconv.Quote(e.String()))
	return err
}

// UnmarshalGQL implements graphql unmarshalling for enum setters.
func UnmarshalGQL(v interface{}, e Setter) error {
	str, ok := v.(string)
	if !ok {
		return errors.New("enums must be strings")
	}
	for _, v := range e.Values() {
		if v == str {
			e.Set(str)
			return nil
		}
	}
	return fmt.Errorf("%s is not a valid %T", str, e)
}

// CheckListItemType is a type of a check list item.
type CheckListItemType string

// Possible check list item type values.
const (
	CheckListItemTypeSimple   CheckListItemType = "simple"
	CheckListItemTypeString   CheckListItemType = "string"
	CheckListItemTypeEnum     CheckListItemType = "enum"
	CheckListItemTypeFiles    CheckListItemType = "files"
	CheckListItemTypeYesNo    CheckListItemType = "yes_no"
	CheckListItemTypeCellScan CheckListItemType = "cell_scan"
	CheckListItemTypeWifiScan CheckListItemType = "wifi_scan"
)

// Values returns check list item type possible values.
func (CheckListItemType) Values() []string {
	return []string{
		CheckListItemTypeSimple.String(),
		CheckListItemTypeString.String(),
		CheckListItemTypeEnum.String(),
		CheckListItemTypeFiles.String(),
		CheckListItemTypeYesNo.String(),
		CheckListItemTypeCellScan.String(),
		CheckListItemTypeWifiScan.String(),
	}
}

// String implements Getter interface.
func (c CheckListItemType) String() string {
	return string(c)
}

// Set sets the value stored in check list item type.
func (c *CheckListItemType) Set(s string) {
	*c = CheckListItemType(s)
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (c *CheckListItemType) UnmarshalGQL(v interface{}) error {
	return UnmarshalGQL(v, c)
}

// MarshalGQL implements graphql.Marshaler interface.
func (c CheckListItemType) MarshalGQL(w io.Writer) {
	_ = MarshalGQL(w, c)
}

// CheckListItemEnumSelectionMode is a type of a check list item selection mode.
type CheckListItemEnumSelectionMode string

// Possible check list item selection mode values.
const (
	CheckListItemEnumSelectionModeMultiple CheckListItemEnumSelectionMode = "multiple"
	CheckListItemEnumSelectionModeSingle   CheckListItemEnumSelectionMode = "single"
)

// Values returns check list item selection mode possible values.
func (CheckListItemEnumSelectionMode) Values() []string {
	return []string{
		CheckListItemEnumSelectionModeMultiple.String(),
		CheckListItemEnumSelectionModeSingle.String(),
	}
}

// String implements Getter interface.
func (m CheckListItemEnumSelectionMode) String() string {
	return string(m)
}

// Set sets the value stored in check list item type.
func (m *CheckListItemEnumSelectionMode) Set(s string) {
	*m = CheckListItemEnumSelectionMode(s)
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (m *CheckListItemEnumSelectionMode) UnmarshalGQL(v interface{}) error {
	return UnmarshalGQL(v, m)
}

// MarshalGQL implements graphql.Marshaler interface.
func (m CheckListItemEnumSelectionMode) MarshalGQL(w io.Writer) {
	_ = MarshalGQL(w, m)
}

// FutureState of an equipment.
type FutureState string

const (
	// FutureStateInstall means an equipment is to be installed.
	FutureStateInstall FutureState = "INSTALL"
	// FutureStateRemove means an equipment is to be removed.
	FutureStateRemove FutureState = "REMOVE"
)

// Values returns future state possible values.
func (FutureState) Values() []string {
	return []string{
		FutureStateInstall.String(),
		FutureStateRemove.String(),
	}
}

// String implements Getter interface.
func (fs FutureState) String() string {
	return string(fs)
}

// Set sets the value stored in future state.
func (fs *FutureState) Set(s string) {
	*fs = FutureState(s)
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (fs *FutureState) UnmarshalGQL(v interface{}) error {
	return UnmarshalGQL(v, fs)
}

// MarshalGQL implements graphql.Marshaler interface.
func (fs FutureState) MarshalGQL(w io.Writer) {
	_ = MarshalGQL(w, fs)
}

// LocationFilterType specifies what filters should we apply on locations
type LocationFilterType string

const (
	LocationFilterTypeLocationInst             LocationFilterType = "LOCATION_INST"
	LocationFilterTypeLocationInstName         LocationFilterType = "LOCATION_INST_NAME"
	LocationFilterTypeLocationInstExternalID   LocationFilterType = "LOCATION_INST_EXTERNAL_ID"
	LocationFilterTypeLocationType             LocationFilterType = "LOCATION_TYPE"
	LocationFilterTypeLocationInstHasEquipment LocationFilterType = "LOCATION_INST_HAS_EQUIPMENT"
	LocationFilterTypeProperty                 LocationFilterType = "PROPERTY"
)

func (l LocationFilterType) IsValid() bool {
	switch l {
	case LocationFilterTypeLocationInst, LocationFilterTypeLocationInstName, LocationFilterTypeLocationInstExternalID, LocationFilterTypeLocationType, LocationFilterTypeLocationInstHasEquipment, LocationFilterTypeProperty:
		return true
	}
	return false
}

// String implements Getter interface.
func (l LocationFilterType) String() string {
	return string(l)
}

// EquipmentFilterType specifies what filters should we apply on equipments
type EquipmentFilterType string

const (
	EquipmentFilterTypeEquipInstName          EquipmentFilterType = "EQUIP_INST_NAME"
	EquipmentFilterTypeEquipInstExternalID    EquipmentFilterType = "EQUIP_INST_EXTERNAL_ID"
	EquipmentFilterTypeProperty               EquipmentFilterType = "PROPERTY"
	EquipmentFilterTypeLocationInst           EquipmentFilterType = "LOCATION_INST"
	EquipmentFilterTypeLocationInstExternalID EquipmentFilterType = "LOCATION_INST_EXTERNAL_ID"
	EquipmentFilterTypeEquipmentType          EquipmentFilterType = "EQUIPMENT_TYPE"
)

func (e EquipmentFilterType) IsValid() bool {
	switch e {
	case EquipmentFilterTypeEquipInstName, EquipmentFilterTypeEquipInstExternalID, EquipmentFilterTypeProperty, EquipmentFilterTypeLocationInst, EquipmentFilterTypeLocationInstExternalID, EquipmentFilterTypeEquipmentType:
		return true
	}
	return false
}

// String implements Getter interface.
func (e EquipmentFilterType) String() string {
	return string(e)
}

// FilterOperator is filter operator for the search
type FilterOperator string

const (
	FilterOperatorIs                     FilterOperator = "IS"
	FilterOperatorContains               FilterOperator = "CONTAINS"
	FilterOperatorIsOneOf                FilterOperator = "IS_ONE_OF"
	FilterOperatorIsNotOneOf             FilterOperator = "IS_NOT_ONE_OF"
	FilterOperatorDateGreaterThan        FilterOperator = "DATE_GREATER_THAN"
	FilterOperatorDateLessThan           FilterOperator = "DATE_LESS_THAN"
	FilterOperatorDateGreaterOrEqualThan FilterOperator = "DATE_GREATER_OR_EQUAL_THAN"
	FilterOperatorDateLessOrEqualThan    FilterOperator = "DATE_LESS_OR_EQUAL_THAN"
)

// String implements Getter interface.
func (f FilterOperator) String() string {
	return string(f)
}

// PropertyEntity is the entity for the property.
type PropertyEntity string

const (
	PropertyEntityEquipment PropertyEntity = "EQUIPMENT"
	PropertyEntityService   PropertyEntity = "SERVICE"
	PropertyEntityLink      PropertyEntity = "LINK"
	PropertyEntityPort      PropertyEntity = "PORT"
	PropertyEntityLocation  PropertyEntity = "LOCATION"
	PropertyEntityWorkOrder PropertyEntity = "WORK_ORDER"
	PropertyEntityProject   PropertyEntity = "PROJECT"
)

// String implements Getter interface.
func (p PropertyEntity) String() string {
	return string(p)
}

// VariableType is the type of block variable.
type VariableType string

// Possible variable types
const (
	VariableTypeString        VariableType = "STRING"
	VariableTypeInt           VariableType = "INT"
	VariableTypeDate          VariableType = "DATE"
	VariableTypeWorkOrder     VariableType = "WORK_ORDER"
	VariableTypeWorkOrderType VariableType = "WORK_ORDER_TYPE"
	VariableTypeLocation      VariableType = "LOCATION"
	VariableTypeProject       VariableType = "PROJECT"
	VariableTypeUser          VariableType = "USER"
)

// Values returns variable type possible values.
func (VariableType) Values() []string {
	return []string{
		VariableTypeString.String(),
		VariableTypeInt.String(),
		VariableTypeDate.String(),
		VariableTypeWorkOrder.String(),
		VariableTypeWorkOrderType.String(),
		VariableTypeLocation.String(),
		VariableTypeProject.String(),
		VariableTypeUser.String(),
	}
}

// VariableTypeValidator variable type value.
func VariableTypeValidator(v VariableType) error {
	switch v {
	case VariableTypeString,
		VariableTypeInt,
		VariableTypeDate,
		VariableTypeWorkOrder,
		VariableTypeWorkOrderType,
		VariableTypeLocation,
		VariableTypeProject,
		VariableTypeUser:
		return nil
	default:
		return fmt.Errorf("%v is not a valid variable type", v)
	}
}

// String implements Getter interface.
func (vt VariableType) String() string {
	return string(vt)
}

// Set sets the value stored in variable type.
func (vt *VariableType) Set(s string) {
	*vt = VariableType(s)
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (vt *VariableType) UnmarshalGQL(v interface{}) error {
	return UnmarshalGQL(v, vt)
}

// MarshalGQL implements graphql.Marshaler interface.
func (vt VariableType) MarshalGQL(w io.Writer) {
	_ = MarshalGQL(w, vt)
}

// VariableUsage determines the if the variable is used as input param, output param or both
type VariableUsage int

const (
	VariableUsageInput VariableUsage = iota
	VariableUsageOutput
	VariableUsageInputAndOutput
)

// String implements Getter interface.
func (vu VariableUsage) String() string {
	values := []string{"INPUT", "OUTPUT", "INPUT_AND_OUTPUT"}
	if int(vu) < 0 || int(vu) >= len(values) {
		return ""
	}
	return values[vu]
}

// UnmarshalGQL implements graphql.Unmarshaler interface.
func (vu *VariableUsage) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return errors.New("enums must be strings")
	}

	switch str {
	case "INPUT":
		*vu = VariableUsageInput
	case "OUTPUT":
		*vu = VariableUsageOutput
	case "INPUT_AND_OUTPUT":
		*vu = VariableUsageInputAndOutput
	default:
		return fmt.Errorf("%s is not a valid VariableUsage", str)
	}
	return nil
}

// MarshalGQL implements graphql.Marshaller interface.
func (vu VariableUsage) MarshalGQL(w io.Writer) {
	_ = MarshalGQL(w, vu)
}

// In reports whether variable usage is in list of variable usages.
func (vu VariableUsage) In(vars ...VariableUsage) bool {
	for _, v := range vars {
		if v == vu {
			return true
		}
	}
	return false
}

// NodeType determines the node type of property of type node
type NodeType string

const (
	NodeTypeLocation  NodeType = "location"
	NodeTypeEquipment NodeType = "equipment"
	NodeTypeService   NodeType = "service"
	NodeTypeWorkOrder NodeType = "work_order"
	NodeTypeUser      NodeType = "user"
)

// String implements Getter interface.
func (vt NodeType) String() string {
	return string(vt)
}
