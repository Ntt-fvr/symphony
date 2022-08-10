/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import type {DeleteResourceMutationVariables} from '../../mutations/__generated__/DeleteResourceMutation.graphql';

import DeleteResourceMutation from '../../mutations/DeleteResourceMutation';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React, {useCallback, useState} from 'react';
import Text from '@symphony/design-system/components/Text';
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
}));

const ModalDelete = props => {
  const {onClose, infoResource} = props;

  const classes = useStyles();

  const handleClick = () => {
    const variables: DeleteResourceMutationVariables = {
      filter: {id: infoResource.idResource},
    };
    DeleteResourceMutation(variables, {
      onCompleted: () => {
        window.location.reload()
      },
    });
  };



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
          <Card variant={'warning'} className={classes.rootCard}>
            <Grid container direction="row">
              <Grid item xs={1}>
                <InfoOutlinedIcon color={'error'} />
              </Grid>
              <Grid item xs={11}>
                <CardHeader>Warning</CardHeader>
                <Text>Are you sure you want to delete the resource?</Text>{' '}
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
            The resource and all their relationships will be deleted
          </Text>
          <Text weight="bold" useEllipsis={true}>
            {infoResource.nameResource}
          </Text>
        </Grid>

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
          onClick={handleClick}
          className={classes.option}
          variant="contained"
          color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalDelete;
