/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
 import type {
  AddRequestChangeMutationResponse,
  AddRequestChangeMutationVariables,
} from '../../mutations/__generated__/AddRequestChangeMutation.graphql';

import AddRequestChangeMutation from '../../mutations/AddRequestChangeMutation';
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
import SnackbarItem from '@fbcnms/ui/components/SnackbarItem';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useMainContext} from '../MainContext';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {graphql} from 'relay-runtime';

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

const DialogStatusBulkQuery = graphql`
  query DialogStatusBulkQuery {
    queryResource {
      id
      name
    }
    queryConfigurationParameterType {
      id
      name
    }
  }
`;

type Props = $ReadOnly<{|
  onClick: () => void,
  name?: string,
  open?: boolean,
  onClose: () => void,
|}>;

const TYPES = {
  string: 'stringValue',
  int: 'intValue',
  float: 'floatValue',
  enum: 'stringValue',
};

const DATE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss';

const DialogStatus = (props: Props) => {
  const {onClose, name, onClick, schedule, infoCSV} = props;
  const enqueueSnackbar = useEnqueueSnackbar();
  const [filter, setFilters] = useState({});
  const {me} = useMainContext();
  const [description, setDescription] = useState('');
  const queryResourceParameter = useLazyLoadQuery(DialogStatusBulkQuery, {});

  const _enqueueError = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        children: key => (
          <SnackbarItem id={key} message={message} variant="error" />
        ),
      });
    },
    [enqueueSnackbar],
  );

  const handleOnClose = () => {
    onChangeDescription('');
    onClose();
  };

  const handleOnSave = () => {
    const createdTime = moment(new Date()).format(DATE_FORMAT);
    const itemsChangeRequest = [];

    infoCSV.pop();
    infoCSV.map(item => {
      const idResource = queryResourceParameter.queryResource.filter(
        query => query.name === item.resources
      );
      const idParameterType = queryResourceParameter.queryConfigurationParameterType.filter(
        query => query.name === item.parameter
      );

      const newValue = item.newValue;

      const itemChange = {
        resource: {
          id: idResource[0].id,
        },
        parameterType: {
          id: idParameterType[0].id,
        },
        stringValue: newValue.toString(),
      };

      itemsChangeRequest.push(itemChange);
    });

    const variables: AddRequestChangeMutationVariables = {
      input: [
        {
          description: description,
          createTime: createdTime,
          updateTime: createdTime,
          items: itemsChangeRequest,
          activities: [
            {
              activityType: 'CREATION_DATE',
              author: me.user.id,
              createTime: createdTime,
            },
            {
              activityType: 'STATUS',
              author: me.user.id,
              createTime: createdTime,
              oldValue: null,
              newValue: 'SUBMITTED',
            },
          ],
          type: 'MANUAL',
          source: 'GUI',
          status: 'SCHEDULED',
          requester: me.user.id,
          scheduler: {
            time:
              schedule.type === 'SCHEDULED_CHANGE'
                ? moment(schedule.date).format(DATE_FORMAT)
                : null,
            weekDay: schedule.type === 'SCHEDULED_CHANGE' ? schedule.day : null,
            type: schedule.type,
          },
        },
      ],
    };

    const callbacks: MutationCallbacks<AddRequestChangeMutationResponse> = {
      onCompleted: (response, errors) => {
        if (errors && errors[0]) {
          _enqueueError(errors[0].message);
        } else {
          // navigate to main page
          onClick();
        }
      },
      onError: (error: Error) => {
        _enqueueError(getGraphError(error));
      },
    };

    AddRequestChangeMutation(variables, callbacks);
  };

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
                <InfoOutlinedIcon color={'primary'} />
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
          fullWidth
          multiline
          rows={2}
          label="Description"
          variant="outlined"
          name="text_out"
          onChange={e => setDescription(e.target.value)}
          value={description}
          className={classes.textarea}
          inputProps={{maxLength: 200}}
        />
        <Grid />
      </Card>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.option}
          variant="outlined"
          color="primary"
          onClick={handleOnClose}>
          Cancel
        </Button>
        <Button
          onClick={handleOnSave}
          className={classes.option}
          variant="contained"
          color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogStatus;