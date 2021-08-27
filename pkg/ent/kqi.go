// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Code generated by entc, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"
	"time"

	"github.com/facebook/ent/dialect/sql"
	"github.com/facebookincubator/symphony/pkg/ent/kqi"
	"github.com/facebookincubator/symphony/pkg/ent/kqicategory"
	"github.com/facebookincubator/symphony/pkg/ent/kqiperspective"
	"github.com/facebookincubator/symphony/pkg/ent/kqisource"
	"github.com/facebookincubator/symphony/pkg/ent/kqitemporalfrequency"
)

// Kqi is the model entity for the Kqi schema.
type Kqi struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// CreateTime holds the value of the "create_time" field.
	CreateTime time.Time `json:"create_time,omitempty"`
	// UpdateTime holds the value of the "update_time" field.
	UpdateTime time.Time `json:"update_time,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Description holds the value of the "description" field.
	Description string `json:"description,omitempty"`
	// StartDateTime holds the value of the "startDateTime" field.
	StartDateTime time.Time `json:"startDateTime,omitempty"`
	// EndDateTime holds the value of the "endDateTime" field.
	EndDateTime time.Time `json:"endDateTime,omitempty"`
	// Formula holds the value of the "formula" field.
	Formula string `json:"formula,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the KqiQuery when eager-loading is set.
	Edges                                            KqiEdges `json:"edges"`
	kqi_category_kqi_category_fk                     *int
	kqi_perspective_kqi_perspective_fk               *int
	kqi_source_kqi_source_fk                         *int
	kqi_temporal_frequency_kqi_temporal_frequency_fk *int
}

// KqiEdges holds the relations/edges for other nodes in the graph.
type KqiEdges struct {
	// KqiCategoryFk holds the value of the kqiCategoryFk edge.
	KqiCategoryFk *KqiCategory
	// KqiPerspectiveFk holds the value of the kqiPerspectiveFk edge.
	KqiPerspectiveFk *KqiPerspective
	// KqiSourceFk holds the value of the kqiSourceFk edge.
	KqiSourceFk *KqiSource
	// KqiTemporalFrequencyFk holds the value of the kqiTemporalFrequencyFk edge.
	KqiTemporalFrequencyFk *KqiTemporalFrequency
	// KqiTargetFk holds the value of the kqiTargetFk edge.
	KqiTargetFk []*KqiTarget
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [5]bool
}

// KqiCategoryFkOrErr returns the KqiCategoryFk value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e KqiEdges) KqiCategoryFkOrErr() (*KqiCategory, error) {
	if e.loadedTypes[0] {
		if e.KqiCategoryFk == nil {
			// The edge kqiCategoryFk was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: kqicategory.Label}
		}
		return e.KqiCategoryFk, nil
	}
	return nil, &NotLoadedError{edge: "kqiCategoryFk"}
}

// KqiPerspectiveFkOrErr returns the KqiPerspectiveFk value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e KqiEdges) KqiPerspectiveFkOrErr() (*KqiPerspective, error) {
	if e.loadedTypes[1] {
		if e.KqiPerspectiveFk == nil {
			// The edge kqiPerspectiveFk was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: kqiperspective.Label}
		}
		return e.KqiPerspectiveFk, nil
	}
	return nil, &NotLoadedError{edge: "kqiPerspectiveFk"}
}

// KqiSourceFkOrErr returns the KqiSourceFk value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e KqiEdges) KqiSourceFkOrErr() (*KqiSource, error) {
	if e.loadedTypes[2] {
		if e.KqiSourceFk == nil {
			// The edge kqiSourceFk was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: kqisource.Label}
		}
		return e.KqiSourceFk, nil
	}
	return nil, &NotLoadedError{edge: "kqiSourceFk"}
}

// KqiTemporalFrequencyFkOrErr returns the KqiTemporalFrequencyFk value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e KqiEdges) KqiTemporalFrequencyFkOrErr() (*KqiTemporalFrequency, error) {
	if e.loadedTypes[3] {
		if e.KqiTemporalFrequencyFk == nil {
			// The edge kqiTemporalFrequencyFk was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: kqitemporalfrequency.Label}
		}
		return e.KqiTemporalFrequencyFk, nil
	}
	return nil, &NotLoadedError{edge: "kqiTemporalFrequencyFk"}
}

// KqiTargetFkOrErr returns the KqiTargetFk value or an error if the edge
// was not loaded in eager-loading.
func (e KqiEdges) KqiTargetFkOrErr() ([]*KqiTarget, error) {
	if e.loadedTypes[4] {
		return e.KqiTargetFk, nil
	}
	return nil, &NotLoadedError{edge: "kqiTargetFk"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Kqi) scanValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{},  // id
		&sql.NullTime{},   // create_time
		&sql.NullTime{},   // update_time
		&sql.NullString{}, // name
		&sql.NullString{}, // description
		&sql.NullTime{},   // startDateTime
		&sql.NullTime{},   // endDateTime
		&sql.NullString{}, // formula
	}
}

