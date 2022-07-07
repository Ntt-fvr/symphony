package celgo

import (
	"github.com/google/cel-go/checker/decls"
	exprpb "google.golang.org/genproto/googleapis/api/expr/v1alpha1"
)

const (
	InputVariable = "input"
	StateVariable = "state"
)

type AstKey struct {
	Key      string
	AstValue string
}

func variables() []*exprpb.Decl {
	return []*exprpb.Decl{
		decls.NewVar(InputVariable, decls.NewMapType(decls.String, decls.Dyn)),
		decls.NewVar(StateVariable, decls.NewMapType(decls.String, decls.Dyn)),
	}
}
