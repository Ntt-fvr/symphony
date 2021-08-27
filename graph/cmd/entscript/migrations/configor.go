// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package migrations

import (
	"fmt"

	"github.com/jinzhu/configor"
)

var Config = struct {
	Teches []struct {
		Name   string
		Domain string
	}
	Domains                   []string
	Ruletypes                 []string
	Comparators               []string
	Eventseverity             []string
	Counterfamily             []string
	Vendors                   []string
	Alarmstatus               []string
	Kqicategory               []string
	Kqiperspective            []string
	Kqitemporalfrecuency      []string
	Kqisource                 []string
	Recommendationscategories []string
	Recommendationssources    []string
}{}

func getConfig() {
	configor.Load(&Config, "/bin/params.yml")
	fmt.Println("config: %#v", Config)

}
