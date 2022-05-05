/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import FormAction from '@symphony/design-system/components/Form/FormAction';
import IconButton from '@symphony/design-system/components/IconButton';
import React, {useCallback} from 'react';
import RenameFlowDialog from '../RenameFlowDialog';
import {Grid, Typography} from '@material-ui/core';
import {POSITION} from '@symphony/design-system/components/Dialog/DialogFrame';
import {RenameOneLineIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useDialogShowingContext} from '@symphony/design-system/components/Dialog/DialogShowingContext';
import {useFlowData} from '../../../../data/FlowDataContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '&:hover $renameButton': {
      opacity: 1,
    },
  },
  renameButton: {
    opacity: 0,
  },
}));

export default function FlowTitle() {
  const classes = useStyles();
  const flowData = useFlowData();
  const dialogShowingContext = useDialogShowingContext();

  const hide = useCallback(() => {
    dialogShowingContext.hideDialog();
  }, [dialogShowingContext]);

  const show = useCallback(() => {
    dialogShowingContext.showDialog(
      {
        title: 'Rename Flow',
        children: (
          <RenameFlowDialog
            onClose={hide}
            onSave={newName => {
              flowData.save({name: newName});
              hide();
            }}
          />
        ),
        showCloseButton: true,
        position: POSITION.center,
        isModal: true,
        onClose: hide,
      },
      true,
    );
  }, [dialogShowingContext, hide, flowData]);

  return (
    <div className={classes.root}>
      <Grid item xs zeroMinWidth>
        <Typography variant={'h6'} noWrap>
          {flowData.flowDraft?.name ?? null}
        </Typography>
      </Grid>
      <FormAction hideOnEditLocks={true}>
        <IconButton
          className={classes.renameButton}
          icon={RenameOneLineIcon}
          onClick={show}
          skin="gray"
        />
      </FormAction>
    </div>
  );
}
