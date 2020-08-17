// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package exporter

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/viewer"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/facebookincubator/symphony/pkg/ent/exporttask"
	"github.com/facebookincubator/symphony/pkg/log"
	"github.com/facebookincubator/symphony/pkg/viewer"
	"github.com/gorilla/mux"
	"github.com/pkg/errors"
	"go.uber.org/zap"
)

// Exporter encapsulates accessing db and logging
type exporter struct {
	log log.Logger
	rower
}

type exporterExcel struct {
	log log.Logger
	excelFile
}

// Interface for creating an excel file
type excelFile interface {
	createExcelFile(context.Context, *url.URL) (*excelize.File, error)
}

type rower interface {
	Rows(ctx context.Context, filters string) ([][]string, error)
}

func (m exporter) createExportTask(ctx context.Context, url *url.URL) (*ent.ExportTask, error) {
	var (
		logger = m.log.For(ctx)
		err    error
		etType exporttask.Type
	)
	logger.Debug("entered async export")
	filtersParam := url.Query().Get("filters")
	client := ent.FromContext(ctx)

	if err != nil {
		return nil, errors.Wrap(err, "cannot use filters")
	}
	switch url.Path {
	case "/locations":
		etType = exporttask.TypeLocation
	default:
		return nil, errors.New("not supported entity for async export")
	}

	t, err := client.ExportTask.
		Create().
		SetType(etType).
		SetStatus(exporttask.StatusPending).
		SetFilters(filtersParam).
		Save(ctx)
	if err != nil {
		return nil, errors.Wrap(err, "cannot create export task")
	}

	return t, nil
}

func (m *exporter) writeExportTaskID(ctx context.Context, w http.ResponseWriter, id int) {
	log := m.log.For(ctx)
	taskID := struct {
		TaskID string
	}{
		strconv.Itoa(id),
	}

	output, err := json.Marshal(taskID)
	if err != nil {
		log.Error("error in async export", zap.Error(err))
		http.Error(w, fmt.Sprintf("%q: error in async export", err), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(output)
	if err != nil {
		log.Error("error in writing output", zap.Error(err))
		http.Error(w, fmt.Sprintf("%q: error in async export", err), http.StatusInternalServerError)
	}
}

// ServerHTTP handles requests to returns an export CSV file
func (m *exporter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	log := m.log.For(ctx)
	if viewer.FromContext(ctx).Features().Enabled("async_export") {
		et, err := m.createExportTask(ctx, r.URL)
		if err != nil {
			log.Error("error in async export", zap.Error(err))
			http.Error(w, fmt.Sprintf("%q: error in async export", err), http.StatusInternalServerError)
		} else {
			m.writeExportTaskID(ctx, w, et.ID)
		}
	} else {
		filename := "export"
		rout := mux.CurrentRoute(r)
		if rout != nil {
			filename = rout.GetName()
		}
		w.Header().Set("Content-Disposition", "attachment; filename="+filename+".csv")
		w.Header().Set("Content-Type", "text/csv")
		w.Header().Set("Transfer-Encoding", "chunked")

		writer := csv.NewWriter(w)

		filters := r.URL.Query().Get("filters")
		rows, err := m.Rows(ctx, filters)
		if err != nil {
			log.Error("error in export", zap.Error(err))
			http.Error(w, fmt.Sprintf("%q: error in export", err), http.StatusInternalServerError)
		}

		err = writer.WriteAll(rows)
		if err != nil {
			http.Error(w, fmt.Sprintf("%q: error in writing file", err), http.StatusInternalServerError)
		}
	}
}

// ServerHTTP handles requests to returns an export Excel file with extension xlsx
func (m *exporterExcel) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	filename := "exportExcel"
	rout := mux.CurrentRoute(r)
	if rout != nil {
		filename = rout.GetName()
	}
	w.Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	w.Header().Set("Content-Disposition", "attachment; filename="+filename+"xlsx")
	log := m.log.For(ctx)
	xlsx, err := m.createExcelFile(ctx, r.URL)
	if err != nil {
		log.Error("error in export", zap.Error(err))
		http.Error(w, fmt.Sprintf("%q: error in export", err), http.StatusInternalServerError)
	}
	if xlsx == nil {
		http.Error(w, fmt.Sprintf("%q: error in export", err), http.StatusInternalServerError)
	}
	err = xlsx.Write(w)
	if err != nil {
		http.Error(w, fmt.Sprintf("%q: error in writing file", err), http.StatusInternalServerError)
	}
}

// NewHandler creates a upload http handler.
func NewHandler(log log.Logger) (http.Handler, error) {
	router := mux.NewRouter()
	routes := []struct {
		name    string
		handler exporter
	}{
		{"equipment", exporter{log, equipmentRower{log}}},
		{"ports", exporter{log, portsRower{log}}},
		{"work_orders", exporter{log, woRower{log}}},
		{"links", exporter{log, linksRower{log}}},
		{"locations", exporter{log, LocationsRower{log, true}}},
		{"services", exporter{log, servicesRower{log}}},
	}

	router.Path("/single_work_order").
		Methods(http.MethodGet).
		Handler(&exporterExcel{log, singleWoRower{log}}).
		Name("single_work_order")

	for _, route := range routes {
		route := route
		router.Path("/" + route.name).
			Methods(http.MethodGet).
			Handler(&route.handler).
			Name(route.name)
	}
	return router, nil
}
