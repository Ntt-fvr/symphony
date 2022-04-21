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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '350px',
    flexGrow: '0',
    margin: '0',
  },
  stepperRoot: {
    background: '#F5F7FC',
  },
  stepLabelRoot: {
    color: 'blue',
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
      borderColor: 'blue',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: 'blue',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const steps = ['Select Date', 'Confirm Change'];

type Props = $ReadOnly<{||}>;

const StepperDate = (props: Props) => {
  const {} = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepperRoot}
        alternativeLabel
        connector={<QontoConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel
              className={classes.stepLabelRoot}
              icon={<FiberManualRecordIcon />}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export {StepperDate};
