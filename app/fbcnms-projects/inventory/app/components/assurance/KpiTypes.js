/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

 import type {
  RemoveKpiMutationVariables,
} from '../../mutations/__generated__/RemoveKpiMutation.graphql';

import AddFormulaItemForm from './AddFormulaItemForm';
import AddKpiItemForm from './AddKpiItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import KpiTypeItem from './KpiTypeItem';
import RemoveKpiMutation from '../../mutations/RemoveKpiMutation';
import React, {useState} from 'react';
import TitleTextCardsKpi from './TitleTextCardsKpi';
import {EditKpiItemForm} from './EditKpiItemForm';
import {Grid, List} from '@material-ui/core';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

import fbt from 'fbt';

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
          domainFk {
            id
            name
          }
        }
      }
    }
  }
`;

const KpiTypes = () => {
  const classes = useStyles();
  const data = useLazyLoadQuery<KpiTypesQuery>(KpiQuery, {});
  const [items, setItems] = useState(data);
  const [showAddEditCard, setShowAddEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  
  const handleRemove = id => {
    const edges = items.kpis.edges.filter(item => item.node.id !== id);
    const removeKpi = {kpis: {edges}};
    setItems(removeKpi);
    const variables: RemoveKpiMutationVariables = {
      id: id,
    };
    RemoveKpiMutation(variables);
  };

  const showEditKpiItemForm = (kpis: {}) => {
    setShowAddEditCard(true);
    setDataEdit(kpis);
  };

  const hideKpItemForm = () => {
    setShowAddEditCard(false);
  };

  if (showAddEditCard) {
    return (
      <EditKpiItemForm
        formValues={dataEdit}
        onClose={hideKpItemForm}
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
          <List disablePadding={true}>
            {items.kpis.edges.map((item, index) => (
              <li className={classes.listCarKpi} key={index}>
                <KpiTypeItem 
                key={index} 
                kpi={item.node} 
                onChange={() => handleRemove(item.node.id)}
                edit={() =>
                  showEditKpiItemForm({
                    Id: item.node.id,
                    Name: item.node.name,
                    DomainName: item.node.domainFk
                  })
                } />
              </li>
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddKpiItemForm kpi={data} />
          <AddFormulaItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default KpiTypes;
