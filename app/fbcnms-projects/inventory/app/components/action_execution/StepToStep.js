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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
    width: '30%',
    flexGrow: '0',
    margin: '0',
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
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'gray',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedStep: {
    fontSize: '28px',
    color: symphony.palette.B600,
    zIndex: 1,
  },
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 15px)',
    right: 'calc(50% + 15px)',
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
        <CheckCircleIcon className={classes.completedStep} />
      ) : (
        <div className={classes.circleStep}>2</div>
      )}
    </div>
  );
}

const steps = ['Action Definition', 'Schedule Action'];

type Props = $ReadOnly<{|
  activeStep: any,
|}>;

const StepToStep = (props: Props) => {
  const {activeStep} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper
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

export {StepToStep};
