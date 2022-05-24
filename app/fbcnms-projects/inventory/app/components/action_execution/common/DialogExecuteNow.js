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
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
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
    width: '74px',
    height: '36px',
  },
}));

type Props = $ReadOnly<{|
  deleteItem?: () => void,
  open?: boolean,
  onClose: () => void,
|}>;

const DialogExecuteNow = (props: Props) => {
  const {onClose} = props;

  const classes = useStyles();
  return (
    <Dialog
      maxWidth="md"
      open={true}
      onClose={onClose}
      fullWidth={true}
      className={classes.root}>
      <Grid>
        <IconButton
          style={{
            position: 'relative',
            top: '0px',
            left: '0px',
          }}
          onClick={onClose}
          size={'small'}>
          <CloseIcon color="action" />
        </IconButton>
      </Grid>
      <Card variant={'message'}>
        <Grid style={{margin: '0 0 16px 16px'}} item xs={12}>
          <Text useEllipsis={true} weight={'medium'} variant={'subtitle1'}>
            The actions were executed on the following resources
          </Text>
        </Grid>
      </Card>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={() => {
            onClose();
          }}
          className={classes.option}
          variant="contained"
          color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogExecuteNow;
