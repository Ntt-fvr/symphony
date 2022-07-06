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
    '&:active': {
      color: symphony.palette.B300,
    },
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
  {date: '1 JUN 2022', id: '1'},
  {date: '2 JUN 2022', id: '2'},
  {date: '3 JUN 2022', id: '3'},
  {date: '4 JUN 2022', id: '4'},
  {date: '5 JUN 2022', id: '5'},
  {date: '6 JUN 2022', id: '6'},
  {date: '7 JUN 2022', id: '7'},
  {date: '8 JUN 2022', id: '8'},
  {date: '9 JUN 2022', id: '9'},
  {date: '10 JUN 2022', id: '10'},
  {date: '11 JUN 2022', id: '11'},
  {date: '12 JUN 2022', id: '12'},
  {date: '13 JUN 2022', id: '13'},
  {date: '14 JUN 2022', id: '14'},
  {date: '15 JUN 2022', id: '15'},
  {date: '16 JUN 2022', id: '16'},
  {date: '17 JUN 2022', id: '17'},
  {date: '18 JUN 2022', id: '18'},
  {date: '19 JUN 2022', id: '19'},
  {date: '20 JUN 2022', id: '20'},
];

type Props = $ReadOnly<{||}>;

const StepperTimeLine = (props: Props) => {
  const {} = props;

  const classes = useStyles();

  const handleInfo = data => {
    return data;
  };

  return (
    <Stepper
      style={{direction: 'ltr'}}
      alternativeLabel
      connector={<QontoConnector />}>
      {steps.map(label => (
        <Step className={classes.stepItem} key={label.id}>
          <StepLabel
            onClick={() => handleInfo(label)}
            className={classes.stepLabelRoot}
            icon={
              <TooltipTime arrow={false} placement="top" title={label.date}>
                <FiberManualRecordIcon className={classes.stepLabelRoot} />
              </TooltipTime>
            }>
            <Text variant={'body1'} color={'gray'} weight={'bold'}>
              {label.date}
            </Text>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export {StepperTimeLine};
