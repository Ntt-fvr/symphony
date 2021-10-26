/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
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
    padding: '40px',
    maxHeight: 'calc(100vh - 57px)',
  },
  table: {
    height: 'calc(100% - 46.25px)',
  },
  listContainer: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    paddingRight: '9px',
    height: 'calc(100% - 31.74px)',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    /* Estilos barra (thumb) de scroll */
    '&::-webkit-scrollbar-thumb': {
      background: '#9DA9BE',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: '#999999',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#313C48',
      boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.2)',
    },
    /* Estilos track de scroll */
    '&::-webkit-scrollbar-track': {
      background: '#e5e5e5',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track:hover, &::-webkit-scrollbar-track:active': {
      background: '#d4d4d4',
    },
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

  const [counterTypes, setCounterTypes] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState<Counters>({});

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, CountersQuery, {}).then(data => {
      setCounterTypes(data);
    });
  }, [setCounterTypes]);

  const handleRemove = id => {
    const variables: RemoveCountersTypesMutationVariables = {
      id: id,
    };
    RemoveCountersTypesMutation(variables, {onCompleted: () => isCompleted()});
  };

  const showEditCounterItemForm = (counters: Counters) => {
    setShowEditCard(true);
    setDataEdit(counters);
  };

  const hideEditCounterForm = () => {
    setShowEditCard(false);
  };

  const counterNames = counterTypes.counters?.edges.map(item => item.node.name);

  if (showEditCard) {
    return (
      <EditCounterItemForm
        counterNames={counterNames}
        formValues={dataEdit.item.node}
        hideEditCounterForm={hideEditCounterForm}
        isCompleted={isCompleted}
      />
    );
  }

  return (
    // <div className={classes.root}>
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={12}>
        <ConfigureTitle
          title={fbt('Counters Catalog', 'Counters Title')}
          subtitle={fbt(
            'Counters to be defined by users and used by performance management processes.',
            'Counters description',
          )}
        />
      </Grid>
      <Grid
        className={classes.table}
        item
        xs={12}
        sm={12}
        md={12}
        lg={9}
        xl={9}>
        <TitleTextCardsCounter />

        <List disablePadding className={classes.listContainer}>
          {counterTypes.counters?.edges.map(item => (
            <CounterTypeItem
              key={item.node?.id}
              handleRemove={() => handleRemove(item.node?.id)}
              edit={() => showEditCounterItemForm({item})}
              {...item.node}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
        <AddCounterItemForm
          isCompleted={isCompleted}
          counterNames={counterTypes.counters?.edges}
        />
      </Grid>
    </Grid>
  );
};

export default CountersTypes;
