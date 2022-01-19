/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import Text from '@symphony/design-system/components/Text';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  icon: {
    fontsize: '10px',
  },
  dialogTitle: {
    padding: '49px',
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
  content: {
    padding: '16px',
  },
  time: {
    marginTop: '2rem',
  },
  option: {
    width: '111px',
    height: '36px',
  },
  warning: {
    background: '#FEF0D8',
  },
  info: {
    background: '#E4F2FF',
  },
}));

type Props = $ReadOnly<{|
  saveItem: () => void,
  resource: string,
  open: boolean,
  typeAlert: string,
  onClose: () => void,
|}>;

const SaveDialogConfirm = (props: Props) => {
  const {onClose, saveItem, resource, typeAlert = 'warning'} = props;

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
        {typeAlert.toLocaleUpperCase() === 'WARNING' && (
          <Alert className={classes.root} variant="outlined" severity="warning">
            <Typography>Warning</Typography>
            <Typography>Are you sure you don´t want to keep changes</Typography>
          </Alert>
        )}
        {typeAlert.toLocaleUpperCase() === 'INFORMATION' && (
          <Alert
            className={(classes.root, classes.info)}
            variant="outlined"
            severity="info">
            <Typography>Information</Typography>
            <Typography>Are you sure to save your changes?</Typography>
          </Alert>
        )}
        <Grid container className={classes.content} spacing={2}>
          <Grid item xs={12}>
            {typeAlert.toLocaleUpperCase() === 'WARNING' && (
              <Typography>the resource will not present changes</Typography>
            )}
            {typeAlert.toLocaleUpperCase() === 'INFORMATION' && (
              <Typography>the resource will be saved with changes</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Text weight={'bold'}>{resource}</Text>
          </Grid>
          <Grid item xs={6}>
            <Typography>Creation Date</Typography>
            <Text weight={'bold'}>8/11/2021</Text>
          </Grid>
          <Grid item xs={6}>
            <Typography>Modification Date</Typography>
            <Text weight={'bold'}>9/12/2021</Text>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.option}
          variant="outlined"
          color="primary"
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            saveItem();
          }}
          className={classes.option}
          variant="contained"
          color="primary">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveDialogConfirm;
