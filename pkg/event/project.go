package event

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/hook"
)

// Project events.
const (
	ProjectAdded = "project:added"
)

// Hook returns the hook which generates events from mutations.
func (e *Eventer) projectHook() ent.Hook {
	chain := hook.NewChain(
		e.projectAddedHook(),
	)
	return chain.Hook()
}

func (e *Eventer) projectAddedHook() ent.Hook {
	return func(next ent.Mutator) ent.Mutator {
		return hook.ProjectFunc(func(ctx context.Context, pm *ent.ProjectMutation) (ent.Value, error) {
			value, err := next.Mutate(ctx, pm)
			if err == nil {
				e.emit(ctx, ProjectAdded, value)
			}
			return value, err
		})
	}
}
