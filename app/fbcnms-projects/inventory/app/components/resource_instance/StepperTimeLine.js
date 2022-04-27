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
import Text from '@symphony/design-system/components/Text';
import Tooltip from '@material-ui/core/Tooltip';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    flexGrow: '0',
    margin: '0',
  },
  stepLabelRoot: {
    color: symphony.palette.B600,
  },
  stepItem: {
    minWidth: '180px',
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      marginTop: '-48px',
    },
  },
}));
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
  },
  active: {
    '& $line': {
      borderColor: symphony.palette.B600,
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: symphony.palette.B600,
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const TooltipTime = withStyles(() => ({
  tooltip: {
    backgroundColor: symphony.palette.B600,
    color: 'white',
    maxWidth: 220,
    fontSize: '14px',
    width: '140px',
    height: '30px',
    position: 'absolute',
    top: '-50px',
    left: '-55px',
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '27px',
      left: '45px',
      borderTop: '10px solid',
      color: symphony.palette.B600,
      borderRight: '10px solid transparent',
      borderLeft: '10px solid transparent',
      borderBottom: '10px solid transparent',
    },
  },
}))(Tooltip);

const steps = [
  '1 JUN 2022',
  '2 JUN 2022',
  '3 JUN 2022',
  '4 JUN 2022',
  '5 JUN 2022',
  '6 JUN 2022',
  '7 JUN 2022',
  '8 JUN 2022',
  '9 JUN 2022',
  '10 JUN 2022',
  '11 JUN 2022',
  '12 JUN 2022',
  '13 JUN 2022',
  '14 JUN 2022',
  '15 JUN 2022',
  '16 JUN 2022',
  '17 JUN 2022',
  '18 JUN 2022',
  '19 JUN 2022',
  '20 JUN 2022',
];

type Props = $ReadOnly<{||}>;

const StepperTimeLine = (props: Props) => {
  const {} = props;

  const classes = useStyles();

  return (
    <Stepper alternativeLabel connector={<QontoConnector />}>
      {steps.map((label, index) => (
        <Step className={classes.stepItem} key={index}>
          <StepLabel
            className={classes.stepLabelRoot}
            icon={
              <TooltipTime arrow={false} placement="top" title={label}>
                <FiberManualRecordIcon className={classes.stepLabelRoot} />
              </TooltipTime>
            }>
            <Text variant={'body1'} color={'gray'} weight={'bold'}>
              {label}
            </Text>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export {StepperTimeLine};
