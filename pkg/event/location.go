package event

import (
	"context"

	"github.com/facebookincubator/symphony/pkg/ent"
	"github.com/facebookincubator/symphony/pkg/ent/hook"
)

// Project events.
const (
	LocationAdded = "location:added"
)

// Hook returns the hook which generates events from mutations.
func (e *Eventer) locationHook() ent.Hook {
	chain := hook.NewChain(
		e.locationAddedHook(),
	)
	return chain.Hook()
}

func (e *Eventer) locationAddedHook() ent.Hook {
	return func(next ent.Mutator) ent.Mutator {
		return hook.LocationFunc(func(ctx context.Context, pm *ent.LocationMutation) (ent.Value, error) {
			value, err := next.Mutate(ctx, pm)
			if err == nil {
				e.emit(ctx, LocationAdded, value)
			}
			return value, err
		})
	}
}
