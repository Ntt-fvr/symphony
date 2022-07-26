/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useState, useCallback} from 'react';
import Button from '@symphony/design-system/components/Button';
import ButtonFlowStatus from '../../../common/ButtonFlowStatus';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import InfoIcon from '@material-ui/icons/Info';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import {Grid, Typography} from '@material-ui/core';
import {IconButton as MatIconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FlowStatus} from '../../../common/FlowStatusEnums';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useFlowData} from '../../data/FlowDataContext';
import UpdateFlowInstanceMutation from '../../../../../mutations/UpdateFlowInstance';
import moment from 'moment';
 

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
}));

const toPascalCase = name => {
  return name.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};
export default function FlowInstanceDetails() {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const flowData = useFlowData();
  const data = flowData.flowDraft;
  const [currentStatus, setCurrentStatus] = useState(flowData.flowDraft.status);

  const handleClick = event => {
    setMenuOpen(event.currentTarget);
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(null);
    setDialogOpen(false);
  };

  const updateFlow = useCallback(
    inputData => {
      const variables = {
        input: {
          id: flowData.flowDraft.id,
          status: inputData.status,
        },
      };
      UpdateFlowInstanceMutation(variables, {
        onCompleted: (data) => {setCurrentStatus(data.editFlowInstance.status)},
      });
    },
    [flowData],
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item container xs={12}>
          <Grid item xs={5} className={classes.center}>
            <b>Status</b>
          </Grid>
          <Grid item xs={7}>
            <ButtonFlowStatus
              className={currentStatus}
              skin={toPascalCase(currentStatus)}>
              {currentStatus}
            </ButtonFlowStatus>
            <MatIconButton
              onClick={e => {
                e.preventDefault();
                handleClick(e);
              }}
              disabled={
                currentStatus != FlowStatus.paused &&
                currentStatus != FlowStatus.running &&
                currentStatus != FlowStatus.failing
              }>
              <MoreVertIcon />
            </MatIconButton>
            <Menu
              anchorEl={menuOpen}
              keepMounted
              open={Boolean(menuOpen)}
              onClose={() => handleClose()}>
              <MenuItem
                onClick={e => {
                  handleClose();
                  updateFlow({
                    status:
                      e.target.textContent == 'Pause'
                        ? FlowStatus.paused
                        : FlowStatus.running
                  });
                }}>
                {currentStatus === FlowStatus.paused
                  ? 'Resume'
                  : currentStatus === FlowStatus.running
                  ? 'Pause'
                  : 'Retry'}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleClickOpen();
                }}>
                Cancel
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <b>Flow template</b>
          </Grid>
          <Grid item xs={6}>
            {data?.template?.name}
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <b>Date created</b>
          </Grid>
          <Grid item xs={6}>
            {moment(data?.startDate).format('MM/DD/YY-HH:MM:SS')}
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <b>Author</b>
          </Grid>
          <Grid item xs={6}>
            {''}
          </Grid>
        </Grid>
      </Grid>
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
                  updateFlow({status: FlowStatus.canceled});
                }}>
                Continue
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
