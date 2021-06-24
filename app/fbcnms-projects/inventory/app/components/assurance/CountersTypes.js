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
import TitleTextCards from './TitleTextCards';
import fbt from 'fbt';
import {EditCounterItemForm} from './EditCounterItemForm';
import {Grid, List} from '@material-ui/core/';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

import React, {useState} from 'react';
const CountersQuery = graphql`
  query CountersTypesQuery {
    counters {
      edges {
        node {
          id
          name
          networkManagerSystem
          externalID
          countervendorformula {
            id
            mandatory
          }
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
  powerSearchContainer: {
    margin: '10px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
}));

const CountersTypes = () => {
  const classes = useStyles();

  const data = useLazyLoadQuery<CountersTypesQuery>(CountersQuery, {});
  const [state, setState] = useState(data);
  const [showAddEditCard, setShowAddEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const counterItems = state.counters.edges;

  const handleRemove = id => {
    const edges = counterItems.filter(item => item.node.id !== id);
    const removeCounter = {counters: {edges}};
    setState(removeCounter);
  };

  const showEditCounterItemForm = (counters: {}) => {
    ServerLogger.info(LogEvents.EDIT_COUNTER_ITEM_CLICKED);
    setShowAddEditCard(true);
    setDataEdit(counters);
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
            title={fbt('Counters catalog', 'Counters Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Counters description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs="12" lg="9">
          <TitleTextCards />
          <List disablePadding="true">
            {counterItems.map(item => (
              <li className={classes.listCarCounter} key={item.node.id}>
                <CounterTypeItem
                  counter={item.node}
                  onChange={() => handleRemove(item.node.id)}
                  edit={() =>
                    showEditCounterItemForm({
                      Id: item.node.id,
                      Name: item.node.name,
                      VendorName: item.node.name,
                      NetworkManagerSystem: item.node.networkManagerSystem,
                      CounterID: item.node.externalID,
                      FamilyName: item.node.networkManagerSystem,
                    })
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
