/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import AddCounterItemForm from './AddCounterItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import CounterTypeItem from './CounterTypeItem';
import React, {useState} from 'react';
import fbt from 'fbt';
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

const CountersTypes = () => {
  const classes = useStyles();

  const data = useLazyLoadQuery<CountersTypesQuery>(CountersQuery, {});
  const [state, setState] = useState(data);
  const [showAddEditCard, setShowAddEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const point = state.counters.edges;

  const handleRemove = id => {
    const newList = point.filter(item => item.node.id !== id);
    const edges = newList;
    const set = {counters: {edges}};
    setState(set);
  };
  const showEditCounterItemForm = (
    id,
    name,
    vendor,
    network,
    counterId,
    familyName,
  ) => {
    ServerLogger.info(LogEvents.EDIT_COUNTER_ITEM_CLICKED);
    setShowAddEditCard(true);
    setDataEdit({
      Id: id,
      Name: name,
      VendorName: vendor,
      NetworkManagerSystem: network,
      CounterID: counterId,
      FamilyName: familyName,
    });
  };

  const hideEditCounterItemForm = () => {
    setShowAddEditCard(false);
  };

  if (showAddEditCard) {
    return (
      <EditCounterItemForm
        formValues={dataEdit}
        onClose={hideEditCounterItemForm}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} sm={12} lg={9} xl={9}>
          <ConfigureTitle
<<<<<<< HEAD
            className={classes.title}
            title={fbt('Counters catalog', ' ')}
            subtitle={fbt(
              'Add and manage the types of ports that are used in your Cards Container. Once configured, these can be added to Cards Container in your Network Assurance.',
              ' ',
=======
            title={fbt('Counters catalog', 'Counters Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Counters description',
>>>>>>> frontend_staging
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <List disablePadding="true">
            {point.map(item => (
              <li className={classes.listCarCounter} key={item.node.id}>
                <CounterTypeItem
                  CounterName={item.node.name}
                  NetworkManagerSystem={item.node.networkManagerSystem}
                  VendorName={item.node.name}
                  CounterId={item.node.externalID}
                  FamilyName={item.node.networkManagerSystem}
                  onChange={() => handleRemove(item.node.id)}
                  edit={() =>
                    showEditCounterItemForm(
                      item.node.id,
                      item.node.name,
                      item.node.name,
                      item.node.networkManagerSystem,
                      item.node.externalID,
                      item.node.networkManagerSystem,
                    )
                  }
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
