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
import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';
import moment from 'moment';

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
    '&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
      backgroundColor: '#c2c3c5',
    },
  },
}));

const SelectDateTimeQuery = graphql`
  query SelectDateTimeQuery($filter: ResourceFilter) {
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
            type
          }
        }
        createTime
      }
    }
  }
`;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const resourceId = urlParams.get('resource');

type Props = $ReadOnly<{|
  handleSelectDate: any,
  selectedDateOpt: any,
|}>;

const SelectDateTime = (props: Props) => {
  const {handleSelectDate, selectedDateOpt} = props;
  const classes = useStyles();
  const queryCMVersion = useLazyLoadQuery(SelectDateTimeQuery, {
    filter: {
      and: [
        {
          id: resourceId,
        },
      ],
    },
  });
  const formatDate = date => {
    const dateConvert = moment(date).format('MM-DD-yyyy h:mm');
    return dateConvert;
  };

  return (
    <div className={classes.root}>
      <List className={classes.contenedor}>
        {queryCMVersion.queryResource[0].cmVersions.map(item => (
          <ListItem
            onClick={() => handleSelectDate(item)}
            className={classes.item}
            key={item.id}
            selected={selectedDateOpt === item.id}
            button>
            {formatDate(item.createTime)}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export {SelectDateTime};
