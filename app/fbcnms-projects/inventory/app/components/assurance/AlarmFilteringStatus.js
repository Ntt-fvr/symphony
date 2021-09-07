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
import {makeStyles} from '@material-ui/styles';

import classNames from 'classnames';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  button: {
    width: '111px',
    height: '36px',
  },
  buttonActive: {
    border: '1px solid #00AF5B',
    color: '#00AF5B',
    fontSize: '14px',
  },
  buttonPending: {
    border: '1px solid #FFB63E',
    color: '#FFB63E',
    fontSize: '14px',
  },
  buttonClosed: {
    border: '1px solid #8895AD',
    color: '#8895AD',
    fontSize: '14px',
  },
}));

type Props = $ReadOnly<{|
  creationDate: string,
  beginDate: string,
  endDate: string,
|}>;

export const AlarmFilteringStatus = (props: Props) => {
  const {creationDate, beginDate, endDate} = props;
  const classes = useStyles();

  return (
    <>
      {moment(creationDate).format() <= moment(beginDate).format() ||
        (moment(creationDate).format() <= moment(endDate).format() && (
          <Button
            variant="outlined"
            name="alarmStatus"
            className={classNames(classes.button, classes.buttonActive)}>
            {'Active'}
          </Button>
        ))}
      {moment(creationDate).format() > moment(endDate).format() && (
        <Button
          variant="outlined"
          weight="bold"
          name="alarmStatus"
          className={classNames(classes.button, classes.buttonClosed)}>
          {'Closed'}
        </Button>
      )}
      {moment(creationDate).format() < moment(beginDate).format() &&
        moment(creationDate).format() < moment(endDate).format() && (
          <Button
            variant="outlined"
            weight="bold"
            name="alarmStatus"
            className={classNames(classes.button, classes.buttonPending)}>
            {'Pending'}
          </Button>
        )}
    </>
  );
};
