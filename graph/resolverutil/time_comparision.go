// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package resolverutil

import (
	"time"
)

func GE(date1 time.Time, date2 time.Time) bool {
	return date1.After(date2) || date1.Equal(date2)
}

func LE(date1 time.Time, date2 time.Time) bool {
	return date1.Before(date2) || date1.Equal(date2)
}
