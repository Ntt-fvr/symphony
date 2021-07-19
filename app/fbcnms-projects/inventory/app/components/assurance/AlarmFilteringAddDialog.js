/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Text from '@symphony/design-system/components/Text';

import CloseIcon from '@material-ui/icons/Close';
import Warning from './Warning';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  icon: {
    fontsize: '10px',
  },
  avatar: {
    backgroundColor: '#e4f2ff',
  },
  dialogTitle: {
    padding: '24px',
    paddingBottom: '16px',
  },
  dialogTitleText: {
    fontSize: '20px',
    lineHeight: '24px',
    color: theme.palette.blueGrayDark,
    fontWeight: 500,
  },
  dialogContent: {
    padding: '2rem',
    height: '250px',
  },
  dialogActions: {
    padding: '24px',
    marginBottom: '30px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  time: {
    marginTop: '2rem',
  },
}));

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
  onWorkOrderTypeSelected: (id: string) => void,
|}>;

const AlarmFilteringAddDialog = (props: Props) => {
  const classes = useStyles();
  return (
    <Dialog
      maxWidth="sm"
      open={true}
      onClose={props.onClose}
      fullWidth={true}
      className={classes.root}>
      <DialogActions>
        <Button onClick={props.onClose} skin="regular">
          <CloseIcon fontSize="large" color="action" />
        </Button>
      </DialogActions>
      <DialogTitle className={classes.dialogTitle}>
        <Warning />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Text weight="bold">
              An alarm filter will be applied on the resource...
            </Text>
          </Grid>
          <Grid item xs={12}>
            <Text>AMS/OLT-SYS-AL1/rack=1/shelf=1/slot=LT1/port=1</Text>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.time}>
          <Grid item xs={12}>
            <Text>During the period:</Text>
          </Grid>
          <Grid item xs={6}>
            <Text weight="bold">Start: 02/06/2021</Text>
          </Grid>
          <Grid item xs={6}>
            <Text weight="bold">End: 13/09/2021</Text>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="outlined" color="primary">
          Edit
        </Button>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlarmFilteringAddDialog;
