// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package migrations

import (
	"fmt"

	"github.com/jinzhu/configor"
)

var Config = struct {
	Techs []struct {
		Name   string
		Domain string
	}
	Domains                   []string
	Ruletypes                 []string
	Comparators               []string
	Eventseverities           []string
	Counterfamilies           []string
	Vendors                   []string
	Alarmstatus               []string
	Kqicategories             []string
	Kqiperspectives           []string
	Kqitemporalfrecuencies    []string
	Kqisources                []string
	Recommendationscategories []string
	Recommendationssources    []string
}{}

func getConfig() {
	configor.Load(&Config, "/bin/params.yml")
	fmt.Println("config: %#v", Config)

}
