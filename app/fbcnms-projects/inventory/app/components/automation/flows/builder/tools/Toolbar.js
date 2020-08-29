/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Button from '@fbcnms/ui/components/design-system/Button';
import JsonInputDialog from './JsonInputDialog';
import React, {useCallback} from 'react';
import {TYPE as CreateCustomWorkorderType} from '../canvas/graph/shapes/vertexes/blocks/actions/CreateCustomWorkorder';
import {TYPE as ManualStartType} from '../canvas/graph/shapes/vertexes/blocks/administrative/ManualStart';
import {makeStyles} from '@material-ui/styles';
import {useDialogShowingContext} from '@fbcnms/ui/components/design-system/Dialog/DialogShowingContext';
import {useGraph} from '../canvas/graph/GraphContext';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    '& > *': {
      marginLeft: '8px',
    },
  },
  marginRight: {
    marginRight: '16px',
  },
}));

export default function Toolbar() {
  const classes = useStyles();

  const flow = useGraph();

  const dialogShowingContext = useDialogShowingContext();

  const showLoadJsonDialog = useCallback(() => {
    const jsonObj = flow.serialize();
    const jsonInitialValue = JSON.stringify(jsonObj) || '';
    dialogShowingContext.showDialog(
      {
        title: 'Load JSON',
        children: (
          <JsonInputDialog
            json={jsonInitialValue}
            onSave={newJsonValue => {
              flow.deserialize(newJsonValue);
              dialogShowingContext.hideDialog();
            }}
            onClose={dialogShowingContext.hideDialog}
          />
        ),
        onClose: dialogShowingContext.hideDialog,
      },
      true,
    );
  }, [dialogShowingContext, flow]);

  return (
    <div className={classes.root}>
      <Button onClick={() => flow.move({x: -50, y: 0})}>Left</Button>
      <Button onClick={() => flow.move({x: 0, y: -50})}>Up</Button>
      <Button onClick={() => flow.move({x: 0, y: 50})}>Down</Button>
      <Button
        onClick={() => flow.move({x: 50, y: 0})}
        className={classes.marginRight}>
        Right
      </Button>
      <Button onClick={() => flow.zoomFit()}>Fit</Button>
      <Button onClick={() => flow.zoomIn()}>Zoom In</Button>
      <Button onClick={() => flow.zoomOut()}>Zoom Out</Button>
      <Button onClick={() => flow.reset()} className={classes.marginRight}>
        Reset
      </Button>
      <Button
        onClick={() => showLoadJsonDialog()}
        className={classes.marginRight}>
        Load JSON
      </Button>
      <Button
        onClick={() => {
          flow.addVertex(ManualStartType, {
            position: {x: 200, y: 100},
            size: {width: 60, height: 60},
          });
        }}>
        Add Start
      </Button>
      <Button
        onClick={() => {
          flow.addVertex(CreateCustomWorkorderType, {
            position: {x: 500, y: 100},
            size: {width: 55, height: 60},
            text: 'Supervisor approval',
          });
        }}>
        Add Custom Worker
      </Button>
    </div>
  );
}
