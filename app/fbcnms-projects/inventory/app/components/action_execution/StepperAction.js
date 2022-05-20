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
import {StepToStep} from './StepToStep';
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
  isDialogSelectDate: boolean,
|}>;

const StepperAction = (props: Props) => {
  const {onClose, isDialogSelectDate} = props;
  const [isDialogConfirmChange, setIsDialogConfirmChange] = useState(
    isDialogSelectDate,
  );

  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectDate = useCallback(clickedDate => {
    const selectedDate = clickedDate?.id;
    setSelectedDate(selectedDate);
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

  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12}>
        <Card className={classes.title}>
          <Grid container justify={'center'}>
            <StepToStep activeStep={activeStep} />
          </Grid>
          <Grid>
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
                handleSelectDate();
                handleConfirmDate();
              }}
              className={classes.option}
              variant="contained"
              color="primary">
              Next
            </Button>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default StepperAction;
