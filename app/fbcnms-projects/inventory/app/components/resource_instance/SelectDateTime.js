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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxHeight: 400,
    maxWidth: 'auto',
    backgroundColor: 'white',
  },
  contenedor: {
    height: 300,
    margin: '0 20px',
    overflow: 'auto',
    paddingRight: '9px',
    maxHeight: 'calc(95vh - 156px)',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: symphony.palette.D300,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: symphony.palette.D200,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: symphony.palette.D400,
    },
    '&::-webkit-scrollbar-track': {
      background: symphony.palette.D100,
      borderRadius: '4px',
    },
  },
  item: {
    '&:hover': {
      backgroundColor: '#EDF0F9',
    },
  },
}));
const dateTime = [
  '01-01-2022 - 01:00',
  '01-01-2022 - 02:00',
  '01-01-2022 - 03:00',
  '01-01-2022 - 04:00',
  '01-01-2022 - 05:00',
  '01-01-2022 - 06:00',
  '01-01-2022 - 07:00',
  '01-01-2022 - 08:00',
  '01-01-2022 - 09:00',
  '01-01-2022 - 10:00',
  '01-01-2022 - 11:00',
  '01-01-2022 - 12:00',
];

type Props = $ReadOnly<{||}>;

const SelectDateTime = (props: Props) => {
  const {} = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.contenedor}>
        {dateTime.map((item, index) => (
          <ListItem className={classes.item} key={index} button>
            {item}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export {SelectDateTime};
