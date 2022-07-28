/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useState} from 'react';
import Button from '@symphony/design-system/components/Button';
import ButtonFlowStatus from '../../../common/ButtonFlowStatus';
import CancelFlowInstanceDialog from '../../view/dialogs/CancelFlowInstanceDialog';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Grid} from '@material-ui/core';
import {IconButton as MatIconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FlowStatus} from '../../../common/FlowStatusEnums';
import {useFlowData} from '../../data/FlowDataContext';
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
  fullWidth: {
    width: '100%',
  },
}));

const toPascalCase = name => {
  return name?.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};
export default function FlowInstanceDetails() {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const flowData = useFlowData();
  const data = flowData.flowDraft;

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

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item container xs={12}>
          <Grid item xs={5} className={classes.center}>
            <b>Status</b>
          </Grid>
          <Grid item>
            <ButtonFlowStatus
              className={flowData.currentStatus}
              skin={toPascalCase(flowData.currentStatus)}>
              {flowData.currentStatus}
            </ButtonFlowStatus>
            <MatIconButton
              onClick={e => {
                e.preventDefault();
                handleClick(e);
              }}
              color="secondary"
              disabled={
                flowData.currentStatus != FlowStatus.paused &&
                flowData.currentStatus != FlowStatus.running &&
                flowData.currentStatus != FlowStatus.failing
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
                  flowData.updateInstance({
                    status:
                      e.target.textContent == 'Pause'
                        ? FlowStatus.paused
                        : FlowStatus.running,
                  });
                }}>
                {flowData.currentStatus === FlowStatus.paused
                  ? 'Resume'
                  : flowData.currentStatus === FlowStatus.running
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
        <hr className={classes.fullWidth} />
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
      <CancelFlowInstanceDialog
        dialogOpen={dialogOpen}
        handleClose={handleClose}
      />
    </div>
  );
}
