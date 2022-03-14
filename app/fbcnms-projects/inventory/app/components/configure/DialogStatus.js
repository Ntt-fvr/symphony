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
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '700px',
    },
  },
  rootCard: {
    '&.root': {
      padding: '0px',
    },
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
  textarea: {
    minHeight: '60px',
    '& textarea': {
      height: '100%',
      overflow: 'auto',
      lineHeight: '1.5',
    },
  },
}));

type Props = $ReadOnly<{|
  deleteItem: () => void,
  name?: string,
  open?: boolean,
  onClose: () => void,
|}>;

const DialogStatus = (props: Props) => {
  const {onClose, deleteItem, name} = props;

  const classes = useStyles();
  return (
    <Dialog
      maxWidth="sm"
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
          <Text useEllipsis={true} weight={'bold'} variant={'h6'}>
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
        <Grid>
          <Card variant={'message'} className={classes.rootCard}>
            <Grid container direction="row">
              <Grid item xs={1}>
                <InfoOutlinedIcon color={'primary'} fontSize={'medium'} />
              </Grid>
              <Grid item xs={11}>
                <CardHeader>Information</CardHeader>
                <Text>
                  You are creating a new Change request in status Submited. This
                  will launch a flow for its execution. Are you sure?
                </Text>{' '}
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid>
          <Text
            style={{
              margin: '40px 0 25px 0px',
            }}
            useEllipsis={true}>
            Add a description or a justification for this new change request
            (Optional)
          </Text>
        </Grid>
        <TextField
          required
          fullWidth
          multiline
          rows={2}
          label="Description"
          variant="outlined"
          name="text_out"
          className={classes.textarea}
          inputProps={{maxLength: 200}}
          // onChange={handleChange}
        />
        <Grid />
      </Card>
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
            deleteItem();
          }}
          className={classes.option}
          variant="contained"
          color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogStatus;
