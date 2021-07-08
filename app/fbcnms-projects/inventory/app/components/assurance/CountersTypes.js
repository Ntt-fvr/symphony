/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useState} from 'react';
import fbt from 'fbt';
import {graphql} from 'react-relay';
import {useLazyLoadQuery} from 'react-relay/hooks';

// MUTATIONS //
import type {CountersTypesQuery} from './__generated__/CountersTypesQuery.graphql';
import type {
  RemoveCountersTypesMutationResponse,
  RemoveCountersTypesMutationVariables,
} from '../../mutations/__generated__/RemoveCountersTypesMutation.graphql';

// COMPONENTS //
import AddCounterItemForm from './AddCounterItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import CounterTypeItem from './CounterTypeItem';
import RemoveCountersTypesMutation from '../../mutations/RemoveCountersTypesMutation';
import TitleTextCardsCounter from './TitleTextCardsCounter';
import {EditCounterItemForm} from './EditCounterItemForm';

import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

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

const CountersTypes = () => {
  const classes = useStyles();

  const data = useLazyLoadQuery<CountersTypesQuery>(CountersQuery, {});

  const [items, setItems] = useState(data);
  const [showAddEditCard, setShowAddEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const handleRemove = id => {
    const edges = items.counters.edges.filter(item => item.node.id !== id);
    const removeCounter = {counters: {edges}};
    setItems(removeCounter);
    const variables: RemoveCountersTypesMutationVariables = {
      id: id,
    };
    RemoveCountersTypesMutation(variables);
  };

  const showEditCounterItemForm = (counters: {}) => {
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
        <Grid item xs={12} sm={12} lg={9} xl={9}>
          <ConfigureTitle
            title={fbt('Counters Catalog', 'Counters Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Counters description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs="12" lg="9">
          <TitleTextCardsCounter />
          <List disablePadding="true">
            {items.counters.edges.map(item => (
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
          <AddCounterItemForm dataValues={items.counters.edges} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CountersTypes;
