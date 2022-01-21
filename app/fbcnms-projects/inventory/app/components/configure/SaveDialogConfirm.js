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
  dialogTitle: {
    padding: '60px 49px 0px 49px',
  },
  dialogActions: {
    padding: '56px 49px 67px 49px',
  },
  content: {
    padding: '16px',
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
  customTitle: string,
  customMessage: string,
|}>;

const SaveDialogConfirm = (props: Props) => {
  const {
    onClose,
    saveItem,
    resource,
    typeAlert,
    customTitle,
    customMessage,
  } = props;

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
          <CloseIcon fontSize="medium" color="action" />
        </Button>
      </DialogActions>
      <DialogTitle className={classes.dialogTitle}>
        {typeAlert.toLocaleUpperCase() === 'WARNING' && (
          <Alert
            className={(classes.root, classes.warning)}
            variant="outlined"
            severity="warning">
            <Typography>Warning</Typography>
            <Typography>
              {customTitle
                ? customTitle
                : 'Are you sure you don´t want to keep changes'}
            </Typography>
          </Alert>
        )}
        {typeAlert.toLocaleUpperCase() === 'INFORMATION' && (
          <Alert
            className={(classes.root, classes.info)}
            variant="outlined"
            severity="info">
            <Typography>Information</Typography>
            <Typography>
              {customTitle ? customTitle : 'Are you sure to save your changes?'}
            </Typography>
          </Alert>
        )}
        <Grid container className={classes.content} spacing={2}>
          <Grid item xs={12}>
            {typeAlert.toLocaleUpperCase() === 'WARNING' && (
              <Typography>
                {customMessage
                  ? customMessage
                  : 'The information won´t be saved'}
              </Typography>
            )}
            {typeAlert.toLocaleUpperCase() === 'INFORMATION' && (
              <Typography>
                {customMessage
                  ? customMessage
                  : 'The information will be saved as:'}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Text weight={'bold'}>{resource}</Text>
          </Grid>
          {/* <Grid item xs={6}>
            <Typography>Creation Date</Typography>
            <Text weight={'bold'}>8/11/2021</Text>
          </Grid>
          <Grid item xs={6}>
            <Typography>Modification Date</Typography>
            <Text weight={'bold'}>9/12/2021</Text>
          </Grid> */}
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
