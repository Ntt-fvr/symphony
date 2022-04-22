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
    color: symphony.palette.B800,
  },
  prueba: {
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
      borderColor: symphony.palette.B800,
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: symphony.palette.B800,
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const TooltipTime = withStyles(() => ({
  tooltip: {
    backgroundColor: symphony.palette.B800,
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
      color: symphony.palette.B800,
      borderRight: '10px solid transparent',
      borderLeft: '10px solid transparent',
      borderBottom: '10px solid transparent',
    },
  },
}))(Tooltip);

const steps = [
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
  '10 JUN 2022',
];

type Props = $ReadOnly<{||}>;

const StepperTimeLine = (props: Props) => {
  const {} = props;

  const classes = useStyles();

  return (
    <Stepper alternativeLabel connector={<QontoConnector />}>
      {steps.map(label => (
        <Step className={classes.prueba} key={label}>
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
