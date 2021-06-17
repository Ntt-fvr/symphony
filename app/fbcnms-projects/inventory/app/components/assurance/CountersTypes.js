/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {AutomationFlowsViewQuery} from '../automation/flows/view/__generated__/AutomationFlowsViewQuery.graphql';

import AddCounterItemForm from './AddCounterItemForm';
import CounterTypeItem from './CounterTypeItem';
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import {EditCounterItemForm} from './EditCounterItemForm';
import {Grid, List} from '@material-ui/core/';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

const CountersQuery = graphql`
  query CountersTypesQuery {
    counters {
      edges {
        node {
          id
          name
          networkManagerSystem
          externalID
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  listCarCounter: {
    listStyle: 'none',
  },
}));

const stateInitial = [
  {
    id: '2de30c42-9deb-40fc-a41f-05e62b5939a7',
    Counter_name: 'Freda',
    Network_Manager_System: 'Grady',
    Vendor_name: 'Ericsson',
    Counter_ID: '10',
    Family_Name: 'FredaGrady22221-7573',
  },
];

const CountersTypes = () => {
  const classes = useStyles();

  const data = useLazyLoadQuery<CountersTypesQuery>(CountersQuery, {});
  console.log(data);

  const [state, setState] = useState(stateInitial);
  const [showAddEditCard, setShowAddEditCard] = useState(false);

  const handleRemove = id => {
    const newList = state.filter(item => item.id !== id);
    setState(newList);
  };

  const showEditCounterItemForm = () => {
    ServerLogger.info(LogEvents.EDIT_COUNTER_ITEM_CLICKED);
    setShowAddEditCard(true);
  };

  const hideEditCounterItemForm = () => {
    setShowAddEditCard(false);
  };

  if (showAddEditCard) {
    return <EditCounterItemForm onClose={hideEditCounterItemForm} />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} sm={12} lg={12} xl={12}>
          <Text variant="h5">Cards Container</Text>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <List disablePadding="true">
            {state.map(item => (
              <li className={classes.listCarCounter} key={item.id}>
                <CounterTypeItem
                  CounterName={item.Counter_name}
                  NetworkManagerSystem={item.Network_Manager_System}
                  VendorName={item.Vendor_name}
                  CounterId={item.Counter_ID}
                  FamilyName={item.Family_Name}
                  onChange={() => handleRemove(item.id)}
                  edit={showEditCounterItemForm}
                />
              </li>
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddCounterItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default CountersTypes;
