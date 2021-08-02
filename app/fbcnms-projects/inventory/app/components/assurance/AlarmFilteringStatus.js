/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Button from '@material-ui/core/Button';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';
import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';

import classNames from 'classnames';

const useStyles = makeStyles(() => ({
  button: {
    width: '111px',
    height: '36px',
  },
  buttonActive: {
    border: '1px solid green',
  },
  buttonPendig: {
    border: '1px solid orange',
  },
  buttonClose: {
    border: '1px solid gray',
  },
  textActive: {
    color: 'green',
  },
  textPending: {
    color: 'orange',
  },
  textClosed: {
    color: 'gray',
  },
}));

const AlarmStatusQuery = graphql`
  query AlarmFilteringStatusQuery {
    alarmStatuss{
      edges{
        node{
          name
          id
        }
      }
    }
  }
`;


export const StatusActive = () => {
  const classes = useStyles();
  const dataStatus = useLazyLoadQuery<AlarmFilteringStatusQuery>(AlarmStatusQuery, {});
  return (
    <div>
      <Button
        variant="outlined"
        weight="bold"
        className={classNames(classes.button, classes.buttonActive)}>
        <Text className={classes.textActive} variant="subtitle2">
          Active
        </Text>
      </Button>
    </div>
  );
};

export const StatusPending = () => {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        weight="bold"
        className={classNames(classes.button, classes.buttonPendig)}>
        <Text className={classes.textPending} variant="subtitle2">
          Pending
        </Text>
      </Button>
    </div>
  );
};

export const StatusClosed = () => {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        weight="bold"
        className={classNames(classes.button, classes.buttonClose)}>
        <Text className={classes.textClosed} variant="subtitle2">
          Closed
        </Text>
      </Button>
    </div>
  );
};
