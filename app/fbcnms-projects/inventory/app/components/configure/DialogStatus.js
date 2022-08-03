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
import type {FlowStartMutationVariables} from '../../mutations/__generated__/FlowStartMutation.graphql';

import FlowStartMutation from '../../mutations/FlowStartMutation';
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
import React, {useCallback} from 'react';
import SnackbarItem from '@fbcnms/ui/components/SnackbarItem';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import {getGraphError} from '../../common/EntUtils';
import {makeStyles} from '@material-ui/styles';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useMainContext} from './../../components/MainContext';
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

const DialogStatusQuery = graphql`
  query DialogStatusQuery($filterBy: [FlowFilterInput!]) {
    flows(filterBy: $filterBy) {
      edges {
        node {
          id
          name
          status
          newInstancesPolicy
          cmType
        }
        cursor
      }
    }
  }
`;

const DialogStatus = (props: Props) => {
  const {
    onClose,
    name,
    onClick,
    description,
    onChangeDescription,
    parameters,
    resource,
    schedule,
    'data-testid': dataTestId,
  } = props;
  const enqueueSnackbar = useEnqueueSnackbar();
  const {me} = useMainContext();
  const queryResourceParameter = useLazyLoadQuery(DialogStatusQuery, {
    filterBy: [
      {
        filterType: 'FLOW_CM_TYPE',
        operator: 'IS',
        cmType: 'GENERAL_CM',
      },
    ],
  });

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
    const variables: AddRequestChangeMutationVariables = {
      input: [
        {
          description: description,
          createTime: createdTime,
          updateTime: createdTime,
          items: parameters.map(param => {
            return {
              [TYPES[param.parameterType.type]]: param.newValue,
              resource: {id: resource.id},
              parameterType: {
                id: param.parameterType.id,
              },
            };
          }),
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
          
          const createdTime = moment(new Date()).format(
            'YYYY-MM-DD[T]HH:mm:ssZ',
          );
          const data = {
            flowID: queryResourceParameter.flows.edges[0].node.id,
            params: [
              {
                variableDefinitionKey: 'changeId',
                value: response.addChangeRequest.changeRequest[0].id,
              },
            ],
            startDate: createdTime,
          };

          const variables: FlowStartMutationVariables = {
            input: data,
          };
          FlowStartMutation(variables, {
            onCompleted: () => {},
          });
        }
      },
      onError: (error: Error) => {
        _enqueueError(getGraphError(error));
      },
    };
    onClick();

    AddRequestChangeMutation(variables, callbacks);
  };

  const classes = useStyles();
  return (
    <div data-testid={dataTestId}>
      <Dialog
        maxWidth="sm"
        open={true}
        onClose={onClose}
        fullWidth={true}
        data-testid={dataTestId}
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
                    You are creating a new Change request in status Submited.
                    This will launch a flow for its execution. Are you sure?
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
            onChange={e => onChangeDescription(e.target.value)}
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogStatus;
