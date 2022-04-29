/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Button from '@material-ui/core/Button';
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LensIcon from '@material-ui/icons/Lens';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    flexGrow: '0',
    margin: '0',
  },
  stepperRoot: {
    background: '#F5F7FC',
  },
  stepLabelRoot: {
    color: 'blue',
  },
  rootStep: {
    color: 'yellow',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  activeStep: {
    color: '#784af4',
  },
  circleStep: {
    fontSize: '16px',
    color: 'black',
  },
  completedStep: {
    fontSize: '16px',
    color: 'red',
    zIndex: 1,
  },
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 9px)',
    right: 'calc(50% + 9px)',
  },
  active: {
    '& $line': {
      borderColor: 'red',
    },
  },
  completed: {
    '& $line': {
      borderColor: 'green',
    },
  },
  line: {
    borderColor: 'black',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

function QontoStepIcon(props) {
  const classes = useStyles();
  const {active, completed} = props;

  return (
    <div
      className={classNames(classes.rootStep, {
        [classes.activeStep]: active,
      })}>
      {completed ? (
        <LensIcon className={classes.completedStep} />
      ) : (
        <PanoramaFishEyeIcon className={classes.circleStep} />
      )}
    </div>
  );
}

const steps = ['Select Date', 'Confirm Change'];

type Props = $ReadOnly<{|
  activeStep: any,
|}>;

const StepperDate = (props: Props) => {
  const {activeStep} = props;
  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1);
  // };

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepperRoot}
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              className={classes.stepLabelRoot}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* <div>
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Fecha
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export {StepperDate};
