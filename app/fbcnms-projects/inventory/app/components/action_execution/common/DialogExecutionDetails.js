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
  name?: string,
  open?: boolean,
  onClose: () => void,
|}>;

const DialogExecutionDetails = (props: Props) => {
  const {onClose, name} = props;

  const classes = useStyles();
  return (
    <Dialog
      maxWidth="md"
      open={true}
      onClose={onClose}
      fullWidth={true}
      className={classes.root}>
      <Card variant={'none'}>
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}>
          <Text useEllipsis={true} variant={'h5'}>
            {name}
          </Text>
          <IconButton
            style={{
              position: 'relative',
              top: '0px',
              right: '0px',
            }}
            onClick={onClose}
            size={'small'}>
            <CloseIcon color="action" />
          </IconButton>
        </Grid>
        <Grid style={{margin: '0 0 16px 16px'}} item xs={12}>
          <Text useEllipsis={true} weight={'medium'} variant={'subtitle1'}>
            The actions were executed on the following resources
          </Text>
        </Grid>
        <Grid style={{padding: '16px'}} container direction="row">
          <Grid item xs={3}>
            <Text useEllipsis={true} weight={'bold'} variant={'body1'}>
              Action:
            </Text>
            <Text useEllipsis={true} weight={'bold'} variant={'body1'}>
              Date:
            </Text>
            <Text useEllipsis={true} weight={'bold'} variant={'body1'}>
              Hours:
            </Text>
            <Text useEllipsis={true} weight={'bold'} variant={'body1'}>
              Resource Type:
            </Text>
            <Text useEllipsis={true} weight={'bold'} variant={'body1'}>
              Resource Specification:
            </Text>
          </Grid>
          <Grid item xs={9}>
            <Text useEllipsis={true} variant={'subtitle1'}>
              Action
            </Text>
            <Text useEllipsis={true} variant={'subtitle1'}>
              Date
            </Text>
            <Text useEllipsis={true} variant={'subtitle1'}>
              Hours
            </Text>
            <Text useEllipsis={true} variant={'subtitle1'}>
              Resource Type
            </Text>
            <Text useEllipsis={true} variant={'subtitle1'}>
              Resource Specification
            </Text>
          </Grid>
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

export default DialogExecutionDetails;
