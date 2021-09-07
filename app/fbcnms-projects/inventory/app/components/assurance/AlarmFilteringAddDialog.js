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
import DateTimeFormat from '../../common/DateTimeFormat.js';
import Warning from './common/Warning';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  icon: {
    fontsize: '10px',
  },
  dialogTitle: {
    padding: '24px',
    paddingBottom: '16px',
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
  option: {
    width: '111px',
    height: '36px',
  },
}));

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
  onAlarmSelected: () => void,
  onAlarmSelectedData: {
    name: string,
    beginTime: string,
    endTime: string,
  },
|}>;

const AlarmFilteringAddDialog = (props: Props) => {
  const {onClose, onAlarmSelected, onAlarmSelectedData} = props;
  const classes = useStyles();
  return (
    <Dialog
      maxWidth="sm"
      open={true}
      onClose={onClose}
      fullWidth={true}
      className={classes.root}>
      <DialogActions>
        <Button onClick={onClose} skin="regular">
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
            <Text> {onAlarmSelectedData.name} </Text>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.time}>
          <Grid item xs={12}>
            <Text>During the period:</Text>
          </Grid>
          <Grid item xs={6}>
            <Text weight="bold">
              Start: {DateTimeFormat.dateTime(onAlarmSelectedData.beginTime)}
            </Text>
          </Grid>
          <Grid item xs={6}>
            <Text weight="bold">
              End: {DateTimeFormat.dateTime(onAlarmSelectedData.endTime)}{' '}
            </Text>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.option}
          variant="outlined"
          color="primary"
          onClick={onClose}>
          Edit
        </Button>
        <Button
          onClick={() => onAlarmSelected()}
          className={classes.option}
          variant="contained"
          color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlarmFilteringAddDialog;
