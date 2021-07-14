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
import {fetchQuery} from 'relay-runtime';
import {graphql} from 'react-relay';
import {useLazyLoadQuery} from 'react-relay/hooks';

// COMPONENTS //
import AddFormulaItemForm from './AddFormulaItemForm';
import AddKpiItemForm from './AddKpiItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import KpiTypeItem from './KpiTypeItem';
import TitleTextCardsKpi from './TitleTextCardsKpi';
import {EditKpiItemForm} from './EditKpiItemForm';

// MUTATIONS //
import type {KpiTypesQuery} from './__generated__/KpiTypesQuery.graphql';
import type {RemoveKpiMutationVariables} from '../../mutations/__generated__/RemoveKpiMutation.graphql';

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

const KpiTypes = () => {
  const classes = useStyles();
  const [kpis, setkpis] = useState([]);
  // const data = useLazyLoadQuery<KpiTypesQuery>(KpiQuery, {});
  // const [items, setItems] = useState(data);
  const [showAddEditCard, setShowAddEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const fethData = useCallback(() => {
    fetchQuery(RelayEnvironment, KpiQuery, {}).then(data => {
      setkpis(data.kpis.edges.map(edge => edge.node));
    });
  }, []);

  useEffect(() => {
    fethData();
  }, [fethData]);

  const handleRemove = id => {
    setkpis(kpis.filter(item => item.id !== id));
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
        kpi={kpis}
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
          {kpis &&
            kpis.map((item, index) => (
              <li className={classes.listCarKpi} key={index}>
                <KpiTypeItem
                  key={index}
                  kpi={item}
                  onChange={() => handleRemove(item.id)}
                  edit={() =>
                    showEditKpiItemForm({
                      Id: item.id,
                      Name: item.name,
                      DomainFk: item.domainFk.id,
                    })
                  }
                />
              </li>
            ))}
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          {kpis && <AddKpiItemForm kpi={kpis} />}
          <AddFormulaItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default KpiTypes;
