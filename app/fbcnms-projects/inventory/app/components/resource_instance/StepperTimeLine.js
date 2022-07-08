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
import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';
import moment from 'moment';

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

const StepperTimeLineQuery = graphql`
  query StepperTimeLineQuery($filter: ResourceFilter) {
    queryResource(filter: $filter) {
      id
      name
      cmVersions {
        id
        status
        validFrom
        validTo
        parameters {
          id
          stringValue
          floatValue
          intValue
          parameterType {
            id
            name
            type
          }
        }
        createTime
      }
    }
  }
`;

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

type Props = $ReadOnly<{||}>;

const StepperTimeLine = (props: Props) => {
  const {CMSelected} = props;
  const classes = useStyles();

  const handleInfo = data => {
    return data;
  };

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const resourceId = urlParams.get('resource');

  const queryCMVersion = useLazyLoadQuery(StepperTimeLineQuery, {
    filter: {
      and: [
        {
          id: resourceId,
        },
      ],
    },
  });

  const formatDate = date => {
    const dateConvert = moment(date).format('DD MMM YYYY');
    return dateConvert;
  };

  const SelectedAndCurrent = label => {
    const currentVersion = queryCMVersion.queryResource[0].cmVersions.filter(
      item => item.status === 'CURRENT',
    );
    CMSelected(label, currentVersion);
  };

  return (
    <Stepper
      style={{direction: 'ltr'}}
      alternativeLabel
      connector={<QontoConnector />}>
      {queryCMVersion.queryResource[0].cmVersions.map(label => (
        <Step className={classes.stepItem} key={label.id}>
          <StepLabel
            onClick={() => handleInfo(label)}
            className={classes.stepLabelRoot}
            onClick={() => SelectedAndCurrent(label)}
            icon={
              <TooltipTime
                arrow={false}
                placement="top"
                title={formatDate(label.createTime)}>
                <FiberManualRecordIcon className={classes.stepLabelRoot} />
              </TooltipTime>
            }>
            <Text variant={'body1'} color={'gray'} weight={'bold'}>
              {formatDate(label.createTime)}
            </Text>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export {StepperTimeLine};
