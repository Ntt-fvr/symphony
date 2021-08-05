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
  buttonPendig: {
    border: '1px solid #FFB63E',
    color: '#FFB63E',
    fontSize: '14px',
  },
  buttonClose: {
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
  buttonName: string,
|}>;

export const AlarmFilteringStatus = (props: Props) => {
  const {buttonName} = props;
  const classes = useStyles();
  const dataStatus = useLazyLoadQuery<AlarmFilteringStatusQuery>(
    AlarmStatusQuery,
    {},
  );
  
  const dataStatusResponse = dataStatus.alarmStatuss?.edges.map((item, index) => item.node).filter(item => item.name == buttonName)

  return (
    <>
      {dataStatusResponse.map((item, index) => {
        const alarmStatus = useFormInput(item.id);
        switch (buttonName) {
          case 'Active':
            return (
              <Button 
                {...alarmStatus}
                key={item.id}
                value={item.id}
                variant="outlined"
                weight="bold"
                className={classNames(classes.button, classes.buttonActive)}>
                {item.name}
              </Button>
            );
          case 'Pending':
            return (
              <Button
                {...alarmStatus}
                key={item.id}
                value={item.id}
                variant="outlined"
                weight="bold"
                className={classNames(classes.button, classes.buttonPendig)}>
                {item.name}
              </Button>
            );
          case 'Closed':
            return (
              <Button
                {...alarmStatus}
                key={item.id}
                value={item.id}
                variant="outlined"
                weight="bold"
                className={classNames(classes.button, classes.buttonClose)}>
                {item.name}
              </Button>
            );
          }
      })}
    </>
  );
};
