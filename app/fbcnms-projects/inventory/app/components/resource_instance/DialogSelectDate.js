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
import React, {useState} from 'react';
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
  isDialogSelectDate: boolean,
|}>;

const DialogSelectDate = (props: Props) => {
  const {onClose, isDialogSelectDate} = props;
  const [isDialogConfirmChange, setIsDialogConfirmChange] = useState(
    isDialogSelectDate,
  );

  const [activeStep, setActiveStep] = React.useState(0);

  const handleSelectDate = item => {
    console.log(item);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
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
              <SelectDateTime handleSelectDate={handleSelectDate} />
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
                  handleSelectDate();
                }}
                className={classes.option}
                variant="contained"
                color="primary">
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
          />
        )}
      </Dialog>
    </div>
  );
};

export default DialogSelectDate;
