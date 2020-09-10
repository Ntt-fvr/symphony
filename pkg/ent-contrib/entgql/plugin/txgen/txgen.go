// Copyright (c) 2004-present Facebook All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package txgen

import (
	"errors"
	"go/types"
	"os"
	"strings"
	ttemplates "text/template"

	"github.com/99designs/gqlgen/codegen"
	"github.com/99designs/gqlgen/codegen/config"
	"github.com/99designs/gqlgen/codegen/templates"
	"github.com/99designs/gqlgen/plugin"
)

// New returns a txgen plugin.
func New(opts ...Option) plugin.Plugin {
	t := &txgen{}
	for _, opt := range opts {
		opt(t)
	}
	if t.filename == "" {
		t.filename = "tx.resolver.go"
	}
	if t.typename == "" {
		t.typename = "TxMutationResolver"
	}
	return t
}

// Option configures plugin.
type Option func(*txgen)

// WithFileName configures generated filename.
func WithFileName(filename string) Option {
	return func(t *txgen) {
		t.filename = filename
	}
}

// WithTypeName configures generated mutator typename.
func WithTypeName(typename string) Option {
	return func(t *txgen) {
		t.typename = typename
	}
}

// WithFileName adds additional imports to generated file.
func WithImports(imports ...string) Option {
	return func(t *txgen) {
		t.imports = append(t.imports, imports...)
	}
}

type txgen struct {
	filename string
	typename string
	imports  []string
}

func (txgen) Name() string {
	return "txgen"
}

func (t txgen) MutateConfig(*config.Config) (err error) {
	if err = os.Remove(t.filename); os.IsNotExist(err) {
		err = nil
	}
	return err
}

func (t txgen) GenerateCode(data *codegen.Data) error {
	if !strings.HasSuffix(t.filename, ".go") {
		return errors.New("filename should be a go source file")
	}
	if !data.Config.Resolver.IsDefined() {
		return nil
	}
	if err := data.Config.Resolver.Check(); err != nil {
		return err
	}
	mutation := data.Objects.ByName(data.Schema.Mutation.Name)
	if mutation == nil {
		return errors.New("cannot get mutation object")
	}
	return templates.Render(templates.Options{
		PackageName: data.Config.Resolver.Package,
		Filename:    t.filename,
		Data: &txgenData{
			Object:  mutation,
			Imports: t.imports,
			Type:    t.typename,
			Exec:    data.Config.Exec,
		},
		Funcs: ttemplates.FuncMap{
			"ResultType": func(f *codegen.Field) string {
				result := templates.CurrentImports.LookupType(f.TypeReference.GO)
				if f.Object.Stream {
					result = "<-chan " + result
				}
				return result
			},
			"Package": func(f *codegen.Field) string {
				t := f.TypeReference
				for e := t.Elem(); e != nil; e = t.Elem() {
					t = e
				}
				if t, ok := t.GO.(*types.Named); ok {
					return t.Obj().Pkg().Name()
				}
				return ""
			},
		},
		GeneratedHeader: true,
		Packages:        data.Config.Packages,
	})
}

type txgenData struct {
	*codegen.Object
	Imports []string
	Type    string
	Exec    config.PackageConfig
}
