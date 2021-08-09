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
import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useFormInput} from './common/useFormInput';
import moment from 'moment';
import classNames from 'classnames';

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

const AlarmStatusQuery = graphql`
  query AlarmFilteringStatusQuery {
    alarmStatus {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`;

type Props = $ReadOnly<{|
  valueButton: string,
  creationDate: string,
  beginDate: string,
  endDate: string,
|}>;

export const AlarmFilteringStatus = (props: Props) => {
  const {valueButton, creationDate, beginDate, endDate} = props;
  const classes = useStyles();
  const dataStatus = useLazyLoadQuery<AlarmFilteringStatusQuery>(
    AlarmStatusQuery,
    {},
  );
  
  const dataStatusResponse = dataStatus.alarmStatus?.edges.map((item, index) => item.node)
  

  return (
    <>
      {moment(creationDate).format() <= moment(beginDate).format() ||
        (moment(creationDate).format() <= moment(endDate).format() &&
          dataStatusResponse
            .filter(item => item.name == 'Active')
            .map(filteredItem => (
              <Button
              valueButton={filteredItem.id}
                value={filteredItem.id}
                variant="outlined"
                name="alarmStatus"
                className={classNames(classes.button, classes.buttonActive)}>
                {filteredItem.name}
              </Button>
            )))}
      {moment(creationDate).format() > moment(endDate).format() &&
        dataStatusResponse
          .filter(item => item.name == 'Closed')
          .map(filteredItem => (
            <Button
            valueButton={filteredItem.id}
              value={filteredItem.id}
              variant="outlined"
              weight="bold"
              name="alarmStatus"
              className={classNames(classes.button, classes.buttonClosed)}>
              {filteredItem.name}
            </Button>
          ))}
      {moment(creationDate).format() < moment(beginDate).format() &&
        dataStatusResponse
          .filter(item => item.name == 'Pending')
          .map(filteredItem => (
            <Button
            valueButton={filteredItem.id}
              value={filteredItem.id}
              variant="outlined"
              weight="bold"
              name="alarmStatus"
              className={classNames(classes.button, classes.buttonPending)}>
              {filteredItem.name}
            </Button>
          ))}
    </>
  );
};
