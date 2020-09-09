// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"context"
	"flag"
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql/internal/todo"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql/internal/todo/ent"
	"github.com/facebookincubator/symphony/pkg/ent-contrib/entgql/internal/todo/ent/migrate"

	_ "github.com/facebookincubator/symphony/pkg/ent-contrib/entgql/internal/todo/ent/runtime"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	addr := flag.String("address", ":8081", "Address to listen on")
	flag.Parse()

	client, err := ent.Open(
		"sqlite3",
		"file:ent?mode=memory&cache=shared&_fk=1",
	)
	if err != nil {
		log.Fatal("opening ent client", err)
	}
	if err := client.Schema.Create(
		context.Background(),
		migrate.WithGlobalUniqueID(true),
	); err != nil {
		log.Fatalln("running schema migration", err)
	}

	http.Handle("/", playground.Handler("Todo", "/query"))
	srv := handler.NewDefaultServer(todo.NewSchema(client))
	srv.AroundResponses(entgql.TransactionMiddleware(client))
	srv.SetErrorPresenter(entgql.DefaultErrorPresenter)
	http.Handle("/query", srv)
	log.Fatal(http.ListenAndServe(*addr, nil))
}
