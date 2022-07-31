package handler

import (
	"context"
	"github.com/facebookincubator/symphony/pkg/ent/block"
	"github.com/facebookincubator/symphony/pkg/ev"
	"github.com/facebookincubator/symphony/pkg/event"
	"github.com/facebookincubator/symphony/pkg/log"
)

func HandleAutomationSignal(ctx context.Context, _ log.Logger, evt ev.EventObject) error {
	var err error
	entry, ok := evt.(event.SignalEvent)
	if !ok || entry.Type != block.SignalTypeWOUPDATED {
		return nil
	}
	//TODO:
	if err != nil {
		return err
	}
	return nil
}
