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
import LensIcon from '@material-ui/icons/Lens';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import classNames from 'classnames';
import symphony from '@symphony/design-system/theme/symphony';
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
    color: symphony.palette.D400,
  },
  completedStep: {
    fontSize: '16px',
    color: symphony.palette.B600,
    zIndex: 1,
  },
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 7px)',
    right: 'calc(50% + 7px)',
  },
  active: {
    '& $line': {
      borderColor: symphony.palette.B600,
    },
  },
  completed: {
    '& $line': {
      borderColor: symphony.palette.B600,
    },
  },
  line: {
    borderColor: symphony.palette.D400,
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
    </div>
  );
};

export {StepperDate};
