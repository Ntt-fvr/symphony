// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package enum

import (
	"errors"
	"fmt"
	"io"
	"strconv"

	"github.com/facebookincubator/ent/schema/field"
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
