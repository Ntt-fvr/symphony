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
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import {SelectDateTime} from './SelectDateTime';
import {StepperDate} from './StepperDate';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    padding: '0',
  },
  dialogActions: {
    padding: '0 24px',
    marginBottom: '30px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  option: {
    width: '111px',
    height: '36px',
  },
}));

type Props = $ReadOnly<{|
  open?: boolean,
  onClose: () => void,
|}>;

const DialogSelectDate = (props: Props) => {
  const {onClose} = props;

  const classes = useStyles();
  return (
    <Dialog
      maxWidth="xs"
      open={true}
      onClose={onClose}
      fullWidth={true}
      className={classes.root}>
      <Grid container justify={'center'}>
        <StepperDate />
      </Grid>
      <Card className={classes.title} margins="none" variant={'none'}>
        <Grid container justify={'center'}>
          <CardHeader> Select a date to make the change</CardHeader>
        </Grid>
      </Card>
      <Grid
        container
        hidden={true}
        justify={'center'}
        style={{margin: '0 0 30px 0'}}>
        <SelectDateTime />
      </Grid>
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
            onClose();
          }}
          className={classes.option}
          variant="contained"
          color="primary">
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSelectDate;
