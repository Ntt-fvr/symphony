/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FlowStatus} from '../../../common/FlowStatusEnums';
import InfoIcon from '@material-ui/icons/Info';
import {IconButton as MatIconButton} from '@material-ui/core';
import {Grid, Typography} from '@material-ui/core';
import React, {useCallback, useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/styles';
import {useFlowData} from '../../data/FlowDataContext';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },

    flexGrow: '0',
    padding: '20px',
    margin: '0',
    borderRadius: 25,
  },
  center: {
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    marginBottom: '80px',
    marginLeft: '20px',
  },
  cancelButton: {
    border: '1.5px solid #2196f3',
    width: '84px',
    height: '36px',
    borderRadius: 5,
    color: '#2196f3',
  },
  typeText: {
    fontWeight: 600,
  },
  dialogAction: {
    marginBottom: '55px',
    marginRight: '47px',
  },
  root2: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    backgroundColor: '#e3f2fd',
    border: '1.5px solid #2196f3',
  },
  fullWidth: {
    width: '100%',
  },
}));

export default function CancelFlowInstanceDialog(props) {
  const {dialogOpen, handleClose} = props;
  const classes = useStyles();
  const flowData = useFlowData();

  return (
    <div>
      <Dialog
        fullScreen={false}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <MatIconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}>
            <CloseIcon />
          </MatIconButton>
          <br />

          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <InfoIcon />
                </Grid>
                <Grid item xs>
                  <Typography>
                    <Typography className={classes.typeText}>
                      Cancel flow
                    </Typography>
                    This action is irreversible, the flow will go into a
                    "Cancelled" state and cannot be executed again.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <div className={classes.root1}>
            <Button
              variant="outlined"
              className={classes.cancelButton}
              onClick={handleClose}>
              <Typography>Cancel</Typography>
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={() => {
                handleClose();
                flowData.updateInstance({status: FlowStatus.canceled});
              }}>
              Continue
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
