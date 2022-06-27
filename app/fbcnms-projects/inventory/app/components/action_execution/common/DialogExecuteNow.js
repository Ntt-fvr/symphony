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
import moment from 'moment';
import {actionExecutionTypes} from './ActionExecution-enums';
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
    padding: '6px 0',
    marginBottom: '30px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
    '&.MuiDialogActions-spacing > :not(:first-child)': {
      marginLeft: '20px',
    },
  },
  option: {
    width: '111px',
    height: '36px',
  },
}));

type Props = $ReadOnly<{|
  onSave?: () => void,
  name?: string,
  open?: boolean,
  execDetails: {},
  execType: string,
  onClose: () => void,
  dataRow: any,
|}>;

const DialogExecuteNow = (props: Props) => {
  const {onSave, onClose, dataRow, resourceSpec} = props;

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
            justifyContent: 'flex-end',
            marginBottom: '30px',
          }}>
          <IconButton
            style={{
              position: 'relative',
              top: '0px',
              right: '-7px',
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
                <InfoOutlinedIcon color={'primary'} />
              </Grid>
              <Grid container item xs={11}>
                <Grid item xs={12}>
                  <CardHeader>Are you sure to run the action now?</CardHeader>
                  {props.execType == actionExecutionTypes.ManualExecution ? (
                    <Text>
                      This will perform the action inmediately on the selected
                      resource and cannot be undone
                    </Text>
                  ) : (
                    ''
                  )}
                </Grid>
                <Grid
                  style={{marginTop: '20px'}}
                  container
                  direction="column"
                  item
                  xs={2}>
                  <Text useEllipsis={true} weight="bold">
                    Action:
                  </Text>
                  {props.execType == actionExecutionTypes.OneTimeExecution ? (
                    <Text useEllipsis={true} weight="bold">
                      Date:
                    </Text>
                  ) : (
                    ''
                  )}
                  {props.execType == actionExecutionTypes.OneTimeExecution ? (
                    <Text useEllipsis={true} weight="bold">
                      Hour:
                    </Text>
                  ) : (
                    ''
                  )}
                  <Text useEllipsis={true} weight="bold">
                    Resource:
                  </Text>
                </Grid>
                <Grid
                  style={{marginTop: '20px'}}
                  container
                  direction="column"
                  item
                  xs={2}>
                  <Text>{dataRow.actionTemplate.name}</Text>
                  {props.execType == actionExecutionTypes.OneTimeExecution ? (
                    <Text>
                      {moment(props.execDetails.date).format('MM/DD/YYYY')}
                    </Text>
                  ) : (
                    ''
                  )}
                  {props.execType == actionExecutionTypes.OneTimeExecution ? (
                    <Text>{moment(props.execDetails.hour).format('LT')}</Text>
                  ) : (
                    ''
                  )}
                  <Text>{resourceSpec}</Text>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
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
            onSave();
            onClose();
          }}
          className={classes.option}
          variant="contained"
          color="primary">
          {props.execType == actionExecutionTypes.ManualExecution
            ? 'Confirm'
            : !props.execType
            ? 'Execute Now'
            : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogExecuteNow;
