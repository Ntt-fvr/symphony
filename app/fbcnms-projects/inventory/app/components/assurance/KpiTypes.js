/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {graphql} from 'react-relay';
import {useLazyLoadQuery} from 'react-relay/hooks';
import RelayEnvironment from '../../common/RelayEnvironment';
import {fetchQuery} from 'relay-runtime';
import fbt from 'fbt';

// COMPONENTS //
import AddFormulaItemForm from './AddFormulaItemForm';
import AddKpiItemForm from './AddKpiItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import KpiTypeItem from './KpiTypeItem';
import TitleTextCardsKpi from './TitleTextCardsKpi';
import {EditKpiItemForm} from './EditKpiItemForm';

// MUTATIONS //
import type {
RemoveKpiMutationVariables,
} from '../../mutations/__generated__/RemoveKpiMutation.graphql';
import type {KpiTypesQuery} from './__generated__/KpiTypesQuery.graphql'
import RemoveKpiMutation from '../../mutations/RemoveKpiMutation';

// DESING SYSTEM //
import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  listCarKpi: {
    listStyle: 'none',
  },
}));

const KpiQuery = graphql`
  query KpiTypesQuery {
    kpis {
      edges {
        node {
          id
          name
          status
          domainFk {
            id
            name
          }
        }
      }
    }
  }
`;

type Kpis = {
  item: {
    node: {
      id: string,
      name: string,
      status: boolean,
      domainFk: {
        id : string,
        name: string,
      }
    },
  },
};

const KpiTypes = () => {
  const classes = useStyles();
  
  const [Datakpis, setDatakpis] = useState({})
  const [showEditCard, setShowEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  
  useEffect(() => {
    fetchQuery(RelayEnvironment, KpiQuery, {}).then(data => {
      setDatakpis(data);
    });
  }, [Datakpis]);

  const handleRemove = id => {
    const variables: RemoveKpiMutationVariables = {
      id: id,
    };
    RemoveKpiMutation(variables);
  };

  const showEditKpiItemForm = (kpis: Kpis) => {
    setShowEditCard(true);
    setDataEdit(kpis);
  };

  const hideEditKpiForm = () => {
    setShowEditCard(false);
  };

  if (showEditCard) {
    return (
      <EditKpiItemForm
        kpi={Datakpis.kpis?.edges.map(item => item.node)}
        formValues={dataEdit.item.node}
        hideEditKpiForm={hideEditKpiForm}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={9} xl={9}>
          <ConfigureTitle
            title={fbt('KPI (Key Performance Indicator)', 'Kpi Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Kpi description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <TitleTextCardsKpi />
          <List disablePadding>
            {Datakpis.kpis?.edges.map((item, index) => (
              <KpiTypeItem 
                key={index} 
                onChange={() => handleRemove(item.node.id)}
                edit={() => showEditKpiItemForm({item})}
                {...item.node} 
              />
              )) 
            }
          </List>  
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddKpiItemForm dataValues={Datakpis.kpis?.edges.map(item => item.node)} />
          <AddFormulaItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default KpiTypes;