// fkValues returns the types for scanning foreign-keys values from sql.Rows.
func (*Kqi) fkValues() []interface{} {
	return []interface{}{
		&sql.NullInt64{}, // kqi_category_kqi_category_fk
		&sql.NullInt64{}, // kqi_perspective_kqi_perspective_fk
		&sql.NullInt64{}, // kqi_source_kqi_source_fk
		&sql.NullInt64{}, // kqi_temporal_frequency_kqi_temporal_frequency_fk
	}
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Kqi fields.
func (k *Kqi) assignValues(values ...interface{}) error {
	if m, n := len(values), len(kqi.Columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	value, ok := values[0].(*sql.NullInt64)
	if !ok {
		return fmt.Errorf("unexpected type %T for field id", value)
	}
	k.ID = int(value.Int64)
	values = values[1:]
	if value, ok := values[0].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field create_time", values[0])
	} else if value.Valid {
		k.CreateTime = value.Time
	}
	if value, ok := values[1].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field update_time", values[1])
	} else if value.Valid {
		k.UpdateTime = value.Time
	}
	if value, ok := values[2].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field name", values[2])
	} else if value.Valid {
		k.Name = value.String
	}
	if value, ok := values[3].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field description", values[3])
	} else if value.Valid {
		k.Description = value.String
	}
	if value, ok := values[4].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field startDateTime", values[4])
	} else if value.Valid {
		k.StartDateTime = value.Time
	}
	if value, ok := values[5].(*sql.NullTime); !ok {
		return fmt.Errorf("unexpected type %T for field endDateTime", values[5])
	} else if value.Valid {
		k.EndDateTime = value.Time
	}
	if value, ok := values[6].(*sql.NullString); !ok {
		return fmt.Errorf("unexpected type %T for field formula", values[6])
	} else if value.Valid {
		k.Formula = value.String
	}
	values = values[7:]
	if len(values) == len(kqi.ForeignKeys) {
		if value, ok := values[0].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field kqi_category_kqi_category_fk", value)
		} else if value.Valid {
			k.kqi_category_kqi_category_fk = new(int)
			*k.kqi_category_kqi_category_fk = int(value.Int64)
		}
		if value, ok := values[1].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field kqi_perspective_kqi_perspective_fk", value)
		} else if value.Valid {
			k.kqi_perspective_kqi_perspective_fk = new(int)
			*k.kqi_perspective_kqi_perspective_fk = int(value.Int64)
		}
		if value, ok := values[2].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field kqi_source_kqi_source_fk", value)
		} else if value.Valid {
			k.kqi_source_kqi_source_fk = new(int)
			*k.kqi_source_kqi_source_fk = int(value.Int64)
		}
		if value, ok := values[3].(*sql.NullInt64); !ok {
			return fmt.Errorf("unexpected type %T for edge-field kqi_temporal_frequency_kqi_temporal_frequency_fk", value)
		} else if value.Valid {
			k.kqi_temporal_frequency_kqi_temporal_frequency_fk = new(int)
			*k.kqi_temporal_frequency_kqi_temporal_frequency_fk = int(value.Int64)
		}
	}
	return nil
}

// QueryKqiCategoryFk queries the kqiCategoryFk edge of the Kqi.
func (k *Kqi) QueryKqiCategoryFk() *KqiCategoryQuery {
	return (&KqiClient{config: k.config}).QueryKqiCategoryFk(k)
}

// QueryKqiPerspectiveFk queries the kqiPerspectiveFk edge of the Kqi.
func (k *Kqi) QueryKqiPerspectiveFk() *KqiPerspectiveQuery {
	return (&KqiClient{config: k.config}).QueryKqiPerspectiveFk(k)
}

// QueryKqiSourceFk queries the kqiSourceFk edge of the Kqi.
func (k *Kqi) QueryKqiSourceFk() *KqiSourceQuery {
	return (&KqiClient{config: k.config}).QueryKqiSourceFk(k)
}

// QueryKqiTemporalFrequencyFk queries the kqiTemporalFrequencyFk edge of the Kqi.
func (k *Kqi) QueryKqiTemporalFrequencyFk() *KqiTemporalFrequencyQuery {
	return (&KqiClient{config: k.config}).QueryKqiTemporalFrequencyFk(k)
}

// QueryKqiTargetFk queries the kqiTargetFk edge of the Kqi.
func (k *Kqi) QueryKqiTargetFk() *KqiTargetQuery {
	return (&KqiClient{config: k.config}).QueryKqiTargetFk(k)
}

// Update returns a builder for updating this Kqi.
// Note that, you need to call Kqi.Unwrap() before calling this method, if this Kqi
// was returned from a transaction, and the transaction was committed or rolled back.
func (k *Kqi) Update() *KqiUpdateOne {
	return (&KqiClient{config: k.config}).UpdateOne(k)
}

// Unwrap unwraps the entity that was returned from a transaction after it was closed,
// so that all next queries will be executed through the driver which created the transaction.
func (k *Kqi) Unwrap() *Kqi {
	tx, ok := k.config.driver.(*txDriver)
	if !ok {
		panic("ent: Kqi is not a transactional entity")
	}
	k.config.driver = tx.drv
	return k
}

// String implements the fmt.Stringer.
func (k *Kqi) String() string {
	var builder strings.Builder
	builder.WriteString("Kqi(")
	builder.WriteString(fmt.Sprintf("id=%v", k.ID))
	builder.WriteString(", create_time=")
	builder.WriteString(k.CreateTime.Format(time.ANSIC))
	builder.WriteString(", update_time=")
	builder.WriteString(k.UpdateTime.Format(time.ANSIC))
	builder.WriteString(", name=")
	builder.WriteString(k.Name)
	builder.WriteString(", description=")
	builder.WriteString(k.Description)
	builder.WriteString(", startDateTime=")
	builder.WriteString(k.StartDateTime.Format(time.ANSIC))
	builder.WriteString(", endDateTime=")
	builder.WriteString(k.EndDateTime.Format(time.ANSIC))
	builder.WriteString(", formula=")
	builder.WriteString(k.Formula)
	builder.WriteByte(')')
	return builder.String()
}

// Kqis is a parsable slice of Kqi.
type Kqis []*Kqi

func (k Kqis) config(cfg config) {
	for _i := range k {
		k[_i].config = cfg
	}
}
