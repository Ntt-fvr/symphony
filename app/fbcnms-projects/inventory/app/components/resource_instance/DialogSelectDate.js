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
import DialogConfirmChange from './DialogConfirmChange';
import Grid from '@material-ui/core/Grid';
import React, {useCallback, useState} from 'react';
import {SelectDateTime} from './SelectDateTime';
import {StepperDate} from './StepperDate';
import {makeStyles} from '@material-ui/styles';
import moment from 'moment';
import {useMainContext} from '../MainContext';
import AddRequestChangeMutation from '../../mutations/AddRequestChangeMutation';

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
  isDialogSelectDate: boolean,
|}>;

const DialogSelectDate = (props: Props) => {
  const {onClose, isDialogSelectDate} = props;
  const [isDialogConfirmChange, setIsDialogConfirmChange] = useState(
    isDialogSelectDate,
  );

  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const {me} = useMainContext();

  const TYPES = {
    string: 'stringValue',
    int: 'intValue',
    float: 'floatValue',
    enum: 'stringValue',
  };

  const DATE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss';

  const handleSelectDate = useCallback(clickedDate => {
    setSelectedDate(clickedDate);
    setActiveStep(1);
  }, []);
  const handleConfirmDate = () => {
    setActiveStep(2);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleClickOpenConfirmChange = () => {
    setIsDialogConfirmChange(prev => !prev);
  };

  const createChangeRequest = () => {
    const createdTime = moment(new Date()).format(DATE_FORMAT);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const resourceId = urlParams.get('resource');
    const variables: AddRequestChangeMutationVariables = {
      input: [
        {
          description: 'this is a description',
          createTime: createdTime,
          updateTime: createdTime,
          items: selectedDate.parameters.map(param => {
            console.log(param);
            return {
              [TYPES[param.parameterType.type]]:
                param[TYPES[param.parameterType.type]],
              resource: {id: resourceId},
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
            time: null,
            weekDay: null,
            type: 'AS_SOON_AS_APPROVED',
          },
        },
      ],
    };

    const callbacks: MutationCallbacks<AddRequestChangeMutationResponse> = {
      onCompleted: (response, errors) => {
        if (errors && errors[0]) {
          _enqueueError(errors[0].message);
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
    <div>
      <Dialog
        maxWidth="xs"
        open={true}
        onClose={onClose}
        fullWidth={true}
        className={classes.root}>
        {isDialogConfirmChange ? (
          <div>
            <Grid container justify={'center'}>
              <StepperDate activeStep={activeStep} />
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
              <SelectDateTime
                selectedDateOpt={selectedDate}
                handleSelectDate={handleSelectDate}
              />
            </Grid>
            <DialogActions className={classes.dialogActions}>
              <Button
                className={classes.option}
                variant="outlined"
                color="primary"
                onClick={() => {
                  onClose();
                  handleBack();
                }}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleClickOpenConfirmChange();
                  handleConfirmDate();
                }}
                className={classes.option}
                variant="contained"
                color="primary"
                disabled={activeStep === 0 ? true : false}>
                Next
              </Button>
            </DialogActions>
          </div>
        ) : (
          <DialogConfirmChange
            handleBackStep={handleBack}
            activeStep={activeStep}
            onClose={onClose}
            setIsDialogConfirmChange={setIsDialogConfirmChange}
            createChangeRequest={createChangeRequest}
          />
        )}
      </Dialog>
    </div>
  );
};

export default DialogSelectDate;
