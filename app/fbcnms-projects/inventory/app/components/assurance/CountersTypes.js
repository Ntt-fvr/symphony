/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import fbt from 'fbt';
import {fetchQuery, graphql} from 'relay-runtime';

// MUTATIONS //
import type {RemoveCountersTypesMutationVariables} from '../../mutations/__generated__/RemoveCountersTypesMutation.graphql';

// COMPONENTS //
import AddCounterItemForm from './AddCounterItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import CounterTypeItem from './CounterTypeItem';
import EditCounterItemForm from './EditCounterItemForm';
import RemoveCountersTypesMutation from '../../mutations/RemoveCountersTypesMutation';
import TitleTextCardsCounter from './TitleTextCardsCounter';

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
          counterFamily {
            id
            name
          }
          vendorFk {
            id
            name
          }
        }
      }
    }
  }
`;

type Counters = {
  item: {
    node: {
      id: string,
      name: string,
      externalID: string,
      networkManagerSystem: string,
      counterFamily: {
        name: string,
      },
      vendorFk: {
        id: string,
        name: string,
      },
    },
  },
};

const CountersTypes = () => {
  const classes = useStyles();

  const [items, setItems] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState<Counters>({});

  useEffect(() => {
    fetchQuery(RelayEnvironment, CountersQuery, {}).then(data => {
      setItems(data);
    });
  }, [items]);

  const handleRemove = id => {
    const variables: RemoveCountersTypesMutationVariables = {
      id: id,
    };
    RemoveCountersTypesMutation(variables);
  };

  const showEditCounterItemForm = (counters: Counters) => {
    setShowEditCard(true);
    setDataEdit(counters);
  };

  const hideEditCounterForm = () => {
    setShowEditCard(false);
  };

  const counterNames = items.counters?.edges.map(item => item.node.name);

  if (showEditCard) {
    return (
      <EditCounterItemForm
        counterNames={counterNames}
        formValues={dataEdit.item.node}
        hideEditCounterForm={hideEditCounterForm}
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
              'Counters to be defined by users and used by performance management processes.',
              'Counters description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs={12} lg={9}>
          <TitleTextCardsCounter />
          <List disablePadding>
            {items.counters?.edges.map(item => (
              <CounterTypeItem
                key={item.node?.id}
                handleRemove={() => handleRemove(item.node?.id)}
                edit={() => showEditCounterItemForm({item})}
                {...item.node}
              />
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddCounterItemForm counterNames={items.counters?.edges} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CountersTypes;
